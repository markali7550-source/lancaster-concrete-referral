import type { Metadata } from "next";
import { absoluteUrl, site } from "@/lib/env";

const OG_IMAGE = {
  url: "/opengraph-image.webp",
  width: 1200,
  height: 630,
  alt: `${site.brand}, concrete referrals in Lancaster, South Carolina`,
} as const;

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}

/** Public pages are indexable by default; transactional confirmation pages opt out explicitly. */
export const DEMO_NOINDEX = false;

export function pageMetadata({
  title,
  description,
  path,
  noindex = DEMO_NOINDEX,
}: PageMetaInput): Metadata {
  const canonical = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.brand,
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

/** Per-service copy for the location + service combo pages.
 *
 * Keyed by service slug rather than built from `nameLower`, because
 * `nameLower` carries an indefinite article ("a concrete driveway"), which the
 * previous single template spliced into "Explore a concrete driveway referral
 * options…" — ungrammatical on all four pages. Writing each line out also lets
 * every page open with a different, natural sentence instead of one boilerplate
 * string, which is better for both readers and duplicate-content signals.
 *
 * Lengths are deliberately budgeted: titles 55-59 characters, descriptions
 * 142-146. The brand is intentionally NOT appended to these titles — at 26
 * characters "Lancaster Concrete Connect" pushes every one of them to 60-64,
 * which is the over-length problem these titles exist to fix. The brand is
 * still carried on each page by `openGraph.siteName` and the JSON-LD graph. */
const COMBO_DESCRIPTIONS: Record<string, (city: string) => string> = {
  "concrete-driveways": (city) =>
    `Planning a concrete driveway in ${city}, SC? Tell us about the project and we can connect you with one independent provider serving your area.`,
  "concrete-patios": (city) =>
    `Thinking about a concrete patio in ${city}, SC? Share a few details and we can connect you with one independent provider covering your area.`,
  "concrete-slabs": (city) =>
    `Need a concrete slab or pad in ${city}, SC? Tell us what it will support and we can connect you with one independent provider serving your area.`,
  "concrete-repair": (city) =>
    `Have cracked or settled concrete in ${city}, SC? Describe the problem and we can connect you with one independent provider serving your area.`,
};

export const comboMeta = {
  title: (serviceName: string, city: string) =>
    `${city}, SC ${serviceName} | Local Provider Referrals`,
  description: (serviceSlug: string, city: string) =>
    COMBO_DESCRIPTIONS[serviceSlug]?.(city) ??
    `Tell us about your ${serviceSlug.replace(/-/g, " ")} project in ${city}, SC and we can connect you with one independent provider serving your area.`,
  h1: (serviceName: string, city: string) =>
    `${serviceName} Referrals in ${city}, SC`,
};
