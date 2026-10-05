import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { QuoteForm } from "@/components/lead/QuoteForm";
import {
  AdjacentAreas,
  DecisionSupport,
  FaqSection,
  Hero,
  HowMatchingWorks,
  ProjectTypeChooser,
  ReferralDisclosureStrip,
  Section,
  StatStrip,
  RoutingControls,
} from "@/components/marketing/sections";
import {
  Breadcrumbs,
  CtaBand,
  KeyFacts,
} from "@/components/marketing/service-sections";
import { getLocation, publishedLocations } from "@/content/locations";
import { publishedServices } from "@/content/services";
import { publishedLocationServices } from "@/content/location-services";
import { site } from "@/lib/env";
import { pageMetadata } from "@/lib/seo/metadata";

import {
  breadcrumbNode,
  buildGraph,
  faqNode,
  webPageNode,
} from "@/lib/schema/graph";

/*
 * These cards link to the local service pages, so each one must show that
 * page's own hero photograph -- not the national service image, which belongs
 * to /services/[service]. Derived from the same records the local heroes read
 * (localImage), so the card and the page it opens cannot drift apart.
 */
const LOCATION_SERVICE_CARD_IMAGES = Object.fromEntries(
  publishedLocationServices.map((record) => [
    record.serviceSlug,
    { src: record.localImage, alt: record.localImageAlt },
  ]),
);

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedLocations.map((location) => ({ city: location.slug }));
}

type Params = Promise<{ city: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { city } = await params;
  const location = getLocation(city);
  if (!location) return {};
  return pageMetadata({
    title: `Concrete Contractors in ${location.city}, SC | Referral Service`,
    description: `Looking for a concrete contractor in ${location.city}, SC? Call now or request a quote. We connect you with an independent local contractor. Availability varies.`,
    path: `/locations/${location.slug}`,
  });
}

export default async function LocationPage({ params }: { params: Params }) {
  const { city } = await params;
  const location = getLocation(city);
  if (!location) notFound();

  const path = `/locations/${location.slug}`;
  const comboSlugs = publishedLocationServices
    .filter((record) => record.locationSlug === location.slug)
    .map((record) => record.serviceSlug);

  const faqs = [
    {
      question: `Which ${location.city} areas do you cover?`,
      answer: `${location.city}, ${location.region}. Participating providers approve this area in writing. A request from outside them returns an honest no coverage response rather than being forwarded to someone who does not work there.`,
    },
    {
      question: `Do you employ concrete crews in ${location.city}?`,
      answer:
        "No. We are a referral service. Every crew that contacts you is an independent contractor responsible for their own licensing, insurance, pricing, and workmanship.",
    },
    {
      question: `How quickly does a ${location.city} contractor respond?`,
      answer:
        "Participating providers work to a contracted acknowledgement window. If the assigned contractor does not acknowledge in time, the request is reassigned once to an approved backup rather than sitting unattended.",
    },
    {
      question: `Is there a ${location.city} office I can visit?`,
      answer:
        "No, and we will not publish an address implying otherwise. We are an online referral business. The contractor assigned to your project is the party with a local presence.",
    },
  ];

  const graph = buildGraph([
    webPageNode(
      path,
      `Concrete contractor referrals in ${location.city}, SC`,
      `Referral coverage for ${location.city}, ${location.county}.`,
    ),
    breadcrumbNode(path, [
      { name: "Home", path: "/" },
      { name: "Service areas", path: "/locations" },
      { name: `${location.city}, SC`, path },
    ]),
    faqNode(path, faqs),
  ]);

  return (
    <>
      <JsonLd data={graph} />
      <Hero
        breadcrumbs={
          <Breadcrumbs
            overlay
        items={[
          { name: "Home", path: "/" },
          { name: "Service areas", path: "/locations" },
          { name: `${location.city}, SC` },
        ]}
          />
        }
        locationCue={`${location.county}, South Carolina`}
        h1={`Concrete Contractor Referrals in ${location.city}, SC`}
        summary={location.intro}
        imageSrc={location.heroImage}
        imageAlt={location.heroImageAlt}
        overlay
      />
      <KeyFacts
        facts={[
          { label: "Approved area", value: `${location.city}, ${location.region}` },
          { label: "County", value: location.county },
          { label: "Services routed", value: `${publishedServices.length} residential services` },
          { label: "Cost to you", value: "No charge for the referral" },
        ]}
      />
      <ReferralDisclosureStrip />

      <Section
        eyebrow="Local conditions"
        title={`What shapes concrete work in ${location.city}`}
        lead="Notes gathered from participating provider conversations about this specific market, not generic filler with a city name dropped in."
      >
        <Image
          src="/locations/lancaster-residential-street.webp"
          alt={`Single storey brick homes with concrete driveways and front walkways on a residential street in ${location.city}, ${location.region}`}
          width={900}
          height={491}
          sizes="(min-width: 1024px) 80rem, 100vw"
          className="mb-8 h-56 w-full rounded-[18px] object-cover md:h-72"
        />
        <ul className="grid gap-5 lg:grid-cols-3">
          {location.localEvidence.map((item, index) => (
            <li key={item} className="card p-6 text-center lg:text-left">
              <span
                className="mx-auto grid h-8 w-8 place-items-center rounded-full text-[13px] font-bold lg:mx-0"
                style={{
                  backgroundColor: "var(--color-accent-soft)",
                  color: "var(--color-accent)",
                }}
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 text-[14.5px] leading-relaxed text-[color:var(--color-muted)]">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        tone="surface"
        eyebrow="Services"
        title={`Concrete services routed in ${location.city}`}
        lead="Pick the closest match. The category only decides which participating providers are eligible. The contractor scopes the whole job on site."
      >
        <ProjectTypeChooser
          services={publishedServices.filter((service) =>
            comboSlugs.includes(service.slug),
          )}
          cityPrefix={path}
          cityLabel={location.city}
          images={LOCATION_SERVICE_CARD_IMAGES}
        />
      </Section>

      <Section
        backgroundImage={{
          src: "/images/process-location-lancaster.webp",
          alt: "Residential concrete driveway on a Lancaster neighborhood street",
        }}
        eyebrow="Process"
        title="How a Lancaster request is routed"
      >
        <HowMatchingWorks />
      </Section>

      <Section
        tone="soft"
        eyebrow="How routing works"
        title="How a request is matched to a provider"
      >
        <RoutingControls />
      </Section>

      <Section
        tone="surface"
        eyebrow="Request a referral"
        title={`Tell us about your ${location.city} project`}
      >
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
            <p className="eyebrow-plain">Before you send it</p>
            <div className="mx-auto mt-5 max-w-xl lg:mx-0">
              <DecisionSupport
                items={[
                  {
                    question: "Is my area covered?",
                    answer: `We route ${location.city}, ${location.region} today. Anything else returns a no coverage response and nothing is shared with a contractor.`,
                  },
                  {
                    question: "Will I be called repeatedly?",
                    answer:
                      "One contractor receives your request. We do not sell your details to a panel of bidders, and marketing contact is a separate optional consent.",
                  },
                  {
                    question: "What if my project is out of scope?",
                    answer:
                      "Foundation, structural, and retaining wall work is declined rather than routed. We will tell you that instead of passing it to a concrete finisher.",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="FAQ" title={`${location.city} questions`}>
        <FaqSection faqs={faqs} name="city-faq" />
      </Section>

      <Section tone="surface" eyebrow="Nearby" title="Adjacent published areas">
        <AdjacentAreas
          locations={publishedLocations.filter((l) => l.slug !== location.slug)}
        />
      </Section>


      <CtaBand
        title={`Get matched with a ${location.city} concrete contractor`}
        body="One request, one eligible independent contractor, no charge and no obligation."
        imageSrc="/images/cta-location-lancaster.webp"
        imageAlt="Concrete driveway apron meeting the street outside a Lancaster area home"
      />

    </>
  );
}
