import { isIP } from "node:net";
import { NextResponse } from "next/server";
import { approvedZips } from "@/content/locations";
import { intakeEnabled } from "@/lib/env/flags";
import {
  commitLead,
  findByIdempotencyKey,
  findDuplicate,
  hashContact,
} from "@/domain/leads/store";
import { routeLead } from "@/domain/routing/engine";
import {
  leadRequestSchema,
  normalizeEmail,
  normalizePhone,
} from "@/lib/validation/lead";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 16 * 1024;
const RATE_LIMIT = { windowMs: 60_000, max: 8 };
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT.max;
}

const noStore = { "Cache-Control": "no-store" } as const;

/**
 * Rate-limit key. Only headers the Vercel edge sets are trusted:
 * `x-vercel-forwarded-for` and `x-real-ip` are written by the platform, while
 * a client can send any `x-forwarded-for` it likes. Each value must parse as an
 * IP address before it is used as a key. If neither header is present (for
 * example, self-hosted behind an untrusted proxy), every such request shares
 * one "unknown" bucket. That is strict, not spoofable.
 */
function clientIp(request: Request): string {
  for (const name of ["x-vercel-forwarded-for", "x-real-ip"]) {
    const candidate = request.headers.get(name)?.split(",")[0]?.trim();
    if (candidate && isIP(candidate) !== 0) return candidate;
  }
  return "unknown";
}

export async function POST(request: Request) {
  if (!intakeEnabled()) {
    return NextResponse.json(
      {
        result: "intake_disabled",
        message:
          "Online requests are temporarily unavailable. Please call us instead.",
      },
      { status: 503, headers: noStore },
    );
  }

  const clientKey = clientIp(request);
  if (rateLimited(clientKey)) {
    return NextResponse.json(
      { error: "rate_limited" },
      { status: 429, headers: noStore },
    );
  }

  const idempotencyKey = request.headers.get("idempotency-key");
  if (!idempotencyKey || idempotencyKey.length < 8) {
    return NextResponse.json(
      { error: "idempotency_key_required" },
      { status: 400, headers: noStore },
    );
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "payload_too_large" },
      { status: 413, headers: noStore },
    );
  }

  let json: unknown;
  try {
    json = JSON.parse(raw) as unknown;
  } catch {
    return NextResponse.json(
      { error: "invalid_json" },
      { status: 400, headers: noStore },
    );
  }

  // Safe retry: same key returns the original lead, no duplicate delivery.
  const replay = findByIdempotencyKey(idempotencyKey);
  if (replay) {
    return NextResponse.json(
      { success: true, leadId: replay.id, state: replay.state, replay: true },
      { status: 202, headers: noStore },
    );
  }

  const parsed = leadRequestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "validation_failed",
        // Field names only. Never echo submitted values.
        fields: parsed.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400, headers: noStore },
    );
  }

  const data = parsed.data;

  if (!approvedZips.has(data.postalCode)) {
    return NextResponse.json(
      {
        result: "no_coverage",
        message:
          "We do not serve that area yet. Nothing was sent.",
      },
      { status: 422, headers: noStore },
    );
  }

  const phoneHash = data.phone ? hashContact(normalizePhone(data.phone)) : null;
  const emailHash = data.email ? hashContact(normalizeEmail(data.email)) : null;

  const duplicate = findDuplicate({
    phoneHash,
    emailHash,
    serviceSlug: data.serviceSlug,
    postalCode: data.postalCode,
  });
  if (duplicate) {
    return NextResponse.json(
      { success: true, leadId: duplicate.id, state: duplicate.state, duplicate: true },
      { status: 202, headers: noStore },
    );
  }

  const decision = routeLead({
    postalCode: data.postalCode,
    serviceSlug: data.serviceSlug,
  });

  if (!decision.assignedPartnerId) {
    return NextResponse.json(
      {
        result: "no_coverage",
        message:
          "We cannot schedule that project right now. Nothing was sent.",
      },
      { status: 422, headers: noStore },
    );
  }

  const record = commitLead({
    idempotencyKey,
    lead: {
      state: "routed",
      serviceSlug: data.serviceSlug,
      postalCode: data.postalCode,
      sourcePath: data.sourcePath,
      phoneHash,
      emailHash,
      consent: {
        serviceConsent: true,
        marketingConsent: data.marketingConsent,
        version: data.consentVersion,
        acceptedAt: new Date().toISOString(),
        sourcePath: data.sourcePath,
      },
      attribution: data.attribution,
      routing: decision,
    },
  });

  return NextResponse.json(
    { success: true, leadId: record.id, state: record.state },
    { status: 202, headers: noStore },
  );
}

export function GET() {
  return NextResponse.json(
    { error: "method_not_allowed" },
    { status: 405, headers: noStore },
  );
}
