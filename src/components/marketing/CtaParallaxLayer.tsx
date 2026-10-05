"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * The photograph behind a CTA band, held visually stationary while the band
 * scrolls past it.
 *
 * Why this is not `position: sticky`
 * ----------------------------------
 * Sticky can only pin an element that is *shorter* than its containing block,
 * because the pin is produced by the element sliding within the space its
 * container gives it. A CTA band is roughly 250-320px tall and the photo has
 * to cover the whole band, so the element and its container are the same
 * height and sticky has zero travel to work with -- it resolves to static and
 * nothing moves. Sticky is the right tool for a pinned sidebar, not for a
 * stationary backdrop.
 *
 * Why this is not `position: fixed`
 * ---------------------------------
 * A fixed layer is positioned against the viewport, so it keeps painting after
 * the band has scrolled away unless something clips it. Clipping it with
 * `clip-path` on the band was the previous attempt, and it relies on clip-path
 * creating a stacking context without becoming a containing block. WebKit does
 * treat a clipped ancestor as the containing block, so `inset: 0` resolved
 * against the band and the photo silently scrolled like a normal background.
 *
 * What this does instead
 * ----------------------
 * The layer is an absolutely positioned, viewport-tall box anchored to the top
 * of the band, translated by the band's negative viewport offset on each scroll
 * frame. That places it at viewport 0..100vh continuously, which is the
 * stationary look, while it remains an ordinary transformed in-flow element
 * that the band's own `overflow: hidden` crops. The consequences matter:
 *
 *   - it is structurally incapable of escaping the band, so it cannot overlap
 *     the neighbouring sections or outlive the CTA on screen;
 *   - it sits behind the scrim and the copy, so it never covers text/buttons;
 *   - it cannot cause horizontal overflow, since it is clipped to the band.
 *
 * Mobile keeps the plain, correctly cropped cover image: mobile engines resize
 * the visual viewport mid-scroll as the URL bar collapses, which makes any
 * viewport-locked layer jitter. Same fallback with JS off and before hydration.
 */
export function CtaParallaxLayer({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = ref.current;
    const band = layer?.parentElement;
    if (!layer || !band) return;

    // Width gate, not pointer-type: touch laptops handle the effect fine.
    const desktop = window.matchMedia("(min-width: 64rem)");

    let frame = 0;
    let listening = false;
    let onScreen = false;

    const paint = () => {
      frame = 0;
      layer.style.transform = `translate3d(0, ${-band.getBoundingClientRect().top}px, 0)`;
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    const listen = (on: boolean) => {
      if (on === listening) return;
      listening = on;
      if (on) {
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule, { passive: true });
        paint();
      } else {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        if (frame) {
          window.cancelAnimationFrame(frame);
          frame = 0;
        }
      }
    };

    // Only do per-frame work while the band is actually on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        listen(onScreen && desktop.matches);
      },
      { rootMargin: "100px" },
    );
    observer.observe(band);

    const sync = () => {
      if (desktop.matches) {
        layer.dataset.pinned = "true";
        listen(onScreen);
      } else {
        delete layer.dataset.pinned;
        layer.style.transform = "";
        listen(false);
      }
    };

    sync();
    desktop.addEventListener("change", sync);

    return () => {
      observer.disconnect();
      desktop.removeEventListener("change", sync);
      listen(false);
    };
  }, []);

  return (
    <div ref={ref} className="cta-parallax-layer">
      {/* Served through next/image so the band photo gets a srcset and mobile
          is not sent a desktop-width asset. It is the band's only photograph,
          so it carries the descriptive alt rather than being hidden. */}
      <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
    </div>
  );
}
