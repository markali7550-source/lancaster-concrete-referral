import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/marketing/service-sections";
import { ServicePageTemplate } from "@/components/marketing/service-page-template";
import {
  getLocationService,
  publishedLocationServices,
} from "@/content/location-services";
import { serviceDetails } from "@/content/service-details";
import { getService, publishedServices } from "@/content/services";
import { pageMetadata } from "@/lib/seo/metadata";
import {
  breadcrumbNode,
  buildGraph,
  faqNode,
  serviceNode,
  webPageNode,
} from "@/lib/schema/graph";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedServices.map((service) => ({ service: service.slug }));
}

type Params = Promise<{ service: string }>;

/**
 * 50-60 characters. The long suffix fits most service names; the short suffix
 * keeps the longest names (e.g. "Garage Floor Coatings") inside the range.
 */
function titleFor(name: string) {
  const base = `${name} in Lancaster, SC`;
  const long = `${base} | Local Concrete Service`;
  return long.length <= 60 ? long : `${base} | Local Service`;
}

/**
 * Hub pages answer "what does this cover"; the Lancaster pages answer "who can
 * do this near me". Keeping the two descriptions distinct avoids duplicate meta
 * between /services/[service] and /locations/lancaster-sc/[service].
 */
function descriptionFor(nameLower: string, projectNoun: string) {
  const base = `What ${nameLower} covers in Lancaster, SC, what falls outside it, and how ${/^[aeiou]/i.test(projectNoun) ? "an" : "a"} ${projectNoun} request is handled by our local concrete team.`;
  // Short descriptions get a call to action so they land in the 140-160 range.
  return base.length < 140 ? `${base} Request a free quote.` : base;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: titleFor(service.name),
    description: descriptionFor(service.nameLower, service.projectNoun),
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: { params: Params }) {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;
  const h1 = `${service.name} in Lancaster, SC`;
  const description = descriptionFor(service.nameLower, service.projectNoun);

  const detail = serviceDetails[service.slug];
  // Hero uses the Lancaster location/service page photo for this service.
  const heroPhoto = getLocationService("lancaster-sc", service.slug);

  const graph = buildGraph([
    serviceNode({
      path,
      name: service.name,
      description: service.summary,
      areaServed: ["Lancaster"],
    }),
    webPageNode(path, h1, description),
    breadcrumbNode(path, [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: service.name, path },
    ]),
    faqNode(path, service.considerations),
  ]);

  return (
    <>
      <JsonLd data={graph} />
      <ServicePageTemplate
        service={service}
        detail={detail}
        breadcrumbs={
          <Breadcrumbs
            overlay
            items={[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: service.name },
            ]}
          />
        }
        cityLabel="Lancaster County, South Carolina"
        h1={h1}
        summary={service.heroSummary}
        heroImage={
          heroPhoto
            ? { src: heroPhoto.localImage, alt: heroPhoto.localImageAlt }
            : null
        }
        keyFacts={service.keyFacts}
        faqTitle={service.headings.faq}
        faqs={service.considerations}
        faqName="service-faq"
        relatedServices={publishedServices}
        relatedTitle="Also serving Lancaster"
        localLinks={publishedLocationServices
          .filter((r) => r.serviceSlug === service.slug)
          .map((r) => ({
            href: `/locations/${r.locationSlug}/${r.serviceSlug}`,
            label: `${service.name} in Lancaster, SC`,
          }))}
        ctaTitle={service.headings.cta}
        ctaBody={service.ctaLead}
        defaultServiceSlug={service.slug}
        callCardTitle="Prefer to talk it through?"
        callCardBody="Our team can confirm whether we serve your area before you go any further."
      />
    </>
  );
}
