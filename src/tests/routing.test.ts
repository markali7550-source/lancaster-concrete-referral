import { describe, expect, it } from "vitest";
import { routeLead } from "@/domain/routing/engine";
import { commissionDue, eligibleCollectedRevenue } from "@/domain/revenue/commission";
import { leadRequestSchema } from "@/lib/validation/lead";
import { approvedZips } from "@/content/locations";

describe("partner eligibility gates", () => {
  it("assigns the highest scoring eligible partner in an approved ZIP", () => {
    const decision = routeLead({ postalCode: "29720", serviceSlug: "concrete-driveways" });
    expect(decision.assignedPartnerId).toBe("ptr_lancaster_primary");
    expect(decision.backupPartnerId).toBe("ptr_lancaster_backup");
  });

  it("blocks a partner with an expired credential", () => {
    const decision = routeLead({ postalCode: "29720", serviceSlug: "concrete-driveways" });
    const blocked = decision.blocked.find((b) => b.partnerId === "ptr_expired_credential");
    expect(blocked?.blockedBy).toContain("credential");
    expect(decision.eligible.map((e) => e.partnerId)).not.toContain("ptr_expired_credential");
  });

  it("never infers coverage from an unapproved ZIP", () => {
    const decision = routeLead({ postalCode: "29715", serviceSlug: "concrete-driveways" });
    expect(decision.assignedPartnerId).toBeNull();
    expect(approvedZips.has("29715")).toBe(false);
  });

  it("blocks a partner that does not accept the service", () => {
    const decision = routeLead({ postalCode: "29720", serviceSlug: "concrete-patios" });
    const blocked = decision.blocked.find((b) => b.partnerId === "ptr_lancaster_backup");
    expect(blocked?.blockedBy).toContain("service");
  });
});

describe("lead validation", () => {
  const base = {
    serviceSlug: "concrete-driveways",
    postalCode: "29720",
    fullName: "Test Person",
    contactPreference: "call",
    phone: "8035550123",
    serviceConsent: true,
    marketingConsent: false,
    consentVersion: "referral-consent-2026-09-24",
    sourcePath: "/",
  };

  it("accepts a valid call request", () => {
    expect(leadRequestSchema.safeParse(base).success).toBe(true);
  });

  it("rejects a missing service consent", () => {
    const result = leadRequestSchema.safeParse({ ...base, serviceConsent: false });
    expect(result.success).toBe(false);
  });

  it("rejects a four digit ZIP", () => {
    expect(leadRequestSchema.safeParse({ ...base, postalCode: "2972" }).success).toBe(false);
  });

  it("requires an email when email contact is preferred", () => {
    const result = leadRequestSchema.safeParse({
      ...base,
      contactPreference: "email",
      phone: "",
      email: "",
    });
    expect(result.success).toBe(false);
  });
});

describe("commission", () => {
  it("uses collected revenue net of exclusions at ten percent", () => {
    const input = {
      customerPaymentsReceived: 12_000,
      excludedTaxes: 600,
      refunds: 400,
      chargebacks: 0,
    };
    expect(eligibleCollectedRevenue(input)).toBe(11_000);
    expect(commissionDue(input)).toBe(1_100);
  });

  it("never returns negative commission", () => {
    expect(
      commissionDue({
        customerPaymentsReceived: 0,
        excludedTaxes: 0,
        refunds: 500,
        chargebacks: 0,
      }),
    ).toBe(0);
  });
});
