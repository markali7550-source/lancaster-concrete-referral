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
  ServiceAreaControls,
  Section,
  SectionDivider,
} from "@/components/marketing/sections";
import {
  CtaBand,
} from "@/components/marketing/service-sections";
import { OUT_OF_AREA_POSTAL_CODE, publishedLocations, serviceAreaOptions } from "@/content/locations";
import { publishedServices, serviceCardImageMap } from "@/content/services";
import { site } from "@/lib/env";
import { SERVICE_DISCLOSURE } from "@/lib/seo/disclosure";
import { pageMetadata } from "@/lib/seo/metadata";
import { buildGraph, faqNode, webPageNode } from "@/lib/schema/graph";

const TITLE = `Lancaster, SC Concrete Quotes | ${site.brand}`;
const DESCRIPTION =
  "Concrete driveways, patios, slabs and repair from our dedicated local team in Lancaster, SC. Free on-site consultations and transparent estimates.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/",
});

const DECISION_ITEMS = [
  {
    question: "Repair the slab or replace it?",
    answer:
      "Isolated surface cracking on an otherwise sound slab is usually a repair conversation. Settlement across a whole panel, heaving, or a failing subbase usually is not. Our project manager inspects the slab on site and tells you which one you have.",
  },
  {
    question: "What changes the price of a Lancaster pour?",
    answer:
      "Access for a mixer, demolition and haul away of the old slab, subbase preparation on clay soil, thickness, reinforcement, and finish. Square footage alone is a poor predictor, which is why we write a transparent estimate for your exact project.",
  },
  {
    question: "Do I need more than one quote?",
    answer:
      "Comparing quotes is sensible. Our on site consultation and written estimate are free, so you can compare them with any other quote and ask us to walk through every line.",
  },
  {
    question: "What does this service cost me?",
    answer:
      "Our consultation and estimate are free. You pay only for the work described in your written estimate, with no hidden fees.",
  },
];



const FAQS = [
  {
    question: "Do you perform concrete work?",
    answer:
      "Yes. Our own concrete crew performs every project we sell, from excavation and forming through the pour, finish, and cleanup.",
  },
  {
    question: "Who performs the work?",
    answer:
      "Our dedicated concrete team. You work directly with our project managers from your first call to the final inspection.",
  },
  {
    question: "Which areas can you take work in right now?",
    answer:
      "Lancaster, South Carolina. If your address is outside our service area, we will tell you plainly and right away.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "We will provide our license and insurance details before you sign. You can also verify them directly through SC LLR at any time.",
  },
  {
    question: "What happens to my details?",
    answer:
      "Your request goes to our local project managers, who use it to contact you about your project. Marketing contact is a separate, optional consent. See the Privacy Policy for retention and your choices.",
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
        h1="Lancaster's Dedicated Concrete Professionals, Built to Last"
        summary="Serving Lancaster homeowners and businesses with pride, precision, and lasting quality. From your free on-site estimate to the final pour and cleanup, you work directly with our dedicated concrete team."
        imageSrc="/images/home/home-hero-float.webp"
        imageAlt="Worker in a high-visibility vest and cap hand-floating freshly poured concrete beside timber forms"
        overlay
        aside={
          <QuoteForm
            headingLevel="h2"
            formId="hero-quote-form"
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
        }
      />

      <Section
        tone="surface"
        eyebrow="Project types"
        title="Where we can take work in Lancaster today"
        lead="Fourteen residential concrete services, each on its own page. Every project starts with a free on-site consultation from our team. Foundation repair, structural engineering, and retaining walls sit outside these services."
      >
        <ProjectTypeChooser images={serviceCardImageMap} />
        <p className="mt-8 text-sm">
          <Link
            href="/services"
            className="font-semibold underline underline-offset-4"
            style={{ color: "var(--color-accent)" }}
          >
            Compare all fourteen services and their scope limits →
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
              <h2 className="h2 mt-3">Four steps, no obligation</h2>
              <p className="lede mt-4">
                You work directly with our crew from the first consultation to the final inspection. No call centers and no bidding wars.
              </p>
            </div>
            <div className="mt-7">
              <HowMatchingWorks />
            </div>
          </div>
        </section>



      <Section
        tone="soft"
        eyebrow="How we schedule your project"
        title="How we confirm your project"
        lead="These checks confirm we can take your project on schedule. We are glad to share our license and insurance details before you sign."
      >
        <ServiceAreaControls />
      </Section>

      <Section
        eyebrow="Before you call"
        title="Four things to think through before your consultation"
        lead="None of these need a long answer from us, and knowing them makes your free consultation shorter."
      >
        <DecisionSupport items={DECISION_ITEMS} />
      </Section>

      <Section
        backgroundImage={{
          src: "/images/locations/locations-index-hero.webp",
          alt: "Elevated view of a suburban residential neighborhood of brick homes with concrete driveways along a curving street",
        }}
        eyebrow="Service area"
        title="Areas we currently serve"
        lead="Every area we currently serve, each with a dedicated local crew."
      >
        <AdjacentAreas locations={publishedLocations} />

        <p className="mt-7 text-center text-[14px] leading-relaxed text-[color:var(--color-muted)] lg:text-left">
          We add new South Carolina areas one at a time, once our crew is ready to serve them well.
        </p>
      </Section>

      <Section
        tone="surface"
        eyebrow="Request Concrete Service"
        title="What we need from you"
        lead="Two short steps. A project manager from our team will contact you, and if we cannot serve your area, we will say so plainly."
      >
        <p
          className="mb-8 rounded-[12px] border p-4 text-[13.5px] leading-relaxed"
          style={{
            borderColor: "var(--color-line)",
            color: "var(--color-muted)",
          }}
        >
          <strong className="font-semibold text-[color:var(--color-ink)]">
            About the work:
          </strong>{" "}
          {SERVICE_DISCLOSURE}
        </p>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="w-full max-w-xl">
            <QuoteForm
              headingLevel="h2"
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
              We check your location and project type so we can plan your visit. A project manager from our local team contacts you to schedule your free on-site consultation. If your area is outside our service area, we tell you so right away.
            </p>
            <div className="card mt-8 p-5">
              <p className="text-sm font-semibold">Prefer to talk?</p>
              <p className="mt-1.5 text-[14px] text-[color:var(--color-muted)]">
                Call our team and we will answer your questions and book your free on-site consultation.
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

      <Section compact eyebrow="FAQ" title="How we work with you">
        <FaqSection faqs={FAQS} name="home-faq" />
        <p className="mt-6 text-sm text-[color:var(--color-muted)]">
          Full detail on how we are paid and what we do not do is on the{" "}
          <Link
            href="/service-disclosure"
            className="font-medium text-[color:var(--color-accent)] underline underline-offset-4 decoration-[color:var(--color-accent)]/40 transition-colors duration-150 hover:decoration-[color:var(--color-accent)]"
          >
            service disclosure page
          </Link>
          .
        </p>
      </Section>

      <CtaBand
        title="Ready to request concrete service?"
        body="Send your project details and a project manager from our local team will reply. Your consultation is free, with no obligation to proceed."
      />




    </>
  );
}
