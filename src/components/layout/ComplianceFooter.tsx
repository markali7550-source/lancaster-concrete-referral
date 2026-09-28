import Link from "next/link";
import { publishedLocations } from "@/content/locations";
import { publishedServices } from "@/content/services";
import { site } from "@/lib/env";
import {
  SHORT_DISCLOSURE,
  SC_LLR_URL,
} from "@/lib/seo/disclosure";

export function ComplianceFooter() {
  return (
    <footer
      id="site-footer"
      className="mt-24 border-t"
      style={{
        borderColor: "var(--color-line-soft)",
        backgroundColor: "var(--color-surface)",
      }}
    >
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span
                className="grid h-9 w-9 place-items-center rounded-[10px] text-[13px] font-bold"
                style={{
                  backgroundColor: "var(--color-accent)",
                  color: "var(--color-page)",
                }}
                aria-hidden="true"
              >
                LC
              </span>
              <span className="text-[15px] font-semibold">{site.brand}</span>
            </div>
            <p className="mt-4 text-[13.5px] leading-relaxed text-[color:var(--color-muted)]">
              An online referral service connecting South Carolina homeowners
              with independent concrete contractors. We hold no contractor
              licence and perform no construction work.
            </p>
            <div className="mt-5 space-y-1.5 text-sm">
              <a href={`tel:${site.phoneE164}`} className="block font-semibold">
                {site.phoneDisplay}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="block text-[color:var(--color-muted)]"
              >
                {site.email}
              </a>
            </div>
            <a
              href={SC_LLR_URL}
              rel="noopener noreferrer nofollow"
              target="_blank"
              className="mt-5 inline-flex text-sm font-semibold underline underline-offset-4"
              style={{ color: "var(--color-accent)" }}
            >
              Verify a licence with SC LLR
            </a>
          </div>

          <nav aria-label="Services">
            <p className="eyebrow-plain">Services</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {publishedServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="font-medium">
                  All services
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Service areas and company">
            <p className="eyebrow-plain">Service area</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {publishedLocations.map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/locations/${location.slug}`}
                    className="text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]"
                  >
                    {location.city}, {location.region}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="eyebrow-plain mt-7">Company</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/how-it-works"
                  className="text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]"
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Legal">
            <p className="eyebrow-plain">Legal</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/referral-disclosure"
                  className="text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]"
                >
                  Referral disclosure
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]"
                >
                  Terms of use
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-12 text-[13px] leading-relaxed text-[color:var(--color-muted)]">
          {SHORT_DISCLOSURE}{" "}
          <Link
            href="/referral-disclosure"
            className="underline underline-offset-2"
          >
            Read the full disclosure
          </Link>
          .
        </p>

        <div className="mt-8 flex flex-col gap-2 text-[12.5px] text-[color:var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.brand}. All rights reserved.
          </p>
          <p>
            No licence, rating, review, or project claim on this site represents
            work performed by the publisher.
          </p>
        </div>
      </div>
    </footer>
  );
}
