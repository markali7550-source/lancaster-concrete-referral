"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * The photograph behind a CTA band, held stationary while the band scrolls.
 *
 * The pin is done entirely in CSS (`position: fixed` on the layer, clipped to
 * the band by `clip-path` on the section). Nothing here runs during scroll.
 *
 * Why no JavaScript in the scroll path
 * ------------------------------------
 * The previous version translated the layer from a scroll handler. That shakes,
 * for two reasons. It called getBoundingClientRect() every frame, forcing a
 * synchronous layout; and more fundamentally a scroll listener always resolves
 * a frame behind the compositor that is already moving the page, so the layer
 * is perpetually catching up to the band it is supposed to be nailed to. The
 * first is fixable, the second is not. A pinned background has to be driven by
 * the compositor, which means CSS.
 *
 * Why the effect is still feature-detected
 * ----------------------------------------
 * The CSS technique depends on `clip-path` clipping fixed descendants *without*
 * becoming a containing block for them. Per CSS Masking it only creates a
 * stacking context, but that is exactly the kind of detail engines disagree on,
 * and if an engine does treat the clipped band as the containing block then
 * `inset: 0` resolves to the band and the photo quietly scrolls like an
 * ordinary background. So rather than assume, probe it once: build a small
 * clipped host offscreen, put a fixed child in it, and see whether the child
 * measures the viewport or the host.
 *
 * Only when the probe passes does the band get `data-pin="css"`, which is what
 * the stylesheet keys the effect off. Everywhere else the layer stays a plain
 * `position: absolute; inset: 0` cover image. That is also what renders on
 * mobile, with JS off, and before hydration -- a correct, still, cropped photo
 * rather than a shaky one.
 *
 * Because the band clips the layer, the photo cannot escape the CTA: it stops
 * at the section edges, never overlaps a neighbouring section, and never
 * outlives the CTA on screen. It sits behind the scrim and the copy, so it
 * cannot cover text or buttons.
 */

/** Cached across instances: the answer cannot change within a document. */
let clippedFixedIsViewportRelative: boolean | null = null;

function supportsClippedFixed(): boolean {
  if (clippedFixedIsViewportRelative !== null) {
    return clippedFixedIsViewportRelative;
  }
  if (typeof CSS === "undefined" || !CSS.supports("clip-path", "inset(0)")) {
    clippedFixedIsViewportRelative = false;
    return false;
  }

  const host = document.createElement("div");
  host.style.cssText =
    "position:absolute;top:0;left:0;width:40px;height:40px;clip-path:inset(0);visibility:hidden;pointer-events:none";
  const probe = document.createElement("div");
  probe.style.cssText = "position:fixed;top:0;left:0;right:0;bottom:0";
  host.appendChild(probe);
  document.body.appendChild(host);

  // Viewport-relative => the probe spans the page. Containing-block behaviour
  // => it collapses to the 40px host.
  const measured = probe.getBoundingClientRect().width;
  const viewport = document.documentElement.clientWidth;
  host.remove();

  clippedFixedIsViewportRelative = measured > Math.max(60, viewport * 0.5);
  return clippedFixedIsViewportRelative;
}

export function CtaParallaxLayer({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const band = ref.current?.parentElement;
    if (!band) return;

    // Width gate, not pointer-type: touch laptops handle the effect fine, and
    // mobile engines resize the visual viewport mid-scroll as the URL bar
    // collapses, which makes any viewport-pinned layer unstable.
    const desktop = window.matchMedia("(min-width: 64rem)");

    const sync = () => {
      if (desktop.matches && supportsClippedFixed()) {
        band.dataset.pin = "css";
      } else {
        delete band.dataset.pin;
      }
    };

    sync();
    desktop.addEventListener("change", sync);
    return () => {
      desktop.removeEventListener("change", sync);
      delete band.dataset.pin;
    };
  }, []);

  return (
    <div ref={ref} className="cta-parallax-layer">
      <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
    </div>
  );
}
