import { z } from "zod";
import { services } from "@/content/services";

const serviceSlugs = services.map((s) => s.slug) as [string, ...string[]];

export const attributionSchema = z.object({
  visitorId: z.string().max(64).optional(),
  sessionId: z.string().max(64).optional(),
  landingPath: z.string().max(512).optional(),
  referrer: z.string().max(1024).optional(),
  utmSource: z.string().max(128).optional(),
  utmMedium: z.string().max(128).optional(),
  utmCampaign: z.string().max(128).optional(),
  utmTerm: z.string().max(128).optional(),
  utmContent: z.string().max(128).optional(),
  gclid: z.string().max(256).optional(),
  gbraid: z.string().max(256).optional(),
  wbraid: z.string().max(256).optional(),
  msclkid: z.string().max(256).optional(),
});

export const leadRequestSchema = z
  .object({
    serviceSlug: z.enum(serviceSlugs),
    postalCode: z.string().regex(/^\d{5}$/, "Select a valid location."),
    fullName: z.string().trim().min(2).max(120),
    contactPreference: z.enum(["call", "text", "email"]),
    phone: z.string().trim().max(32).optional().or(z.literal("")),
    email: z.string().trim().email().max(180).optional().or(z.literal("")),
    note: z.string().trim().max(1000).optional().or(z.literal("")),
    serviceConsent: z.literal(true, {
      errorMap: () => ({ message: "Service consent is required." }),
    }),
    marketingConsent: z.boolean().default(false),
    consentVersion: z.string().min(3).max(64),
    sourcePath: z.string().max(512),
    attribution: attributionSchema.default({}),
  })
  .superRefine((value, ctx) => {
    const needsPhone =
      value.contactPreference === "call" || value.contactPreference === "text";
    const digits = (value.phone ?? "").replace(/\D/g, "");
    if (needsPhone && digits.length !== 10 && digits.length !== 11) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone"],
        message: "Enter a valid US phone number.",
      });
    }
    if (value.contactPreference === "email" && !value.email) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["email"],
        message: "Enter an email address.",
      });
    }
  });

export type LeadRequest = z.infer<typeof leadRequestSchema>;

export function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  if (digits.length === 10) return `+1${digits}`;
  return `+${digits}`;
}

export function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}
