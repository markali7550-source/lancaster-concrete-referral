import Image from "next/image";
import Link from "next/link";
import { DynamicPhone } from "@/components/lead/DynamicPhone";
import { Icon } from "@/components/ui/Icon";
import { publishedServices, type ServiceRecord } from "@/content/services";
import type { LocationRecord } from "@/content/locations";
import { site } from "@/lib/env";
import { SHORT_DISCLOSURE } from "@/lib/seo/disclosure";

/* ------------------------------------------------------------ Photo scrim */

/*
 * Every band that puts copy over a photograph shares these layers. They were
 * previously written inline per component as a fully opaque fill, which hid
 * the photograph completely.
 *
 * 72% is not arbitrary: it is the lowest opacity at which the *brightest*
 * glyph-scale region of every photo in /public still clears WCAG AA (4.5:1)
 * against the lightest text color used on these bands. The binding constraint
 * is the mint eyebrow #4ED29A, which needs 0.72; muted body #A8B3C0 needs
 * 0.70 and white needs 0.57. Lower this and the eyebrow fails on the bright
 * pours.
 *
 * The colour is --color-band-deep (#0B1017), the same navy the footer, the
 * CTA and the header glass are built from, so a photo band reads as the same
 * material as every other heavy surface on the site rather than as a
 * separate green-black.
 */
export const PHOTO_SCRIM = "bg-[#0B1017]/72";

/**
 * Vignette at the top and bottom of a photo band.
 *
 * It used to ramp to FULLY OPAQUE navy at both edges, which made sense when
 * it was described as "blending into the page background" -- except the page
 * is warm off-white, so the band was blending into a colour that is nowhere
 * near it and the seam read as a hard black strip above the next section.
 * At 70% the vignette still does its real job (holding contrast under the
 * glass header and over the bottom edge) without stamping a black bar
 * between two sections.
 */
export const PHOTO_EDGE_FADE =
  "bg-gradient-to-b from-[#0B1017]/75 via-transparent to-[#0B1017]/75";

/**
 * Heroes only. Deepens the copy side and releases on the right so the
 * photograph stays visible.
 *
 * This used to be gated to lg and layered over the full-strength PHOTO_SCRIM,
 * which meant it could never do its job: 72% flat dark plus a wash left the
 * right-hand side of the hero at a measured mean luminance of 28 against 151
 * in the source file, so the photograph was effectively a dark rectangle. The
 * hero now pairs this with HERO_SCRIM instead, and the mobile hero -- whose
 * copy is also flush left now -- gets the same left-weighted treatment rather
 * than being excluded from it.
 */
export const PHOTO_SIDE_WASH =
  "bg-gradient-to-r from-[#0B1017]/72 via-[#0B1017]/42 to-[#0B1017]/8";

/**
 * Hero-only base scrim, deliberately lighter than PHOTO_SCRIM because the hero
 * stacks a side wash on top of it and PHOTO_SCRIM is tuned for bands that have
 * only one layer. Kept heavier on small screens, where there is no horizontal
 * room for the wash to fall away before the copy starts.
 */
export const HERO_SCRIM = "bg-[#0B1017]/52 lg:bg-[#0B1017]/30";

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
  backgroundImage,
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
  /** Optional full bleed photograph behind the section, with a dark scrim. */
  backgroundImage?: { src: string; alt: string };
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
      className={`${
        compact
          ? "scroll-mt-32 py-10 md:py-14"
          : "scroll-mt-32 py-14 md:py-20 lg:py-24"
      }${backgroundImage ? " cta-photo relative isolate overflow-hidden" : ""}`}
      style={
        backgroundImage
          ? undefined
          : background
            ? { backgroundColor: background }
            : undefined
      }
    >
      {backgroundImage ? (
        <>
          <Image
            src={backgroundImage.src}
            alt={backgroundImage.alt}
            fill
            sizes="100vw"
            className="-z-20 object-cover"
          />
          <div
            className={`absolute inset-0 z-10 ${PHOTO_SCRIM}`}
            aria-hidden="true"
          />
          <div
            className={`pointer-events-none absolute inset-0 z-20 ${PHOTO_EDGE_FADE}`}
            aria-hidden="true"
          />
        </>
      ) : null}
      <div className="container-page relative z-30">
        {eyebrow || title || lead ? (
          <div
            className={
              align === "center"
                ? "mx-auto max-w-2xl text-center"
                : "text-left"
            }
          >
            {eyebrow ? (
              <p className="eyebrow">{eyebrow}</p>
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

/** Centered hairline that separates two stacked sections. */
export function SectionDivider() {
  return (
    <div className="container-page" aria-hidden="true">
      <hr className="divider-center" />
    </div>
  );
}

/* ------------------------------------------------------------------- Hero */

/* Hero scrim: the shared photo layers, stacked over the full-bleed image. */
const HERO_IMAGE_OVERLAY = `absolute inset-0 z-10 ${HERO_SCRIM}`;
const HERO_IMAGE_SIDE_WASH = `pointer-events-none absolute inset-0 z-10 ${PHOTO_SIDE_WASH}`;
const HERO_IMAGE_FADE = `pointer-events-none absolute inset-0 z-20 ${PHOTO_EDGE_FADE}`;

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
      className="relative isolate overflow-hidden"
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
        className={HERO_IMAGE_OVERLAY}
        aria-hidden="true"
      />
      <div className={HERO_IMAGE_SIDE_WASH} aria-hidden="true" />
      <div className={HERO_IMAGE_FADE} aria-hidden="true" />
      <div className="container-page relative z-30 flex items-center py-14 md:py-20 lg:py-24">
        <div className="w-full max-w-2xl">
          {breadcrumbs}
          {children}
        </div>
      </div>
    </section>
  );
}

export const overlayEyebrow = "var(--color-band-accent)";
export const overlayHeading = "var(--color-band-ink)";
export const overlayBody = "rgba(255,255,255,0.86)";
export const overlayMuted = "rgba(255,255,255,0.80)";

const HERO_TRUST = [
  "Free for homeowners",
  "One independent provider, not five",
  "Written coverage areas only",
];

export function Hero({
  locationCue,
  h1,
  summary,
  imageSrc,
  imageAlt,
  overlay = false,
  breadcrumbs,
  aside,
}: {
  locationCue: string;
  h1: string;
  summary: string;
  imageSrc: string;
  imageAlt: string;
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
        className="relative isolate overflow-hidden"
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
          className={HERO_IMAGE_OVERLAY}
          aria-hidden="true"
        />
        <div className={HERO_IMAGE_SIDE_WASH} aria-hidden="true" />
        <div className={HERO_IMAGE_FADE} aria-hidden="true" />
        <div
          className={
            aside
              ? "container-page relative z-30 grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_minmax(0,26rem)] lg:gap-14 lg:py-20"
              : "container-page relative z-30 flex min-h-[calc(100svh-6.25rem)] items-center py-14 lg:py-20"
          }
        >
          <div className="w-full max-w-2xl">
            {breadcrumbs}
            <p
              className="eyebrow"
              style={{ color: "var(--color-band-accent)" }}
            >
              {locationCue}
            </p>
            <h1 className="h1 mt-5" style={{ color: "var(--color-band-ink)" }}>
              {h1}
            </h1>
            <p
              className="lede mt-5 max-w-prose"
              style={{ color: "rgba(255,255,255,0.86)" }}
            >
              {summary}
            </p>

            <div
              id="hero-actions"
              className="mt-8 grid w-full max-w-sm gap-3 lg:max-w-none lg:grid-cols-[repeat(2,minmax(0,15rem))]"
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
              className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[13px]"
              style={{ color: "rgba(255,255,255,0.80)" }}
            >
              {HERO_TRUST.map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <span style={{ color: "var(--color-band-accent)" }}>
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {aside ? (
            <div className="mobile-sticky-form sticky bottom-0 z-40 w-full max-w-xl rounded-t-xl bg-[#0B1017] p-2 lg:static lg:max-w-xl lg:rounded-none lg:bg-transparent lg:p-0">{aside}</div>
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
        <div className="lg:col-span-7">
          <p className="eyebrow">
            {locationCue}
          </p>
          <h1 className="h1 mt-5">{h1}</h1>
          <p className="lede mt-5 max-w-prose">{summary}</p>

          <div
            id="hero-actions"
            className="mt-8 grid w-full max-w-sm gap-3 lg:max-w-none lg:grid-cols-2"
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

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-[color:var(--color-muted)]">
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
              className="aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border"
              style={{
                borderColor: "var(--color-line-soft)",
                boxShadow: "var(--shadow-card)",
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
              className="flex items-center gap-2.5 text-sm font-semibold"
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
              className="py-6 sm:px-6 sm:first:pl-0 lg:py-7"
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
        <p className="flex items-start gap-2.5">
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

type ProjectTypeImageMap = Partial<
  Record<ServiceRecord["slug"], { src: string; alt: string }>
>;

export function ProjectTypeChooser({
  services = publishedServices,
  cityPrefix,
  cityLabel,
  images,
}: {
  services?: readonly ServiceRecord[];
  cityPrefix?: string;
  /** Shown in the card link when the cards point at local pages. */
  cityLabel?: string;
  /** Optional, page-specific images. Omit to render text-only cards and avoid reusing assets. */
  images?: ProjectTypeImageMap;
}) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {services.map((service) => {
        const image = images?.[service.slug];

        return (
        <li key={service.slug}>
          <Link
            href={
              cityPrefix
                ? `${cityPrefix}/${service.slug}`
                : `/services/${service.slug}`
            }
            className="group card card-interactive flex h-full flex-col overflow-hidden transition-colors duration-300 hover:border-[var(--color-accent)]"
          >
            {image ? (
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={500}
                sizes="(min-width: 640px) 45vw, 100vw"
                className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : null}
            <div className="flex flex-1 flex-col p-6 text-left">
              <h3 className="text-[17px] font-semibold">{service.name}</h3>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-[color:var(--color-muted)]">
                {service.summary}
              </p>
              <span
                className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold"
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
      );
      })}
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
      <ul className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border sm:grid-cols-2"
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
            <div className="flex items-start gap-3 text-left lg:gap-3.5">
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
      <p className="mt-6 text-[13.5px] leading-relaxed text-[color:var(--color-muted)]">
        These are routing controls only. They are not a verification of any
        provider&apos;s license, insurance, or workmanship, and they are not a
        warranty, an endorsement, or a substitute for your own checks. Confirm
        license status, insurance, and credentials directly with the provider
        and through SC LLR before you hire.
      </p>
    </>
  );
}

/* ---------------------------------------------------------- HowMatchingWorks */

const STEPS = [
  {
    verb: "Tell us the project and location",
    body: "Two fields to start: what you need poured or repaired, and where the property is.",
  },
  {
    // Heading wording is fixed by the brief and must stay exact.
    verb: "We check coverage, project type match, referral agreement, and current capacity.",
    body: "Eligibility is confirmed before anything is sent, and nothing is sent if no participating provider covers the area.",
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
        <li key={step.verb} className="card flex h-full flex-col p-6">
          <span
            className="text-[30px] font-extrabold leading-none tracking-tight md:text-[34px]"
            style={{ color: "var(--color-accent)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="mt-4 block h-px w-10"
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
      className="divide-y overflow-hidden rounded-[var(--radius-card)] border"
      style={{ borderColor: "var(--color-line-soft)", backgroundColor: "var(--color-surface)" }}
    >
      {items.map((item) => (
        <details key={item.question} name={name} className="group">
          <summary className="disclosure-row flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 font-medium md:px-6">
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
          <p className="px-5 py-4 text-left text-[15px] leading-relaxed text-[color:var(--color-muted)] md:px-6">
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
      className="grid gap-2"
      style={{
        backgroundColor: "transparent",
      }}
    >
      {faqs.map((faq) => (
        <details
          key={faq.question}
          name={name}
          className="group card overflow-hidden"
        >
          <summary className="disclosure-row flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 font-semibold md:px-6">
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
          <p className="px-5 py-4 text-left text-[15px] leading-relaxed text-[color:var(--color-muted)] md:px-6">
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
      <div className="card p-6">
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
