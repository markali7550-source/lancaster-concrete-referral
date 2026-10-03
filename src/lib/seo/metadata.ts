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

/**
 * Demo deployment: every route ships noindex, nofollow so the placeholder
 * content cannot be indexed. Flip to false at launch.
 */
export const DEMO_NOINDEX = true;

export function pageMetadata({
  title,
  description,
  path,
  noindex = DEMO_NOINDEX,
}: PageMetaInput): Metadata {
  // TODO(launch): point NEXT_PUBLIC_SITE_URL at the real domain so the
  // canonical and OpenGraph URLs below resolve to production, then set
  // DEMO_NOINDEX to false so the site becomes indexable.
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

export const comboMeta = {
  title: (serviceName: string, city: string) =>
    `${serviceName} in ${city}, SC | Call for a Quote`,
  description: (serviceNameLower: string, city: string) =>
    `Need ${serviceNameLower} in ${city}, SC? Call now or request a quote. We connect you with an independent local concrete contractor. Availability varies.`,
  h1: (serviceName: string, city: string) =>
    `Get Matched With ${serviceName} Contractors in ${city}, SC`,
};
