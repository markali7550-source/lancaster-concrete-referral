import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { site } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const noStore = { "Cache-Control": "no-store" } as const;

/**
 * Allocation is state-creating, so it is POST only (spec 5.1).
 * Pool exhaustion or consent denial must leave the fallback number intact.
 */
const POOL: { display: string; e164: string }[] = [];

export async function POST(request: Request) {
  let body: { consent?: unknown; sessionId?: unknown } = {};
  try {
    body = (await request.json()) as typeof body;
  } catch {
    body = {};
  }

  if (body.consent !== true) {
    return NextResponse.json(
      { allocated: false, reason: "consent_denied" },
      { status: 200, headers: noStore },
    );
  }

  const number = POOL.shift();
  if (!number) {
    return NextResponse.json(
      { allocated: false, reason: "pool_exhausted" },
      { status: 200, headers: noStore },
    );
  }

  return NextResponse.json(
    {
      allocated: true,
      displayNumber: number.display,
      e164Number: number.e164,
      allocationId: `alloc_${randomUUID()}`,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      fallbackDisplay: site.phoneDisplay,
    },
    { status: 200, headers: noStore },
  );
}

export function GET() {
  return NextResponse.json(
    { error: "method_not_allowed" },
    { status: 405, headers: noStore },
  );
}
