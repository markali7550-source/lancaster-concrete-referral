import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  FaqSection,
  HowMatchingWorks,
  OverlayHeader,
  ProjectTypeChooser,
  Section,
  SectionDivider,
  overlayBody,
  overlayEyebrow,
  overlayHeading,
} from "@/components/marketing/sections";
import { Breadcrumbs, CtaBand } from "@/components/marketing/service-sections";
import { publishedServices, serviceCardImageMap } from "@/content/services";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbNode, buildGraph, faqNode, webPageNode } from "@/lib/schema/graph";
import { site } from "@/lib/env";



const TITLE = "Lancaster County Concrete Services | Driveways to Repair";
const DESCRIPTION =
  "Driveways, patios, slabs, repair, foundations, walkways, stamped concrete, and steps in Lancaster, SC. Request a quote from a local provider.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/services",
});

const FAQS = [
  {
    question: "Why is each service on its own page?",
    answer:
      "Each trade has its own page, so the scope, specifications, process, and questions match that one service. Availability depends on the local provider serving your area, and the provider confirms what they take on before any work begins.",
  },
  {
    question: "What happens if my project spans two services?",
    answer:
      "Pick the closest match and describe the rest in the project note. The contractor scopes the whole job on site. The category only affects which participating providers are eligible to receive it.",
  },
  {
    question: "Do you charge to request concrete service?",
    answer:
      "No. Service providers pay us a commission on revenue they actually collect from completed work. Nothing is charged to the homeowner, and that arrangement does not make us a party to your contract.",
  },
];

export default function ServicesPage() {
  const graph = buildGraph([
    webPageNode("/services", TITLE, DESCRIPTION),
    breadcrumbNode("/services", [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ]),
    faqNode("/services", FAQS),
  ]);

  return (
    <>
      <JsonLd data={graph} />
      <OverlayHeader
        breadcrumbs={
          <Breadcrumbs
            overlay
            items={[{ name: "Home", path: "/" }, { name: "Services" }]}
          />
        }
        imageSrc="/images/services/services-index-hero.webp"
        imageAlt="Broom finished residential concrete walkway with a tooled control joint and radiused edge beside a lawn"
      >
        <p
          className="eyebrow"
          style={{ color: overlayEyebrow }}
        >
          Our Concrete Services
        </p>
        <h1
          className="h1 mt-4 max-w-3xl"
          style={{ color: overlayHeading }}
        >
          Concrete Services in Lancaster County, SC
        </h1>
        <p
          className="mt-4 max-w-2xl text-[17px] leading-relaxed"
          style={{ color: overlayBody }}
        >
          Eight residential concrete services, each on its own page. Pick
          the service that matches your project and send a request. A local
          provider reviews it and replies.
        </p>
      </OverlayHeader>

      <Section eyebrow="Choose a service" title="Services we can take on today">
        <ProjectTypeChooser images={serviceCardImageMap} />
      </Section>

      <Section tone="soft" eyebrow="Compare" title="Scope at a glance">
        <div
          tabIndex={0}
          className="max-w-full overflow-x-auto rounded-[12px] border"
          style={{ borderColor: "var(--color-line)", backgroundColor: "var(--color-surface)" }}
        >
          <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
            <caption className="sr-only">
              Comparison of project types served and scope limits by service
            </caption>
            <thead>
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Service</th>
                <th scope="col" className="px-4 py-3 font-semibold">Project types served</th>
                <th scope="col" className="px-4 py-3 font-semibold">Main scope limit</th>
              </tr>
            </thead>
            <tbody>
              {publishedServices.map((service) => (
                <tr key={service.slug} className="border-t" style={{ borderColor: "var(--color-line)" }}>
                  <th scope="row" className="px-4 py-4 align-top font-medium">
                    <a href={`/services/${service.slug}`} className="underline-offset-2 hover:underline">
                      {service.name}
                    </a>
                  </th>
                  <td className="px-4 py-4 align-top text-[color:var(--color-muted)]">
                    {service.projectTypes.join(", ")}
                  </td>
                  <td className="px-4 py-4 align-top text-[color:var(--color-muted)]">
                    {service.outOfScope[0]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/*
        Restored at the owner's explicit direction. I had cut this photograph
        because the clipboard's clip does not resolve into a real mechanism
        (see WEBSITE-AUDIT-2026-10-06). The owner reviewed that finding and
        chose to keep the image, so it stands.

        It shows a provider assessing and quoting on site rather than any one
        finished product, which matches this band's subject and does not
        favor driveways, patios, slabs or repair on the page that lists all
        four. The alt claims no location.
      */}
      <Section
        tone="soft"
        backgroundImage={{
          src: "/images/services/services-index-process.webp",
          alt: "Concrete poured from a mixer and worked with a shovel along a form board, a worker in orange coveralls and boots",
        }}
        eyebrow="Process"
        title="How a request reaches an independent provider"
      >
        <HowMatchingWorks />
      </Section>

      <Section compact eyebrow="Out of scope" title="What we decline outright">
        <div className="card p-6">
          <p className="text-[color:var(--color-muted)]">
            Foundation repair, structural engineering assessments, retaining
            walls, slab jacking, material supply, and commercial contracts are
            not served in Phase 1. These need separate demand, provider, and
            compliance approval, and several of them need a licensed
            professional outside our experienced local concrete teams. We would rather
            tell you that up front than send your project to the wrong trade.
          </p>
        </div>
      </Section>

      <SectionDivider />

      <Section compact eyebrow="FAQ" title="About these services">
        <FaqSection faqs={FAQS} name="services-faq" />
      </Section>

      <CtaBand
        tone="section"
        title="Not sure which service fits?"
        body="Describe the project in the request form and we will pass it to a local independent contractor, or call and our team will tell you whether we cover it at all."
        formHref="/contact#quote-form"
      />

    </>
  );
}
