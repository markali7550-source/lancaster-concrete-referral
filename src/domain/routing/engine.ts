import { partners, type PartnerRecord } from "@/domain/partners/registry";

export const ROUTING_RULESET_VERSION = "routing-2026-09-24.1";

export type GateName =
  | "contract"
  | "geography"
  | "service"
  | "capacity"
  | "credential"
  | "insurance"
  | "conduct";

export interface GateResult {
  partnerId: string;
  blockedBy: GateName[];
}

export interface RoutingDecision {
  rulesetVersion: string;
  decidedAt: string;
  eligible: { partnerId: string; score: number; inputs: Record<string, number> }[];
  blocked: GateResult[];
  assignedPartnerId: string | null;
  backupPartnerId: string | null;
}

interface RoutingInput {
  postalCode: string;
  serviceSlug: string;
  now?: Date;
}

function gateFailures(
  partner: PartnerRecord,
  input: RoutingInput,
  now: Date,
): GateName[] {
  const failures: GateName[] = [];
  if (!partner.contractActive) failures.push("contract");
  // Coverage is explicit. Never inferred from a radius.
  if (!partner.approvedZips.includes(input.postalCode)) failures.push("geography");
  if (!partner.acceptedServices.includes(input.serviceSlug)) failures.push("service");
  if (!partner.open || partner.deliveredToday >= partner.dailyCap)
    failures.push("capacity");
  if (
    partner.credential.status !== "active" ||
    new Date(partner.credential.expiresAt) <= now
  )
    failures.push("credential");
  if (!partner.insurance.onFile || new Date(partner.insurance.expiresAt) <= now)
    failures.push("insurance");
  if (partner.suspended) failures.push("conduct");
  return failures;
}

function score(partner: PartnerRecord) {
  const inputs = {
    serviceFit: partner.acceptedServices.length > 0 ? 25 : 0,
    zipFit: 25,
    capacity: Math.max(
      0,
      20 * (1 - partner.deliveredToday / Math.max(partner.dailyCap, 1)),
    ),
    ackPerformance: Math.max(0, 20 - partner.ackMinutes / 3),
    priority: partner.contractedPriority,
  };
  const total = Object.values(inputs).reduce((sum, value) => sum + value, 0);
  return { inputs, total: Math.round(total * 100) / 100 };
}

export function routeLead(input: RoutingInput): RoutingDecision {
  const now = input.now ?? new Date();
  const blocked: GateResult[] = [];
  const eligible: RoutingDecision["eligible"] = [];

  for (const partner of partners) {
    const failures = gateFailures(partner, input, now);
    if (failures.length > 0) {
      blocked.push({ partnerId: partner.id, blockedBy: failures });
      continue;
    }
    const { inputs, total } = score(partner);
    eligible.push({ partnerId: partner.id, score: total, inputs });
  }

  eligible.sort((a, b) => b.score - a.score);

  return {
    rulesetVersion: ROUTING_RULESET_VERSION,
    decidedAt: now.toISOString(),
    eligible,
    blocked,
    assignedPartnerId: eligible[0]?.partnerId ?? null,
    backupPartnerId: eligible[1]?.partnerId ?? null,
  };
}
