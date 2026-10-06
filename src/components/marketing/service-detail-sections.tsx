import { Icon } from "@/components/ui/Icon";
import { CtaBand } from "@/components/marketing/cta-band";
import type { ServiceDetail } from "@/content/service-details";
import {
} from "@/components/marketing/sections";
import { SERVICE_PAGE_DISCLOSURE } from "@/lib/seo/disclosure";

/* ------------------------------------------------------- MoreInformation */

/**
 * Narrative explainer. Two columns from lg up so long-form copy does not run
 * the full container width; centered headings on mobile per the brief, with
 * body copy left-aligned because it is multi-line prose.
 */
export function MoreInformation({ blocks }: { blocks: ServiceDetail["moreInfo"] }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
      {blocks.map((block) => (
        <article key={block.heading} className="card flex h-full flex-col p-6">
          <h3 className="text-[17px] font-semibold">
            {block.heading}
          </h3>
          <p className="mt-3 text-[14.5px] leading-relaxed text-[color:var(--color-muted)]">
            {block.body[0]}
          </p>
          <h4 className="mt-4 text-[14px] font-semibold">
            {block.subheading}
          </h4>
          {block.body.slice(1).map((paragraph) => (
            <p
              key={paragraph}
              className="mt-1.5 text-[14.5px] leading-relaxed text-[color:var(--color-muted)]"
            >
              {paragraph}
            </p>
          ))}
        </article>
      ))}
    </div>
  );
}

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
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className="card flex items-start gap-3 p-4"
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
        This list describes components commonly associated with {serviceName}{" "}
        project. It is informational only, and not every participating provider
        offers every item. Confirm scope directly with the provider who contacts
        you.
      </p>
    </div>
  );
}

/* --------------------------------------------------------- ReferralSteps */

const REFERRAL_STEPS = [
  {
    title: "Tell Us About Your Project",
    body: "Submit your project details and location.",
  },
  {
    title: "Request a Referral",
    body: "We connect your request with an independent concrete service provider serving the area.",
  },
  {
    title: "Discuss Your Project",
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
      <div className="container-page py-8">
        <div
          className="rounded-[12px] border p-4 text-[13.5px] font-medium leading-relaxed"
          style={{ borderColor: "var(--color-line)" }}
        >
          {SERVICE_PAGE_DISCLOSURE}
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
  imageSrc,
  imageAlt,
}: {
  title: string;
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <CtaBand
      title={title}
      body="Tell us about your project and location to request a connection with an independent concrete service provider serving your area."
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      actionLabel="Request a Referral"
      actionIcon
    />
  );
}
