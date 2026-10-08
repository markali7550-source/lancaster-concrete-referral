import Image from "next/image";
import { site } from "@/lib/env";

/** Native pixel dimensions of the shipped lockup artwork (both variants share
 * the same canvas), used to keep the aspect ratio correct at any height. */
const LOGO_WIDTH = 1808;
const LOGO_HEIGHT = 556;

/** Brand lockup. Ships as two pre-rendered variants — dark ink for light
 * surfaces, light ink for dark surfaces (dark mode header, the dark footer
 * band) — swapped purely in CSS via the existing `.logo-light` / `.logo-dark`
 * utilities so no client JS is needed to pick the right one.
 *
 * Loading strategy: the variant CSS hides must never cost a byte.
 *
 * Only the footer pins the light-ink variant (`.footer-band .logo-dark`);
 * everywhere else the global `.logo-light` / `.logo-dark` rules swap by
 * colour scheme, so in light mode the painted lockup is the `logo-light`
 * image below. It stays `loading="lazy"`: above the fold it starts loading
 * immediately anyway. The header instance passes `priority` so the
 * dark-scheme variant is preloaded; in light mode that preload fetches a
 * hidden twin, which `sizes` keeps to a small derivative.
 *
 * Both variants also declare `sizes`, which is what stops Next.js emitting a
 * density-based `1x/2x` srcset pinned to the 1808px intrinsic width. Without
 * it the browser was fetching the `w=1920` AND `w=3840` derivatives (~165 kB)
 * for a lockup that paints at ~143px, competing with the hero LCP image. With
 * `sizes` the optimizer serves a derivative matched to the real painted width. */
export function Logo({
  height = 36,
  priority = false,
}: {
  height?: number;
  /** Opt in ONLY for the above-the-fold header lockup. The footer copy sits
   *  far below the fold, so preloading it just competes with the hero LCP. */
  priority?: boolean;
}) {
  const width = Math.round((LOGO_WIDTH / LOGO_HEIGHT) * height);
  // Exact CSS width of the painted lockup; lets the browser pick the smallest
  // sufficient candidate (and 2x of it on HiDPI) instead of the 3840px file.
  const sizes = `${width}px`;

  return (
    <span className="relative inline-block" style={{ height, width }}>
      <Image
        src="/logo.webp"
        alt={site.brand}
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        sizes={sizes}
        loading="lazy"
        className="logo-light absolute inset-0 h-full w-full object-contain"
      />
      <Image
        src="/logo-dark.webp"
        alt={site.brand}
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className="logo-dark absolute inset-0 h-full w-full object-contain"
      />
    </span>
  );
}
