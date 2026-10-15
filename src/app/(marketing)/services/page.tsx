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



const TITLE = "Concrete Services in Lancaster County, SC | Local Service";
const DESCRIPTION =
  "Driveways, patios, slabs, repair, foundations, walkways, stamped concrete, and steps in Lancaster, SC. Request a free on-site consultation today.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/services",
});

const FAQS = [
  {
    question: "What concrete services do you offer in Lancaster?",
    answer:
      "Our dedicated local crew performs residential concrete work in Lancaster, including driveways, patios, walkways, foundations, slab pouring, concrete repairs, and decorative stamped concrete.",
  },
  {
    question: "Can I combine multiple concrete services into one project?",
    answer:
      "Yes. Many homeowners combine services, such as a new driveway with a matching front walkway or back patio. Tell us about the full project, and we will bundle the work into a single written estimate.",
  },
  {
    question: "Are project estimates and on site visits free?",
    answer:
      "Requesting a quote is free with no obligation. Our project managers will confirm any on site visit details with you before they come out.",
  },
  {
    question: "Do you handle both standard and decorative/stamped concrete?",
    answer:
      "Yes. We specialize in clean broom finish concrete as well as custom decorative options, including stamped textures, custom stains, and exposed aggregate.",
  },
  {
    question: "Are you licensed and insured in South Carolina?",
    answer:
      "We will provide our license and insurance details before you sign. You can also verify them through SC LLR at any time.",
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
        imageAlt="Workers in hard hats guiding a concrete pump hose over a steel rebar grid during a pour"
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
          Fourteen residential concrete services, each on its own page. Pick the service that fits your project and request a free consultation. A project manager from our local team reviews it and replies.
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
        because the clipboard's clip does not resolve into a real mechanism.
        The owner reviewed that finding and
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
        title="How we schedule your project"
      >
        <HowMatchingWorks />
      </Section>

      <Section compact eyebrow="SCOPE & SPECIALIZATION" title="Projects Outside Our Scope">
        <div className="card p-6">
          <p className="text-[color:var(--color-muted)]">
            To deliver the highest quality results, our crew focuses
            specifically on residential concrete flatwork, installations, and
            surface care. We do not provide major structural foundation
            repairs, retaining walls, mudjacking/slab jacking, raw materials
            delivery, or heavy commercial contracts. We believe in being upfront,
            so you know exactly what we can and cannot take on for your project.
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
        body="Tell us about your concrete project to request a free, no-obligation on-site consultation from our local team, or give us a call to discuss your project today."
        formHref="/contact#quote-form"
      />

    </>
  );
}
