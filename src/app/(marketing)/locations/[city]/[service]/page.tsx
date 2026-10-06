import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { QuoteForm } from "@/components/lead/QuoteForm";
import {
  FaqSection,
  Hero,
  ReferralDisclosureStrip,
  Section,
} from "@/components/marketing/sections";
import {
  Breadcrumbs,
  CtaBand,
  KeyFacts,
  RelatedServices,
} from "@/components/marketing/service-sections";
import {
  getLocationService,
  publishedLocationServices,
} from "@/content/location-services";
import { OUT_OF_AREA_POSTAL_CODE, getLocation, serviceAreaOptions } from "@/content/locations";
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
 * Combo pages are local pages. Sequence, cost drivers and estimate-visit prep
 * are identical whatever city the work is in, so they live on the service hub
 * and are linked from here rather than re-rendered -- these four pages used to
 * repeat all three, which is why they read as copies of each other.
 *
 * The closing CTA band on every page of the site renders one shared photo
 * (CTA_IMAGE in components/marketing/cta-band.tsx). Because that photo was
 * previously the driveways localImage, content/location-services.ts points the
 * driveways pair at cta-combo-driveways.webp so no page shows it twice.
 */


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
    description: comboMeta.description(serviceRecord.slug, location.city),
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
  const h1 = comboMeta.h1(serviceRecord.slug, location.city);
  const description = comboMeta.description(
    serviceRecord.slug,
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
              <p className="eyebrow flex">{`${serviceRecord.name} · ${location.city}`}</p>
              <h2 className="h2 mt-4">
                What we see on {location.city}{" "}
                {serviceRecord.shortName.toLowerCase()} requests
              </h2>
              <div className="mt-8 max-w-prose space-y-6">
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
              className="scroll-mt-36 border-t py-12 md:py-20"
              style={{ borderColor: "var(--color-line-soft)" }}
            >
              <p className="max-w-prose text-[15px] leading-relaxed text-[color:var(--color-muted)]">
                Sequence, what moves the price, and what to have ready for the
                estimate visit are the same wherever the work happens, so they
                live on{" "}
                <Link
                  href={`/services/${serviceRecord.slug}`}
                  className="underline underline-offset-4"
                >
                  the {serviceRecord.name.toLowerCase()} page
                </Link>{" "}
                rather than being repeated here. Coverage, project type,
                referral agreement and capacity are all checked before your
                details go anywhere &mdash;{" "}
                <Link href="/how-it-works" className="underline underline-offset-4">
                  how a request is routed
                </Link>
                .
              </p>
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
                serviceAreas={serviceAreaOptions}
                outOfAreaValue={OUT_OF_AREA_POSTAL_CODE}
                consentVersion={site.consentVersion}
                fallbackDisplay={site.phoneDisplay}
                fallbackE164={site.phoneE164}
              />
              <div className="card mt-4 p-5">
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

      <Section compact
        tone="surface"
        eyebrow="FAQ"
        title={`${location.city} ${serviceRecord.shortName.toLowerCase()} questions`}
      >
        <FaqSection faqs={record.localFaqs} name="combo-faq" />
      </Section>

      <Section compact eyebrow="Other services" title={`Also routed in ${location.city}`}>
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
        title={serviceRecord.headings.cta}
        body="One request, one eligible independent contractor. If nobody approved for your area can take it, we will tell you plainly."
      />

    </>
  );
}
