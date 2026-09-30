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
      ? "var(--color-accent-soft)"
      : tone === "surface"
        ? "var(--color-surface)"
        : undefined;

  return (
    <section
      id={id}
      className={
        compact ? "scroll-mt-32 py-6 md:py-9" : "scroll-mt-32 py-8 md:py-14"
      }
      style={background ? { backgroundColor: background } : undefined}
    >
      <div className="container-page">
        {eyebrow || title || lead ? (
          <div
            className={
              align === "center"
                ? "mx-auto max-w-2xl text-center"
                : "mx-auto max-w-3xl text-center lg:mx-0 lg:text-left"
            }
          >
            {eyebrow ? (
              <p
                className={
                  align === "center"
                    ? "eyebrow before:hidden"
                    : "eyebrow before:hidden lg:before:block"
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

export function Hero({
  locationCue,
  h1,
  summary,
  imageSrc = "/hero-driveway.jpg",
  imageAlt = "Finished broom-finish concrete driveway at a single-story home",
}: {
  locationCue: string;
  h1: string;
  summary: string;
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <section
      className="border-b"
      style={{
        borderColor: "var(--color-line-soft)",
        backgroundColor: "var(--color-surface)",
      }}
    >
      <div className="container-page grid min-h-[calc(100dvh-6.25rem)] items-center gap-10 py-12 lg:grid-cols-12 lg:gap-14 lg:py-16">
        <div className="text-center lg:col-span-5 lg:text-left">
          <p className="eyebrow before:hidden lg:before:block">
            {locationCue}
          </p>
          <h1 className="h1 mt-5">{h1}</h1>
          <p className="lede mx-auto mt-5 max-w-prose lg:mx-0">{summary}</p>

          <div
            id="hero-actions"
            className="mx-auto mt-8 grid w-full max-w-sm gap-3 min-[380px]:grid-cols-2 lg:mx-0 lg:max-w-none"
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
            {[
              "Free for homeowners",
              "One independent provider, not five",
              "Written coverage areas only",
            ].map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <span style={{ color: "var(--color-accent)" }}>
                  <Icon name="check" className="h-4 w-4" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <figure className="mx-auto w-full max-w-md sm:max-w-lg lg:max-w-none">
            <div
              className="overflow-hidden rounded-[20px] border"
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
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="h-auto w-full object-cover"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- StatStrip */

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
              className="py-6 sm:px-6 sm:first:pl-0 lg:py-7"
              style={{ borderColor: "var(--color-line-soft)" }}
            >
              <dt className="sr-only">{item.label}</dt>
              <dd>
                <span
                  className="block text-2xl font-semibold tracking-tight"
                  style={{ color: "var(--color-accent)" }}
                >
                  {item.value}
                </span>
                <span className="mt-1.5 block text-sm text-[color:var(--color-muted)]">
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
        <p className="flex items-start gap-2.5">
          <span style={{ color: "var(--color-accent)" }}>
            <Icon name="shield" className="mt-px h-[18px] w-[18px]" />
          </span>
          <span>{SHORT_DISCLOSURE}</span>
        </p>
        <Link
          href="/referral-disclosure"
          className="shrink-0 font-semibold underline underline-offset-4"
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
}: {
  services?: readonly ServiceRecord[];
  cityPrefix?: string;
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
              alt=""
              width={800}
              height={500}
              sizes="(min-width: 640px) 45vw, 100vw"
              className="h-44 w-full object-cover"
            />
            <span className="flex flex-1 flex-col p-6">
              <span className="text-[17px] font-semibold">{service.name}</span>
              <span className="mt-2 flex-1 text-[14px] leading-relaxed text-[color:var(--color-muted)]">
                {service.summary}
              </span>
              <span
                className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold"
                style={{ color: "var(--color-accent)" }}
              >
                View {service.shortName.toLowerCase()} referrals
                <Icon name="arrow" className="h-4 w-4" />
              </span>
            </span>
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
    body: "Your project type is matched against the categories a provider has agreed to receive. A category nobody has accepted produces an honest no-coverage answer.",
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
            <div className="flex items-start gap-3.5">
              <span
                className="marker-count grid h-7 w-7 shrink-0 place-items-center rounded-full text-[12px] font-bold"
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
      <p className="mt-6 text-[13.5px] leading-relaxed text-[color:var(--color-muted)]">
        These are routing controls only. They are not a verification of any
        provider&apos;s licence, insurance, or workmanship, and they are not a
        warranty, an endorsement, or a substitute for your own checks. Confirm
        licence status, insurance, and credentials directly with the provider
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
    body: "Location, project type, licence status, insurance, and current capacity are all checked before anything is sent.",
  },
  {
    verb: "The contractor contacts you",
    body: "One independent contractor follows up directly to inspect, scope, and quote. You deal with them, not with us.",
  },
];

export function HowMatchingWorks() {
  return (
    <ol className="grid gap-6 md:grid-cols-3">
      {STEPS.map((step, index) => (
        <li key={step.verb} className="relative">
          <div className="flex items-center gap-3">
            <span
              className="marker-step grid h-10 w-10 place-items-center rounded-full text-[15px] font-bold"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "var(--color-page)",
              }}
            >
              {index + 1}
            </span>
            {index < STEPS.length - 1 ? (
              <span
                className="hidden h-px flex-1 md:block"
                style={{ backgroundColor: "var(--color-line)" }}
                aria-hidden="true"
              />
            ) : null}
          </div>
          <p className="mt-5 text-[17px] font-semibold">{step.verb}</p>
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
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <div
      className="divide-y overflow-hidden rounded-[16px] border"
      style={{ borderColor: "var(--color-line-soft)", backgroundColor: "var(--color-surface)" }}
    >
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="disclosure-row flex cursor-pointer list-none items-center justify-between gap-6 p-6 font-medium">
            {item.question}
            <span
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full transition-transform group-open:rotate-90"
              style={{
                backgroundColor: "var(--color-accent-soft)",
                color: "var(--color-accent)",
              }}
              aria-hidden="true"
            >
              <Icon name="arrow" className="h-3.5 w-3.5" />
            </span>
          </summary>
          <p className="max-w-[85ch] px-6 pb-6 text-[14.5px] leading-relaxed text-[color:var(--color-muted)]">
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
}: {
  faqs: { question: string; answer: string }[];
}) {
  return (
    <dl className="divide-y" style={{ borderColor: "var(--color-line-soft)" }}>
      {faqs.map((faq) => (
        <div
          key={faq.question}
          className="grid gap-2 py-7 first:pt-0 md:grid-cols-[1fr_1.4fr] md:gap-10"
          style={{ borderColor: "var(--color-line-soft)" }}
        >
          <dt className="text-[16px] font-semibold">{faq.question}</dt>
          <dd className="text-[15px] leading-relaxed text-[color:var(--color-muted)]">
            {faq.answer}
          </dd>
        </div>
      ))}
    </dl>
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
      <div className="card max-w-2xl p-6">
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
    <ul className="flex flex-wrap gap-3">
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
