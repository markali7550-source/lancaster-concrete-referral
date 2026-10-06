import { Icon } from "@/components/ui/Icon";
import { CtaBand } from "@/components/marketing/cta-band";
import {
} from "@/components/marketing/sections";
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
