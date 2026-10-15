import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/leads/route";

const payload = (overrides: Record<string, unknown> = {}) => ({
  serviceSlug: "concrete-driveways",
  postalCode: "29720",
  fullName: "Route Test Customer",
  contactPreference: "email",
  email: "route-test@example.org",
  note: "Driveway repair",
  serviceConsent: true,
  marketingConsent: false,
  consentVersion: "service-consent-2026-09-24",
  sourcePath: "/services/concrete-driveways",
  attribution: {},
  ...overrides,
});

const submit = (body: unknown, key: string) =>
  POST(
    new Request("http://localhost/api/leads", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "idempotency-key": key,
        "x-real-ip": "203.0.113.7",
      },
      body: JSON.stringify(body),
    }),
  );

describe("lead submission sends an owner email", () => {
  const originalKey = process.env.RESEND_API_KEY;
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    process.env.RESEND_API_KEY = "re_route_test";
    fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    if (originalKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = originalKey;
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("emails the owner once for a routed lead and still returns 202", async () => {
    const response = await submit(payload(), "route-test-key-001");
    expect(response.status).toBe(202);

    const body = await response.json();
    expect(body.leadId).toBeTruthy();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const sent = JSON.parse(
      (fetchMock.mock.calls[0] as unknown as [string, RequestInit])[1].body as string,
    );
    expect(sent.to).toEqual(["markali7550@gmail.com"]);
    expect(sent.subject).toBe(
      "New Concrete Lead: Concrete Driveways - Lancaster 29720",
    );
    expect(sent.text).toContain(`Lead ID: ${body.leadId}`);
  });

  it("does not email again for a replayed idempotency key", async () => {
    await submit(payload({ email: "replay-test@example.org" }), "route-test-key-002");
    const replay = await submit(
      payload({ email: "replay-test@example.org" }),
      "route-test-key-002",
    );
    expect(replay.status).toBe(202);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("still returns 202 to the customer when the email provider fails", async () => {
    fetchMock.mockImplementationOnce(async () => {
      throw new TypeError("fetch failed");
    });
    const response = await submit(
      payload({ email: "provider-down@example.org" }),
      "route-test-key-003",
    );
    expect(response.status).toBe(202);
  });

  it("emails the owner for a no-coverage submission, without storing a lead", async () => {
    const response = await submit(
      payload({ postalCode: "99999", email: "no-cover@example.org" }),
      "route-test-key-004",
    );
    expect(response.status).toBe(422);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const sent = JSON.parse(
      (fetchMock.mock.calls[0] as unknown as [string, RequestInit])[1].body as string,
    );
    expect(sent.text).toContain("NO PROVIDER ASSIGNED");
  });
});
