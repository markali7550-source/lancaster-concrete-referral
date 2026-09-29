import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  FaqSection,
  HowMatchingWorks,
  ProjectTypeChooser,
  ReferralDisclosureStrip,
  Section,
} from "@/components/marketing/sections";
import { Breadcrumbs, CtaBand } from "@/components/marketing/service-sections";
import { publishedServices } from "@/content/services";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbNode, buildGraph, faqNode, webPageNode } from "@/lib/schema/graph";
import { site } from "@/lib/env";

const TITLE = `Concrete Services in Lancaster, SC | ${site.brand}`;
const DESCRIPTION =
  "Driveways, patios, slabs, and non-structural repair in Lancaster, SC. See what each referral covers, what is out of scope, and how requests reach an independent contractor.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/services",
});

const FAQS = [
  {
    question: "Why are only four services listed?",
    answer:
      "Each service here has at least one partner with written coverage for Lancaster areas and an approved content and compliance review. We add a service when that is true, not when there is search demand for it.",
  },
  {
    question: "What happens if my project spans two services?",
    answer:
      "Pick the closest match and describe the rest in the project note. The contractor scopes the whole job on site — the category only affects which partners are eligible to receive it.",
  },
  {
    question: "Do you charge for the referral?",
    answer:
      "No. Contractors pay us a commission on revenue they actually collect from completed work. Nothing is charged to the homeowner, and that arrangement does not make us a party to your contract.",
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
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Services" }]} />

      <section className="border-b" style={{ borderColor: "var(--color-line)" }}>
        <div className="container-page py-12 md:py-16">
          <p className="eyebrow">Service directory</p>
          <h1 className="mt-3 max-w-3xl text-[2rem] font-semibold leading-[1.12] md:text-[2.75rem]">
            Concrete Services We Route in Lancaster County, SC
          </h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-[color:var(--color-muted)]">
            Four residential concrete services, each with at least one
            independent contractor holding written coverage for the Lancaster
            area. Pick the closest match and we route your
            request to one eligible partner.
          </p>
        </div>
      </section>

      <ReferralDisclosureStrip />

      <Section eyebrow="Choose a service" title="What we can route today">
        <ProjectTypeChooser />
      </Section>

      <Section tone="soft" eyebrow="Compare" title="Scope at a glance">
        <div
          className="overflow-x-auto rounded-[16px] border"
          style={{ borderColor: "var(--color-line)", backgroundColor: "var(--color-surface)" }}
        >
          <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
            <caption className="sr-only">
              Comparison of routed project types and scope limits by service
            </caption>
            <thead>
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Service</th>
                <th scope="col" className="px-4 py-3 font-semibold">Routed project types</th>
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

      <Section eyebrow="Process" title="How a request reaches a contractor">
        <HowMatchingWorks />
      </Section>

      <CtaBand
        title="Not sure which service fits?"
        body="Describe the project in the quote form and we will route it on the closest match, or call and our referral team will tell you whether we cover it at all."
      />

      <Section eyebrow="Out of scope" title="What we decline outright">
        <div className="card max-w-3xl p-6">
          <p className="text-[color:var(--color-muted)]">
            Foundation repair, structural engineering assessments, retaining
            walls, slab jacking, material supply, and commercial contracts are
            not routed in Phase 1. These need separate demand, partner, and
            compliance approval, and several of them need a licensed
            professional we do not currently work with. We would rather tell you
            no than hand your project to the wrong trade.
          </p>
        </div>
      </Section>

      <Section eyebrow="FAQ" title="About these services">
        <div className="max-w-3xl">
          <FaqSection faqs={FAQS} />
        </div>
      </Section>
    </>
  );
}
