import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { publishedLocations } from "@/content/locations";
import { publishedServices } from "@/content/services";
import { site } from "@/lib/env";
import { FOOTER_DISCLOSURE, SC_LLR_URL } from "@/lib/seo/disclosure";

export function ComplianceFooter() {
  return (
    <footer
      id="site-footer"
      className="footer-band"
    >
      <div className="container-page py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 text-left sm:gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="col-span-2 max-w-sm lg:col-span-1">
            <div className="flex items-center">
              <Logo height={52} />
            </div>
            <p className="mt-4 text-[13.5px] leading-relaxed text-[color:var(--color-muted)]">
              An online referral service that connects South Carolina
              homeowners with independent third party concrete service
              providers. We hold no contractor license and perform no
              concrete work.
            </p>
            <div className="mt-5 space-y-1.5 text-sm">
              <a href={`tel:${site.phoneE164}`} className="block font-semibold">
                {site.phoneDisplay}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="block break-all text-[color:var(--color-muted)]"
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
              Verify a license with SC LLR
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
                  href="/faq/"
                  className="text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]"
                >
                  FAQ
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

        <p
          className="mt-12 rounded-[12px] border p-4 text-[13px] font-medium leading-relaxed"
          style={{ borderColor: "var(--color-line)" }}
        >
          {FOOTER_DISCLOSURE}
        </p>

        <div className="mt-8 flex flex-col gap-2 text-[13px] text-[color:var(--color-muted)] lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {new Date().getFullYear()} {site.brand}. All rights reserved.
          </p>
          <p>
            No license, rating, review, or project claim on this site represents
            work performed by the publisher.
          </p>
        </div>
      </div>
    </footer>
  );
}
