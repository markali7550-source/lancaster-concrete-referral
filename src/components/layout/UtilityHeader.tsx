import Link from "next/link";
import { DynamicPhone } from "@/components/lead/DynamicPhone";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ServicesMenu } from "@/components/layout/ServicesMenu";
import { publishedServices } from "@/content/services";
import { site } from "@/lib/env";

function Wordmark() {
  return (
    <Link href="/" className="flex items-center" aria-label={site.brand}>
      <Logo height={44} />
    </Link>
  );
}

export function UtilityHeader() {
  return (
    <header className="sticky top-0 z-30">
      <div
        className="border-b"
        style={{
          borderColor: "var(--color-line-soft)",
          // Fully opaque: a translucent sticky bar lets the content scrolling
          // beneath it show through, which reads as broken text.
          backgroundColor: "var(--color-surface)",
        }}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Wordmark />

          <nav
            aria-label="Primary"
            className="hidden items-center gap-0.5 lg:flex xl:gap-1"
          >
            <ServicesMenu
              items={publishedServices.map((service) => ({
                slug: service.slug,
                name: service.name,
                projectTypes: service.projectTypes,
              }))}
            />
            <Link href="/locations" className="btn btn-ghost whitespace-nowrap px-2.5 text-[15px] font-medium xl:px-3.5">
              Service areas
            </Link>
            <Link href="/how-it-works" className="btn btn-ghost whitespace-nowrap px-2.5 text-[15px] font-medium xl:px-3.5">
              How it works
            </Link>
            <Link href="/contact" className="btn btn-ghost whitespace-nowrap px-2.5 text-[15px] font-medium xl:px-3.5">
              Contact
            </Link>
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <DynamicPhone
              fallbackDisplay={site.phoneDisplay}
              fallbackE164={site.phoneE164}
              placement="header"
              className="btn btn-secondary hidden min-h-11 whitespace-nowrap px-4 text-[15px] xl:inline-flex"
            />
            <Link href="/contact" className="btn btn-primary min-h-11 whitespace-nowrap px-4 text-[15px]">
              Request a referral
            </Link>
          </div>

          {/* Mobile menu — native <details>, closed on navigation by MobileMenu */}
          <MobileMenu>
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
              <Link
                href="/services"
                className="block rounded-[10px] px-3 py-2.5 text-[15px] font-semibold"
                style={{ color: "var(--color-accent)" }}
              >
                All services →
              </Link>
              <p className="eyebrow-plain px-3 pb-1 pt-3">Company</p>
              <Link href="/locations" className="block rounded-[10px] px-3 py-2.5 text-[15px]">
                Service areas
              </Link>
              <Link
                href="/locations/lancaster-sc"
                className="block rounded-[10px] px-3 py-2.5 text-[15px]"
              >
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
          </MobileMenu>
        </div>
      </div>
    </header>
  );
}
