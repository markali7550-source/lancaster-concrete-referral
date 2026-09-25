import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/env";
import { publishedServices } from "@/content/services";
import { publishedLocations } from "@/content/locations";
import { publishedLocationServices } from "@/content/location-services";

/** Published, indexable, 200, self-canonical URLs only. /thank-you is excluded. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    "/",
    "/services",
    ...publishedServices.map((s) => `/services/${s.slug}`),
    ...publishedLocations.map((l) => `/locations/${l.slug}`),
    ...publishedLocationServices.map(
      (r) => `/locations/${r.locationSlug}/${r.serviceSlug}`,
    ),
    "/how-it-works",
    "/contact",
    "/privacy",
    "/terms",
    "/referral-disclosure",
  ];

  return paths.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
