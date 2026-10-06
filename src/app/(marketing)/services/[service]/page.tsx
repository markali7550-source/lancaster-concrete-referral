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
  RoutingControls,
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
  MoreInformation,
  ReferralSteps,
  ServiceCtaBand,
  ServiceDisclosureBlock,
} from "@/components/marketing/service-detail-sections";
import { serviceDetails } from "@/content/service-details";
import { getService, publishedServices } from "@/content/services";
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

/*
 * Section imagery for the service detail pages.
 *
 * The hero and the service card are NOT configured here -- both read
 * `service.image` from content/services.ts and are deliberately left alone.
 * Every map below is a secondary section, and no two service pages share an
 * entry, so each of these pages still renders a distinct set of photos.
 *
 * The closing CTA band is no longer configured here. Every CTA band on the site
 * now renders one shared photo, defined as CTA_IMAGE in
 * components/marketing/cta-band.tsx. Pass imageSrc/imageAlt only to override it.
 */
const SERVICE_DETAIL_IMAGES: Record<string, { src: string; alt: string }> = {
  "concrete-driveways": { src: "/images/driveway-drainage-detail.webp", alt: "Representative driveway edge with drainage pitch and lawn border" },
  "concrete-patios": { src: "/images/patio-backyard-slab.webp", alt: "Representative plain concrete patio slab at the rear of a single-story brick home" },
  "concrete-slabs": { src: "/images/slab-formwork-pad.webp", alt: "Representative freshly poured concrete pad still enclosed by its staked timber side forms" },
  "concrete-repair": { src: "/images/repair-detail-crack.webp", alt: "Representative settled concrete walkway slab with a cracked, lifted edge" },
};

const SERVICE_PROCESS_IMAGES: Record<string, { src: string; alt: string }> = {
  "concrete-driveways": { src: "/images/driveway-pour-joints.webp", alt: "Representative concrete driveway control joints and broom finish" },
  "concrete-patios": { src: "/images/patios-process-walkway.webp", alt: "Representative finished backyard patio with a garden border and seating area" },
  "concrete-slabs": { src: "/images/slabs-process-pad.webp", alt: "Representative finished residential concrete pad set into a lawn" },
  "concrete-repair": { src: "/images/repair-process-trowel.webp", alt: "Representative hand trowel finishing a concrete repair patch" },
};


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

  // `nameLower` carries its own article for countable services ("a concrete
  // driveway") but not for mass nouns ("concrete repair"), so add one only
  // when it is missing.
  const projectPhrase = service.nameLower.startsWith("a ")
    ? service.nameLower
    : `a ${service.nameLower}`;

  const navItems = [
    { id: "scope", label: "What's covered" },
    { id: "more-information", label: "More information" },
    { id: "may-include", label: "May include" },
    { id: "options", label: "Options" },
    { id: "process", label: "Process" },
    { id: "cost", label: "What drives cost" },
    { id: "prepare", label: "Prepare" },
    { id: "routing", label: "How routing works" },
    { id: "how-it-works", label: "How it works" },
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
            <section id="scope" className="scroll-mt-36 py-12 md:py-20">
              <p className="eyebrow flex justify-center before:hidden md:justify-start md:before:block">Scope</p>
              <h2 className="h2 mt-4">
                What we route under {service.name.toLowerCase()}
              </h2>
              <p className="lede mx-auto mt-4 max-w-prose text-center md:mx-0 md:text-left">
                {service.summary}
              </p>
              <div className="mt-8">
                <ScopeColumns
                  covered={service.covered}
                  outOfScope={service.outOfScope}
                />
              </div>
            </section>

            <section id="options" className="scroll-mt-36 border-t py-12 md:py-20" style={{ borderColor: "var(--color-line-soft)" }}>
              <p className="eyebrow flex justify-center before:hidden md:justify-start md:before:block">Specification</p>
              <h2 className="h2 mt-4">
                Choices your contractor will raise
              </h2>
              <p className="lede mx-auto mt-4 max-w-prose text-center md:mx-0 md:text-left">
                We do not specify your project. These are the decisions that
                come up so you are not hearing them for the first time on site.
              </p>
              <div className="mt-8">
                <OptionsList options={service.options} />
              </div>
            </section>

            <section id="process" className="scroll-mt-36 border-t py-12 md:py-20" style={{ borderColor: "var(--color-line-soft)" }}>
              <p className="eyebrow flex justify-center before:hidden md:justify-start md:before:block">Process</p>
              <h2 className="h2 mt-4">
                How a {service.projectNoun} project usually runs
              </h2>
              <p className="lede mx-auto mt-4 max-w-prose text-center md:mx-0 md:text-left">
                Durations below are typical ranges reported by partners, not
                commitments. Your contractor sets the actual schedule.
              </p>
              <div className="mt-8">
                <Timeline phases={service.process} />
              </div>
            </section>

            <section id="cost" className="scroll-mt-36 border-t py-12 md:py-20" style={{ borderColor: "var(--color-line-soft)" }}>
              <p className="eyebrow flex justify-center before:hidden md:justify-start md:before:block">Pricing</p>
              <h2 className="h2 mt-4">
                What actually drives the price
              </h2>
              <p className="lede mx-auto mt-4 max-w-prose text-center md:mx-0 md:text-left">
                We publish no prices, ranges, or per foot figures. Doing so
                would be a guess on a project nobody has seen. What we can do is
                tell you which variables move the number.
              </p>
              <div className="mt-8">
                <CostTable rows={service.costFactors} />
              </div>
            </section>

            <section id="prepare" className="scroll-mt-36 border-t py-12 md:py-20" style={{ borderColor: "var(--color-line-soft)" }}>
              <p className="eyebrow flex justify-center before:hidden md:justify-start md:before:block">Preparation</p>
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

            <section id="routing" className="scroll-mt-36 border-t py-12 md:py-20" style={{ borderColor: "var(--color-line-soft)" }}>
              <p className="eyebrow flex justify-center before:hidden md:justify-start md:before:block">How routing works</p>
              <h2 className="h2 mt-4">
                How your request reaches an independent provider
              </h2>
              <div className="mt-8">
                <RoutingControls />
              </div>
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

      <section id="more-information" className="scroll-mt-32">
        <Section
          eyebrow="More information"
          title={`Understanding ${projectPhrase} project in Lancaster, SC`}
          lead={`A plain language look at what ${projectPhrase} project involves, what homeowners in Lancaster County typically ask about, and what is worth settling before any work begins.`}
        >
          <MoreInformation blocks={detail.moreInfo} />
        </Section>
      </section>

      <section id="may-include" className="scroll-mt-32">
        <Section
          backgroundImage={SERVICE_DETAIL_IMAGES[service.slug]}
          eyebrow="Include"
          title={`What ${projectPhrase} project may include`}
        >
          <MayInclude
            items={detail.mayInclude}
            serviceName={projectPhrase}
          />
        </Section>
      </section>

      <section id="how-it-works" className="scroll-mt-32">
        <Section
          eyebrow="How it works"
          title="Three steps to a referral"
          lead="Requesting a referral takes a few minutes. Here is what happens after you submit your project details."
        >
          <ReferralSteps />
        </Section>
      </section>

      <ServiceDisclosureBlock />

      {cityLinks.length > 0 ? (
        <Section
          eyebrow="Local pages"
          title={`${service.name} by city`}
          compact
          backgroundImage={SERVICE_PROCESS_IMAGES[service.slug]}
        >
          <ul className="flex flex-wrap justify-center gap-3 lg:justify-start">
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

      <section id="faq" className="scroll-mt-32">
        <Section eyebrow="FAQ" title={`${service.name} questions`}>
          <FaqSection faqs={service.considerations} name="service-faq" />
        </Section>
      </section>

      <SectionDivider />

      <Section eyebrow="Other services" title="Also routed in Lancaster">
        <RelatedServices services={publishedServices} currentSlug={service.slug} />
      </Section>


      <ServiceCtaBand
      />

    </>
  );
}
