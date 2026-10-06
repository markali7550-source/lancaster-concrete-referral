import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { QuoteForm } from "@/components/lead/QuoteForm";
import {
  FaqSection,
  ReferralDisclosureStrip,
  Section,
  SectionDivider,
} from "@/components/marketing/sections";
import {
  Breadcrumbs,
  CostTable,
  InPageNav,
  KeyFacts,
  OptionsList,
  PrepColumns,
  RelatedServices,
  ScopeColumns,
  ServiceHero,
  Timeline,
} from "@/components/marketing/service-sections";
import {
  MayInclude,
  ReferralSteps,
  ServiceCtaBand,
  ServiceDisclosureBlock,
} from "@/components/marketing/service-detail-sections";
import { serviceDetails } from "@/content/service-details";
import {
  getService,
  publishedServices,
  type ServiceSectionId,
} from "@/content/services";
import { publishedLocationServices } from "@/content/location-services";
import { OUT_OF_AREA_POSTAL_CODE, getLocation, serviceAreaOptions } from "@/content/locations";
import { site } from "@/lib/env";
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

function titleFor(name: string) {
  return `${name} in Lancaster, SC | Contractor Referrals`;
}

/**
 * Hub pages answer "what does this cover"; the Lancaster pages answer "who can
 * do this near me". Keeping the two descriptions distinct avoids duplicate meta
 * between /services/[service] and /locations/lancaster-sc/[service].
 */
function descriptionFor(nameLower: string, projectNoun: string) {
  return `What ${nameLower} referral covers in Lancaster, SC, what falls outside it, and how your ${projectNoun} request reaches an independent service provider.`;
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
  const h1 = `${service.name} in Lancaster County, SC`;
  const description = descriptionFor(service.nameLower, service.projectNoun);

  const cityLinks = publishedLocationServices
    .filter((record) => record.serviceSlug === service.slug)
    .map((record) => ({ record, location: getLocation(record.locationSlug) }))
    .filter(
      (entry): entry is { record: (typeof publishedLocationServices)[number]; location: NonNullable<ReturnType<typeof getLocation>> } =>
        Boolean(entry.location),
    );

  const detail = serviceDetails[service.slug];

  /*
   * Built from the service's own sectionOrder so the sub-nav always matches
   * the order the sections are actually rendered in. Hardcoding it meant the
   * nav claimed every page ran scope -> options -> process -> cost -> prepare,
   * which stopped being true once the pages were allowed to differ.
   */
  const mainNavLabels: Record<ServiceSectionId, string> = {
    scope: "What's covered",
    options: "Options",
    process: "Process",
    cost: "What drives cost",
    prepare: "Prepare",
  };

  const navItems = [
    ...service.sectionOrder.map((id) => ({ id, label: mainNavLabels[id] })),
    { id: "quote-form", label: "Get a quote" },
    { id: "faq", label: "FAQ" },
  ];

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
      <ServiceHero
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
        service={service}
        cityLabel="Lancaster County, South Carolina"
        h1={h1}
        summary={service.heroSummary}
      />
      <KeyFacts facts={service.keyFacts} />
      <ReferralDisclosureStrip />
      <InPageNav items={navItems} />

      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
          {/* ---------------------------------------------------- Main column */}
          <div className="min-w-0 lg:col-span-7 xl:col-span-8">
            {service.sectionOrder.map((id, index) => {
              /*
               * Rendered from the service's own sectionOrder, not a fixed
               * sequence, so the four pages lead with whatever actually
               * matters for that job. The first section carries no top rule
               * and the rest are separated by one, wherever they land.
               */
              const first = index === 0;
              const cls = first
                ? "scroll-mt-36 py-12 md:py-20"
                : "scroll-mt-36 border-t py-12 md:py-20";
              const style = first
                ? undefined
                : { borderColor: "var(--color-line-soft)" };

              if (id === "scope") {
                return (
                  <section key={id} id="scope" className={cls} style={style}>
                    <p className="eyebrow flex">Scope</p>
                      <h2 className="h2 mt-4">
                        {service.headings.scope}
                      </h2>
                    <p className="lede mt-4 max-w-prose">{service.summary}</p>
                    <div className="mt-8">
                      <ScopeColumns
                        covered={service.covered}
                        outOfScope={service.outOfScope}
                      />
                    </div>
                  </section>
                );
              }

              if (id === "options") {
                return (
                  <section key={id} id="options" className={cls} style={style}>
                    <p className="eyebrow flex">Specification</p>
                    <h2 className="h2 mt-4">{service.headings.options}</h2>
                    <p className="lede mt-4 max-w-prose">
                      {service.optionsLead}
                    </p>
                    <div className="mt-8">
                      <OptionsList options={service.options} />
                    </div>
                  </section>
                );
              }

              if (id === "process") {
                return (
                  <section key={id} id="process" className={cls} style={style}>
                    <p className="eyebrow flex">Process</p>
                    <h2 className="h2 mt-4">{service.headings.process}</h2>
                    <p className="lede mt-4 max-w-prose">
                      {service.processLead}
                    </p>
                    <div className="mt-8">
                      <Timeline phases={service.process} />
                    </div>
                  </section>
                );
              }

              if (id === "cost") {
                return (
                  <section key={id} id="cost" className={cls} style={style}>
                    <p className="eyebrow flex">Pricing</p>
                    <h2 className="h2 mt-4">{service.headings.cost}</h2>
                    <p className="lede mt-4 max-w-prose">{service.costLead}</p>
                    <div className="mt-8">
                      <CostTable rows={service.costFactors} />
                    </div>
                  </section>
                );
              }

              return (
                <section key={id} id="prepare" className={cls} style={style}>
                  <p className="eyebrow flex">Preparation</p>
                  <h2 className="h2 mt-4">{service.headings.prepare}</h2>
                  <div className="mt-8">
                    <PrepColumns
                      checklist={service.prepChecklist}
                      questions={service.quoteQuestions}
                    />
                  </div>
                </section>
              );
            })}

            {/*
              The four routing controls used to be repeated in full here, on
              every service page, every combo page and the home page -- the
              same four paragraphs on eleven URLs. They are explained once, on
              /how-it-works, and linked from the places that need them.
            */}
            <section className="scroll-mt-36 border-t py-10" style={{ borderColor: "var(--color-line-soft)" }}>
              <p className="max-w-prose text-[15px] leading-relaxed text-[color:var(--color-muted)]">
                Before anything is sent we check written coverage, project type,
                an active referral agreement and current capacity.{" "}
                <Link href="/how-it-works" className="underline underline-offset-4">
                  How a request is checked and routed
                </Link>
                .
              </p>
            </section>
          </div>

          {/* ------------------------------------------------------- Sidebar */}
          <aside className="order-first min-w-0 lg:order-none lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-[7.5rem] lg:pt-2 lg:pb-12">
              <QuoteForm
                services={publishedServices.map((s) => ({
                  slug: s.slug,
                  name: s.name,
                }))}
                defaultServiceSlug={service.slug}
                serviceAreas={serviceAreaOptions}
                outOfAreaValue={OUT_OF_AREA_POSTAL_CODE}
                consentVersion={site.consentVersion}
                fallbackDisplay={site.phoneDisplay}
                fallbackE164={site.phoneE164}
              />
              <div className="card mt-4 p-5">
                <p className="text-sm font-semibold">Prefer to talk it through?</p>
                <p className="mt-1.5 text-sm text-[color:var(--color-muted)]">
                  Our referral team can confirm whether we have approved
                  coverage for your area before you go any further.
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

      <SectionDivider />

      <ServiceDisclosureBlock />

      {/*
        One city is one sentence, not a directory. This was a full section --
        eyebrow, heading, background photograph -- wrapped around a single
        link, which is what a multi-city template looks like when only one row
        of data exists. It returns to a section if the list ever grows.
      */}
      {cityLinks.length > 0 ? (
        <div className="container-page py-10">
          <p className="max-w-prose text-[15px] leading-relaxed text-[color:var(--color-muted)]">
            {cityLinks.length === 1 ? "Local page: " : "Local pages: "}
            {cityLinks.map(({ record, location }, index) => (
              <span key={record.locationSlug}>
                {index > 0 ? ", " : ""}
                <Link
                  href={`/locations/${record.locationSlug}/${record.serviceSlug}`}
                  className="underline underline-offset-4"
                >
                  {service.nameLower} in {location.city}
                </Link>
              </span>
            ))}
            .
          </p>
        </div>
      ) : null}

      <section id="faq" className="scroll-mt-32">
        <Section compact eyebrow="FAQ" title={service.headings.faq}>
          <FaqSection faqs={service.considerations} name="service-faq" />
        </Section>
      </section>

      <SectionDivider />

      <Section compact eyebrow="Other services" title="Also routed in Lancaster">
        <RelatedServices services={publishedServices} currentSlug={service.slug} />
      </Section>


      <ServiceCtaBand
        title={service.headings.cta}
        body={service.ctaLead}
      />

    </>
  );
}
