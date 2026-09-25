import { NextResponse } from "next/server";
import { z } from "zod";
import { alreadyProcessed, markProcessed } from "@/domain/leads/events";
import { verifySignature } from "@/lib/validation/signature";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const noStore = { "Cache-Control": "no-store" } as const;

/** §7.2 call lifecycle events. */
const callEventSchema = z.object({
  providerEventId: z.string().min(8).max(128),
  type: z.enum([
    "call_initiated",
    "call_answered",
    "call_completed",
    "call_missed",
    "call_voicemail",
  ]),
  callSid: z.string().min(4).max(128),
  allocationId: z.string().max(128).optional(),
  callerHash: z.string().max(128).optional(),
  partnerRouteId: z.string().max(128).optional(),
  durationSeconds: z.number().int().nonnegative().optional(),
  disposition: z.string().max(64).optional(),
  occurredAt: z.string().datetime(),
});

export async function POST(request: Request) {
  const rawBody = await request.text();

  // Signature is verified BEFORE any business field is read (§5.6.6).
  const verification = verifySignature({
    rawBody,
    signatureHeader: request.headers.get("x-provider-signature"),
    timestampHeader: request.headers.get("x-provider-timestamp"),
    secret: process.env.CALL_WEBHOOK_SECRET ?? "dev-only-call-secret",
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

  const parsed = callEventSchema.safeParse(parsedJson);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation_failed" }, { status: 400, headers: noStore });
  }

  // Event idempotency: a redelivered event is acknowledged, never reprocessed.
  if (alreadyProcessed(parsed.data.providerEventId)) {
    return NextResponse.json(
      { received: true, duplicate: true },
      { status: 200, headers: noStore },
    );
  }

  markProcessed(parsed.data.providerEventId, parsed.data.type);

  // Fast acknowledgement: heavy reconciliation belongs on the queue.
  return NextResponse.json({ received: true }, { status: 200, headers: noStore });
}

export function GET() {
  return NextResponse.json({ error: "method_not_allowed" }, { status: 405, headers: noStore });
}
