import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { CtaBand } from "@/components/marketing/cta-band";
import { SERVICE_PAGE_DISCLOSURE } from "@/lib/seo/disclosure";

/* ------------------------------------------------------------ MayInclude */

export function MayInclude({
  items,
  serviceName,
}: {
  items: string[];
  serviceName: string;
  /** Optional legacy image props for backward compatibility */
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <div>
      {/*
        Every service lists seven of these. In a two column grid that is three
        rows plus one card stranded beside half a row of nothing, and each card
        was wide enough for a sentence while holding three words. Balanced
        columns split seven as 3/2/2 with no hole and size the card to its
        label.
      */}
      <ul className="columns-1 gap-3 sm:columns-2 lg:columns-3">
        {items.map((item) => (
          <li
            key={item}
            className="card mb-3 flex break-inside-avoid items-start gap-3 p-4"
          >
            <span
              className="mt-0.5 shrink-0"
              style={{ color: "var(--color-accent)" }}
            >
              <Icon name="check" className="h-4 w-4" />
            </span>
            <span className="text-[14.5px] font-medium">{item}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-[13px] leading-relaxed text-[color:var(--color-muted)]">
        This list describes components commonly associated with a {serviceName}{" "}
        project. It is informational only, and not every participating provider
        offers every item. Confirm scope directly with the provider who contacts
        you.
      </p>
    </div>
  );
}

/* --------------------------------------------------------- ReferralSteps */

/*
  Sentence case, matching every other heading on the site ("Three steps, no
  obligation", "Diagnosis on site", "What a repair project may include").
  These three were Title Case, which was the only place that happened and
  which reads as template output.
*/
const REFERRAL_STEPS = [
  {
    title: "Tell us about your project",
    body: "Submit your project details and location.",
  },
  {
    title: "Request a referral",
    body: "We connect your request with an independent concrete service provider serving the area.",
  },
  {
    title: "Discuss your project",
    body: "The independent provider can contact you to discuss the project, availability, and next steps.",
  },
] as const;

export function ReferralSteps() {
  return (
    <div>
      <ol className="grid gap-5 md:grid-cols-3">
        {REFERRAL_STEPS.map((step, index) => (
          <li key={step.title} className="card process-step-card flex h-full flex-col p-6">
            <span
              className="grid h-10 w-10 place-items-center rounded-full text-[15px] font-bold"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "var(--color-on-accent)",
              }}
            >
              {index + 1}
            </span>
            <p className="mt-4 text-[16px] font-semibold">
              Step {index + 1}: {step.title}
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--color-muted)]">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------- ServiceDisclosureBlock */

/**
 * The wording is unchanged and still states the full position. The container
 * is not: this used to be a bordered box inside a bordered, padded band, so a
 * single sentence of small print got more chrome than any real section on the
 * page and left a pale gap between two photographs. It now uses the same
 * compact strip as the disclosure under the hero.
 */
export function ServiceDisclosureBlock() {
  return (
    <section
      aria-label="Referral disclosure"
      className="border-y"
      style={{
        borderColor: "var(--color-line-soft)",
        backgroundColor: "var(--color-surface)",
      }}
    >
      <div className="container-page flex flex-col gap-2 py-3.5 text-[13.5px] leading-relaxed sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-2.5">
          <span style={{ color: "var(--color-accent)" }}>
            <Icon name="shield" className="mt-px h-[18px] w-[18px]" />
          </span>
          <span>{SERVICE_PAGE_DISCLOSURE}</span>
        </p>
        <Link
          href="/referral-disclosure"
          className="shrink-0 self-center font-semibold underline underline-offset-4 sm:self-auto"
          style={{ color: "var(--color-accent)" }}
        >
          Full disclosure
        </Link>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- ServiceCtaBand */

/**
 * Closing call to action. The heading comes from the service's own `headings.cta`
 * so the four service pages do not all close on the same sentence; the body and
 * the actions are fixed by the publisher.
 */
export function ServiceCtaBand({
  title,
  body,
}: {
  title: string;
  /** Required, and service-specific. This used to be one hardcoded sentence,
   *  so all four service pages closed on identical copy. */
  body: string;
}) {
  return (
    <CtaBand
      title={title}
      body={body}
      actionLabel="Request a referral"
      actionIcon
    />
  );
}
