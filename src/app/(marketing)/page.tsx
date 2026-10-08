import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { QuoteForm } from "@/components/lead/QuoteForm";
import {
  AdjacentAreas,
  DecisionSupport,
  FaqSection,
  Hero,
  HowMatchingWorks,
  ProjectTypeChooser,
  RoutingControls,
  Section,
  SectionDivider,
} from "@/components/marketing/sections";
import {
  CtaBand,
} from "@/components/marketing/service-sections";
import { OUT_OF_AREA_POSTAL_CODE, publishedLocations, serviceAreaOptions } from "@/content/locations";
import { publishedServices, serviceCardImages } from "@/content/services";
import { site } from "@/lib/env";
import { REFERRAL_SERVICE_DISCLOSURE } from "@/lib/seo/disclosure";
import { pageMetadata } from "@/lib/seo/metadata";
import { buildGraph, faqNode, webPageNode } from "@/lib/schema/graph";

const TITLE = `Lancaster SC Concrete Referrals | ${site.brand}`;
const DESCRIPTION =
  "Connect with independent concrete service providers in Lancaster, SC for driveways, patios, slabs and repair. We are a referral service, not a contractor.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/",
});

const DECISION_ITEMS = [
  {
    question: "Repair the slab or replace it?",
    answer:
      "Isolated surface cracking on an otherwise sound slab is usually a repair conversation. Settlement across a whole panel, heaving, or a failing subbase usually is not. Only the independent provider who inspects the slab can tell you which one you have.",
  },
  {
    question: "What changes the price of a Lancaster pour?",
    answer:
      "Access for a mixer, demolition and haul away of the old slab, subbase preparation on clay soil, thickness, reinforcement, and finish. Square footage alone is a poor predictor, which is why we publish no price ranges.",
  },
  {
    question: "Do I need more than one quote?",
    answer:
      "Comparing quotes is sensible. We route your request to one participating provider at a time so you are not called by five companies, and you remain completely free to seek other quotes independently.",
  },
  {
    question: "What does this service cost me?",
    answer:
      "Nothing. We are paid by the service provider on completed and collected work. That arrangement does not change the price you negotiate, and it does not make us a party to your contract.",
  },
];



const FAQS = [
  {
    question: "Do you perform concrete work?",
    answer:
      "No. An independent provider performs the work. We route your request and nothing else.",
  },
  {
    question: "Who performs the work?",
    answer:
      "An independent provider serving your area. They hold the relationship, the contract, and the responsibility for the work.",
  },
  {
    question: "Which areas can you route right now?",
    answer:
      "Lancaster, South Carolina. Service availability depends on participating providers, so requests outside covered areas receive an honest no coverage answer instead of being forwarded to a provider who does not serve the area.",
  },
  {
    question: "Are the service providers licensed and insured?",
    answer:
      "Licensing and insurance are the responsibility of each independent provider, and we make no representation about any provider's credentials. Confirm license status, insurance, and credentials directly with the provider and through SC LLR before you hire.",
  },
  {
    question: "What happens to my details?",
    answer:
      "Your request is stored by us and shared with the independent provider covering your area so they can contact you. Marketing contact is a separate, optional consent. See the Privacy Policy for retention and your choices.",
  },
];

export default function HomePage() {
  const graph = buildGraph([
    webPageNode("/", TITLE, DESCRIPTION),
    faqNode("/", FAQS),
  ]);

  return (
    <>
      <JsonLd data={graph} />

      {/*
        Owner-supplied real photograph (source: real-photos/home-hero-source.webp,
        committed for provenance; shipped bytes are the converted WebP below).
        Hand-floating shot, so the alt names the act, the gear and the forms.
      */}
      <Hero
        locationCue="Lancaster County, South Carolina"
        h1="Connect With a Local Concrete Service Provider in Lancaster, SC"
        summary="Tell us what you need and where the property is. We will match your request with one eligible independent concrete service provider serving your area."
        imageSrc="/images/home/home-hero-float.webp"
        imageAlt="Worker in a high-visibility vest and cap hand-floating freshly poured concrete beside timber forms"
        overlay
      />

      <Section
        tone="surface"
        eyebrow="Project types"
        title="What we can route in Lancaster today"
        lead="Four residential concrete service categories, each with at least one participating provider holding written coverage for Lancaster areas. Foundation repair, structural engineering, and retaining walls sit outside this scope."
      >
        <ProjectTypeChooser images={serviceCardImages} />
        <p className="mt-8 text-sm">
          <Link
            href="/services"
            className="font-semibold underline underline-offset-4"
            style={{ color: "var(--color-accent)" }}
          >
            Compare all four services and their scope limits →
          </Link>
        </p>
      </Section>

        {/*
          Flat concrete texture under the three step cards. A flat even
          surface is deliberate here -- the cards sit on top, and a busier
          scene competed with the numerals. Interim bytes: the previous
          generated texture, kept in place until a real photographic
          texture replaces it. Any replacement must stay flat and even
          for the same reason.

          Written as an explicit section rather than <Section> because the
          owner specified the exact layer stack: texture at z-0 on bg-scroll,
          a 50% #0D1110 wash at z-10, a top-and-bottom #0D1110 gradient at
          z-20, and the step cards at z-30. Routing this through <Section>
          would have meant editing the shared component, which would have
          moved every other photo band on the site.

          cta-photo is kept on the section because it is the rule that flips
          the eyebrow, heading, lead and card text to their light-on-dark
          variants. Without it the type renders dark ink on a dark band.
        */}
        <section className="cta-photo relative w-full overflow-hidden py-16 md:py-24 bg-[#0D1110]">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-scroll"
            style={{
              backgroundImage: "url('/images/home/home-process.webp')",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 z-10 bg-[#0D1110]/50"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-[#0D1110] via-transparent to-[#0D1110]"
            aria-hidden="true"
          />
          <div className="container-page relative z-30">
            <div className="text-left">
              <p className="eyebrow">Process</p>
              <h2 className="h2 mt-3">Three steps, no obligation</h2>
              <p className="lede mt-4">
                You are never passed to a call center, and your details are
                never sold to a list of providers who bid against each other.
              </p>
            </div>
            <div className="mt-7">
              <HowMatchingWorks />
            </div>
          </div>
        </section>



      <Section
        tone="soft"
        eyebrow="How routing works"
        title="How your request reaches an independent provider"
        lead="These are routing controls, not credential verification. License, insurance, and workmanship remain matters to confirm directly with the independent provider who contacts you."
      >
        <RoutingControls />
      </Section>

      <Section
        eyebrow="Before you call"
        title="Four things worth deciding yourself"
        lead="None of these need a contractor to answer, and knowing them makes the first conversation shorter."
      >
        <DecisionSupport items={DECISION_ITEMS} />
      </Section>

      <Section
        backgroundImage={{
          src: "/images/home/home-service-area.webp",
          alt: "Single story brick ranch home behind a mature shade tree, with a curved concrete front walkway running out to the sidewalk",
        }}
        eyebrow="Service area"
        title="Areas we currently serve"
        lead="Every area we currently serve. Service availability depends on participating providers."
      >
        <AdjacentAreas locations={publishedLocations} />

        <p className="mt-7 text-center text-[14px] leading-relaxed text-[color:var(--color-muted)] lg:text-left">
          Additional South Carolina areas are added one at a time, and only once
          a participating provider has approved coverage there in writing.
        </p>
      </Section>

      <Section
        tone="surface"
        eyebrow="Request a referral"
        title="What we need from you"
        lead="Two short steps. A participating service provider may contact you, and if no provider covering your area can take it, we will say so plainly."
      >
        <p
          className="mb-8 rounded-[12px] border p-4 text-[13.5px] leading-relaxed"
          style={{
            borderColor: "var(--color-line)",
            color: "var(--color-muted)",
          }}
        >
          <strong className="font-semibold text-[color:var(--color-ink)]">
            Referral Service Disclosure:
          </strong>{" "}
          {REFERRAL_SERVICE_DISCLOSURE.replace(
            "Referral Service Disclosure: ",
            "",
          )}
        </p>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="w-full max-w-xl">
            <QuoteForm
              services={publishedServices.map((s) => ({
                slug: s.slug,
                name: s.name,
              }))}
              serviceAreas={serviceAreaOptions}
                outOfAreaValue={OUT_OF_AREA_POSTAL_CODE}
                consentVersion={site.consentVersion}
              fallbackDisplay={site.phoneDisplay}
              fallbackE164={site.phoneE164}
            />
          </div>
          <div className="lg:pt-4">
            <p className="eyebrow-plain">What happens after you submit</p>
            <p className="mt-4 text-[14.5px] leading-relaxed text-[color:var(--color-muted)]">
              Your location and project type are checked against participating
              providers with written coverage. One provider receives the
              request and may contact you. If they do not acknowledge in time
              it is reassigned once, and if nobody covers your area we tell you
              so rather than forwarding it anyway.
            </p>
            <div className="card mt-8 p-5">
              <p className="text-sm font-semibold">Rather just talk?</p>
              <p className="mt-1.5 text-[14px] text-[color:var(--color-muted)]">
                Call the referral team and we will tell you in one minute
                whether a participating provider covers your area.
              </p>
              <a
                href={`tel:${site.phoneE164}`}
                className="btn btn-secondary mt-4 w-full"
              >
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </Section>


      <SectionDivider />

      <Section compact eyebrow="FAQ" title="How this service works">
        <FaqSection faqs={FAQS} name="home-faq" />
        <p className="mt-6 text-sm text-[color:var(--color-muted)]">
          Full detail on how we are paid and what we do not do is on the{" "}
          <Link href="/referral-disclosure" className="underline underline-offset-4">
            referral disclosure page
          </Link>
          .
        </p>
      </Section>

      <CtaBand
        title="Ready to connect with an independent concrete service provider?"
        body="One request, one independent third party service provider, no charge to you and no obligation to proceed."
      />




    </>
  );
}
