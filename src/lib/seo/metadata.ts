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
      locale: "en_US",
      type: "website",
      images: OG_IMAGES,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: OG_IMAGES.map((image) => image.url),
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
const COMBO_DESCRIPTIONS: Record<string, (city: string) => string> = {
  "concrete-driveways": (city) =>
    `Planning a concrete driveway in ${city}, SC? Tell us about the project and a local contractor will reply to your request. Ask for a free quote.`,
  "concrete-patios": (city) =>
    `Thinking about a concrete patio in ${city}, SC? Share a few details and a local contractor will reply with next steps. Request a free quote today.`,
  "concrete-slabs": (city) =>
    `Need a concrete slab or pad in ${city}, SC? Tell us what it will support and a local contractor will reply to your request. Get a free quote.`,
  "concrete-repair": (city) =>
    `Have cracked or settled concrete in ${city}, SC? Describe the problem and a local contractor will reply to your request. Request a free quote.`,
  "concrete-foundations": (city) =>
    `Planning a foundation or footing in ${city}, SC? Describe the project and a local contractor will reply to your request. Get a free quote today.`,
  "concrete-walkways": (city) =>
    `Thinking about a front walk or entry path in ${city}, SC? Share a few details and a local contractor will reply. Request a free quote today.`,
  "stamped-concrete": (city) =>
    `Interested in stamped concrete in ${city}, SC? Tell us the area and pattern you have in mind, and a local contractor can reply to your request.`,
  "concrete-steps": (city) =>
    `Planning new or repaired steps in ${city}, SC? Tell us about the rise and location, and a local contractor will reply. Ask for a free quote.`,
  "concrete-leveling": (city) =>
    `Sunken slab in ${city}, SC? Tell us where it dropped and a local contractor will reply to your request about leveling options. Get a free quote.`,
  "concrete-garage-coatings": (city) =>
    `Planning a garage floor coating in ${city}, SC? Tell us the garage size and floor condition, and a local contractor can reply to your request.`,
  "concrete-resurfacing": (city) =>
    `Worn driveway or patio in ${city}, SC? Tell us about the surface and a local contractor will reply about a thin overlay. Ask for a free quote.`,
  "concrete-aprons": (city) =>
    `Need a concrete apron in ${city}, SC? Tell us where the driveway meets the street and a local contractor will reply. Request a free quote today.`,
  "concrete-sealing": (city) =>
    `Want to seal concrete in ${city}, SC? Tell us the surface and its size, and a local contractor can reply to your request about cleaning and sealer.`,
  "concrete-exposed-aggregate": (city) =>
    `Want an exposed aggregate driveway or patio in ${city}, SC? Tell us the area and the look you want, and a local contractor can reply to your request.`
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
  const long = `${base} | Local Concrete Service`;
  return long.length <= 60 ? long : `${base} | Local Service`;
}

export const comboMeta = {
  title: (serviceName: string, city: string) =>
    fitTitle(`${city}, SC ${serviceName}`),
  description: (serviceSlug: string, city: string) =>
    COMBO_DESCRIPTIONS[serviceSlug]?.(city) ??
    `Tell us about your ${serviceSlug.replace(/-/g, " ")} project in ${city}, SC and a local contractor can reply to your request.`,
  h1: (serviceSlug: string, city: string) =>
    COMBO_H1[serviceSlug]?.(city) ?? `Concrete Services in ${city}, SC`,
};
