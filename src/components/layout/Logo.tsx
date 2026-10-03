import Image from "next/image";
import { site } from "@/lib/env";

/** Native pixel dimensions of the shipped lockup artwork (both variants share
 * the same canvas), used to keep the aspect ratio correct at any height. */
const LOGO_WIDTH = 1808;
const LOGO_HEIGHT = 556;

/** Brand lockup. Ships as two pre-rendered variants — dark ink for light
 * surfaces, light ink for dark surfaces (dark mode header, the dark footer
 * band) — swapped purely in CSS via the existing `.logo-light` / `.logo-dark`
 * utilities so no client JS is needed to pick the right one. */
export function Logo({ height = 36 }: { height?: number }) {
  const width = Math.round((LOGO_WIDTH / LOGO_HEIGHT) * height);

  return (
    <span className="relative inline-block" style={{ height, width }}>
      <Image
        src="/logo.webp"
        alt={site.brand}
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority
        className="logo-light absolute inset-0 h-full w-full object-contain"
      />
      <Image
        src="/logo-dark.webp"
        alt={site.brand}
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority
        className="logo-dark absolute inset-0 h-full w-full object-contain"
      />
    </span>
  );
}
