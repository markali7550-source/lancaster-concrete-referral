import { createHmac, timingSafeEqual } from "node:crypto";

/** Replay window for provider webhooks (§5.6.7). */
export const REPLAY_WINDOW_SECONDS = 300;

export interface VerifyInput {
  rawBody: string;
  signatureHeader: string | null;
  timestampHeader: string | null;
  secret: string;
  now?: number;
}

export type VerifyResult =
  | { ok: true }
  | { ok: false; reason: "missing" | "stale" | "mismatch" };

/**
 * Verifies `t=<unix>,v1=<hex hmac>` over `<timestamp>.<rawBody>`.
 * Constant-time comparison, and the timestamp is checked before the body is
 * ever parsed as business data.
 */
export function verifySignature({
  rawBody,
  signatureHeader,
  timestampHeader,
  secret,
  now = Date.now(),
}: VerifyInput): VerifyResult {
  if (!signatureHeader || !timestampHeader) return { ok: false, reason: "missing" };

  const timestamp = Number.parseInt(timestampHeader, 10);
  if (!Number.isFinite(timestamp)) return { ok: false, reason: "missing" };

  const ageSeconds = Math.abs(now / 1000 - timestamp);
  if (ageSeconds > REPLAY_WINDOW_SECONDS) return { ok: false, reason: "stale" };

  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex");

  const provided = /v1=([a-f0-9]+)/.exec(signatureHeader)?.[1] ?? signatureHeader;

  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(provided, "utf8");
  if (a.length !== b.length) return { ok: false, reason: "mismatch" };
  return timingSafeEqual(a, b) ? { ok: true } : { ok: false, reason: "mismatch" };
}

export function signPayload(rawBody: string, secret: string, timestamp = Math.floor(Date.now() / 1000)) {
  const signature = createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex");
  return { timestamp: String(timestamp), header: `t=${timestamp},v1=${signature}` };
}
