import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
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
import {
  allFaqsPlain,
  faqCategories,
  type FaqLink,
} from "@/content/faq";
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

/**
 * Renders an answer with its declared link substrings wrapped in internal
 * links. Each link text occurs in its answer; unmatched text passes through
 * as plain text. The schema keeps the raw string, so the two stay in step.
 */
function linkify(answer: string, links: readonly FaqLink[]): ReactNode {
  let parts: ReactNode[] = [answer];
  links.forEach(({ text, href }, index) => {
    parts = parts.flatMap((part): ReactNode[] => {
      if (typeof part !== "string") return [part];
      const at = part.indexOf(text);
      if (at === -1) return [part];
      return [
        part.slice(0, at),
        <Link
          key={`${index}-${at}`}
          href={href}
          className="font-medium text-[color:var(--color-accent)] underline underline-offset-4 decoration-[color:var(--color-accent)]/40 transition-colors duration-150 hover:decoration-[color:var(--color-accent)]"
        >
          {text}
        </Link>,
        part.slice(at + text.length),
      ];
    });
  });
  return <>{parts}</>;
}

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
        Each category is its own single-open accordion. Answers link to the
        matching service page where a service is named.
      */}
      <Section tone="soft">
        <div className="mx-auto w-full max-w-3xl space-y-12">
          {faqCategories.map((category) => (
            <section key={category.id} aria-labelledby={`faq-${category.id}`}>
              <h2 id={`faq-${category.id}`} className="h3">
                {category.name}
              </h2>
              <div className="mt-5">
                <FaqSection
                  faqs={category.faqs.map((faq) => ({
                    question: faq.question,
                    answer: linkify(faq.answer, faq.links),
                  }))}
                />
              </div>
            </section>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Still have questions?"
        body="Call our team and we will answer directly, or submit a request and one of our project managers will contact you."
        showFormLink={false}
      />
    </>
  );
}
