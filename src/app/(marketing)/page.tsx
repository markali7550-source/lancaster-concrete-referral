import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { QuoteForm } from "@/components/lead/QuoteForm";
import { MobileActionBar } from "@/components/lead/MobileActionBar";
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
  VettingProcess,
} from "@/components/marketing/sections";
import { CtaBand } from "@/components/marketing/service-sections";
import { publishedServices } from "@/content/services";
import { site } from "@/lib/env";
import { pageMetadata } from "@/lib/seo/metadata";
import { buildGraph, faqNode, webPageNode } from "@/lib/schema/graph";

const TITLE = `Concrete Contractor Referrals in Lancaster, SC | ${site.brand}`;
const DESCRIPTION =
  "We match Lancaster, SC homeowners with independent concrete contractors for driveways, patios, slabs, and repair. Call or request a quote. We are a referral service, not a contractor.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/",
});

const STATS = [
  { value: "4", label: "Concrete services routed in Lancaster County" },
  { value: "29720 · 29721", label: "ZIP codes with written partner coverage" },
  { value: "1", label: "Contractor contacts you, not a phone bank" },
  { value: "$0", label: "Cost to the homeowner, always" },
];

const DECISION_ITEMS = [
  {
    question: "Repair the slab or replace it?",
    answer:
      "Isolated surface cracking on an otherwise sound slab is usually a repair conversation. Panel-wide settlement, heaving, or a failing sub-base usually is not. Only the contractor who inspects the slab can tell you which one you have.",
  },
  {
    question: "What changes the price of a Lancaster pour?",
    answer:
      "Access for a mixer, demolition and haul-away of the old slab, sub-base preparation on clay soil, thickness, reinforcement, and finish. Square footage alone is a poor predictor, which is why we publish no price ranges.",
  },
  {
    question: "Do I need more than one quote?",
    answer:
      "Comparing quotes is sensible. We route your request to one eligible contractor at a time so you are not called by five companies, and you remain completely free to seek other quotes independently.",
  },
  {
    question: "What does this service cost me?",
    answer:
      "Nothing. We are paid by the contractor on completed and collected work. That arrangement does not change the price you negotiate, and it does not make us a party to your contract.",
  },
];

const FAQS = [
  {
    question: "Are you the concrete contractor?",
    answer:
      "No. We are a marketing and referral service. We do not perform, supervise, warrant, or guarantee construction work. The independent contractor you are matched with holds the relationship, the contract, and the responsibility for the work.",
  },
  {
    question: "Which areas can you actually match right now?",
    answer:
      "Lancaster, South Carolina, covering the 29720 and 29721 areas. Requests outside approved coverage receive an honest no-coverage answer instead of being forwarded to a contractor who does not serve the area.",
  },
  {
    question: "Do you check licences and insurance?",
    answer:
      "We record licence or registration details and current insurance evidence for each partner, and a partner whose record is expired, suspended, or incompatible with the work cannot receive your request. That is a routing control, not a warranty. Verify credentials through SC LLR before hiring.",
  },
  {
    question: "What happens to my details?",
    answer:
      "Your request is stored by us and shared with the independent contractor assigned to your area so they can contact you. Marketing contact is a separate, optional consent. See the Privacy Policy for retention and your choices.",
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
        h1="Get Matched With Independent Concrete Contractors in Lancaster, SC"
        summary="Tell us your project and ZIP code. We check licence status, insurance, coverage, and capacity, then pass your request to one independent local contractor. We are a referral service, not a concrete contractor."
      />
      <StatStrip items={STATS} />
      <ReferralDisclosureStrip />

      <Section
        tone="surface"
        eyebrow="Project types"
        title="What we can route in Lancaster today"
        lead="Four residential concrete services, each with at least one partner holding written coverage for Lancaster ZIP codes. Foundation repair, structural engineering, and retaining walls sit outside this scope."
      >
        <ProjectTypeChooser />
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

      <Section
        eyebrow="Process"
        title="Three steps, no obligation"
        lead="You are never passed to a call centre, and your details are never sold to a list of contractors who bid against each other."
      >
        <HowMatchingWorks />
      </Section>

      <Section
        tone="soft"
        eyebrow="Partner checks"
        title="What we verify before a request is routed"
        lead="Every check below is recorded with a source, a timestamp, and the reviewer who performed it."
      >
        <VettingProcess />
      </Section>

      <Section
        eyebrow="Decision support"
        title="Questions worth settling before you call"
        lead="Straight answers, including the ones that tell you we are not the right service for your project."
      >
        <div className="max-w-3xl">
          <DecisionSupport items={DECISION_ITEMS} />
        </div>
      </Section>

      <Section
        tone="surface"
        eyebrow="Request a quote"
        title="Start with your project type and ZIP code"
        lead="Two short steps. You will hear from one independent contractor, and if nobody approved for your area can take it, we will say so plainly."
      >
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="max-w-xl">
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
          <div className="lg:pt-4">
            <p className="eyebrow-plain">What happens after you submit</p>
            <ol className="mt-5 space-y-5">
              {[
                "Your location and project type are checked against partners with written coverage.",
                "Licence status, insurance, and current capacity are checked before anything is sent.",
                "One eligible independent contractor receives the request and contacts you.",
                "If they do not acknowledge in time, it is reassigned once to an approved backup.",
              ].map((item, index) => (
                <li key={item} className="flex gap-4">
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
                whether we cover your area.
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

      <CtaBand
        title="Ready to be matched with a Lancaster concrete contractor?"
        body="One request, one eligible independent contractor, no charge to you and no obligation to proceed."
      />

      <Section eyebrow="FAQ" title="Straight answers">
        <FaqSection faqs={FAQS} />
      </Section>

      <Section tone="surface" eyebrow="Service area" title="Where we publish">
        <AdjacentAreas locations={[]} />
      </Section>

      <MobileActionBar
        fallbackDisplay={site.phoneDisplay}
        fallbackE164={site.phoneE164}
      />
    </>
  );
}
