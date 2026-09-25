import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/marketing/sections";
import { publishedLocations } from "@/content/locations";
import { pageMetadata } from "@/lib/seo/metadata";

/**
 * Conditional route (spec 3.2): noindex and omitted from the sitemap until it
 * provides distinct value beyond one published city.
 */
export const metadata: Metadata = pageMetadata({
  title: "Service areas",
  description: "Published service areas for our concrete contractor referrals.",
  path: "/locations",
  noindex: true,
});

export default function LocationsPage() {
  return (
    <>
      <div
        className="border-b"
        style={{
          borderColor: "var(--color-line-soft)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <div className="container-page py-12 md:py-16">
          <p className="eyebrow">Service areas</p>
          <h1 className="h1 mt-5 max-w-3xl">Where We Currently Publish</h1>
          <p className="lede mt-5 max-w-2xl">
            One published service area today. Additional South Carolina cities
            appear here only after coverage, content, and compliance gates pass.
          </p>
        </div>
      </div>
      <Section>
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
