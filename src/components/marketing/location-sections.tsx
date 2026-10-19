import Link from "next/link";
import {
  OverlayHeader,
  overlayBody,
  overlayEyebrow,
  overlayHeading,
} from "@/components/marketing/sections";

/**
 * Location/service-only sections: an overlay hero with a quick quote card on
 * quick quote card on top of the photo, and a local context block.
 */

export function LocationHero({
  breadcrumbs,
  eyebrow,
  h1,
  summary,
  image,
  imageAlt,
  quoteTitle,
  quoteBody,
}: {
  breadcrumbs: React.ReactNode;
  eyebrow: string;
  h1: string;
  summary: string;
  image: string;
  imageAlt: string;
  quoteTitle: string;
  quoteBody: string;
}) {
  /*
   * Overlay hero (approved 2026-10-13): the photo is the full background,
   * with the same scrim as the service-page hero. Badge, headline, summary,
   * and the quote card sit on top of it.
   */
  return (
    <OverlayHeader
      imageSrc={image}
      imageAlt={imageAlt}
      breadcrumbs={breadcrumbs}
    >
      <p className="eyebrow mt-6 flex" style={{ color: overlayEyebrow }}>
        {eyebrow}
      </p>
      <h1 className="h1 mt-4 text-balance" style={{ color: overlayHeading }}>
        {h1}
      </h1>
      <p className="lede mt-5 max-w-prose" style={{ color: overlayBody }}>
        {summary}
      </p>

      <div
        className="mt-8 rounded-[12px] border p-5 md:p-6"
        style={{
          borderColor: "rgba(255,255,255,0.16)",
          backgroundColor: "rgba(11,16,23,0.72)",
          color: "var(--color-band-ink)",
        }}
        aria-labelledby="quick-quote-title"
      >
        <p id="quick-quote-title" className="text-[17px] font-semibold">
          {quoteTitle}
        </p>
        <p className="mt-1.5 text-[15px] leading-relaxed" style={{ color: overlayBody }}>
          {quoteBody}
        </p>
        <Link
          href="#quote-form"
          className="btn btn-primary mt-4 inline-flex min-h-[52px] w-full items-center justify-center sm:w-auto"
        >
          Request Concrete Service
        </Link>
      </div>
    </OverlayHeader>
  );
}

export function LocalContext({
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
      <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="eyebrow flex">Local conditions</p>
          <h2 id="local-context-title" className="h2 mt-4">
            {climateTitle}
          </h2>
          <div className="mt-6 max-w-prose space-y-4">
            {climate.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="border-b border-[var(--color-line-soft)] pb-4 text-[16px] leading-relaxed text-[color:var(--color-muted)] last:border-b-0 last:pb-0"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="local-communities border-t border-[var(--color-line-soft)] pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
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
