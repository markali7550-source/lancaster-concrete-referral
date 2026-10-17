"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Time for the dismiss fade to finish before the banner unmounts. */
const DISMISS_MS = 200;

const COOKIE = "tracking_consent";
const MAX_AGE = 60 * 60 * 24 * 180;

function readConsent(): "granted" | "denied" | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/tracking_consent=(granted|denied)/);
  return match ? (match[1] as "granted" | "denied") : null;
}

function writeConsent(value: "granted" | "denied") {
  document.cookie = `${COOKIE}=${value}; path=/; max-age=${MAX_AGE}; SameSite=Lax`;
  window.dispatchEvent(
    new CustomEvent("consent_change", { detail: { value } }),
  );
}

/**
 * §7.3 / architecture principle 7: analytics and DNI are consent-gated, but
 * consent must never block the phone number or the form. This banner is
 * dismissible, non-modal, and never covers the sticky action bar.
 */
export function ConsentBanner() {
  const [decided, setDecided] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setDecided(readConsent() !== null);
  }, []);

  /**
   * On phones the banner sits just above the mobile call bar, so it can cover
   * page content. Reserve its height plus the call bar's at the end of the
   * document while it is visible, and release it as soon as it is dismissed.
   */
  useEffect(() => {
    const node = ref.current;
    if (decided || !node) {
      document.body.style.paddingBottom = "";
      return;
    }
    const mobile = window.matchMedia("(max-width: 767px)");
    // Write only on an actual change. Setting body padding alters the
    // document height, which can resize the banner and refire the observer:
    // a feedback loop that thrashes layout while the page is being scrolled
    // on mobile, where the collapsing URL bar resizes the viewport anyway.
    let applied = "";
    const apply = (height?: number) => {
      const px = height ?? node.offsetHeight;
      const next = mobile.matches
        ? `calc(${px}px + 5rem + env(safe-area-inset-bottom))`
        : "";
      if (next === applied) return;
      applied = next;
      document.body.style.paddingBottom = next;
    };
    const onMediaChange = () => apply();
    apply();
    // The observer already measured the box, so use its size rather than
    // reading offsetHeight (which forces a synchronous layout) on each change.
    const observer = new ResizeObserver((entries) => {
      const box = entries[0]?.borderBoxSize?.[0];
      apply(box ? Math.round(box.blockSize) : undefined);
    });
    observer.observe(node);
    mobile.addEventListener("change", onMediaChange);
    return () => {
      observer.disconnect();
      mobile.removeEventListener("change", onMediaChange);
      document.body.style.paddingBottom = "";
    };
  }, [decided]);

  useEffect(() => () => {
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
  }, []);

  const dismiss = useCallback((value: "granted" | "denied") => {
    writeConsent(value);
    document.body.style.paddingBottom = "";
    setLeaving(true);
    // Fade out, then unmount. Reduced-motion users get the same end state
    // immediately because the transition is disabled in their CSS.
    dismissTimer.current = setTimeout(() => setDecided(true), DISMISS_MS);
  }, []);

  if (decided) return null;

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Tracking consent"
      className={`gpu-layer fixed inset-x-3 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-50 rounded-[12px] border p-3 transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none md:inset-x-0 md:bottom-[calc(0.75rem+env(safe-area-inset-bottom))] md:mx-auto md:w-[min(36rem,calc(100%-2rem))] md:p-3 ${
        leaving ? "pointer-events-none translate-y-2 opacity-0" : "opacity-100"
      }`}
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-line)",
        boxShadow: "var(--shadow-raised)",
      }}
    >
      <div className="flex flex-col gap-2.5 md:flex-row md:items-center md:gap-4">
        <div className="min-w-0 md:flex-1">
          <p className="text-sm font-semibold">Optional tracking</p>
          <p className="mt-0.5 text-[13px] leading-snug text-[color:var(--color-muted)]">
            Optional analytics and call tracking. Declining changes nothing
            about your ability to call us or submit a request.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 md:flex md:shrink-0">
          <button
            type="button"
            className="btn btn-secondary min-h-[48px] md:min-w-[6.5rem] md:px-4"
            onClick={() => dismiss("denied")}
          >
            Decline
          </button>
          <button
            type="button"
            className="btn btn-primary min-h-[48px] md:min-w-[6.5rem] md:px-4"
            onClick={() => dismiss("granted")}
          >
            Allow
          </button>
        </div>
      </div>
    </div>
  );
}
