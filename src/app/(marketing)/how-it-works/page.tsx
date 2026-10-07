import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  HowMatchingWorks,
  OverlayHeader,
  overlayBody,
  overlayEyebrow,
  overlayHeading,
  ReferralDisclosureStrip,
  Section,
  RoutingControls,
} from "@/components/marketing/sections";
import { Breadcrumbs, CtaBand } from "@/components/marketing/service-sections";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbNode, buildGraph, webPageNode } from "@/lib/schema/graph";
import { site } from "@/lib/env";
import { FULL_DISCLOSURE_PARAGRAPHS } from "@/lib/seo/disclosure";

const TITLE = `How Our Concrete Referrals Work | ${site.brand}`;
const DESCRIPTION =
  "How a request is validated, checked against participating provider eligibility, routed to one independent contractor, and what our role is and is not.";

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
        imageSrc="/how-it-works-hero.webp"
        imageAlt="Freshly placed residential concrete slab floated smooth and still inside its timber forms, with a brick home beyond the lawn"
      >
        <p
          className="eyebrow"
          style={{ color: overlayEyebrow }}
        >
          Our process
        </p>
        <h1 className="h1 mt-5 max-w-3xl" style={{ color: overlayHeading }}>
          How Our Concrete Service Provider Referrals Work
        </h1>
        <p
          className="lede mt-5 max-w-2xl"
          style={{ color: overlayBody }}
        >
          What happens between the moment you submit a request and the
          moment an independent contractor calls you, including the checks
          that stop a request from being routed at all.
        </p>
      </OverlayHeader>
      <ReferralDisclosureStrip />
      <Section tone="soft" eyebrow="Eligibility" title="What blocks a provider from receiving your request">
        <RoutingControls />
      </Section>

        {/*
          No photograph. The process shot that was here showed a man crouching
          at a slab edge with his fingers fused into the concrete — generated,
          not photographed. Nothing real was available to replace it.
        */}
        <Section
          eyebrow="Process"
          title="Three steps, no obligation"
        >
        <HowMatchingWorks />
      </Section>
      <Section eyebrow="Our role" title="What we are, and what we are not">
        <div className="card p-7">
          <p className="eyebrow-plain">Required disclosure</p>
          {FULL_DISCLOSURE_PARAGRAPHS.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-4 text-[15px] leading-relaxed text-[color:var(--color-muted)]"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="card p-6">
            <p className="font-semibold">We do</p>
            <ul className="mt-2 inline-block list-disc space-y-1.5 pl-5 text-left text-sm text-[color:var(--color-muted)] lg:block">
              <li>Collect and validate your request</li>
              <li>Match your request to a participating provider with written coverage</li>
              <li>Route the request to one eligible contractor</li>
              <li>Reassign once if the first contractor does not acknowledge</li>
            </ul>
          </div>
          <div className="card p-6">
            <p className="font-semibold">We do not</p>
            <ul className="mt-2 inline-block list-disc space-y-1.5 pl-5 text-left text-sm text-[color:var(--color-muted)] lg:block">
              <li>Pour, supervise, inspect, or warrant any concrete work</li>
              <li>Set prices, schedules, or scope</li>
              <li>Become a party to your contract</li>
              <li>Guarantee a contractor is available in your area</li>
            </ul>
          </div>
        </div>
      </Section>

      <CtaBand
        imageSrc="/images/cta-how-it-works.webp"
        imageAlt="Two story home with a broad concrete driveway and front path"
        title="Ready to start?"
        body="Submit a request and we will route it to one eligible independent contractor, or call the referral team first to check coverage."
        showFormLink={false}
      />

    </>
  );
}
