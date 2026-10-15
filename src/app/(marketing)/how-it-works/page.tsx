import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  HowMatchingWorks,
  OverlayHeader,
  overlayBody,
  overlayEyebrow,
  overlayHeading,
  Section,
  ServiceAreaControls,
} from "@/components/marketing/sections";
import { Breadcrumbs, CtaBand } from "@/components/marketing/service-sections";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbNode, buildGraph, webPageNode } from "@/lib/schema/graph";
import { site } from "@/lib/env";
import { PUBLIC_DISCLOSURE_PARAGRAPHS } from "@/lib/seo/disclosure";

const TITLE = `How Our Concrete Service Works | ${site.brand}`;
const DESCRIPTION =
  "How our concrete service works, from your free on-site consultation and transparent estimate through the final quality inspection.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  const graph = buildGraph([
    webPageNode("/how-it-works", TITLE, DESCRIPTION),
    breadcrumbNode("/how-it-works", [
      { name: "Home", path: "/" },
      { name: "How it works", path: "/how-it-works" },
    ]),
  ]);

  return (
    <>
      <JsonLd data={graph} />
      <OverlayHeader
        breadcrumbs={
          <Breadcrumbs
            overlay
            items={[{ name: "Home", path: "/" }, { name: "How it works" }]}
          />
        }
        imageSrc="/images/how-it-works/how-it-works-hero.webp"
        imageAlt="Crew pouring and leveling fresh concrete for a residential driveway from a mixer truck, with brick homes along the street"
      >
        <p
          className="eyebrow"
          style={{ color: overlayEyebrow }}
        >
          Our process
        </p>
        <h1 className="h1 mt-5 max-w-3xl" style={{ color: overlayHeading }}>
          How Our Concrete Service Works
        </h1>
        <p
          className="lede mt-5 max-w-2xl"
          style={{ color: overlayBody }}
        >
          What happens from your first request to the final quality inspection, and how you work directly with our dedicated concrete team at every step.
        </p>
      </OverlayHeader>
      <Section tone="soft" eyebrow="Scheduling" title="How we confirm we can serve your project">
        <ServiceAreaControls />
      </Section>

      {/*
        Restores the photograph removed from this band. The previous one was
        generated — the man's fingers merged into the slab edge. This is a
        real photograph: the glove has five separately articulated fingers
        with worn seams, the concrete splatter dried on the boot is
        irregular, and the sun direction is consistent across the frame.

        It stays on this page only. The identical "Three steps" band also
        renders on all four city-service pages, so wiring the image into the
        shared section would put one supporting photograph in five places.

        Deliberately service-neutral: this page covers driveways, patios,
        slabs and repair, so the picture shows concrete being placed and
        worked rather than any one finished product. The alt describes the
        formed edge that is actually in frame and claims no location.
      */}
      <Section
        backgroundImage={{
          src: "/images/how-it-works/how-it-works-process.webp",
            alt: "Wet concrete pouring from a chute onto a fresh slab, with a worker's boots visible in the background",
        }}
        eyebrow="Process"
        title="Four steps, no obligation"
      >
        <HowMatchingWorks />
      </Section>
      <Section eyebrow="Our role" title="How we work">
        <div className="card p-7">
          <p className="eyebrow-plain text-[color:var(--color-ink)]">Required disclosure</p>
          {PUBLIC_DISCLOSURE_PARAGRAPHS.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-4 text-[15px] leading-relaxed text-[color:var(--color-muted)]"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="card p-6">
            <p className="font-semibold">We do</p>
            <ul className="mt-2 inline-block list-disc space-y-1.5 pl-5 text-left text-sm text-[color:var(--color-muted)] lg:block">
              <li>Finish, inspect, and clean up the site after every project</li>
              <li>Meet you for a free on-site consultation</li>
              <li>Prepare a transparent, written estimate with no hidden fees</li>
              <li>Excavate, form, and pour with our own crew</li>
            </ul>
          </div>
          <div className="card p-6">
            <p className="font-semibold">What you decide with us</p>
            <ul className="mt-2 inline-block list-disc space-y-1.5 pl-5 text-left text-sm text-[color:var(--color-muted)] lg:block">
              <li>Scope, mix, finish, and layout choices</li>
              <li>Pour date and schedule</li>
              <li>Payment terms as stated in your written estimate</li>
              <li>Final walkthrough and sign-off</li>
            </ul>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Ready to start?"
        body="Request your free on-site consultation, or call our team to talk through your project today."
        showFormLink={false}
      />

    </>
  );
}
