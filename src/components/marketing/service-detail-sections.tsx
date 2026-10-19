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
            className="card mb-3 flex break-inside-avoid flex-col items-center gap-3 p-4 text-center lg:flex-row lg:items-start lg:text-left"
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
        This list describes components commonly associated with {/^[aeiou]/i.test(serviceName) ? "an" : "a"} {serviceName}{" "}
        project. It is informational only, and not every local contractor
        offers every item. Confirm scope directly with the contractor who contacts
        you.
      </p>
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
      aria-label="Service disclosure"
      className="border-y"
      style={{
        borderColor: "var(--color-line-soft)",
        backgroundColor: "var(--color-surface)",
      }}
    >
      <div className="container-page py-6 [text-align:left] text-[13.5px] leading-relaxed">
        <div className="mx-auto flex max-w-3xl items-start gap-3.5 p-4 sm:gap-4 sm:p-5">
          <span className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-accent)" }}>
            <Icon name="shield" className="h-[18px] w-[18px]" />
          </span>
          <div className="min-w-0">
            <p className="[text-align:left]">{SERVICE_PAGE_DISCLOSURE}</p>
            <Link
              href="/service-disclosure"
              className="mt-2 block font-semibold underline underline-offset-4 sm:inline-block"
              style={{ color: "var(--color-accent)" }}
            >
              Full disclosure
            </Link>
          </div>
        </div>
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
      actionLabel="Request Concrete Service"
      actionIcon
    />
  );
}
