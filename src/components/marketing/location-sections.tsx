import Image from "next/image";
import Link from "next/link";

/**
 * Location/service-only sections. These give city pages their own visual
 * identity: a two-column split hero with a local badge and a quick quote
 * box, and a local context block with neighborhood tags.
 */

export function LocationHero({
  breadcrumbs,
  badge,
  eyebrow,
  h1,
  summary,
  image,
  imageAlt,
  quoteTitle,
  quoteBody,
}: {
  breadcrumbs: React.ReactNode;
  badge: string;
  eyebrow: string;
  h1: string;
  summary: string;
  image: string;
  imageAlt: string;
  quoteTitle: string;
  quoteBody: string;
}) {
  return (
    <section
      className="relative border-b"
      style={{ borderColor: "var(--color-line-soft)" }}
    >
      <div className="container-page py-10 md:py-14">
        {breadcrumbs}
        <div className="mt-6 grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[14px] font-semibold"
              style={{
                borderColor: "var(--color-accent)",
                color: "var(--color-accent)",
              }}
            >
              <span aria-hidden="true">📍</span>
              {badge}
            </p>
            <p className="eyebrow mt-6">{eyebrow}</p>
            <h1 className="h1 mt-4 text-balance">{h1}</h1>
            <p className="lede mt-5 max-w-prose">{summary}</p>

            <div
              className="mt-8 rounded-[12px] border p-5 md:p-6"
              style={{
                borderColor: "var(--color-line-soft)",
                backgroundColor: "var(--color-surface)",
              }}
              aria-labelledby="quick-quote-title"
            >
              <p
                id="quick-quote-title"
                className="text-[17px] font-semibold"
              >
                {quoteTitle}
              </p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-[color:var(--color-muted)]">
                {quoteBody}
              </p>
              <Link
                href="#quote-form"
                className="btn btn-primary mt-4 inline-flex min-h-[48px] w-full items-center justify-center sm:w-auto"
              >
                Request Concrete Service
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[16px] lg:col-span-5">
            <Image
              src={image}
              alt={imageAlt}
              width={1100}
              height={741}
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-72 w-full object-cover md:h-96 lg:h-full lg:min-h-[420px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function LocalContext({
  cityLabel,
  climateTitle,
  climate,
  neighborhoodsTitle,
  neighborhoods,
}: {
  cityLabel: string;
  climateTitle: string;
  climate: string[];
  neighborhoodsTitle: string;
  neighborhoods: string[];
}) {
  return (
    <section
      className="scroll-mt-36 border-b py-12 md:py-16"
      style={{ borderColor: "var(--color-line-soft)" }}
      aria-labelledby="local-context-title"
    >
      <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="eyebrow flex">Local conditions · {cityLabel}</p>
          <h2 id="local-context-title" className="h2 mt-4">
            {climateTitle}
          </h2>
          <div className="mt-6 max-w-prose space-y-4">
            {climate.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-[16px] leading-relaxed text-[color:var(--color-muted)]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[20px] font-semibold leading-snug">
            {neighborhoodsTitle}
          </h3>
          <ul className="mt-5 flex flex-wrap gap-2.5" aria-label="Communities served">
            {neighborhoods.map((name) => (
              <li
                key={name}
                className="rounded-full border px-4 py-2 text-[15px] font-medium"
                style={{
                  borderColor: "var(--color-line-soft)",
                  backgroundColor: "var(--color-surface)",
                }}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
