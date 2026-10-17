import { createHash } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { webhookSecret } from "@/lib/env/secrets";
import { hashContact } from "@/domain/leads/store";

/** Strings that were published in the repository before this fix. */
const PUBLISHED = [
  "dev-only-call-secret",
  "dev-only-partner-secret",
  "dev-only-hash-secret",
];

describe("webhook secrets never fall back to a published value", () => {
  beforeEach(() => {
    vi.stubEnv("CALL_WEBHOOK_SECRET", "");
    vi.stubEnv("PARTNER_WEBHOOK_SECRET", "");
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("throws an explicit error in production when CALL_WEBHOOK_SECRET is unset", () => {
    vi.stubEnv("NODE_ENV", "production");
    expect(() => webhookSecret("CALL_WEBHOOK_SECRET")).toThrow(/CALL_WEBHOOK_SECRET is not set/);
  });

  it("throws an explicit error in production when PARTNER_WEBHOOK_SECRET is unset", () => {
    vi.stubEnv("NODE_ENV", "production");
    expect(() => webhookSecret("PARTNER_WEBHOOK_SECRET")).toThrow(/PARTNER_WEBHOOK_SECRET is not set/);
  });

  it("returns the configured value in production when it is set", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("CALL_WEBHOOK_SECRET", "real-production-value");
    expect(webhookSecret("CALL_WEBHOOK_SECRET")).toBe("real-production-value");
  });

  it.each(["development", "test"])(
    "outside production (%s) returns a random per-process secret, never a published one",
    (nodeEnv) => {
      vi.stubEnv("NODE_ENV", nodeEnv);
      const call = webhookSecret("CALL_WEBHOOK_SECRET");
      const partner = webhookSecret("PARTNER_WEBHOOK_SECRET");
      expect(PUBLISHED).not.toContain(call);
      expect(PUBLISHED).not.toContain(partner);
      expect(call).toMatch(/^[0-9a-f]{64}$/);
      expect(partner).toMatch(/^[0-9a-f]{64}$/);
      expect(call).not.toBe(partner);
      // Stable within one process so repeated calls verify against the same key.
      expect(webhookSecret("CALL_WEBHOOK_SECRET")).toBe(call);
    },
  );
});

describe("lead hash secret never uses the published string", () => {
  const originalSecret = process.env.LEAD_HASH_SECRET;

  afterEach(() => {
    vi.unstubAllEnvs();
    if (originalSecret === undefined) delete process.env.LEAD_HASH_SECRET;
    else process.env.LEAD_HASH_SECRET = originalSecret;
    vi.restoreAllMocks();
  });

  it.each(["development", "test", "production"])(
    "with LEAD_HASH_SECRET unset (%s), the hash differs from the one the published string would give",
    (nodeEnv) => {
      delete process.env.LEAD_HASH_SECRET;
      vi.stubEnv("NODE_ENV", nodeEnv);
      vi.spyOn(console, "warn").mockImplementation(() => {});
      const value = "jane@example.com";
      const hash = hashContact(value);
      for (const published of PUBLISHED) {
        const forged = createHash("sha256").update(`${published}:${value}`).digest("hex");
        expect(hash).not.toBe(forged);
      }
    },
  );

  it("does not throw in production without LEAD_HASH_SECRET (graceful fallback is kept)", async () => {
    delete process.env.LEAD_HASH_SECRET;
    vi.stubEnv("NODE_ENV", "production");
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    // Fresh module instance so the one-time warning state starts clean.
    vi.resetModules();
    const { hashContact: freshHash } = await import("@/domain/leads/store");
    expect(() => freshHash("jane@example.com")).not.toThrow();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("LEAD_HASH_SECRET is not set"));
  });

  it("uses LEAD_HASH_SECRET when it is set", () => {
    process.env.LEAD_HASH_SECRET = "configured-secret";
    const value = "jane@example.com";
    const expected = createHash("sha256").update(`configured-secret:${value}`).digest("hex");
    expect(hashContact(value)).toBe(expected);
  });
});
