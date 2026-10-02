import Image from "next/image";
import Link from "next/link";
import { DynamicPhone } from "@/components/lead/DynamicPhone";
import { Icon } from "@/components/ui/Icon";
import { publishedServices, type ServiceRecord } from "@/content/services";
import type { LocationRecord } from "@/content/locations";
import { site } from "@/lib/env";
import { SHORT_DISCLOSURE } from "@/lib/seo/disclosure";

/* ---------------------------------------------------------------- Section */

export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  tone = "page",
  align = "left",
  compact = false,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  children: React.ReactNode;
  tone?: "page" | "soft" | "surface";
  align?: "left" | "center";
  /** Short sections (a single row of links) do not need full section rhythm. */
  compact?: boolean;
}) {
  const background =
    tone === "soft"
      ? "var(--color-section)"
      : tone === "surface"
        ? "var(--color-surface)"
        : undefined;

  return (
    <section
      id={id}
      className={
        compact ? "scroll-mt-32 py-8 md:py-12" : "scroll-mt-32 py-12 md:py-20"
      }
      style={background ? { backgroundColor: background } : undefined}
    >
      <div className="container-page">
        {eyebrow || title || lead ? (
          <div
            className={
              align === "center"
                ? "mx-auto max-w-2xl text-center"
                : "text-center md:text-left"
            }
          >
            {eyebrow ? (
              <p
                className={
                  align === "center"
                    ? "eyebrow before:hidden"
                    : "eyebrow before:hidden md:before:block"
                }
              >
                {eyebrow}
              </p>
            ) : null}
            {title ? <h2 className="h2 mt-3">{title}</h2> : null}
            {lead ? <p className="lede mt-4">{lead}</p> : null}
          </div>
        ) : null}
        <div
          className={
            eyebrow || title || lead ? (compact ? "mt-5" : "mt-7") : undefined
          }
        >
          {children}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- SectionDivider */

/** Centred hairline that separates two stacked sections. */
export function SectionDivider() {
  return (
    <div className="container-page" aria-hidden="true">
      <hr className="divider-center" />
    </div>
  );
}

/* ------------------------------------------------------------------- Hero */

/**
 * Full-bleed photo header: the photo fills the band, a dark scrim keeps the
 * copy legible, and the copy sits on top of it.
 */
export function OverlayHeader({
  imageSrc,
  imageAlt,
  children,
  breadcrumbs,
}: {
  imageSrc: string;
  imageAlt: string;
  children: React.ReactNode;
  /** Sits over the photo instead of in a band above it. */
  breadcrumbs?: React.ReactNode;
}) {
  return (
    <section
      className="relative isolate overflow-hidden border-b"
      style={{ borderColor: "var(--color-line-soft)" }}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#070b09]/85 via-[#070b09]/75 to-[#070b09]/85 lg:bg-gradient-to-r lg:from-[#070b09]/92 lg:via-[#070b09]/78 lg:to-[#070b09]/35"
        aria-hidden="true"
      />
      <div className="container-page flex items-center py-14 md:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left">
          {breadcrumbs}
          {children}
        </div>
      </div>
    </section>
  );
}

export const overlayEyebrow = "#5fe3a8";
export const overlayHeading = "#ffffff";
export const overlayBody = "rgba(255,255,255,0.88)";
export const overlayMuted = "rgba(255,255,255,0.82)";

const HERO_TRUST = [
  "Free for homeowners",
  "One independent provider, not five",
  "Written coverage areas only",
];

export function Hero({
  locationCue,
  h1,
  summary,
  imageSrc = "/home-hero.webp",
  imageAlt = "Broom finished concrete front walkway and entry steps at a two storey home",
  overlay = false,
  breadcrumbs,
  aside,
}: {
  locationCue: string;
  h1: string;
  summary: string;
  imageSrc?: string;
  imageAlt?: string;
  /** Sits over the photo instead of in a band above it. */
  breadcrumbs?: React.ReactNode;
  /** Optional column beside the hero copy, used for the step one form. */
  aside?: React.ReactNode;
  /** Full-bleed photo behind the copy instead of a photo beside it. */
  overlay?: boolean;
}) {
  if (overlay) {
    return (
      <section
        className="relative isolate overflow-hidden border-b"
        style={{ borderColor: "var(--color-line-soft)" }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-[#070b09]/85 via-[#070b09]/75 to-[#070b09]/85 lg:bg-gradient-to-r lg:from-[#070b09]/92 lg:via-[#070b09]/78 lg:to-[#070b09]/35"
          aria-hidden="true"
        />
        <div
          className={
            aside
              ? "container-page grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_minmax(0,26rem)] lg:gap-14 lg:py-20"
              : "container-page flex min-h-[calc(100dvh-6.25rem)] items-center py-14 lg:py-20"
          }
        >
          <div className="mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left">
            {breadcrumbs}
            <p
              className="eyebrow before:hidden lg:before:block"
              style={{ color: "#5fe3a8" }}
            >
              {locationCue}
            </p>
            <h1 className="h1 mt-5" style={{ color: "#ffffff" }}>
              {h1}
            </h1>
            <p
              className="lede mx-auto mt-5 max-w-prose lg:mx-0"
              style={{ color: "rgba(255,255,255,0.88)" }}
            >
              {summary}
            </p>

            <div
              id="hero-actions"
              className="mx-auto mt-8 grid w-full max-w-sm gap-3 lg:mx-0 lg:max-w-none lg:grid-cols-[repeat(2,minmax(0,15rem))]"
            >
              <DynamicPhone
                fallbackDisplay={site.phoneDisplay}
                fallbackE164={site.phoneE164}
                placement="hero"
                className="btn btn-primary"
              />
              <a href="#quote-form" className="btn btn-secondary">
                Request a referral
                <Icon name="arrow" />
              </a>
            </div>

            <ul
              className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] lg:justify-start"
              style={{ color: "rgba(255,255,255,0.82)" }}
            >
              {HERO_TRUST.map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <span style={{ color: "#5fe3a8" }}>
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {aside ? (
            <div className="mx-auto w-full max-w-xl lg:mx-0">{aside}</div>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section
      className="border-b"
      style={{
        borderColor: "var(--color-line-soft)",
        backgroundColor: "var(--color-surface)",
      }}
    >
      <div className="container-page grid items-center gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="text-center lg:col-span-7 lg:text-left">
          <p className="eyebrow before:hidden lg:before:block">
            {locationCue}
          </p>
          <h1 className="h1 mt-5">{h1}</h1>
          <p className="lede mx-auto mt-5 max-w-prose lg:mx-0">{summary}</p>

          <div
            id="hero-actions"
            className="mx-auto mt-8 grid w-full max-w-sm gap-3 lg:mx-0 lg:max-w-none lg:grid-cols-2"
          >
            <DynamicPhone
              fallbackDisplay={site.phoneDisplay}
              fallbackE164={site.phoneE164}
              placement="hero"
              className="btn btn-primary"
            />
            <a href="#quote-form" className="btn btn-secondary">
              Request a referral
              <Icon name="arrow" />
            </a>
          </div>

          <ul className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-[color:var(--color-muted)] lg:justify-start">
            {HERO_TRUST.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <span style={{ color: "var(--color-accent)" }}>
                  <Icon name="check" className="h-4 w-4" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <figure className="mx-auto w-full max-w-md sm:max-w-lg lg:max-w-none">
            <div
              className="aspect-[4/3] overflow-hidden rounded-[20px] border"
              style={{
                borderColor: "var(--color-line-soft)",
                boxShadow: "var(--shadow-raised)",
              }}
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={1200}
                height={800}
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- StatStrip */

/**
 * Compact benefit row under the hero. Reuses the stat bar shell, the existing
 * check icon and the existing text classes, so no new typography is added.
 */
export function BenefitBadges({ items }: { items: string[] }) {
  return (
    <div className="border-b" style={{ borderColor: "var(--color-line-soft)" }}>
      <div className="container-page">
        <ul className="grid gap-x-8 gap-y-3 py-5 sm:grid-cols-3">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-center justify-center gap-2.5 text-sm font-semibold lg:justify-start"
            >
              <span style={{ color: "var(--color-accent)" }}>
                <Icon name="check" className="h-4 w-4" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function StatStrip({
  items,
}: {
  items: { value: string; label: string }[];
}) {
  return (
    <div className="border-b" style={{ borderColor: "var(--color-line-soft)" }}>
      <div className="container-page">
        <dl className="grid divide-y sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x [&>div]:border-[color:var(--color-line-soft)]">
          {items.map((item) => (
            <div
              key={item.label}
              className="py-6 text-center sm:px-6 sm:first:pl-0 lg:py-7 lg:text-left"
              style={{ borderColor: "var(--color-line-soft)" }}
            >
              <dt className="sr-only">{item.label}</dt>
              <dd>
                <span
                  className="block text-[2.4rem] font-extrabold leading-none tracking-[-0.03em] md:text-[3rem]"
                  style={{ color: "var(--color-accent)" }}
                >
                  {item.value}
                </span>
                <span className="mt-3 block text-[13px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-subtle)]">
                  {item.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

/* -------------------------------------------------- ReferralDisclosureStrip */

export function ReferralDisclosureStrip() {
  return (
    <div
      className="border-b"
      style={{
        backgroundColor: "var(--color-accent-soft)",
        borderColor: "var(--color-line-soft)",
      }}
    >
      <div className="container-page flex flex-col gap-2 py-3.5 text-[13.5px] sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start justify-center gap-2.5 text-center sm:justify-start sm:text-left">
          <span style={{ color: "var(--color-accent)" }}>
            <Icon name="shield" className="mt-px h-[18px] w-[18px]" />
          </span>
          <span>{SHORT_DISCLOSURE}</span>
        </p>
        <Link
          href="/referral-disclosure"
          className="shrink-0 self-center font-semibold underline underline-offset-4 sm:self-auto"
          style={{ color: "var(--color-accent)" }}
        >
          Full disclosure
        </Link>
      </div>
    </div>
  );
}

/* ---------------------------------------------------- ProjectTypeChooser */

export function ProjectTypeChooser({
  services = publishedServices,
  cityPrefix,
  cityLabel,
}: {
  services?: readonly ServiceRecord[];
  cityPrefix?: string;
  /** Shown in the card link when the cards point at local pages. */
  cityLabel?: string;
}) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {services.map((service) => (
        <li key={service.slug}>
          <Link
            href={
              cityPrefix
                ? `${cityPrefix}/${service.slug}`
                : `/services/${service.slug}`
            }
            className="card card-interactive flex h-full flex-col overflow-hidden"
          >
            <Image
              src={service.image}
              alt={service.imageAlt}
              width={800}
              height={500}
              sizes="(min-width: 640px) 45vw, 100vw"
              className="h-44 w-full object-cover"
            />
            <div className="flex flex-1 flex-col p-6 text-center lg:text-left">
              <h3 className="text-[17px] font-semibold">{service.name}</h3>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-[color:var(--color-muted)]">
                {service.summary}
              </p>
              <span
                className="mt-5 inline-flex items-center justify-center gap-1.5 text-[14px] font-semibold lg:justify-start"
                style={{ color: "var(--color-accent)" }}
              >
                {cityLabel
                  ? `View ${service.shortName.toLowerCase()} in ${cityLabel}`
                  : `View ${service.shortName.toLowerCase()} referrals`}
                <Icon name="arrow" className="card-go h-4 w-4" />
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ---------------------------------------------------------- RoutingControls */

const ROUTING_CONTROLS = [
  {
    title: "Written coverage area",
    body: "Participating providers confirm in writing which areas they accept work in. Coverage is never inferred from a radius drawn on a map.",
  },
  {
    title: "Signed referral agreement",
    body: "Requests are only passed to independent service providers operating under an active referral agreement with documented response expectations.",
  },
  {
    title: "Project type match",
    body: "Your project type is matched against the categories a provider has agreed to receive. A category nobody has accepted produces an honest no coverage answer.",
  },
  {
    title: "One request at a time",
    body: "Your details go to a single participating provider rather than a list of companies bidding against each other.",
  },
];

export function RoutingControls() {
  return (
    <>
      <ul className="grid gap-px overflow-hidden rounded-[16px] border sm:grid-cols-2"
        style={{
          borderColor: "var(--color-line-soft)",
          backgroundColor: "var(--color-line-soft)",
        }}
      >
        {ROUTING_CONTROLS.map((check, index) => (
          <li
            key={check.title}
            className="p-6"
            style={{ backgroundColor: "var(--color-surface)" }}
          >
            <div className="flex flex-col items-center gap-3 text-center lg:flex-row lg:items-start lg:gap-3.5 lg:text-left">
              <span
                className="marker-count grid h-8 w-8 shrink-0 place-items-center rounded-full text-[13px] font-bold"
                style={{
                  backgroundColor: "var(--color-accent-soft)",
                  color: "var(--color-accent)",
                }}
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-semibold">{check.title}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--color-muted)]">
                  {check.body}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-center text-[13.5px] leading-relaxed text-[color:var(--color-muted)] lg:text-left">
        These are routing controls only. They are not a verification of any
        provider&apos;s license, insurance, or workmanship, and they are not a
        warranty, an endorsement, or a substitute for your own checks. Confirm
        license status, insurance, and credentials directly with the provider
        and through SC LLR before you hire.
      </p>
    </>
  );
}

/* ----------------------------------------------------------- ProjectExamples */

export function ProjectExamples() {
  return (
    <div
      className="rounded-[16px] border border-dashed p-8 text-center"
      style={{ borderColor: "var(--color-line)" }}
    >
      <p className="font-semibold">Project gallery withheld pending provenance</p>
      <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-[color:var(--color-muted)]">
        We publish project photography only when we hold the image source,
        ownership evidence, and written permission from the contractor who
        performed the work. No stock photograph will be presented here as our
        own project. The gallery stays empty until that evidence clears content
        review.
      </p>
    </div>
  );
}

/* ---------------------------------------------------------- HowMatchingWorks */

const STEPS = [
  {
    verb: "Tell us the project and location",
    body: "Two fields to start: what you need poured or repaired, and where the property is.",
  },
  {
    verb: "We check participating provider eligibility",
    body: "We check coverage, project type match, referral agreement, and current capacity.",
  },
  {
    verb: "The independent provider contacts you",
    body: "One independent provider follows up directly to inspect, scope, and quote. You deal with them, not with us.",
  },
];

export function HowMatchingWorks() {
  return (
    <ol className="grid gap-5 md:grid-cols-3">
      {STEPS.map((step, index) => (
        <li key={step.verb} className="card flex h-full flex-col p-6 text-center lg:text-left">
          <span
            className="text-[30px] font-extrabold leading-none tracking-tight md:text-[34px]"
            style={{ color: "var(--color-accent)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="mx-auto mt-4 block h-px w-10 lg:mx-0"
            style={{ backgroundColor: "var(--color-line)" }}
            aria-hidden="true"
          />
          <p className="mt-4 text-[17px] font-semibold">{step.verb}</p>
          <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--color-muted)]">
            {step.body}
          </p>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------ DecisionSupport */

export function DecisionSupport({
  items,
  name = "decision-support",
}: {
  items: { question: string; answer: string }[];
  /**
   * Shared name that makes the group an exclusive accordion: opening one row
   * closes the row that was open. Pass a distinct value if two groups ever
   * render on the same page.
   */
  name?: string;
}) {
  return (
    <div
      className="divide-y overflow-hidden rounded-[16px] border"
      style={{ borderColor: "var(--color-line-soft)", backgroundColor: "var(--color-surface)" }}
    >
      {items.map((item) => (
        <details key={item.question} name={name} className="group">
          <summary className="disclosure-row flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-6 font-medium md:px-6">
            <span className="flex-1 text-left">{item.question}</span>
            <span
              className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] transition-colors"
              style={{
                backgroundColor: "var(--color-accent-soft)",
                color: "var(--color-accent)",
              }}
              aria-hidden="true"
            >
              <Icon name="plus" className="h-4 w-4" />
            </span>
          </summary>
          <p className="px-5 pb-6 text-left text-[15px] leading-relaxed text-[color:var(--color-muted)] md:px-6">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

/* ----------------------------------------------------------------- FaqSection */

export function FaqSection({
  faqs,
  name = "faq",
}: {
  faqs: { question: string; answer: string }[];
  /**
   * Shared name makes the group an exclusive accordion. Pass a distinct value
   * when two FAQ groups render on the same page.
   */
  name?: string;
}) {
  return (
    <div
      className="divide-y overflow-hidden rounded-[16px] border"
      style={{
        borderColor: "var(--color-line-soft)",
        backgroundColor: "var(--color-surface)",
      }}
    >
      {faqs.map((faq) => (
        <details key={faq.question} name={name} className="group">
          <summary className="disclosure-row flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold md:px-6">
            <span className="flex-1 text-left text-[16px]">{faq.question}</span>
            <span
              className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] transition-colors"
              style={{
                backgroundColor: "var(--color-accent-soft)",
                color: "var(--color-accent)",
              }}
              aria-hidden="true"
            >
              <Icon name="plus" className="h-4 w-4" />
            </span>
          </summary>
          <p className="px-5 pb-6 text-left text-[15px] leading-relaxed text-[color:var(--color-muted)] md:px-6">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

/* --------------------------------------------------------------- AdjacentAreas */

export function AdjacentAreas({
  locations,
}: {
  locations: readonly LocationRecord[];
}) {
  if (locations.length === 0) {
    return (
      <div className="card p-6 text-center lg:text-left">
        <p className="font-semibold">Lancaster only, for now</p>
        <p className="mt-2.5 text-[14.5px] leading-relaxed text-[color:var(--color-muted)]">
          Additional South Carolina areas are added one at a time, and only
          once a participating provider has approved coverage there in writing.
          We would rather publish one honest service area than a coverage map we
          cannot support.
        </p>
      </div>
    );
  }
  return (
    <ul className="flex flex-wrap justify-center gap-3 lg:justify-start">
      {locations.map((location) => (
        <li key={location.slug}>
          <Link href={`/locations/${location.slug}`} className="btn btn-secondary">
            {location.city}, {location.region}
          </Link>
        </li>
      ))}
    </ul>
  );
}
