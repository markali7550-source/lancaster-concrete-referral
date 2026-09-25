import { NextResponse } from "next/server";
import { z } from "zod";
import { alreadyProcessed, markProcessed } from "@/domain/leads/events";
import { verifySignature } from "@/lib/validation/signature";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const noStore = { "Cache-Control": "no-store" } as const;

/** §5.5 lead and revenue states a partner may report. */
const TRANSITIONS: Record<string, string[]> = {
  routed: ["accepted", "lost"],
  accepted: ["contacted", "lost"],
  contacted: ["estimate_scheduled", "lost"],
  estimate_scheduled: ["won", "lost"],
  won: ["completed", "disputed"],
  completed: ["commission_due"],
  commission_due: ["paid", "disputed"],
};

const partnerEventSchema = z.object({
  providerEventId: z.string().min(8).max(128),
  partnerId: z.string().min(3).max(128),
  leadId: z.string().min(3).max(128),
  fromState: z.string().min(3).max(32),
  toState: z.string().min(3).max(32),
  occurredAt: z.string().datetime(),
  collectedRevenue: z.number().nonnegative().optional(),
});

export async function POST(request: Request) {
  const rawBody = await request.text();

  const verification = verifySignature({
    rawBody,
    signatureHeader: request.headers.get("x-partner-signature"),
    timestampHeader: request.headers.get("x-partner-timestamp"),
    secret: process.env.PARTNER_WEBHOOK_SECRET ?? "dev-only-partner-secret",
  });

  if (!verification.ok) {
    return NextResponse.json(
      { error: `signature_${verification.reason}` },
      { status: 401, headers: noStore },
    );
  }

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(rawBody) as unknown;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400, headers: noStore });
  }

  const parsed = partnerEventSchema.safeParse(parsedJson);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation_failed" }, { status: 400, headers: noStore });
  }

  const { providerEventId, fromState, toState } = parsed.data;

  if (alreadyProcessed(providerEventId)) {
    return NextResponse.json({ received: true, duplicate: true }, { status: 200, headers: noStore });
  }

  // State transitions are validated, not trusted (§5.1).
  if (!TRANSITIONS[fromState]?.includes(toState)) {
    return NextResponse.json(
      { error: "invalid_transition", fromState, toState },
      { status: 409, headers: noStore },
    );
  }

  markProcessed(providerEventId, toState);
  return NextResponse.json({ received: true, state: toState }, { status: 200, headers: noStore });
}

export function GET() {
  return NextResponse.json({ error: "method_not_allowed" }, { status: 405, headers: noStore });
}
