import { createHash, randomUUID } from "node:crypto";
import type { RoutingDecision } from "@/domain/routing/engine";

export type LeadState =
  | "new"
  | "validated"
  | "routed"
  | "no_coverage"
  | "accepted"
  | "contacted"
  | "estimate_scheduled"
  | "won"
  | "lost"
  | "completed"
  | "commission_due"
  | "paid"
  | "disputed";

export interface OutboxEvent {
  id: string;
  leadId: string;
  type: "lead.deliver";
  createdAt: string;
  attempts: number;
  state: "pending" | "delivered" | "dead_letter";
}

export interface LeadRecord {
  id: string;
  state: LeadState;
  createdAt: string;
  serviceSlug: string;
  postalCode: string;
  sourcePath: string;
  /** Hashed for dedupe. Raw contact values are never logged. */
  phoneHash: string | null;
  emailHash: string | null;
  consent: {
    serviceConsent: true;
    marketingConsent: boolean;
    version: string;
    acceptedAt: string;
    sourcePath: string;
  };
  attribution: Record<string, string | undefined>;
  routing: RoutingDecision | null;
}

const HASH_SECRET = process.env.LEAD_HASH_SECRET ?? "dev-only-hash-secret";

export function hashContact(value: string | null | undefined): string | null {
  if (!value) return null;
  return createHash("sha256").update(`${HASH_SECRET}:${value}`).digest("hex");
}

/**
 * In-memory canonical store for this build. Production swaps this module for
 * PostgreSQL + Drizzle with the same transaction boundary: lead, consent,
 * attribution, and outbox event are written together before any delivery.
 */
const leads = new Map<string, LeadRecord>();
const idempotency = new Map<string, string>();
const outbox: OutboxEvent[] = [];
const DEDUPE_WINDOW_DAYS = 30;

export function findByIdempotencyKey(key: string): LeadRecord | undefined {
  const leadId = idempotency.get(key);
  return leadId ? leads.get(leadId) : undefined;
}

export function findDuplicate(input: {
  phoneHash: string | null;
  emailHash: string | null;
  serviceSlug: string;
  postalCode: string;
}): LeadRecord | undefined {
  const cutoff = Date.now() - DEDUPE_WINDOW_DAYS * 24 * 60 * 60 * 1000;
  return [...leads.values()].find(
    (lead) =>
      Date.parse(lead.createdAt) >= cutoff &&
      lead.serviceSlug === input.serviceSlug &&
      lead.postalCode === input.postalCode &&
      ((input.phoneHash !== null && lead.phoneHash === input.phoneHash) ||
        (input.emailHash !== null && lead.emailHash === input.emailHash)),
  );
}

export interface CommitInput {
  idempotencyKey: string;
  lead: Omit<LeadRecord, "id" | "createdAt" | "state"> & { state: LeadState };
}

/** Single atomic commit: lead + consent + attribution + outbox. */
export function commitLead({ idempotencyKey, lead }: CommitInput): LeadRecord {
  const record: LeadRecord = {
    ...lead,
    id: `lead_${randomUUID()}`,
    createdAt: new Date().toISOString(),
  };
  leads.set(record.id, record);
  idempotency.set(idempotencyKey, record.id);
  if (record.state === "routed") {
    outbox.push({
      id: `evt_${randomUUID()}`,
      leadId: record.id,
      type: "lead.deliver",
      createdAt: record.createdAt,
      attempts: 0,
      state: "pending",
    });
  }
  return record;
}

export function outboxSnapshot(): readonly OutboxEvent[] {
  return outbox;
}

export function leadCount(): number {
  return leads.size;
}

export function resetStoreForTests(): void {
  leads.clear();
  idempotency.clear();
  outbox.length = 0;
}
