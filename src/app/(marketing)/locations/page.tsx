import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  OverlayHeader,
  overlayBody,
  overlayEyebrow,
  overlayHeading,
  Section,
} from "@/components/marketing/sections";
import { Icon } from "@/components/ui/Icon";
import { publishedLocations } from "@/content/locations";
import { pageMetadata } from "@/lib/seo/metadata";

/**
 * Conditional route (spec 3.2): indexable once it carries distinct value beyond
 * a bare city list. It is a primary navigation destination, so it explains how
 * coverage is granted and links through to each published local page.
 */
export const metadata: Metadata = pageMetadata({
  title: "Concrete Referral Service Areas in South Carolina",
  description:
    "The South Carolina areas where we currently route concrete referrals. Coverage is added only once a participating provider approves it in writing.",
  path: "/locations",
});

export default function LocationsPage() {
  return (
    <>
      <OverlayHeader
        imageSrc="/service-areas-hero.webp"
        imageAlt="Elevated view of a South Carolina residential neighborhood with concrete driveways and sidewalks along a quiet street"
      >
        <p
          className="eyebrow before:hidden lg:before:block"
          style={{ color: overlayEyebrow }}
        >
          Service areas
        </p>
        <h1 className="h1 mx-auto mt-5 max-w-3xl lg:mx-0" style={{ color: overlayHeading }}>
          Concrete Referral Service Areas in South Carolina
        </h1>
        <p className="lede mx-auto mt-5 max-w-2xl lg:mx-0" style={{ color: overlayBody }}>
          One service area today. Additional South Carolina cities appear
          here only after coverage, content, and compliance gates pass.
        </p>
      </OverlayHeader>
      <Section
        eyebrow="Coverage"
        title="Where we route concrete referrals today"
        lead="Every area below has a participating provider who has confirmed in writing that they accept work there."
      >
        <div className="max-w-prose space-y-6">
          <div>
            <h3 className="text-[22px] font-semibold leading-snug">
              How an area gets added
            </h3>
            <p className="mt-1.5 text-[16px] leading-relaxed text-[color:var(--color-muted)]">
              A city appears here only once a provider has approved it in
              writing and the page has its own local content. We do not draw a
              radius on a map and call it coverage.
            </p>
          </div>
          <div>
            <h3 className="text-[22px] font-semibold leading-snug">
              If your area is not listed
            </h3>
            <p className="mt-1.5 text-[16px] leading-relaxed text-[color:var(--color-muted)]">
              Submit a request anyway. If nobody covers your address we tell you
              plainly rather than passing your details to a provider who cannot
              help.
            </p>
          </div>
        </div>

        <ul className="mt-9 grid gap-5 sm:grid-cols-2">
          {publishedLocations.map((location) => (
            <li key={location.slug}>
              <Link
                href={`/locations/${location.slug}`}
                className="group card card-interactive flex h-full flex-col overflow-hidden text-center transition-colors duration-300 hover:border-[var(--color-accent)] lg:text-left"
              >
                {/*
                  Same file as the hero on /locations/[city] (location.heroImage),
                  so the card and the detail page can never show different photos.
                  Rendered unscrimmed in its natural daylight color.
                */}
                <Image
                  src={location.heroImage}
                  alt={location.heroImageAlt}
                  width={800}
                  height={500}
                  sizes="(min-width: 640px) 45vw, 100vw"
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-[17px] font-semibold">
                    Concrete referrals in {location.city}, {location.region}
                  </h3>
                  <p className="mt-2 flex-1 text-[14px] leading-relaxed text-[color:var(--color-muted)]">
                    Driveways, patios, slabs and repair routed to independent
                    providers covering {location.city}.
                  </p>
                  <span
                    className="mt-5 inline-flex items-center justify-center gap-1.5 text-[14px] font-semibold lg:justify-start"
                    style={{ color: "var(--color-accent)" }}
                  >
                    View {location.city} referrals
                    <Icon name="arrow" className="card-go h-4 w-4" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

      </Section>
    </>
  );
}
