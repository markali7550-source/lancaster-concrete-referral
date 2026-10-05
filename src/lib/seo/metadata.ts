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

export const comboMeta = {
  title: (serviceName: string, city: string) =>
    `${serviceName} Referrals in ${city}, SC | Lancaster Concrete Referral`,
  description: (serviceNameLower: string, city: string) =>
    `Explore ${serviceNameLower} referral options in ${city}, SC. Tell us about your project and we can connect you with one participating independent provider serving the area.`,
  h1: (serviceName: string, city: string) =>
    `${serviceName} Referrals in ${city}, SC`,
};
