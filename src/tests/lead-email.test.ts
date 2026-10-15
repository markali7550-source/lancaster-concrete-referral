import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildLeadEmail,
  cityForZip,
  notificationRecipient,
  sendLeadNotification,
  type LeadEmailInput,
} from "@/domain/notifications/lead-email";

const base: LeadEmailInput = {
  leadId: "lead_test_123",
  submittedAt: new Date("2026-10-15T18:30:00.000Z"),
  outcome: "routed",
  serviceSlug: "concrete-driveways",
  postalCode: "29720",
  fullName: "Jane Doe",
  contactPreference: "call",
  phone: "(803) 555-0199",
  email: "jane@example.org",
  note: "Two-car driveway, about 600 sq ft",
  marketingConsent: false,
  consentVersion: "service-consent-2026-09-24",
  sourcePath: "/services/concrete-driveways",
};

describe("lead email content", () => {
  it("uses the required subject format with service name and city/ZIP", () => {
    const email = buildLeadEmail(base);
    expect(email.subject).toBe(
      "New Concrete Lead: Concrete Driveways - Lancaster 29720",
    );
  });

  it("includes every customer detail, the lead ID, and the timestamp", () => {
    const { text } = buildLeadEmail(base);
    expect(text).toContain("Lead ID: lead_test_123");
    expect(text).toContain("Full name: Jane Doe");
    expect(text).toContain("Phone: (803) 555-0199");
    expect(text).toContain("Email: jane@example.org");
    expect(text).toContain("Service requested: Concrete Driveways");
    expect(text).toContain("Project details: Two-car driveway, about 600 sq ft");
    expect(text).toContain("Postal code: 29720");
    expect(text).toContain("City: Lancaster");
    expect(text).toContain("2026-10-15T18:30:00.000Z");
    expect(text).toContain("Pacific");
  });

  it("marks no-coverage submissions clearly", () => {
    const email = buildLeadEmail({
      ...base,
      outcome: "no_coverage",
      postalCode: "99999",
    });
    expect(email.text).toContain("NO PROVIDER ASSIGNED");
    expect(email.text).toContain("City: Not in a listed area");
  });

  it("escapes customer text in the HTML body", () => {
    const email = buildLeadEmail({
      ...base,
      fullName: "<script>alert(1)</script>",
      note: `"quoted" & <b>bold</b>`,
    });
    expect(email.html).not.toContain("<script>");
    expect(email.html).toContain("&lt;script&gt;");
    expect(email.html).toContain("&quot;quoted&quot; &amp; &lt;b&gt;");
  });

  it("resolves approved ZIPs to their city", () => {
    expect(cityForZip("29720")).toBe("Lancaster");
    expect(cityForZip("99999")).toBeNull();
  });

  it("sends to the owner address by default", () => {
    delete process.env.LEAD_NOTIFICATION_EMAIL;
    expect(notificationRecipient()).toBe("markali7550@gmail.com");
  });
});

describe("lead email delivery", () => {
  const originalKey = process.env.RESEND_API_KEY;
  let logSpy: ReturnType<typeof vi.spyOn>;
  let warnSpy: ReturnType<typeof vi.spyOn>;
  let errorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    if (originalKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = originalKey;
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("logs the formatted lead and does not throw when no API key is set", async () => {
    delete process.env.RESEND_API_KEY;
    await expect(sendLeadNotification(base)).resolves.toBe("logged");
    expect(warnSpy).toHaveBeenCalled();
    expect(logSpy.mock.calls.join("\n")).toContain("Full name: Jane Doe");
  });

  it("posts to Resend with the owner as recipient and the customer as reply-to", async () => {
    process.env.RESEND_API_KEY = "re_test_key";
    const fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(sendLeadNotification(base)).resolves.toBe("sent");

    const [url, init] = fetchMock.mock.calls[0] as unknown as [
      string,
      RequestInit,
    ];
    expect(url).toBe("https://api.resend.com/emails");
    expect((init.headers as Record<string, string>).Authorization).toBe(
      "Bearer re_test_key",
    );
    const body = JSON.parse(init.body as string);
    expect(body.to).toEqual(["markali7550@gmail.com"]);
    expect(body.subject).toBe(
      "New Concrete Lead: Concrete Driveways - Lancaster 29720",
    );
    expect(body.reply_to).toBe("jane@example.org");
  });

  it("returns failed without throwing when Resend rejects the request", async () => {
    process.env.RESEND_API_KEY = "re_test_key";
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("nope", { status: 500 })),
    );
    await expect(sendLeadNotification(base)).resolves.toBe("failed");
    expect(errorSpy).toHaveBeenCalled();
    expect(logSpy.mock.calls.join("\n")).toContain("Full name: Jane Doe");
  });

  it("returns failed without throwing on a network error", async () => {
    process.env.RESEND_API_KEY = "re_test_key";
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new TypeError("fetch failed");
      }),
    );
    await expect(sendLeadNotification(base)).resolves.toBe("failed");
  });
});
