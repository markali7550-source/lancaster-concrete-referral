import type { Metadata } from "next";
import { absoluteUrl, site } from "@/lib/env";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}

export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
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
