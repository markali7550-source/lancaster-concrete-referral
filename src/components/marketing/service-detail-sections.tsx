import Image from "next/image";
import { DynamicPhone } from "@/components/lead/DynamicPhone";
import { Icon } from "@/components/ui/Icon";
import type { ServiceDetail } from "@/content/service-details";
import { site } from "@/lib/env";
import { SERVICE_PAGE_DISCLOSURE } from "@/lib/seo/disclosure";

/* ------------------------------------------------------- MoreInformation */

/**
 * Narrative explainer. Two columns from lg up so long-form copy does not run
 * the full container width; centred headings on mobile per the brief, with
 * body copy left-aligned because it is multi-line prose.
 */
export function MoreInformation({ blocks }: { blocks: ServiceDetail["moreInfo"] }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
      {blocks.map((block) => (
        <article key={block.heading} className="card flex h-full flex-col p-6">
          <h3 className="text-center text-[17px] font-semibold lg:text-left">
            {block.heading}
          </h3>
          <p className="mt-3 text-center text-[14.5px] leading-relaxed text-[color:var(--color-muted)] lg:text-left">
            {block.body[0]}
          </p>
          <h4 className="mt-4 text-center text-[14px] font-semibold lg:text-left">
            {block.subheading}
          </h4>
          {block.body.slice(1).map((paragraph) => (
            <p
              key={paragraph}
              className="mt-1.5 text-center text-[14.5px] leading-relaxed text-[color:var(--color-muted)] lg:text-left"
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
  imageSrc,
  imageAlt,
}: {
  items: string[];
  serviceName: string;
  /** Supporting photo of the work this scope list describes. */
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="min-w-0 lg:col-span-7">
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="card flex items-start justify-center gap-3 p-4 text-center lg:justify-start lg:text-left">
            <span className="mt-0.5 shrink-0" style={{ color: "var(--color-accent)" }}>
              <Icon name="check" className="h-4 w-4" />
            </span>
            <span className="text-[14.5px] font-medium">{item}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-center text-[13px] leading-relaxed text-[color:var(--color-muted)] lg:text-left">
        This list describes components commonly associated with {serviceName}{" "}
        project. It is informational only, and not every participating provider
        offers every item. Confirm scope directly with the provider who contacts
        you.
      </p>
      </div>
      {imageSrc ? (
        <figure className="card mx-auto w-full max-w-md min-w-0 overflow-hidden lg:col-span-5 lg:mx-0 lg:max-w-none">
          <div className="relative aspect-[4/3]">
            <Image
              src={imageSrc}
              alt={imageAlt ?? ""}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              aria-hidden="true"
              style={{
                background:
                  "linear-gradient(180deg, transparent 42%, rgba(7,11,9,0.62) 100%)",
              }}
            />
            <span className="absolute bottom-4 left-4 right-4 rounded-[10px] bg-black/55 px-3 py-2 text-xs font-medium leading-relaxed text-white backdrop-blur-sm">
              Illustrative service photo — not a portfolio claim by this referral service.
            </span>
          </div>
        </figure>
      ) : null}
    </div>
  );
}

/* --------------------------------------------------------- ReferralSteps */

const REFERRAL_STEPS = [
  {
    title: "Tell Us About Your Project",
    body: "Submit your project details and location.",
    image: "/estimate-visit-measuring.webp",
    imageAlt:
      "Tape measure stretched across a residential concrete driveway during an estimate visit",
  },
  {
    title: "Request a Referral",
    body: "We connect your request with an independent concrete service provider serving the area.",
    image: "/process-band.webp",
    imageAlt:
      "Residential concrete driveway forms set on a quiet southern street before a pour",
  },
  {
    title: "Discuss Your Project",
    body: "The independent provider can contact you to discuss the project, availability, and next steps.",
    image: "/cta-pour-band.webp",
    imageAlt:
      "Concrete workers screeding a fresh residential slab between timber forms",
  },
] as const;

export function ReferralSteps() {
  return (
    <div>
      <ol className="grid gap-5 md:grid-cols-3">
        {REFERRAL_STEPS.map((step, index) => (
          <li key={step.title} className="card flex h-full flex-col overflow-hidden">
            <div className="relative h-36">
              <Image
                src={step.image}
                alt={step.imageAlt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
              <span
                className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full text-[15px] font-bold"
                style={{
                  backgroundColor: "var(--color-accent)",
                  color: "var(--color-on-accent)",
                }}
              >
                {index + 1}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-center text-[16px] font-semibold md:text-left">
                Step {index + 1}: {step.title}
              </p>
              <p className="mt-2 text-center text-[14px] leading-relaxed text-[color:var(--color-muted)] md:text-left">
                {step.body}
              </p>
            </div>
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
          className="rounded-[12px] border p-4 text-center text-[13.5px] font-medium leading-relaxed lg:text-left"
          style={{ borderColor: "var(--color-line)" }}
        >
          {SERVICE_PAGE_DISCLOSURE}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- ServiceCtaBand */

/** Closing call to action. Copy is fixed by the publisher. */
export function ServiceCtaBand({
  imageSrc = "/cta-pour-band.webp",
  imageAlt = "Two independent concrete workers screeding a freshly poured residential driveway slab between timber forms",
}: {
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <section
      className="cta-photo relative isolate overflow-hidden border-y py-16 md:py-20"
      style={{ borderColor: "var(--color-line)" }}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(90deg, rgba(11,16,13,0.94) 0%, rgba(11,16,13,0.88) 45%, rgba(11,16,13,0.62) 100%)",
        }}
      />

      <div className="container-page flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div className="max-w-xl">
          <h2 className="text-xl font-semibold md:text-2xl">
            Need Help With Your Concrete Project?
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-[color:var(--color-muted)]">
            Tell us about your project and location to request a connection with
            an independent concrete service provider serving your area.
          </p>
        </div>
        <div className="grid w-full max-w-sm shrink-0 gap-3 md:w-auto md:max-w-none md:grid-cols-2">
          <DynamicPhone
            fallbackDisplay={site.phoneDisplay}
            fallbackE164={site.phoneE164}
            placement="cta_band"
            className="btn btn-primary"
          />
          <a href="#quote-form" className="btn btn-secondary">
            Request a Referral
            <Icon name="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
