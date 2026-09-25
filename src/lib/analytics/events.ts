"use client";

/** §7.2 and §7.4 — the complete client event vocabulary. */
export type AnalyticsEvent =
  | "cta_call_click"
  | "quote_start"
  | "quote_step_complete"
  | "quote_validation_error"
  | "lead_submit_attempt"
  | "lead_accepted"
  | "lead_no_coverage"
  | "lead_submit_failure";

type Payload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Payload[];
  }
}

function hasConsent(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.includes("tracking_consent=granted");
}

/**
 * Never carries raw PII: field names yes, field values no.
 * Analytics is a reporting adapter only — PostgreSQL stays the source of
 * truth for business attribution (§7.4).
 */
export function track(event: AnalyticsEvent, payload: Payload = {}): void {
  if (typeof window === "undefined") return;

  const enriched: Payload = {
    event,
    page_path: window.location.pathname,
    consent_state: hasConsent() ? "granted" : "denied",
    ...payload,
  };

  // Always dispatched so server-side or first-party listeners can observe,
  // even when a consent-gated vendor tag is absent.
  window.dispatchEvent(new CustomEvent(event, { detail: enriched }));

  if (hasConsent()) {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(enriched);
  }
}
