import type { Metadata } from "next";
import Link from "next/link";
import {
  OverlayHeader,
  overlayBody,
  overlayEyebrow,
  overlayHeading,
  Section,
} from "@/components/marketing/sections";
import { publishedLocations } from "@/content/locations";
import { pageMetadata } from "@/lib/seo/metadata";

/**
 * Conditional route (spec 3.2): noindex and omitted from the sitemap until it
 * provides distinct value beyond one published city.
 */
export const metadata: Metadata = pageMetadata({
  title: "Service areas",
  description: "Published service areas for our concrete service provider referrals.",
  path: "/locations",
  noindex: true,
});

export default function LocationsPage() {
  return (
    <>
      <OverlayHeader
        imageSrc="/service-areas-hero.webp"
        imageAlt="Elevated view of a South Carolina residential neighbourhood with concrete driveways and sidewalks along a quiet street"
      >
        <p
          className="eyebrow before:hidden lg:before:block"
          style={{ color: overlayEyebrow }}
        >
          Service areas
        </p>
        <h1 className="h1 mx-auto mt-5 max-w-3xl lg:mx-0" style={{ color: overlayHeading }}>
          Where We Currently Publish
        </h1>
        <p className="lede mx-auto mt-5 max-w-2xl lg:mx-0" style={{ color: overlayBody }}>
          One published service area today. Additional South Carolina cities
          appear here only after coverage, content, and compliance gates pass.
        </p>
      </OverlayHeader>
      <Section title="Published service areas">
      <ul className="flex flex-wrap gap-3">
        {publishedLocations.map((location) => (
          <li key={location.slug}>
            <Link href={`/locations/${location.slug}`} className="btn btn-secondary">
              {location.city}, {location.region}
            </Link>
          </li>
        ))}
      </ul>
      </Section>
    </>
  );
}
