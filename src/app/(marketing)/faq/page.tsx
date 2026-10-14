import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  FaqSection,
  OverlayHeader,
  overlayBody,
  overlayEyebrow,
  overlayHeading,
  Section,
} from "@/components/marketing/sections";
import { Breadcrumbs, CtaBand } from "@/components/marketing/service-sections";
import { allFaqsPlain, faqCategories } from "@/content/faq";
import { pageMetadata } from "@/lib/seo/metadata";
import {
  breadcrumbNode,
  buildGraph,
  faqNode,
  webPageNode,
} from "@/lib/schema/graph";
import { site } from "@/lib/env";

const TITLE = `Concrete Services FAQs | ${site.brand}`;
const DESCRIPTION =
  "Answers about driveways, patios, slabs, repair, leveling, sealing, resurfacing, and more, plus how a request moves from your form to a local team.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/faq",
});

/*
 * Real owner-supplied photograph: crew placing a concrete pour. Source
 * kept at real-photos/faq-hero-source.webp for provenance. Unique to
 * this page.
 */
const FAQ_HERO = {
  src: "/images/faq/faq-hero.webp",
  alt: "Workers placing wet concrete inside timber forms, leveling it with long handled tools as a pump hose pours",
};

export default function FaqPage() {
  const graph = buildGraph([
    webPageNode("/faq", TITLE, DESCRIPTION),
    breadcrumbNode("/faq", [
      { name: "Home", path: "/" },
      { name: "FAQ", path: "/faq" },
    ]),
    faqNode("/faq", allFaqsPlain),
  ]);

  return (
    <>
      <JsonLd data={graph} />
      <OverlayHeader
        breadcrumbs={
          <Breadcrumbs
            overlay
            items={[{ name: "Home", path: "/" }, { name: "FAQ" }]}
          />
        }
        imageSrc={FAQ_HERO.src}
        imageAlt={FAQ_HERO.alt}
      >
        <p className="eyebrow" style={{ color: overlayEyebrow }}>
          FAQ
        </p>
        <h1 className="h1 mt-5 max-w-3xl" style={{ color: overlayHeading }}>
          Frequently Asked Questions
        </h1>
        <p className="lede mt-5 max-w-2xl" style={{ color: overlayBody }}>
          Find answers to common questions about our concrete services, project timelines, pricing, and process in Lancaster, SC.
        </p>
      </OverlayHeader>
      {/*
        Every accordion shares the name "faq", so only one answer is open at
        a time across the page.
      */}
      <Section tone="soft">
        <div className="mx-auto w-full max-w-3xl space-y-12">
          {faqCategories.map((category) => (
            <section key={category.id} aria-labelledby={`faq-${category.id}`}>
              <h2 id={`faq-${category.id}`} className="h3">
                {category.name}
              </h2>
              <div className="mt-5">
                <FaqSection name="faq" faqs={category.faqs} />
              </div>
            </section>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Still have questions?"
        body="Call our team and we will answer directly, or submit a request and let one eligible contractor take it from there."
        showFormLink={false}
      />
    </>
  );
}
