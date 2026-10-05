"use client";

import { useEffect, useRef } from "react";

/**
 * The photographic layer behind a CTA band, pinned to the viewport so the band
 * scrolls over a stationary image.
 *
 * Why this is JavaScript rather than pure CSS
 * -------------------------------------------
 * Three CSS-only techniques were tried first and each fails in a real browser:
 *
 *   1. `background-attachment: fixed` -- iOS Safari ignores it outright, and
 *      `overflow-x: hidden` on body (globals.css, base layer) changes how the
 *      body scrolling box is established, which breaks it in other engines too.
 *
 *   2. `position: fixed` on the layer, unclipped -- the layer escapes the band
 *      and covers the whole page.
 *
 *   3. `position: fixed` clipped by `clip-path: inset(0)` on the band. This is
 *      the usual recommendation, but it relies on clip-path creating a
 *      stacking context *without* becoming a containing block. WebKit does
 *      treat a clipped ancestor as the containing block, so `inset: 0` resolves
 *      against the band instead of the viewport and the layer renders exactly
 *      like a plain absolute cover image -- silently no pinning at all, with no
 *      visual glitch to hint at it.
 *
 * So the pin is done arithmetically instead. The layer is an absolutely
 * positioned, viewport-tall box at the top of the band, translated up by the
 * band's distance from the top of the viewport. That places it at viewport
 * coordinates 0..100vh on every frame, which is the definition of "fixed",
 * while remaining an ordinary in-flow transformed element that the band's
 * `overflow: hidden` clips normally. Transforms behave identically across
 * engines, so there is no containing-block ambiguity left to get wrong.
 *
 * Progressive enhancement: with no JS the layer is a correctly cropped
 * `position: absolute; inset: 0` cover image, which is the current behaviour.
 */
export function CtaParallaxLayer() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = ref.current;
    const band = layer?.parentElement;
    if (!layer || !band) return;

    // Desktop only. Mobile engines resize the visual viewport mid-scroll as the
    // URL bar collapses, which makes a pinned layer jitter. Gate on width
    // rather than pointer type: touch laptops handle the effect fine.
    const desktop = window.matchMedia("(min-width: 64rem)");

    let frame = 0;
    let active = false;

    const paint = () => {
      frame = 0;
      // Distance from the top of the viewport to the top of the band. Shifting
      // the layer by its negative parks the layer's top edge at viewport 0.
      const offset = band.getBoundingClientRect().top;
      layer.style.transform = `translate3d(0, ${-offset}px, 0)`;
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    const enable = () => {
      if (active) return;
      active = true;
      layer.dataset.pinned = "true";
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
      paint();
    };

    const disable = () => {
      if (!active) return;
      active = false;
      delete layer.dataset.pinned;
      layer.style.transform = "";
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const sync = () => (desktop.matches ? enable() : disable());

    sync();
    desktop.addEventListener("change", sync);

    return () => {
      desktop.removeEventListener("change", sync);
      disable();
    };
  }, []);

  return <div ref={ref} className="cta-parallax-layer" aria-hidden="true" />;
}
