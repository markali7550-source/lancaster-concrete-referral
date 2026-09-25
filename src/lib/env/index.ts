import { z } from "zod";

/**
 * Build-time identity values. Missing or sample values must fail the build
 * (spec 6.4). Client-safe values only — provider tokens never live here.
 */
const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_BRAND_NAME: z.string().min(2),
  NEXT_PUBLIC_FALLBACK_PHONE_E164: z.string().regex(/^\+1\d{10}$/),
  NEXT_PUBLIC_FALLBACK_PHONE_DISPLAY: z.string().min(10),
  NEXT_PUBLIC_CONTACT_EMAIL: z.string().email(),
});

const parsed = publicEnvSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_BRAND_NAME: process.env.NEXT_PUBLIC_BRAND_NAME,
  NEXT_PUBLIC_FALLBACK_PHONE_E164: process.env.NEXT_PUBLIC_FALLBACK_PHONE_E164,
  NEXT_PUBLIC_FALLBACK_PHONE_DISPLAY:
    process.env.NEXT_PUBLIC_FALLBACK_PHONE_DISPLAY,
  NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
});

if (!parsed.success) {
  throw new Error(
    `Invalid public environment configuration:\n${parsed.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n")}`,
  );
}

export const env = parsed.data;

export const site = {
  url: env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, ""),
  brand: env.NEXT_PUBLIC_BRAND_NAME,
  phoneE164: env.NEXT_PUBLIC_FALLBACK_PHONE_E164,
  phoneDisplay: env.NEXT_PUBLIC_FALLBACK_PHONE_DISPLAY,
  email: env.NEXT_PUBLIC_CONTACT_EMAIL,
  consentVersion: "referral-consent-2026-09-24",
} as const;

export function absoluteUrl(path: string): string {
  return `${site.url}${path === "/" ? "" : path}`;
}
