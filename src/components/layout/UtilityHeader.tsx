import Link from "next/link";
import { DynamicPhone } from "@/components/lead/DynamicPhone";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { RequestFormLink } from "@/components/layout/RequestFormLink";
import { ServicesMenu } from "@/components/layout/ServicesMenu";
import { publishedServices } from "@/content/services";
import { site } from "@/lib/env";

/** Solid, full-width tap target for the mobile menu: white text, solid hover. */
const MENU_LINK =
  "flex w-full items-center rounded-lg px-3.5 py-2.5 text-[15px] font-medium text-zinc-100 transition-colors hover:bg-zinc-900 hover:text-white active:bg-zinc-900";

function Wordmark() {
  return (
    <Link href="/" className="flex shrink-0 items-center" aria-label={site.brand}>
      <Logo height={44} priority />
    </Link>
  );
}

/**
 * Background, blur, and the hairline bottom edge all live on `.header-band` in
 * globals.css (the "Frosted glass, 50%" block). They are deliberately NOT set
 * here: a `bg-*` utility would outrank the component layer and an inline
 * `borderColor` would outrank everything, either of which silently cancels the
 * glass. Everything else about the bar -- height, spacing, nav, logo, buttons
 * -- is unchanged.
 */
export function UtilityHeader() {
  return (
    <header className="header-band gpu-layer sticky top-0 z-[100] border-b pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pt-[env(safe-area-inset-top)] transition-colors duration-300">
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
            <Link href="/faq/" className="btn btn-ghost whitespace-nowrap px-2.5 text-[15px] font-medium xl:px-3.5">
              FAQ
            </Link>
            <Link href="/contact" className="btn btn-ghost whitespace-nowrap px-2.5 text-[15px] font-medium xl:px-3.5">
              Contact
            </Link>
          </nav>

          <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
            <DynamicPhone
              fallbackDisplay={site.phoneDisplay}
              fallbackE164={site.phoneE164}
              placement="header"
              className="btn btn-secondary hidden min-h-12 whitespace-nowrap px-3.5 text-[15px] xl:inline-flex"
            />
            <RequestFormLink className="btn btn-primary min-h-12 shrink-0 whitespace-nowrap px-3.5 text-[15px]">
              Request Service
            </RequestFormLink>
          </div>

          {/* Mobile menu: native <details>, closed on navigation by MobileMenu */}
          <MobileMenu>
            <summary
              className="btn btn-secondary shrink-0 cursor-pointer list-none px-3 [&::-webkit-details-marker]:hidden [&::marker]:hidden"
              aria-label="Open menu"
            >
              <Icon name="menu" />
            </summary>
            <div
              className="absolute right-0 top-full z-50 mt-2 max-h-[calc(100svh-6rem)] w-[min(20rem,calc(100vw-2rem))] overflow-y-auto overscroll-contain rounded-2xl border border-zinc-800 bg-zinc-950 p-3 shadow-2xl shadow-black sm:p-4"
              style={{ backgroundColor: "#09090b", opacity: 1 }}
            >
              <p className="px-3.5 pb-1 pt-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                Services
              </p>
              <div className="ml-1 mt-1 border-l-2 border-zinc-800 pl-2">
                {publishedServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className={MENU_LINK}
                  >
                    {service.name}
                  </Link>
                ))}
                <Link href="/services" className={`${MENU_LINK} font-semibold`}>
                  All services →
                </Link>
              </div>
              <p className="px-3.5 pb-1 pt-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                Company
              </p>
              <Link href="/locations" className={MENU_LINK}>
                Service areas
              </Link>
              <Link href="/locations/lancaster-sc" className={MENU_LINK}>
                Lancaster, SC
              </Link>
              <Link href="/how-it-works" className={MENU_LINK}>
                How it works
              </Link>
              <Link href="/faq/" className={MENU_LINK}>
                FAQ
              </Link>
              <Link href="/contact" className={MENU_LINK}>
                Contact
              </Link>
              <div className="mt-2 grid grid-cols-1 gap-2 border-t border-zinc-800 pt-3">
                <DynamicPhone
                  fallbackDisplay={site.phoneDisplay}
                  fallbackE164={site.phoneE164}
                  placement="mobile_menu"
                  className="btn btn-primary w-full"
                />
                <RequestFormLink className="btn btn-secondary w-full">
                  Request Service
                </RequestFormLink>
              </div>
            </div>
          </MobileMenu>
        </div>
    </header>
  );
}
