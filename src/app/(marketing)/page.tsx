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
  ProjectExamples,
  ProjectTypeChooser,
  ReferralDisclosureStrip,
  Section,
  StatStrip,
  RoutingControls,
} from "@/components/marketing/sections";
import { CtaBand } from "@/components/marketing/service-sections";
import { publishedLocations } from "@/content/locations";
import { publishedServices } from "@/content/services";
import { site } from "@/lib/env";
import { REFERRAL_SERVICE_DISCLOSURE } from "@/lib/seo/disclosure";
import { pageMetadata } from "@/lib/seo/metadata";
import { buildGraph, faqNode, webPageNode } from "@/lib/schema/graph";

const TITLE = `Concrete Referrals in Lancaster, SC | ${site.brand}`;
const DESCRIPTION =
  "We help Lancaster, SC homeowners connect with independent concrete service providers for driveways, patios, slabs, and repair. We are a referral service, not a contractor.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/",
});

const STATS = [
  { value: "4", label: "Concrete services routed in Lancaster County" },
  { value: "Lancaster, SC", label: "Area with written provider coverage" },
  { value: "1", label: "Independent provider contacts you, not a phone bank" },
  { value: "$0", label: "Cost to the homeowner, always" },
];

const DECISION_ITEMS = [
  {
    question: "Repair the slab or replace it?",
    answer:
      "Isolated surface cracking on an otherwise sound slab is usually a repair conversation. Panel-wide settlement, heaving, or a failing sub-base usually is not. Only the independent provider who inspects the slab can tell you which one you have.",
  },
  {
    question: "What changes the price of a Lancaster pour?",
    answer:
      "Access for a mixer, demolition and haul-away of the old slab, sub-base preparation on clay soil, thickness, reinforcement, and finish. Square footage alone is a poor predictor, which is why we publish no price ranges.",
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
      "No. We are a referral service that connects homeowners with independent third-party concrete service providers. The actual services are performed by the selected service provider. We do not perform, supervise, warrant, or guarantee construction work.",
  },
  {
    question: "Who performs the work?",
    answer:
      "Concrete work is performed by an independent third-party service provider. Availability and services depend on the provider serving the requested area. That provider holds the relationship, the contract, and the responsibility for the work.",
  },
  {
    question: "Which areas can you route right now?",
    answer:
      "Lancaster, South Carolina. Service availability depends on participating providers, so requests outside covered areas receive an honest no-coverage answer instead of being forwarded to a provider who does not serve the area.",
  },
  {
    question: "Are the service providers licensed and insured?",
    answer:
      "Licensing and insurance are the responsibility of each independent service provider, and we make no representation about any provider's credentials. Confirm licence status, insurance, and credentials directly with the provider and through SC LLR before you hire.",
  },
  {
    question: "What happens to my details?",
    answer:
      "Your request is stored by us and shared with the independent service provider covering your area so they can contact you. Marketing contact is a separate, optional consent. See the Privacy Policy for retention and your choices.",
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

      <Hero
        locationCue="Lancaster County, South Carolina"
        h1="Connect With a Local Concrete Service Provider in Lancaster, SC"
        summary="Tell us your project and location, and we’ll pass your request to an independent local service provider who serves your area. We are a referral service, not a concrete contractor, and we do not perform concrete work ourselves."
        imageSrc="/home-hero.webp"
        imageAlt="Broom-finished concrete front walkway and entry steps leading to the porch of a two-storey home"
        overlay
      />
      <StatStrip items={STATS} />
      <ReferralDisclosureStrip />

      <Section
        tone="surface"
        eyebrow="Project types"
        title="What we can route in Lancaster today"
        lead="Four residential concrete service categories, each with at least one participating provider holding written coverage for Lancaster areas. Foundation repair, structural engineering, and retaining walls sit outside this scope."
      >
        <ProjectTypeChooser />
        <p className="mt-8 text-center text-sm lg:text-left">
          <Link
            href="/services"
            className="font-semibold underline underline-offset-4"
            style={{ color: "var(--color-accent)" }}
          >
            Compare all four services and their scope limits →
          </Link>
        </p>
      </Section>

      <Section
        eyebrow="Process"
        title="Three steps, no obligation"
        lead="You are never passed to a call centre, and your details are never sold to a list of providers who bid against each other."
      >
        <HowMatchingWorks />
      </Section>

      <Section
        tone="soft"
        eyebrow="How routing works"
        title="How your request reaches a service provider"
        lead="These are routing controls, not credential verification. Licence, insurance, and workmanship remain matters to confirm directly with the independent provider who contacts you."
      >
        <RoutingControls />
      </Section>

      <Section
        eyebrow="Decision support"
        title="Questions worth settling before you call"
        lead="Straight answers, including the ones that tell you we are not the right service for your project."
      >
        <DecisionSupport items={DECISION_ITEMS} />
      </Section>

      <Section
        tone="surface"
        eyebrow="Request a referral"
        title="Start with your project type and location"
        lead="Two short steps. A participating service provider may contact you, and if no provider covering your area can take it, we will say so plainly."
      >
        <p
          className="mx-auto mb-8 max-w-3xl rounded-[12px] border p-4 text-center text-[13.5px] leading-relaxed lg:mx-0 lg:text-left"
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
          <div className="mx-auto w-full max-w-xl lg:mx-0">
            <QuoteForm
              services={publishedServices.map((s) => ({
                slug: s.slug,
                name: s.name,
              }))}
              consentVersion={site.consentVersion}
              fallbackDisplay={site.phoneDisplay}
              fallbackE164={site.phoneE164}
            />
          </div>
          <div className="text-center lg:pt-4 lg:text-left">
            <p className="eyebrow-plain">What happens after you submit</p>
            <ol className="mt-5 space-y-5">
              {[
                "Your location and project type are checked against participating providers with written coverage.",
                "Service availability depends on participating providers, so coverage and current capacity are checked before anything is sent.",
                "One independent third-party service provider receives the request and may contact you.",
                "If they do not acknowledge in time, it is reassigned once to another participating provider.",
              ].map((item, index) => (
                <li key={item} className="flex justify-center gap-4 text-left lg:justify-start">
                  <span
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[12px] font-bold"
                    style={{
                      backgroundColor: "var(--color-accent-soft)",
                      color: "var(--color-accent)",
                    }}
                  >
                    {index + 1}
                  </span>
                  <span className="text-[14.5px] leading-relaxed text-[color:var(--color-muted)]">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
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

      <Section eyebrow="Project photography" title="Why there is no gallery here">
        <ProjectExamples />
      </Section>

      <Section eyebrow="FAQ" title="Straight answers">
        <FaqSection faqs={FAQS} />
      </Section>

      <Section
        tone="surface"
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


      <CtaBand
        title="Ready to connect with an independent concrete service provider?"
        body="One request, one independent third-party service provider, no charge to you and no obligation to proceed."
      />

    </>
  );
}
