import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { QuoteForm } from "@/components/lead/QuoteForm";
import { MobileActionBar } from "@/components/lead/MobileActionBar";
import {
  DecisionSupport,
  FaqSection,
  Hero,
  HowMatchingWorks,
  ReferralDisclosureStrip,
  Section,
  VettingProcess,
} from "@/components/marketing/sections";
import {
  Breadcrumbs,
  CostTable,
  CtaBand,
  KeyFacts,
  PrepColumns,
  RelatedServices,
  Timeline,
} from "@/components/marketing/service-sections";
import {
  getLocationService,
  publishedLocationServices,
} from "@/content/location-services";
import { getLocation } from "@/content/locations";
import { getService, publishedServices } from "@/content/services";
import { site } from "@/lib/env";
import { comboMeta, pageMetadata } from "@/lib/seo/metadata";
import {
  breadcrumbNode,
  buildGraph,
  faqNode,
  serviceNode,
  webPageNode,
} from "@/lib/schema/graph";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedLocationServices.map((record) => ({
    city: record.locationSlug,
    service: record.serviceSlug,
  }));
}

type Params = Promise<{ city: string; service: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { city, service } = await params;
  const location = getLocation(city);
  const serviceRecord = getService(service);
  if (!location || !serviceRecord || !getLocationService(city, service)) return {};
  return pageMetadata({
    title: comboMeta.title(serviceRecord.name, location.city),
    description: comboMeta.description(serviceRecord.nameLower, location.city),
    path: `/locations/${city}/${service}`,
  });
}

export default async function ComboPage({ params }: { params: Params }) {
  const { city, service } = await params;
  const record = getLocationService(city, service);
  const location = getLocation(city);
  const serviceRecord = getService(service);
  if (!record || !location || !serviceRecord) notFound();

  const path = `/locations/${city}/${service}`;
  const h1 = comboMeta.h1(serviceRecord.name, location.city);
  const description = comboMeta.description(
    serviceRecord.nameLower,
    location.city,
  );

  const graph = buildGraph([
    serviceNode({
      path,
      name: `${serviceRecord.name} in ${location.city}, SC`,
      description,
      areaServed: [location.city],
    }),
    webPageNode(path, h1, description),
    breadcrumbNode(path, [
      { name: "Home", path: "/" },
      { name: "Service areas", path: "/locations" },
      { name: `${location.city}, SC`, path: `/locations/${location.slug}` },
      { name: serviceRecord.name, path },
    ]),
    faqNode(path, record.localFaqs),
  ]);

  return (
    <>
      <JsonLd data={graph} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Service areas", path: "/locations" },
          { name: `${location.city}, SC`, path: `/locations/${location.slug}` },
          { name: serviceRecord.name },
        ]}
      />
      <Hero
        locationCue={`${location.city}, ${location.region} · ZIP ${location.zips.join(" & ")}`}
        h1={h1}
        summary={description}
        imageSrc={serviceRecord.image}
        imageAlt={serviceRecord.imageAlt}
      />
      <KeyFacts
        facts={[
          { label: "Service", value: serviceRecord.name },
          { label: "Area", value: `${location.city}, ${location.county}` },
          { label: "Routed project types", value: serviceRecord.projectTypes.join(" · ") },
          { label: "Cost to you", value: "No charge for the referral" },
        ]}
      />
      <ReferralDisclosureStrip />

      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7 xl:col-span-8">
            <section className="scroll-mt-36 py-16">
              <p className="eyebrow">{`${serviceRecord.name} · ${location.city}`}</p>
              <h2 className="h2 mt-4">
                What we see on {location.city}{" "}
                {serviceRecord.shortName.toLowerCase()} requests
              </h2>
              <div className="mt-8 max-w-prose space-y-5 text-[16px] leading-relaxed text-[color:var(--color-muted)]">
                {record.localBody.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
              <nav
                aria-label="Related pages"
                className="mt-9 flex flex-wrap gap-3"
              >
                <Link
                  href={`/services/${serviceRecord.slug}`}
                  className="btn btn-secondary"
                >
                  All {serviceRecord.shortName.toLowerCase()} referrals
                </Link>
                <Link
                  href={`/locations/${location.slug}`}
                  className="btn btn-secondary"
                >
                  All services in {location.city}
                </Link>
              </nav>
            </section>

            <section
              className="scroll-mt-36 border-t py-16"
              style={{ borderColor: "var(--color-line-soft)" }}
            >
              <p className="eyebrow">Process</p>
              <h2 className="h2 mt-4">
                How the project usually runs here
              </h2>
              <p className="lede mt-4 max-w-prose">
                Typical ranges reported by partners, not commitments. Your
                contractor sets the actual schedule for your site.
              </p>
              <div className="mt-8">
                <Timeline phases={serviceRecord.process} />
              </div>
            </section>

            <section
              className="scroll-mt-36 border-t py-16"
              style={{ borderColor: "var(--color-line-soft)" }}
            >
              <p className="eyebrow">Pricing</p>
              <h2 className="h2 mt-4">What drives the price locally</h2>
              <p className="lede mt-4 max-w-prose">
                We publish no figures. These are the variables that move the
                number on a {location.city} property.
              </p>
              <div className="mt-8">
                <CostTable rows={serviceRecord.costFactors} />
              </div>
            </section>

            <section
              className="scroll-mt-36 border-t py-16"
              style={{ borderColor: "var(--color-line-soft)" }}
            >
              <p className="eyebrow">Preparation</p>
              <h2 className="h2 mt-4">Get more out of the estimate visit</h2>
              <div className="mt-8">
                <PrepColumns
                  checklist={serviceRecord.prepChecklist}
                  questions={serviceRecord.quoteQuestions}
                />
              </div>
            </section>

            <section
              className="scroll-mt-36 border-t py-16"
              style={{ borderColor: "var(--color-line-soft)" }}
            >
              <p className="eyebrow">Partner checks</p>
              <h2 className="h2 mt-4">Before your request is routed</h2>
              <div className="mt-8">
                <VettingProcess />
              </div>
            </section>
          </div>

          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-[11rem] lg:py-16">
              <QuoteForm
                services={publishedServices.map((s) => ({
                  slug: s.slug,
                  name: s.name,
                }))}
                defaultServiceSlug={serviceRecord.slug}
                consentVersion={site.consentVersion}
                fallbackDisplay={site.phoneDisplay}
                fallbackE164={site.phoneE164}
              />
              <div className="card mt-4 p-5">
                <p className="text-sm font-semibold">
                  Checking coverage first?
                </p>
                <p className="mt-1.5 text-[14px] text-[color:var(--color-muted)]">
                  We route {location.zips.join(" and ")} today. Call and we will
                  confirm in a minute.
                </p>
                <a
                  href={`tel:${site.phoneE164}`}
                  className="btn btn-secondary mt-4 w-full"
                >
                  Call {site.phoneDisplay}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Section tone="surface" eyebrow="Process" title="Three steps, no obligation">
        <HowMatchingWorks />
      </Section>

      <CtaBand
        title={`${serviceRecord.name} in ${location.city}, SC`}
        body="One request, one eligible independent contractor. If nobody approved for your ZIP code can take it, we will tell you plainly."
      />

      <Section eyebrow="Before you call" title="Worth settling first">
        <div className="max-w-3xl">
          <DecisionSupport items={serviceRecord.considerations} />
        </div>
      </Section>

      <Section
        tone="surface"
        eyebrow="FAQ"
        title={`${location.city} ${serviceRecord.shortName.toLowerCase()} questions`}
      >
        <FaqSection faqs={record.localFaqs} />
      </Section>

      <Section eyebrow="Other services" title={`Also routed in ${location.city}`}>
        <RelatedServices
          services={publishedServices}
          currentSlug={serviceRecord.slug}
        />
      </Section>

      <MobileActionBar
        fallbackDisplay={site.phoneDisplay}
        fallbackE164={site.phoneE164}
      />
    </>
  );
}
