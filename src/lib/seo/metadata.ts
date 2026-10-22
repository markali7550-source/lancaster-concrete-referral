import type { Metadata } from "next";
import { absoluteUrl, site } from "@/lib/env";
import { SEARCH_INDEXING_ENABLED } from "@/lib/env/indexing";

const OG_ALT = `${site.brand}, concrete service in Lancaster, South Carolina`;

/**
 * JPEG first: it is the format every social crawler accepts. The WebP stays
 * listed second for crawlers that prefer it. Both are 1200x630.
 */
const OG_IMAGES: { url: string; width: number; height: number; alt: string; type: string }[] = [
  { url: "/opengraph-image.webp", width: 1200, height: 630, alt: OG_ALT, type: "image/webp" },
];

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  /** Page-specific social preview. Falls back to the site-wide image. */
  image?: { url: string; width: number; height: number; alt: string };
}

/**
 * Pages are noindex until ALLOW_SEARCH_INDEXING=true is set for the launch build.
 * Transactional confirmation pages opt out explicitly as well.
 */
export const DEFAULT_NOINDEX = !SEARCH_INDEXING_ENABLED;

export function pageMetadata({
  title,
  description,
  path,
  noindex = DEFAULT_NOINDEX,
  image,
}: PageMetaInput): Metadata {
  const canonical = absoluteUrl(path);
  const ogImages = image
    ? [{ ...image, type: "image/webp" }]
    : OG_IMAGES;
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
      locale: "en_US",
      type: "website",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages.map((item) => item.url),
    },
  };
}

/** Per-service copy for the location + service combo pages.
 *
 * Keyed by service slug rather than built from `nameLower`, because
 * `nameLower` carries an indefinite article ("a concrete driveway"), which the
 * previous single template spliced into "Explore a concrete driveway quote
 * options…" — ungrammatical on all four pages. Writing each line out also lets
 * every page open with a different, natural sentence instead of one boilerplate
 * string, which is better for both readers and duplicate-content signals.
 *
 * Lengths are deliberately budgeted: titles 50-60 characters (see fitTitle),
 * descriptions 140-160. The full brand is not appended, because it would push
 * these titles past 60 characters. The brand is still carried on each page by
 * `openGraph.siteName` and the JSON-LD graph. */
/**
 * Google title and meta-description parts, keyed by service slug.
 *
 * Title: `[Service] in Lancaster, SC | [Suffix]` (about 60 characters).
 * Description: 150-160 characters, with the buyer-intent phrase, the local
 * red clay context and a call to action. The lowercased service name is used in
 * the description.
 */
const SEO_SERVICE_NAME: Record<string, [string, string]> = {
  "concrete-driveways": ["Concrete Driveways", "Upfront Pricing & Quotes"],
  "concrete-patios": ["Concrete Patios", "Free Estimates"],
  "stamped-concrete": ["Stamped Concrete", "Free Estimates"],
  "concrete-slabs": ["Concrete Slabs for Sheds", "Free Quotes"],
  "concrete-retaining-walls": ["Concrete Retaining Walls", "Free Estimates"],
  "concrete-demolition": ["Concrete Demolition & Tear-Out", "Free Quotes"],
  "concrete-repair": ["Concrete Repair & Leveling", "Free Estimates"],
  "concrete-leveling": ["Concrete Leveling", "Free Estimates"],
  "equipment-pads": ["Equipment Pads", "Free Quotes"],
  "concrete-pool-decks": ["Concrete Pool Decks", "Free Quotes"],
  "concrete-foundations": ["Concrete Foundations", "Free Quotes"],
  "concrete-walkways": ["Concrete Walkways", "Free Quotes"],
  "concrete-steps": ["Concrete Steps", "Free Quotes"],
  "concrete-garage-coatings": ["Garage Floor Coatings", "Free Quotes"],
  "concrete-resurfacing": ["Concrete Resurfacing", "Free Quotes"],
  "concrete-aprons": ["Concrete Aprons", "Free Quotes"],
  "concrete-sealing": ["Concrete Sealing", "Free Quotes"],
  "concrete-exposed-aggregate": ["Exposed Aggregate Concrete", "Free Quotes"],
};

/*
 * H1s are written out per service rather than built by concatenation.
 *
 * `service.name` is plural ("Concrete Driveways"), so `${name} Quotes`
 * produced "Concrete Driveways Services" — plural noun stacked on plural noun.
 * Three of the four combo pages shipped with that in their H1 and in search
 * results. A lookup keyed by slug cannot regress the same way: a missing key is
 * caught by the fallback below rather than silently reading wrong.
 */
const COMBO_H1: Record<string, (city: string) => string> = {
  "concrete-retaining-walls": (city) => `Concrete Retaining Wall Quotes in ${city}, SC`,
  "equipment-pads": (city) => `Equipment Pad Quotes in ${city}, SC`,
  "concrete-demolition": (city) => `Concrete Demolition Quotes in ${city}, SC`,
  "concrete-pool-decks": (city) => `Concrete Pool Deck Quotes in ${city}, SC`,
  "concrete-driveways": (city) => `Concrete Driveway Quotes in ${city}, SC`,
  "concrete-patios": (city) => `Concrete Patio Quotes in ${city}, SC`,
  "concrete-slabs": (city) => `Concrete Slab Quotes in ${city}, SC`,
  "concrete-repair": (city) => `Concrete Repair Quotes in ${city}, SC`,
  "concrete-foundations": (city) => `Concrete Foundation Quotes in ${city}, SC`,
  "concrete-walkways": (city) => `Concrete Walkway Quotes in ${city}, SC`,
  "stamped-concrete": (city) => `Stamped Concrete Quotes in ${city}, SC`,
  "concrete-steps": (city) => `Concrete Steps Quotes in ${city}, SC`,
  "concrete-leveling": (city) => `Concrete Leveling Quotes in ${city}, SC`,
  "concrete-garage-coatings": (city) => `Garage Floor Coating Quotes in ${city}, SC`,
  "concrete-resurfacing": (city) => `Concrete Resurfacing Quotes in ${city}, SC`,
  "concrete-aprons": (city) => `Concrete Apron Quotes in ${city}, SC`,
  "concrete-sealing": (city) => `Concrete Sealing Quotes in ${city}, SC`,
  "concrete-exposed-aggregate": (city) => `Exposed Aggregate Quotes in ${city}, SC`
};

/** Shared 50-60 character title rule: the long suffix when it fits, else the short one. */
export function fitTitle(base: string): string {
  const brand = `${base} | ${site.brand}`;
  if (brand.length <= 60) return brand;
  const long = `${base} | Local Concrete Service`;
  return long.length <= 60 ? long : `${base} | Local Service`;
}

export const comboMeta = {
  title: (serviceName: string, city: string, serviceSlug?: string) => {
    const parts = serviceSlug ? SEO_SERVICE_NAME[serviceSlug] : undefined;
    return parts
      ? `${parts[0]} in ${city}, SC | ${parts[1]}`
      : fitTitle(`${city}, SC ${serviceName}`);
  },
  description: (serviceSlug: string, city: string) => {
    const parts = SEO_SERVICE_NAME[serviceSlug];
    return parts
      ? `Need ${parts[0].toLowerCase()} in ${city}, SC or Lancaster County? Connect with licensed local contractors for red clay site prep, pours and fast estimates.`
      : `Tell us about your ${serviceSlug.replace(/-/g, " ")} project in ${city}, SC and a local contractor can reply to your request.`;
  },
  h1: (serviceSlug: string, city: string) =>
    COMBO_H1[serviceSlug]?.(city) ?? `Concrete Services in ${city}, SC`,
};
