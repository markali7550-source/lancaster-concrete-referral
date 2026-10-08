import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/marketing/service-sections";
import { ServicePageTemplate } from "@/components/marketing/service-page-template";
import { serviceDetails } from "@/content/service-details";
import {
  getLocationService,
  publishedLocationServices,
} from "@/content/location-services";
import { getLocation } from "@/content/locations";
import { getService, publishedServices } from "@/content/services";
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
 * Location/service pages render the same master template as the service hubs:
 * same sections, same order, same components, same spacing. Only the title,
 * the city-specific text (the local intro, FAQs, key facts and call card)
 * and the image differ.
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

  const detail = serviceDetails[serviceRecord.slug];

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
      <ServicePageTemplate
        service={serviceRecord}
        detail={detail}
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
        cityLabel={`${location.city}, ${location.region}`}
        h1={h1}
        summary={description}
        keyFacts={[
          { label: "Service", value: serviceRecord.name },
          { label: "Area", value: `${location.city}, ${location.county}` },
          { label: "Routed project types", value: serviceRecord.projectTypes.join(" · ") },
          { label: "Cost to you", value: "No charge for the referral" },
        ]}
        localIntro={{
          eyebrow: `${serviceRecord.name} · ${location.city}`,
          title: `What affects a ${serviceRecord.projectNoun} project in ${location.city}`,
          blocks: record.localBody,
        }}
        faqTitle={`${location.city} ${serviceRecord.projectNoun} questions`}
        faqs={record.localFaqs}
        faqName="combo-faq"
        relatedServices={publishedServices.filter((s) =>
          publishedLocationServices.some(
            (r) =>
              r.locationSlug === location.slug && r.serviceSlug === s.slug,
          ),
        )}
        relatedBasePath={`/locations/${location.slug}`}
        relatedTitle={`Also routed in ${location.city}`}
        ctaTitle={serviceRecord.headings.cta}
        ctaBody={serviceRecord.ctaLead}
        defaultServiceSlug={serviceRecord.slug}
        callCardTitle="Checking coverage first?"
        callCardBody={`We route ${location.city}, ${location.region} today. Call and we will confirm in a minute.`}
      />
    </>
  );
}
