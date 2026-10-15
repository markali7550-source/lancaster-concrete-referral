import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/marketing/service-sections";
import { ServicePageTemplate } from "@/components/marketing/service-page-template";
import type { LocationLayout } from "@/components/marketing/service-page-template";
import { serviceDetails } from "@/content/service-details";
import {
  LOCAL_SOIL_BY_SERVICE,
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

  const soil = LOCAL_SOIL_BY_SERVICE[serviceRecord.slug];
  const locationLayout: LocationLayout = {
    quoteTitle: "Request a quote",
    quoteBody:
      "Tell us about your project and where it is. A local contractor contacts you to confirm the scope and give you a quote directly.",
    climateTitle: soil.title,
    climate: soil.paragraphs,
    neighborhoodsTitle: "Communities near Lancaster",
    neighborhoods: [
      "City of Lancaster",
      "Kershaw",
      "Heath Springs",
      "Van Wyck",
      "Buford",
    ],
  };

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
      <div className="location-polish">
      <ServicePageTemplate
        service={serviceRecord}
        detail={detail}
        breadcrumbs={
          <Breadcrumbs
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
        locationLayout={locationLayout}
        cityLabel={`${location.city}, ${location.region}`}
        h1={h1}
        summary={description}
        heroImage={{ src: record.localImage, alt: record.localImageAlt }}
        keyFacts={[
          { label: "Service", value: serviceRecord.name },
          { label: "Area", value: `${location.city}, ${location.county}` },
          { label: "Project types served", value: serviceRecord.projectTypes.join(" · ") },
          { label: "Cost to you", value: "No charge for the quote request" },
        ]}
        localIntro={{
          eyebrow: `${serviceRecord.name} · ${location.city}`,
          title: `What affects ${/^[aeiou]/i.test(serviceRecord.projectNoun) ? "an" : "a"} ${serviceRecord.projectNoun} project in ${location.city}`,
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
        relatedTitle={`Also serving ${location.city}`}
        ctaTitle={serviceRecord.headings.cta}
        ctaBody={serviceRecord.ctaLead}
        defaultServiceSlug={serviceRecord.slug}
        callCardTitle="Questions before you request a quote?"
        callCardBody={`Call to ask whether a local contractor serves your address in ${location.city}, ${location.region}.`}
      />
      </div>
    </>
  );
}
