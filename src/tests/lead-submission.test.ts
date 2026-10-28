import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/leads/route";

/** Body the QuoteForm sends for a call request in ZIP 29720. */
const formBody = (overrides: Record<string, unknown> = {}) => ({
  serviceSlug: "concrete-driveways",
  postalCode: "29720",
  fullName: "Test User",
  contactPreference: "call",
  phone: "803-555-0123",
  serviceConsent: true,
  marketingConsent: false,
  consentVersion: "service-consent-2026-09-24",
  sourcePath: "/services/concrete-driveways",
  attribution: {},
  ...overrides,
});

const submit = (ip: string, key: string, body: unknown) =>
  POST(
    new Request("http://localhost/api/leads", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "idempotency-key": key,
        "x-real-ip": ip,
      },
      body: JSON.stringify(body),
    }),
  );

const env = process.env as Record<string, string | undefined>;
const originalNodeEnv = env.NODE_ENV;
const originalSecret = env.LEAD_HASH_SECRET;

describe("quote form submission", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    env.NODE_ENV = originalNodeEnv;
    if (originalSecret === undefined) delete env.LEAD_HASH_SECRET;
    else env.LEAD_HASH_SECRET = originalSecret;
    vi.restoreAllMocks();
  });

  it("returns 202 with success and leadId in development without a secret", async () => {
    delete env.LEAD_HASH_SECRET;
    env.NODE_ENV = "development";
    const response = await submit("198.51.100.20", "submit-dev-key-0001", formBody({ phone: "803-555-0124" }));
    expect(response.status).toBe(202);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(typeof body.leadId).toBe("string");
  });

  it("returns 202 in production without LEAD_HASH_SECRET instead of a 500", async () => {
    delete env.LEAD_HASH_SECRET;
    env.NODE_ENV = "production";
    const response = await submit("198.51.100.21", "submit-prod-key-0001", formBody({ phone: "803-555-0125" }));
    expect(response.status).toBe(202);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.leadId).toMatch(/^lead_/);
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("LEAD_HASH_SECRET is not set"));
  });

  it("accepts ZIP 29720 for concrete driveways with a 10-digit phone", async () => {
    delete env.LEAD_HASH_SECRET;
    env.NODE_ENV = "test";
    const response = await submit("198.51.100.22", "submit-zip-key-0001", formBody({ phone: "8035550126" }));
    expect(response.status).toBe(202);
  });
});
