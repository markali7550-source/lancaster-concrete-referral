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

/*
 * Interim AI-generated hero bytes, unique to this page. Stands in for a
 * real photograph until the owner supplies one: same path, so the swap
 * needs no code change beyond the alt below. The alt describes these
 * bytes, not the replacement.
 */
const FAQ_HERO = {
  src: "/images/faq/faq-hero.webp",
  alt: "Concrete crew standing beside a newly finished driveway at a brick ranch home, with a mixer truck, hand tools, and red clay soil",
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
      {/*
        One continuous accordion: all categories render as a single mixed
        list with no headers or gaps between them, at the owner's request.
        The guide links survive as one compact row under the list.
      */}
      <Section tone="soft">
        <div className="max-w-3xl">
          <FaqSection
            name="faq"
            faqs={faqCategories.flatMap((category) =>
              category.faqs.map((faq) => ({
                question: faq.question,
                answer: linkify(faq.answer, faq.links),
              })),
            )}
          />
          <p className="mt-6 text-[15px] text-[color:var(--color-muted)]">
            Related guides:{" "}
            {faqCategories.map((category, categoryIndex) => (
              <span key={category.id}>
                {categoryIndex > 0 ? " · " : null}
                <Link
                  href={category.more.href}
                  className="font-semibold underline underline-offset-4"
                  style={{ color: "var(--color-accent)" }}
                >
                  {category.more.text}
                </Link>
              </span>
            ))}
          </p>
        </div>
      </Section>

      <CtaBand
        title="Still have questions?"
        body="Call the referral team and we will answer directly, or submit a request and let one eligible contractor take it from there."
        showFormLink={false}
      />
    </>
  );
}
