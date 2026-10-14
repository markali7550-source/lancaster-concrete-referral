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
import { CtaBand } from "@/components/marketing/cta-band";
import { publishedLocations } from "@/content/locations";
import { fitTitle, pageMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/marketing/service-sections";
import { breadcrumbNode, buildGraph, webPageNode } from "@/lib/schema/graph";

/**
 * Conditional route (spec 3.2): indexable once it carries distinct value beyond
 * a bare city list. It is a primary navigation destination, so it explains how
 * coverage is granted and links through to each published local page.
 */
const TITLE = fitTitle("Concrete Service Areas in South Carolina");
const DESCRIPTION =
  "The South Carolina areas we currently serve. Coverage is added only once a local team confirms it can take work there. Check whether we serve your city today.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/locations",
});

const graph = buildGraph([
  webPageNode("/locations", TITLE, DESCRIPTION),
  breadcrumbNode("/locations", [
    { name: "Home", path: "/" },
    { name: "Service areas", path: "/locations" },
  ]),
]);

export default function LocationsPage() {
  return (
    <>
      <JsonLd data={graph} />
      <OverlayHeader
        imageSrc="/images/locations/locations-index-hero.webp"
        imageAlt="Elevated view of a suburban residential neighborhood of brick homes with concrete driveways along a curving street"
        breadcrumbs={
          <Breadcrumbs
            overlay
            items={[{ name: "Home", path: "/" }, { name: "Service areas" }]}
          />
        }
      >
        <p
          className="eyebrow"
          style={{ color: overlayEyebrow }}
        >
          Service areas
        </p>
        <h1 className="h1 mt-5 max-w-3xl" style={{ color: overlayHeading }}>
          Concrete Service Areas in South Carolina
        </h1>
        <p className="lede mt-5 max-w-2xl" style={{ color: overlayBody }}>
          One service area today. Additional South Carolina cities appear
          here only after coverage, content, and compliance gates pass.
        </p>
      </OverlayHeader>
      <Section
        eyebrow="Coverage"
        title="Where we currently take quote requests"
        lead="Every area below has a participating provider who has confirmed in writing that they accept work there."
      >
        <div className="grid gap-x-12 gap-y-6 md:grid-cols-2">
          <div>
            <h3 className="text-[22px] font-semibold leading-snug">
              How an area gets added
            </h3>
            <p className="mt-1.5 max-w-[48ch] text-[16px] leading-relaxed text-[color:var(--color-muted)]">
              A city appears here only once a provider has approved it in
              writing and the page has its own local content. We do not draw a
              radius on a map and call it coverage.
            </p>
          </div>
          <div>
            <h3 className="text-[22px] font-semibold leading-snug">
              If your area is not listed
            </h3>
            <p className="mt-1.5 max-w-[48ch] text-[16px] leading-relaxed text-[color:var(--color-muted)]">
              Submit a request anyway. If nobody covers your address we tell you
              plainly rather than passing your details to a provider who cannot
              help.
            </p>
          </div>
        </div>

        {/*
          A full-width row per area, not a two-up grid. One approved city in a
          two-column grid leaves half the row empty, which reads as a directory
          waiting for data rather than an honest statement that coverage is one
          city. Rows fill the width at any count and stay correct as the list
          grows.
        */}
        <ul className="mt-9 space-y-5">
          {publishedLocations.map((location) => (
            <li key={location.slug}>
              <Link
                href={`/locations/${location.slug}`}
                className="group card card-interactive grid overflow-hidden transition-colors duration-300 hover:border-[var(--color-accent)] sm:grid-cols-[minmax(0,300px)_1fr]"
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
                  sizes="(min-width: 640px) 300px, 100vw"
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-full"
                />
                <div className="flex flex-1 flex-col justify-center p-6 sm:p-7">
                  <h3 className="text-[17px] font-semibold">
                    Concrete quotes in {location.city}, {location.region}
                  </h3>
                  <p className="mt-2 flex-1 text-[14px] leading-relaxed text-[color:var(--color-muted)]">
                    Driveways, patios, slabs and repair served by independent
                    providers covering {location.city}.
                  </p>
                  <span
                    className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold"
                    style={{ color: "var(--color-accent)" }}
                  >
                    View {location.city} services
                    <Icon name="arrow" className="card-go h-4 w-4" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

      </Section>
      <CtaBand
        title="Ready to request concrete service?"
        body="Choose your city above, or send your project details and we will check whether a local independent provider covers your area."
        formHref="/contact#quote-form"
      />
    </>
  );
}
