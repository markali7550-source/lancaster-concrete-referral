"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    setDecided(readConsent() !== null);
  }, []);

  if (decided) return null;

  return (
    <div
      role="region"
      aria-label="Tracking consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t p-4 md:inset-x-auto md:bottom-4 md:left-4 md:max-w-sm md:rounded-[16px] md:border"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-line)",
        boxShadow: "var(--shadow-raised)",
        paddingBottom: "calc(1rem + env(safe-area-inset-bottom))",
      }}
    >
      <p className="text-sm font-semibold">Optional tracking</p>
      <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--color-muted)]">
        We use optional analytics and call tracking to see which campaigns
        produce enquiries. Declining changes nothing about your ability to call
        us or submit a request.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            writeConsent("denied");
            setDecided(true);
          }}
        >
          Decline
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            writeConsent("granted");
            setDecided(true);
          }}
        >
          Allow
        </button>
      </div>
    </div>
  );
}
