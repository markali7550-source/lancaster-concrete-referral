import type { Metadata } from "next";
import Image from "next/image";
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
  ServiceAreaControls,
  Section,
  SectionDivider,
} from "@/components/marketing/sections";
import {
  Breadcrumbs,
  CtaBand,
  KeyFacts,
} from "@/components/marketing/service-sections";
import { OUT_OF_AREA_POSTAL_CODE, getLocation, publishedLocations, serviceAreaOptions } from "@/content/locations";
import { publishedServices } from "@/content/services";
import { publishedLocationServices } from "@/content/location-services";
import { site } from "@/lib/env";
import { fitTitle, pageMetadata } from "@/lib/seo/metadata";

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
    title: fitTitle(`Concrete Services in ${location.city}, SC`),
    description: `Looking for concrete work in ${location.city}, SC? Call now or request a free on-site consultation. A project manager from our local team replies to each request.`,
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
      answer: `${location.city}, ${location.region}. We serve this area directly with our own local crew. A request from outside our service area gets a clear answer right away.`,
    },
    {
      question: `Do you employ concrete specialists in ${location.city}?`,
      answer:
        "Yes. Our own concrete specialists handle every project, and our project managers answer for your pricing, schedule, and workmanship.",
    },
    {
      question: `How quickly does our ${location.city} team respond?`,
      answer:
        "We respond to each request promptly. If you have not heard from us, call our team and we will follow up right away.",
    },
    {
      question: `Is there a ${location.city} office I can visit?`,
      answer:
        "We will not publish an address implying otherwise. Your project manager is your local point of contact for the work.",
    },
  ];

  const graph = buildGraph([
    webPageNode(
      path,
      `Concrete service requests in ${location.city}, SC`,
      `Concrete service in ${location.city}, ${location.county}.`,
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
        h1={`Concrete Services & Estimates in ${location.city}, SC`}
        summary={location.intro}
        imageSrc={location.heroImage}
        imageAlt={location.heroImageAlt}
        overlay
      />
      <KeyFacts
        facts={[
          { label: "Approved area", value: `${location.city}, ${location.region}` },
          { label: "County", value: location.county },
          { label: "Services offered", value: `${publishedServices.length} residential services` },
          { label: "Cost to you", value: "No charge for the quote request" },
        ]}
      />

      <Section
        compact
        eyebrow="Service area"
        title={`${location.city} service area overview`}
        lead="Please confirm your address when you request a quote, so we can confirm our service for your project."
      >
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <li className="card flex h-full flex-col p-5">
            <h3 className="font-semibold">Communities</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--color-muted)]">
              The City of Lancaster and nearby Lancaster County communities,
              including Kershaw, Heath Springs, Van Wyck, and Buford.
            </p>
          </li>
          <li className="card flex h-full flex-col p-5">
            <h3 className="font-semibold">Landmarks</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--color-muted)]">
              Familiar reference points across the county include the Catawba
              River, Forty Acre Rock Heritage Preserve, and Andrew Jackson State
              Park.
            </p>
          </li>
          <li className="card flex h-full flex-col p-5">
            <h3 className="font-semibold">Soil and weather</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--color-muted)]">
              Red clay holds water and moves through wet and dry seasons, and
              summers are hot and humid. Both shape pour timing and drainage
              planning.
            </p>
          </li>
        </ul>
      </Section>

      <SectionDivider />

      <Section
        eyebrow="Local conditions"
        title={`What shapes concrete work in ${location.city}`}
        lead="Notes from our crew's work in this market."
      >
          {/*
            Replaces the generated shot that had red clay painted along the
            lawn edges. This one is a real photograph and it earns its place
            here rather than filling space: the section is about subbase,
            drainage and tight lots, and the frame shows exactly that — a
            finished pad with its subbase still open around the edges on a
            lot hemmed in by neighbors. The alt describes the soil as it
            actually appears, not as red clay, and claims no location.
          */}
          <Image
            src="/images/locations/lancaster-sc/lancaster-sc-site-conditions.webp"
            alt="Freshly finished concrete pad in a fenced backyard, with bare soil and gravel still exposed around its edges and neighboring houses close behind"
            width={944}
            height={531}
            sizes="(min-width: 1024px) 80rem, 100vw"
            className="mb-8 h-56 w-full rounded-[12px] object-cover md:h-72"
          />
        <ul className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {location.localEvidence.map((item) => (
            <li
              key={item}
              className="border-t pt-4 text-[14.5px] leading-relaxed text-[color:var(--color-muted)]"
              style={{ borderColor: "var(--color-line)" }}
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        tone="surface"
        eyebrow="Services"
        title={`Concrete services in ${location.city}`}
        lead="Pick the closest match. The category helps us plan your visit. Your project manager scopes the whole job on site."
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


      {/*
        Service-area band photograph: forms and a contractor truck at a
        residential street edge. Interim bytes until a real photograph
        replaces them; the subject is already the right one for this band.
      */}
      <Section
        backgroundImage={{
          src: "/images/locations/lancaster-sc/lancaster-sc-routing.webp",
          alt: "Timber forms set along the edge of a residential street beside a contractor's truck, with excavated clay heaped alongside",
        }}
        eyebrow="Process"
        title="How a Lancaster request is handled"
      >
        <HowMatchingWorks />
      </Section>

      <Section
        tone="soft"
        eyebrow="How requests are checked"
        title="How a request is checked before it goes out"
      >
        <ServiceAreaControls />
      </Section>

      <Section
        tone="surface"
        eyebrow="Request Concrete Service"
        title={`Tell us about your ${location.city} project`}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
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
            <p className="eyebrow-plain">Before you send it</p>
            <div className="mt-5 max-w-xl">
              <DecisionSupport
                items={[
                  {
                    question: "Is my area served?",
                    answer: `We take work in ${location.city}, ${location.region} today. Anything else gets a clear answer that we do not serve your address yet.`,
                  },
                  {
                    question: "Will I be called repeatedly?",
                    answer:
                      "One project manager handles your request from start to finish. We do not sell your details, and marketing contact is a separate optional consent.",
                  },
                  {
                    question: "What if my project is out of scope?",
                    answer:
                      "Foundation, structural, and retaining wall work is outside our scope. We will tell you that plainly so you can plan the right next step.",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </Section>

      <Section compact eyebrow="FAQ" title={`${location.city} questions`}>
        <FaqSection faqs={faqs} name="city-faq" />
      </Section>

      <Section compact tone="surface" eyebrow="Nearby" title="Adjacent published areas">
        <AdjacentAreas
          locations={publishedLocations.filter((l) => l.slug !== location.slug)}
        />
      </Section>


      <CtaBand
        title={`Request concrete service in ${location.city}`}
        body="Send your project details and a project manager from our local team will reply. No charge and no obligation."
      />

    </>
  );
}
