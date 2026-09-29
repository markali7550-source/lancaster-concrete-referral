import Image from "next/image";
import Link from "next/link";
import { DynamicPhone } from "@/components/lead/DynamicPhone";
import { Icon } from "@/components/ui/Icon";
import type { ServiceRecord } from "@/content/services";
import { site } from "@/lib/env";

/* ------------------------------------------------------------ Breadcrumbs */

export function Breadcrumbs({
  items,
}: {
  items: { name: string; path?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="border-b" style={{ borderColor: "var(--color-line)" }}>
      <div className="container-page">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 py-3 text-sm text-[color:var(--color-muted)]">
          {items.map((item, index) => (
            <li key={item.name} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {item.path ? (
                <Link href={item.path} className="hover:underline">
                  {item.name}
                </Link>
              ) : (
                <span aria-current="page" className="text-[color:var(--color-ink)]">
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------ ServiceHero */

export function ServiceHero({
  service,
  cityLabel,
  h1,
  summary,
}: {
  service: ServiceRecord;
  cityLabel: string;
  h1: string;
  summary: string;
}) {
  return (
    <section className="border-b" style={{ borderColor: "var(--color-line)" }}>
      <div className="container-page grid items-center gap-8 py-10 lg:grid-cols-12 lg:gap-12 lg:py-14">
        <div className="lg:col-span-5">
          <p className="eyebrow">{cityLabel}</p>
          <h1 className="h1 mt-5">
            {h1}
          </h1>
          <p className="lede mt-5 max-w-prose">{summary}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {service.projectTypes.map((type) => (
              <li
                key={type}
                className="rounded-full px-3 py-1.5 text-sm font-medium"
                style={{
                  backgroundColor: "var(--color-accent-soft)",
                  color: "var(--color-accent)",
                }}
              >
                {type}
              </li>
            ))}
          </ul>
          <div id="hero-actions" className="mt-7 grid gap-3 min-[380px]:grid-cols-2">
            <DynamicPhone
              fallbackDisplay={site.phoneDisplay}
              fallbackE164={site.phoneE164}
              placement="service_hero"
              className="btn btn-primary"
            />
            <a href="#quote-form" className="btn btn-secondary">
              Request a referral
              <Icon name="arrow" />
            </a>
          </div>
          <p className="mt-3 text-xs text-[color:var(--color-muted)]">
            Free referral. We are not the contractor and do not set prices.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div
            className="overflow-hidden rounded-[20px] border"
            style={{ borderColor: "var(--color-line-soft)", boxShadow: "var(--shadow-raised)" }}
          >
            <Image
              src={service.image}
              alt={service.imageAlt}
              width={1200}
              height={800}
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- KeyFacts */

export function KeyFacts({ facts }: { facts: { label: string; value: string }[] }) {
  return (
    <div
      className="border-b"
      style={{ borderColor: "var(--color-line)", backgroundColor: "var(--color-surface)" }}
    >
      <div className="container-page">
        <dl className="grid gap-x-8 gap-y-5 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="eyebrow">{fact.label}</dt>
              <dd className="mt-1 text-sm font-medium">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- InPageNav */

export function InPageNav({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav
      aria-label="On this page"
      className="sticky top-16 z-20 border-b"
      style={{
        borderColor: "var(--color-line)",
        // Fully opaque: a translucent bar lets the headings scrolling beneath
        // it show through, which reads as broken text.
        backgroundColor: "var(--color-page)",
      }}
    >
      <div className="container-page">
        <ul className="-mx-1 flex min-w-0 max-w-full gap-1 overflow-x-auto py-2 text-sm [scrollbar-width:none]">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="inline-block whitespace-nowrap rounded-[10px] px-3 py-2 font-medium text-[color:var(--color-muted)] hover:bg-[color:var(--color-accent-soft)] hover:text-[color:var(--color-accent)]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------ ScopeColumns */

export function ScopeColumns({
  covered,
  outOfScope,
}: {
  covered: { title: string; body: string }[];
  outOfScope: string[];
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <ul className="grid gap-4 sm:grid-cols-2">
        {covered.map((item) => (
          <li key={item.title} className="card p-6">
            <div className="flex items-start gap-3">
              <span style={{ color: "var(--color-accent)" }}>
                <Icon name="check" className="mt-0.5 h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--color-muted)]">
                  {item.body}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <aside
        className="rounded-[16px] border p-5"
        style={{ borderColor: "var(--color-line)" }}
      >
        <p className="font-semibold">Not routed under this service</p>
        <ul className="mt-3 space-y-2.5 text-sm text-[color:var(--color-muted)]">
          {outOfScope.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span aria-hidden="true" className="mt-px font-semibold">
                —
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-[color:var(--color-muted)]">
          These requests are declined rather than forwarded to a contractor who
          should not be taking them on.
        </p>
      </aside>
    </div>
  );
}

/* ------------------------------------------------------------- OptionsList */

export function OptionsList({
  options,
}: {
  options: { name: string; description: string }[];
}) {
  return (
    <dl className="grid gap-x-10 gap-y-6 md:grid-cols-2">
      {options.map((option) => (
        <div key={option.name} className="border-l-2 pl-4" style={{ borderColor: "var(--color-accent)" }}>
          <dt className="font-semibold">{option.name}</dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-[color:var(--color-muted)]">
            {option.description}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------------------------------------------------------------- Timeline */

export function Timeline({
  phases,
}: {
  phases: { phase: string; duration: string; detail: string }[];
}) {
  return (
    <ol className="relative space-y-5 border-l pl-6" style={{ borderColor: "var(--color-line)" }}>
      {phases.map((phase, index) => (
        <li key={phase.phase} className="relative">
          <span
            className="absolute -left-[31px] grid h-6 w-6 place-items-center rounded-full text-xs font-bold"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-page)",
            }}
            aria-hidden="true"
          >
            {index + 1}
          </span>
          <div className="card p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="font-semibold">{phase.phase}</p>
              <p className="text-xs font-medium text-[color:var(--color-muted)]">
                {phase.duration}
              </p>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-muted)]">
              {phase.detail}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* -------------------------------------------------------------- CostTable */

export function CostTable({
  rows,
}: {
  rows: { factor: string; impact: string; note: string }[];
}) {
  return (
    <div className="max-w-full overflow-x-auto rounded-[16px] border" style={{ borderColor: "var(--color-line)" }}>
      <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
        <caption className="sr-only">
          Factors that affect the price quoted by the contractor
        </caption>
        <thead>
          <tr style={{ backgroundColor: "var(--color-surface)" }}>
            <th scope="col" className="px-4 py-3 font-semibold">Factor</th>
            <th scope="col" className="px-4 py-3 font-semibold">Impact</th>
            <th scope="col" className="px-4 py-3 font-semibold">Why it matters</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.factor} className="border-t" style={{ borderColor: "var(--color-line)" }}>
              <th scope="row" className="px-4 py-3 align-top font-medium">
                {row.factor}
              </th>
              <td className="px-4 py-3 align-top">
                <span
                  className="rounded-full px-2.5 py-1 text-xs font-semibold"
                  style={
                    row.impact === "High"
                      ? { backgroundColor: "var(--color-accent)", color: "var(--color-page)" }
                      : {
                          backgroundColor: "var(--color-accent-soft)",
                          color: "var(--color-accent)",
                        }
                  }
                >
                  {row.impact}
                </span>
              </td>
              <td className="px-4 py-3 align-top text-[color:var(--color-muted)]">
                {row.note}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* -------------------------------------------------------------- PrepColumns */

export function PrepColumns({
  checklist,
  questions,
}: {
  checklist: string[];
  questions: string[];
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="card p-6">
        <p className="font-semibold">Before the estimate visit</p>
        <ul className="mt-4 space-y-3 text-sm">
          {checklist.map((item) => (
            <li key={item} className="flex gap-3">
              <span style={{ color: "var(--color-accent)" }}>
                <Icon name="check" className="mt-0.5 h-4 w-4" />
              </span>
              <span className="text-[color:var(--color-muted)]">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="card p-6">
        <p className="font-semibold">Ask the contractor, not us</p>
        <ul className="mt-4 space-y-3 text-sm">
          {questions.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden="true" style={{ color: "var(--color-accent)" }}>
                ?
              </span>
              <span className="text-[color:var(--color-muted)]">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-[color:var(--color-muted)]">
          Pricing, specification, scheduling, and warranty sit with the
          independent contractor assigned to your project.
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- RelatedServices */

export function RelatedServices({
  services,
  currentSlug,
  basePath = "/services",
}: {
  services: readonly ServiceRecord[];
  currentSlug: string;
  /** Link target prefix. Combo pages pass their own location so these cards
   *  stay inside the local set instead of bouncing out to the service hubs. */
  basePath?: string;
}) {
  const others = services.filter((service) => service.slug !== currentSlug);
  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {others.map((service) => (
        <li key={service.slug}>
          <Link
            href={`${basePath}/${service.slug}`}
            className="card card-interactive flex h-full flex-col overflow-hidden"
          >
            <Image
              src={service.image}
              alt=""
              width={600}
              height={400}
              sizes="(min-width: 640px) 30vw, 100vw"
              className="h-32 w-full object-cover"
            />
            <span className="flex flex-1 flex-col p-4">
              <span className="font-semibold">{service.name}</span>
              <span className="mt-1.5 text-sm text-[color:var(--color-muted)]">
                {service.summary}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ----------------------------------------------------------------- CtaBand */

export function CtaBand({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <section
      className="border-y py-12"
      style={{
        borderColor: "var(--color-line)",
        backgroundColor: "var(--color-accent-soft)",
      }}
    >
      <div className="container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-muted)]">
            {body}
          </p>
        </div>
        <div className="grid shrink-0 gap-3 min-[380px]:grid-cols-2 md:w-auto">
          <DynamicPhone
            fallbackDisplay={site.phoneDisplay}
            fallbackE164={site.phoneE164}
            placement="cta_band"
            className="btn btn-primary"
          />
          <a href="#quote-form" className="btn btn-secondary">
            Request a referral
          </a>
        </div>
      </div>
    </section>
  );
}
