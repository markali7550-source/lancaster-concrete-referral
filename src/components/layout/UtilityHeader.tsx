import Link from "next/link";
import { DynamicPhone } from "@/components/lead/DynamicPhone";
import { Icon } from "@/components/ui/Icon";
import { ServicesMenu } from "@/components/layout/ServicesMenu";
import { publishedServices } from "@/content/services";
import { site } from "@/lib/env";

function Wordmark() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] text-[13px] font-bold tracking-tight"
        style={{
          backgroundColor: "var(--color-accent)",
          color: "var(--color-page)",
        }}
        aria-hidden="true"
      >
        LC
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-tight">
          {site.brand}
        </span>
        <span className="mt-1 text-[11px] font-medium text-[color:var(--color-muted)]">
          Referral service · Lancaster, SC
        </span>
      </span>
    </Link>
  );
}

export function UtilityHeader() {
  return (
    <header className="sticky top-0 z-30">
      {/* Tier 1 — context strip */}
      <div
        className="hidden border-b md:block"
        style={{
          backgroundColor: "var(--color-ink)",
          borderColor: "var(--color-ink)",
        }}
      >
        <div className="container-page flex h-9 items-center justify-between text-[12.5px]">
          <p style={{ color: "var(--color-page)" }} className="opacity-80">
            Independent contractor referrals · Coverage today: Lancaster, SC
            29720 &amp; 29721
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/referral-disclosure"
              className="opacity-80 hover:opacity-100"
              style={{ color: "var(--color-page)" }}
            >
              We are not the contractor
            </Link>
            <span className="opacity-30" style={{ color: "var(--color-page)" }}>
              |
            </span>
            <a
              href={`mailto:${site.email}`}
              className="opacity-80 hover:opacity-100"
              style={{ color: "var(--color-page)" }}
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>

      {/* Tier 2 — primary navigation */}
      <div
        className="border-b backdrop-blur"
        style={{
          borderColor: "var(--color-line-soft)",
          backgroundColor:
            "color-mix(in srgb, var(--color-surface) 90%, transparent)",
        }}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Wordmark />

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 lg:flex"
          >
            <ServicesMenu
              items={publishedServices.map((service) => ({
                slug: service.slug,
                name: service.name,
                projectTypes: service.projectTypes,
              }))}
            />
            <Link href="/locations/lancaster-sc" className="btn btn-ghost text-[15px] font-medium">
              Lancaster
            </Link>
            <Link href="/how-it-works" className="btn btn-ghost text-[15px] font-medium">
              How it works
            </Link>
            <Link href="/contact" className="btn btn-ghost text-[15px] font-medium">
              Contact
            </Link>
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <DynamicPhone
              fallbackDisplay={site.phoneDisplay}
              fallbackE164={site.phoneE164}
              placement="header"
              className="btn btn-secondary"
            />
            <Link href="/contact" className="btn btn-primary">
              Request a quote
            </Link>
          </div>

          {/* Mobile menu — native details, no client JS */}
          <details className="relative lg:hidden">
            <summary
              className="btn btn-secondary list-none cursor-pointer px-3"
              aria-label="Open menu"
            >
              <Icon name="menu" />
            </summary>
            <div
              className="card absolute right-0 top-14 w-[17rem] p-2"
              style={{ boxShadow: "var(--shadow-raised)" }}
            >
              <p className="eyebrow-plain px-3 pb-1 pt-2">Services</p>
              {publishedServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="block rounded-[10px] px-3 py-2.5 text-[15px]"
                >
                  {service.name}
                </Link>
              ))}
              <p className="eyebrow-plain px-3 pb-1 pt-3">Company</p>
              <Link href="/locations/lancaster-sc" className="block rounded-[10px] px-3 py-2.5 text-[15px]">
                Lancaster, SC
              </Link>
              <Link href="/how-it-works" className="block rounded-[10px] px-3 py-2.5 text-[15px]">
                How it works
              </Link>
              <Link href="/contact" className="block rounded-[10px] px-3 py-2.5 text-[15px]">
                Contact
              </Link>
              <div className="mt-2 grid gap-2 border-t p-2 hairline">
                <DynamicPhone
                  fallbackDisplay={site.phoneDisplay}
                  fallbackE164={site.phoneE164}
                  placement="mobile_menu"
                  className="btn btn-primary w-full"
                />
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
