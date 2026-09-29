import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { QuoteForm } from "@/components/lead/QuoteForm";
import { MobileActionBar } from "@/components/lead/MobileActionBar";
import {
  DecisionSupport,
  FaqSection,
  ReferralDisclosureStrip,
  Section,
  VettingProcess,
} from "@/components/marketing/sections";
import {
  Breadcrumbs,
  CostTable,
  CtaBand,
  InPageNav,
  KeyFacts,
  OptionsList,
  PrepColumns,
  RelatedServices,
  ScopeColumns,
  ServiceHero,
  Timeline,
} from "@/components/marketing/service-sections";
import { getService, publishedServices } from "@/content/services";
import { publishedLocationServices } from "@/content/location-services";
import { getLocation } from "@/content/locations";
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

function descriptionFor(nameLower: string) {
  return `Need ${nameLower} in Lancaster, SC? Call now or request a quote. We connect you with an independent local concrete contractor. Availability varies.`;
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
    description: descriptionFor(service.nameLower),
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: { params: Params }) {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;
  const h1 = `${service.name} in Lancaster County, SC`;
  const description = descriptionFor(service.nameLower);

  const cityLinks = publishedLocationServices
    .filter((record) => record.serviceSlug === service.slug)
    .map((record) => ({ record, location: getLocation(record.locationSlug) }))
    .filter(
      (entry): entry is { record: (typeof publishedLocationServices)[number]; location: NonNullable<ReturnType<typeof getLocation>> } =>
        Boolean(entry.location),
    );

  const navItems = [
    { id: "scope", label: "What's covered" },
    { id: "options", label: "Options" },
    { id: "process", label: "Process" },
    { id: "cost", label: "What drives cost" },
    { id: "prepare", label: "Prepare" },
    { id: "vetting", label: "Partner checks" },
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
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name },
        ]}
      />
      <ServiceHero
        service={service}
        cityLabel="Lancaster County, South Carolina"
        h1={h1}
        summary={service.heroSummary}
      />
      <KeyFacts facts={service.keyFacts} />
      <ReferralDisclosureStrip />
      <InPageNav items={navItems} />

      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ---------------------------------------------------- Main column */}
          <div className="lg:col-span-7 xl:col-span-8">
            <section id="scope" className="scroll-mt-36 py-16">
              <p className="eyebrow">Scope</p>
              <h2 className="h2 mt-4">
                What we route under {service.name.toLowerCase()}
              </h2>
              <p className="lede mt-4 max-w-prose">
                {service.summary}
              </p>
              <div className="mt-8">
                <ScopeColumns
                  covered={service.covered}
                  outOfScope={service.outOfScope}
                />
              </div>
            </section>

            <section id="options" className="scroll-mt-36 border-t py-16" style={{ borderColor: "var(--color-line-soft)" }}>
              <p className="eyebrow">Specification</p>
              <h2 className="h2 mt-4">
                Choices your contractor will raise
              </h2>
              <p className="lede mt-4 max-w-prose">
                We do not specify your project. These are the decisions that
                come up so you are not hearing them for the first time on site.
              </p>
              <div className="mt-8">
                <OptionsList options={service.options} />
              </div>
            </section>

            <section id="process" className="scroll-mt-36 border-t py-16" style={{ borderColor: "var(--color-line-soft)" }}>
              <p className="eyebrow">Process</p>
              <h2 className="h2 mt-4">
                How a {service.shortName.toLowerCase().replace(/s$/, "")} project usually runs
              </h2>
              <p className="lede mt-4 max-w-prose">
                Durations below are typical ranges reported by partners, not
                commitments. Your contractor sets the actual schedule.
              </p>
              <div className="mt-8">
                <Timeline phases={service.process} />
              </div>
            </section>

            <section id="cost" className="scroll-mt-36 border-t py-16" style={{ borderColor: "var(--color-line-soft)" }}>
              <p className="eyebrow">Pricing</p>
              <h2 className="h2 mt-4">
                What actually drives the price
              </h2>
              <p className="lede mt-4 max-w-prose">
                We publish no prices, ranges, or per-foot figures. Doing so
                would be a guess on a project nobody has seen. What we can do is
                tell you which variables move the number.
              </p>
              <div className="mt-8">
                <CostTable rows={service.costFactors} />
              </div>
            </section>

            <section id="prepare" className="scroll-mt-36 border-t py-16" style={{ borderColor: "var(--color-line-soft)" }}>
              <p className="eyebrow">Preparation</p>
              <h2 className="h2 mt-4">
                Get more out of the estimate visit
              </h2>
              <div className="mt-8">
                <PrepColumns
                  checklist={service.prepChecklist}
                  questions={service.quoteQuestions}
                />
              </div>
            </section>

            <section id="vetting" className="scroll-mt-36 border-t py-16" style={{ borderColor: "var(--color-line-soft)" }}>
              <p className="eyebrow">Partner checks</p>
              <h2 className="h2 mt-4">
                What we verify before routing your request
              </h2>
              <div className="mt-8">
                <VettingProcess />
              </div>
            </section>
          </div>

          {/* ------------------------------------------------------- Sidebar */}
          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-[11rem] lg:py-12">
              <QuoteForm
                services={publishedServices.map((s) => ({
                  slug: s.slug,
                  name: s.name,
                }))}
                defaultServiceSlug={service.slug}
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

      <CtaBand
        title={`Ready to get matched for ${service.nameLower}?`}
        body="One request, one eligible independent contractor, no charge to you. If nobody approved for your area can take it, we will say so plainly."
      />

      {cityLinks.length > 0 ? (
        <Section eyebrow="Local pages" title={`${service.name} by city`}>
          <ul className="flex flex-wrap gap-3">
            {cityLinks.map(({ record, location }) => (
              <li key={record.locationSlug}>
                <Link
                  href={`/locations/${record.locationSlug}/${record.serviceSlug}`}
                  className="btn btn-secondary"
                >
                  {service.name} in {location.city}, {location.region}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section
        tone="soft"
        eyebrow="Before you call"
        title="Worth settling first"
      >
        <div className="max-w-3xl">
          <DecisionSupport items={service.considerations} />
        </div>
      </Section>

      <section id="faq" className="scroll-mt-32">
        <Section eyebrow="FAQ" title={`${service.name} questions`}>
          <div className="max-w-3xl">
            <FaqSection faqs={service.considerations} />
          </div>
        </Section>
      </section>

      <Section eyebrow="Other services" title="Also routed in Lancaster">
        <RelatedServices services={publishedServices} currentSlug={service.slug} />
      </Section>

      <MobileActionBar
        fallbackDisplay={site.phoneDisplay}
        fallbackE164={site.phoneE164}
      />
    </>
  );
}
