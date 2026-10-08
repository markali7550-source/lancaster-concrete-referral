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
  ReferralDisclosureStrip,
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
  "Answers about concrete driveways, patios, slabs, and repair, plus how our referral process connects you with one independent provider.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/faq",
});

/**
 * Renders an answer with its declared link substrings wrapped in Links.
 * Each link text occurs exactly once in its answer; unmatched text passes
 * through untouched, so a bad entry degrades to plain text, never to a
 * broken render. The schema keeps the raw string, which is why parity holds.
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
          className="underline underline-offset-4"
        >
          {text}
        </Link>,
        part.slice(at + text.length),
      ];
    });
  });
  return <>{parts}</>;
}

const TONES = ["soft", undefined] as const;

/*
 * Interim hero bytes: a copy of the service-neutral walkway detail from the
 * services index, at a page-unique path so the future real photograph is a
 * byte swap with no code change. The alt describes these bytes, not the
 * replacement.
 */
const FAQ_HERO = {
  src: "/images/faq/faq-hero.webp",
  alt: "Broom finished residential concrete walkway with a tooled control joint and radiused edge beside a lawn",
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
          Short answers about our concrete services and how the referral
          process works, including what we do, what providers do, and which
          areas are covered.
        </p>
      </OverlayHeader>
      <ReferralDisclosureStrip />
      {faqCategories.map((category, index) => (
        <Section
          key={category.id}
          id={category.id}
          tone={TONES[index % TONES.length]}
          eyebrow="FAQ"
          title={category.name}
        >
          <div className="max-w-3xl">
            <FaqSection
              name={`faq-${category.id}`}
              faqs={category.faqs.map((faq) => ({
                question: faq.question,
                answer: linkify(faq.answer, faq.links),
              }))}
            />
            <p className="mt-5">
              <Link
                href={category.more.href}
                className="font-semibold underline underline-offset-4"
                style={{ color: "var(--color-accent)" }}
              >
                {category.more.text} →
              </Link>
            </p>
          </div>
        </Section>
      ))}

      <CtaBand
        title="Still have questions?"
        body="Call the referral team and we will answer directly, or submit a request and let one eligible contractor take it from there."
        showFormLink={false}
      />
    </>
  );
}
