/**
 * Single source of business identity: brand name, domain, phone, email and
 * service area. Every canonical, sitemap entry, robots rule, JSON-LD node,
 * header, footer and button reads these values through `@/lib/env`.
 *
 * Each value can be overridden at build time by the matching NEXT_PUBLIC_*
 * environment variable (see .env.example). The values below are PLACEHOLDERS
 * until the owner supplies the real details. Do not treat them as live data.
 */
export const siteConfig = {
  brandName: "Lancaster Concrete Connect",
  /** Placeholder domain. Replace with the production domain. */
  domain: "https://example-referral-brand.com",
  /** Placeholder number (555-01xx is reserved for fiction). */
  phoneE164: "+18035550123",
  phoneDisplay: "(803) 555-0123",
  /** Placeholder mailbox. */
  email: "hello@example-referral-brand.com",
  serviceArea: { city: "Lancaster", region: "SC", country: "US" },
  /** Street address and postcode are optional. Leave them empty until verified:
   *  the schema then carries city, region and country only. */
  streetAddress: "",
  postalCode: "",
} as const;
