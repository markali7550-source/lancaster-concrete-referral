"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setDecided(readConsent() !== null);
  }, []);

  /**
   * On phones the banner is a full-width bar pinned to the bottom, so it can
   * sit on top of page content. Reserve exactly its height at the end of the
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
    const apply = () => {
      const next = mobile.matches ? `${node.offsetHeight}px` : "";
      if (next === applied) return;
      applied = next;
      document.body.style.paddingBottom = next;
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(node);
    mobile.addEventListener("change", apply);
    return () => {
      observer.disconnect();
      mobile.removeEventListener("change", apply);
      document.body.style.paddingBottom = "";
    };
  }, [decided]);

  const dismiss = useCallback((value: "granted" | "denied") => {
    writeConsent(value);
    document.body.style.paddingBottom = "";
    setDecided(true);
  }, []);

  if (decided) return null;

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Tracking consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t p-3.5 md:inset-x-auto md:bottom-4 md:left-4 md:max-w-sm md:rounded-[16px] md:border md:p-4"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-line)",
        boxShadow: "var(--shadow-raised)",
        paddingBottom: "calc(0.875rem + env(safe-area-inset-bottom))",
      }}
    >
      <p className="text-sm font-semibold">Optional tracking</p>
      <p className="mt-1.5 text-[13px] leading-snug text-[color:var(--color-muted)] md:mt-2 md:leading-relaxed">
        We use optional analytics and call tracking to see which campaigns
        produce inquiries. Declining changes nothing about your ability to call
        us or submit a request.
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2 md:mt-4">
        <button
          type="button"
          className="btn btn-secondary min-h-11 md:min-h-[52px]"
          onClick={() => dismiss("denied")}
        >
          Decline
        </button>
        <button
          type="button"
          className="btn btn-primary min-h-11 md:min-h-[52px]"
          onClick={() => dismiss("granted")}
        >
          Allow
        </button>
      </div>
    </div>
  );
}
