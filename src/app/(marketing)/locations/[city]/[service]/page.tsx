import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { QuoteForm } from "@/components/lead/QuoteForm";
import {
  FaqSection,
  Hero,
  HowMatchingWorks,
  ReferralDisclosureStrip,
  Section,
  RoutingControls,
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

/*
 * The four location-service combo pages share one template, so the process and
 * CTA bands are keyed by service slug to keep every rendered section on its own
 * dedicated image file rather than repeating a single shared band photo.
 */
const COMBO_PROCESS_IMAGES: Record<string, { src: string; alt: string }> = {
  "concrete-driveways": { src: "/images/process-combo-driveways.webp", alt: "Independent contractor inspecting the formed edge of a new residential driveway slab" },
  "concrete-patios": { src: "/images/process-combo-patios.webp", alt: "Two workers screeding a freshly poured backyard patio between timber forms" },
  "concrete-slabs": { src: "/images/process-combo-slabs.webp", alt: "Compacted gravel subbase and reinforcing mesh set inside timber forms before a slab pour" },
  "concrete-repair": { src: "/images/process-combo-repair.webp", alt: "Worker saw-cutting a cracked section out of an existing concrete driveway" },
};

const COMBO_CTA_IMAGES: Record<string, { src: string; alt: string }> = {
  "concrete-driveways": { src: "/images/cta-combo-driveways.webp", alt: "Finished residential concrete driveway running up to an attached garage" },
  "concrete-patios": { src: "/images/cta-combo-patios.webp", alt: "Backyard concrete patio bordered by lawn and mature planting" },
  "concrete-slabs": { src: "/images/cta-combo-slabs.webp", alt: "Level concrete slab poured beside a residential property" },
  "concrete-repair": { src: "/images/cta-combo-repair.webp", alt: "Weathered concrete walkway section prepared for a repair pour" },
};

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
      <Hero
        breadcrumbs={
          <Breadcrumbs
            overlay
            items={[
              { name: "Home", path: "/" },
              { name: "Service areas", path: "/locations" },
              {
                name: `${location.city}, SC`,
                path: `/locations/${location.slug}`,
              },
              { name: serviceRecord.name },
            ]}
          />
        }
        locationCue={`${location.city}, ${location.region}`}
        h1={h1}
        summary={description}
        imageSrc={record.localImage}
        imageAlt={record.localImageAlt}
        overlay
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
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-7 xl:col-span-8">
            <section className="scroll-mt-36 py-12 md:py-20">
              <p className="eyebrow flex justify-center before:hidden md:justify-start md:before:block">{`${serviceRecord.name} · ${location.city}`}</p>
              <h2 className="h2 mt-4 text-center md:text-left">
                What we see on {location.city}{" "}
                {serviceRecord.shortName.toLowerCase()} requests
              </h2>
              <div className="mx-auto mt-8 max-w-prose space-y-6 text-center lg:mx-0 lg:text-left">
                {record.localBody.map((block) => (
                  <div key={block.heading}>
                    <h3 className="text-[22px] font-semibold leading-snug">
                      {block.heading}
                    </h3>
                    <p className="mt-1.5 text-[16px] leading-relaxed text-[color:var(--color-muted)]">
                      {block.body}
                    </p>
                  </div>
                ))}
              </div>
              <nav
                aria-label="Related pages"
                className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start"
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
              className="scroll-mt-36 border-t py-12 md:py-20"
              style={{ borderColor: "var(--color-line-soft)" }}
            >
              <p className="eyebrow flex justify-center before:hidden md:justify-start md:before:block">Process</p>
              <h2 className="h2 mt-4 text-center md:text-left">
                How the project usually runs here
              </h2>
              <p className="lede mx-auto mt-4 max-w-prose text-center md:mx-0 md:text-left">
                Typical ranges reported by participating providers, not commitments. Your
                contractor sets the actual schedule for your site.
              </p>
              <div className="mt-8">
                <Timeline phases={serviceRecord.process} />
              </div>
            </section>

            <section
              className="scroll-mt-36 border-t py-12 md:py-20"
              style={{ borderColor: "var(--color-line-soft)" }}
            >
              <p className="eyebrow flex justify-center before:hidden md:justify-start md:before:block">Pricing</p>
              <h2 className="h2 mt-4 text-center md:text-left">What drives the price locally</h2>
              <p className="lede mx-auto mt-4 max-w-prose text-center md:mx-0 md:text-left">
                We publish no figures. These are the variables that move the
                number on a {location.city} property.
              </p>
              <div className="mt-8">
                <CostTable rows={serviceRecord.costFactors} />
              </div>
            </section>

            <section
              className="scroll-mt-36 border-t py-12 md:py-20"
              style={{ borderColor: "var(--color-line-soft)" }}
            >
              <p className="eyebrow flex justify-center before:hidden md:justify-start md:before:block">Preparation</p>
              <h2 className="h2 mt-4 text-center md:text-left">Get more out of the estimate visit</h2>
              <div className="mt-8">
                <PrepColumns
                  checklist={serviceRecord.prepChecklist}
                  questions={serviceRecord.quoteQuestions}
                />
              </div>
            </section>

            <section
              className="scroll-mt-36 border-t py-12 md:py-20"
              style={{ borderColor: "var(--color-line-soft)" }}
            >
              <p className="eyebrow flex justify-center before:hidden md:justify-start md:before:block">How routing works</p>
              <h2 className="h2 mt-4 text-center md:text-left">Before your request is passed on</h2>
              <div className="mt-8">
                <RoutingControls />
              </div>
            </section>
          </div>

          <aside className="order-first min-w-0 lg:order-none lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-[4.5rem] lg:pt-2 lg:pb-16">
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
              <div className="card mt-4 p-5 text-center lg:text-left">
                <p className="text-sm font-semibold">
                  Checking coverage first?
                </p>
                <p className="mt-1.5 text-[14px] text-[color:var(--color-muted)]">
                  We route {`${location.city}, ${location.region}`} today. Call and we will
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

      <Section
        tone="surface"
        backgroundImage={COMBO_PROCESS_IMAGES[serviceRecord.slug]}
        eyebrow="Process"
        title="Three steps, no obligation"
      >
        <HowMatchingWorks />
      </Section>

      <Section
        eyebrow="Before you call"
        title="Worth settling first"
        lead={`The questions worth answering before any ${serviceRecord.name.toLowerCase()} quote apply wherever the work happens, so we keep them in one place rather than repeating them on every local page.`}
      >
        <Link
          href={`/services/${serviceRecord.slug}#prepare`}
          className="btn btn-secondary"
        >
          What to settle before quoting{" "}
          {serviceRecord.name.toLowerCase()} in {location.city}
        </Link>
      </Section>

      <Section
        tone="surface"
        eyebrow="FAQ"
        title={`${location.city} ${serviceRecord.shortName.toLowerCase()} questions`}
      >
        <FaqSection faqs={record.localFaqs} name="combo-faq" />
      </Section>

      <Section eyebrow="Other services" title={`Also routed in ${location.city}`}>
        <RelatedServices
          services={publishedServices.filter((s) =>
            publishedLocationServices.some(
              (r) =>
                r.locationSlug === location.slug && r.serviceSlug === s.slug,
            ),
          )}
          currentSlug={serviceRecord.slug}
          basePath={`/locations/${location.slug}`}
        />
      </Section>


      <CtaBand
        tone="section"
        title={`${serviceRecord.name} in ${location.city}, SC`}
        body="One request, one eligible independent contractor. If nobody approved for your area can take it, we will tell you plainly."
        imageSrc={COMBO_CTA_IMAGES[serviceRecord.slug]?.src}
        imageAlt={COMBO_CTA_IMAGES[serviceRecord.slug]?.alt}
      />

    </>
  );
}
