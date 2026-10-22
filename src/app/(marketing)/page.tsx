import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { QuoteForm } from "@/components/lead/QuoteForm";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
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
  "Local concrete service in Lancaster, SC for driveways, patios, slabs and repair. Work is done by licensed local concrete contractors, not by this website.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/",
  image: {
    url: "/images/hero-concrete-lancaster.webp",
    width: 1200,
    height: 675,
    alt: "Professional concrete driveway and stamped patio installation in Lancaster, SC",
  },
});

const DECISION_ITEMS = [
  {
    question: "Repair the slab or replace it?",
    answer:
      "Isolated surface cracking on an otherwise sound slab is usually a repair conversation. Settlement across a whole panel, heaving, or a failing subbase usually is not. The contractor who inspects the slab on site can tell you which one you have.",
  },
  {
    question: "What changes the price of a Lancaster pour?",
    answer:
      "Access for a mixer, demolition and haul away of the old slab, subbase preparation on clay soil, thickness, reinforcement, and finish. Square footage alone is a poor predictor, which is why every price comes from an on site estimate rather than a guess.",
  },
  {
    question: "Do I need more than one quote?",
    answer:
      "Comparing quotes is sensible. Our service is free, and we help you compare the estimates you receive so you can choose with confidence.",
  },
  {
    question: "What does this service cost me?",
    answer:
      "Our service is completely free for homeowners. You pay only for the work you agree to with your contractor, and there is no obligation to proceed.",
  },
];



/* Concrete-focused questions for the bottom-of-page accordion. Shown on the
   page and emitted in the same FAQPage schema as FAQS. */
const CONCRETE_FAQS = [
  {
    question: "Do you offer concrete driveway installation in Lancaster, SC?",
    answer:
      "Yes. We help customers explore concrete driveway installation and replacement options throughout Lancaster, SC, and surrounding communities. Contact us today with your project details for a free estimate.",
  },
  {
    question: "Do you offer stamped concrete patios?",
    answer:
      "Yes. Stamped and decorative concrete patio options are available with various patterns, textures, and custom colors to upgrade your outdoor living space.",
  },
  {
    question: "How much does a new concrete driveway cost in Lancaster, SC?",
    answer:
      "Concrete driveway costs depend on dimensions, site preparation, demolition of old concrete, slab thickness, and custom finishes. Request a free on-site quote for exact project pricing.",
  },
  {
    question: "Do you provide concrete slab and foundation services?",
    answer:
      "Yes. We provide durable concrete slab and foundation services for garages, workshops, sheds, room additions, and residential builds.",
  },
  {
    question: "Which areas around Lancaster, SC do you serve?",
    answer:
      "Our service area includes Lancaster, Indian Land, Heath Springs, and Kershaw, South Carolina, along with surrounding Lancaster County communities.",
  },
];

const FAQS = [
  {
    question: "Does this service cost me anything?",
    answer:
      "Our service is completely free for homeowners. We take your project details and connect you with an experienced local concrete contractor who specializes in your exact project type.",
  },
  {
    question: "Do you perform concrete work?",
    answer:
      "We do not pour concrete ourselves. We coordinate your project with a licensed local concrete contractor who specializes in your exact project type, and our team stays involved through the estimate and follow up.",
  },
  {
    question: "Who performs the work?",
    answer:
      "A licensed local contractor matched to your project. They hold the relationship and the contract with you for the work, and our team coordinates the estimate and the schedule.",
  },
  {
    question: "Which areas can you take work in right now?",
    answer:
      "Lancaster, South Carolina. If your address is outside our service area, we will tell you plainly and right away.",
  },
  {
    question: "Are the contractors licensed and insured?",
    answer:
      "Yes. Our team connects you directly with established, licensed local concrete specialists who carry their own trade licensing and insurance. You can also confirm any license through SC LLR.",
  },
  {
    question: "What happens to my details?",
    answer:
      "Your request is shared with the licensed local contractor covering your area so they can contact you about your project. Marketing contact is a separate, optional consent. See the Privacy Policy for retention and your choices.",
  },
];

export default function HomePage() {
  const graph = buildGraph([
    webPageNode("/", TITLE, DESCRIPTION),
    faqNode("/", [...FAQS, ...CONCRETE_FAQS]),
  ]);

  return (
    <>
      <JsonLd data={graph} />

      {/*
        Homepage hero image: a generated concrete driveway and stamped patio
        (public/images/hero-concrete-lancaster.webp). The earlier owner-supplied
        photo is kept in the repo at public/images/home/home-hero-float.webp and
        real-photos/home-hero-source.webp; it is no longer rendered here.
      */}
      <Hero
        locationCue="Lancaster County, South Carolina"
        h1="Lancaster's Trusted Concrete Connection"
        summary="Taking the hassle out of finding reliable concrete pros. We connect you directly with top rated, licensed local contractors for driveways, patios, walkways, and foundations."
        imageSrc="/images/hero-concrete-lancaster.webp"
        imageAlt="Professional concrete driveway and stamped patio installation in Lancaster, SC"
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
        lead={`${publishedServices.length} residential concrete services, each on its own page. Each request goes to a local contractor who confirms the scope, and foundation repair and structural engineering sit outside these services.`}
      >
        <ProjectTypeChooser images={serviceCardImageMap} />
        <p className="mt-8 text-sm">
          <Link
            href="/services"
            className="font-semibold underline underline-offset-4"
            style={{ color: "var(--color-accent)" }}
          >
            Compare all {publishedServices.length} services and their scope limits →
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
                You are never passed to a call center, and your details are
                never sold to a list of contractors who bid against each other.
              </p>
            </div>
            <div className="mt-7">
              <HowMatchingWorks />
            </div>
          </div>
        </section>



      <Section
        tone="soft"
        eyebrow="How requests are checked"
        title="How your request reaches a licensed local contractor"
        lead="Our team confirms availability and coordinates directly with trusted, licensed local contractors to ensure your project gets handled by the right specialist for your exact needs. License, insurance, and workmanship remain matters to confirm directly with the licensed local contractor who contacts you."
      >
        <ServiceAreaControls />
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
          src: "/images/locations/locations-index-hero.webp",
          alt: "Elevated view of a suburban residential neighborhood of brick homes with concrete driveways along a curving street",
        }}
        eyebrow="Service area"
        title="Areas we currently serve"
        lead="Every area we currently serve. Service availability depends on our trusted contractor network."
      >
        <AdjacentAreas locations={publishedLocations} />

        <p className="mt-7 text-center text-[14px] leading-relaxed text-[color:var(--color-muted)] lg:text-left">
          Additional South Carolina areas are added one at a time, and only once
          one of our trusted contractors has approved coverage there in writing.
        </p>
      </Section>

      <Section
        tone="soft"
        eyebrow="On the job"
        title="Our Team in Action | Quality Concrete Work in Lancaster, SC"
        lead="Our dedicated local crew on site, delivering dependable concrete pouring, finishing, and repair services."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {[
            {
              src: "/images/home/crew-trowel-finish.webp",
              alt: "Worker in a high-visibility vest and white hard hat finishing fresh concrete with a steel trowel",
              caption: "Hand finishing on a fresh concrete surface",
            },
            {
              src: "/images/home/crew-concrete-placement.webp",
              alt: "Crew workers spreading and screeding fresh concrete on a sidewalk slab from a hose, beside a formed edge",
              caption: "Placing and screeding a sidewalk slab",
            },
          ].map((photo) => (
            <figure
              key={photo.src}
              className="overflow-hidden rounded-[12px] border"
              style={{
                borderColor: "var(--color-line-soft)",
                background: "var(--color-surface)",
              }}
            >
              <div className="relative aspect-[3/2]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="p-4 text-sm text-[color:var(--color-muted)]">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section
        tone="surface"
        eyebrow="Request Concrete Service"
        title="What we need from you"
        lead="Two short steps. One of our trusted local contractors may contact you, and if no contractor covering your area can take it, we will say so plainly."
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
              Your location and project type are checked against the teams that work in your area. One local team receives the request and may contact you. If they do not respond in time, it goes to the next team once, and if nobody covers your area we tell you so.
            </p>
            <div className="card mt-8 p-5">
              <p className="text-sm font-semibold">Prefer to talk?</p>
              <p className="mt-1.5 text-[14px] text-[color:var(--color-muted)]">
                Call our team and we will quickly tell you whether a local team covers your area.
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
          <Link
            href="/service-disclosure"
            className="font-medium text-[color:var(--color-accent)] underline underline-offset-4 decoration-[color:var(--color-accent)]/40 transition-colors duration-150 hover:decoration-[color:var(--color-accent)]"
          >
            service disclosure page
          </Link>
          .
        </p>
      </Section>

      <Section
        compact
        eyebrow="Concrete FAQ"
        title="Frequently Asked Questions About Concrete in Lancaster, SC"
        lead="Find clear answers to common questions about concrete installation, driveways, patios, and foundations."
      >
        <FaqAccordion faqs={CONCRETE_FAQS} />
      </Section>

      <CtaBand
        title="Ready to request concrete service?"
        body="Send your project details and a local service contractor will reply. No charge to you and no obligation to proceed."
      />




    </>
  );
}
