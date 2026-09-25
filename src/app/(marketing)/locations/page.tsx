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
    <Section
      eyebrow="Service areas"
      title="Where we currently publish"
      lead="One published area today. Additional cities appear only after coverage, content, and compliance gates pass."
    >
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
  );
}
