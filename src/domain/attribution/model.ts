/**
 * §5.2 attribution contract — every field the lead request may carry.
 *
 * Plain type on purpose: this module is imported by client code (the attribution
 * bootstrap and the quote form), so it must not pull in zod. Server-side
 * validation of the lead request lives in `src/lib/validation/lead.ts`.
 */
export interface AttributionSnapshot {
  visitorId?: string;
  sessionId?: string;
  landingPath?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  msclkid?: string;
}

export const ATTRIBUTION_WINDOW_DAYS = 90;
export const DUPLICATE_WINDOW_DAYS = 30;

export const CLICK_ID_KEYS = ["gclid", "gbraid", "wbraid", "msclkid"] as const;

export const UTM_KEYS = [
  ["utm_source", "utmSource"],
  ["utm_medium", "utmMedium"],
  ["utm_campaign", "utmCampaign"],
  ["utm_term", "utmTerm"],
  ["utm_content", "utmContent"],
] as const;

/**
 * §7.1 — first touch is preserved, last non-direct touch updates, and the
 * lead-creation touch is an immutable snapshot taken at submit time.
 */
export interface AttributionState {
  visitorId: string;
  sessionId: string;
  firstTouch: AttributionSnapshot & { at: string };
  lastNonDirectTouch: (AttributionSnapshot & { at: string }) | null;
}

export function isDirect(snapshot: AttributionSnapshot): boolean {
  const hasCampaign = Boolean(
    snapshot.utmSource ||
      snapshot.utmMedium ||
      snapshot.utmCampaign ||
      CLICK_ID_KEYS.some((key) => snapshot[key]),
  );
  return !hasCampaign && !snapshot.referrer;
}

export function isWithinWindow(iso: string, now = Date.now()): boolean {
  return now - Date.parse(iso) <= ATTRIBUTION_WINDOW_DAYS * 86_400_000;
}

/** Merge rule: first touch is never overwritten inside the window. */
export function mergeTouch(
  existing: AttributionState | null,
  incoming: AttributionSnapshot,
  ids: { visitorId: string; sessionId: string },
  nowIso = new Date().toISOString(),
): AttributionState {
  const touch = { ...incoming, at: nowIso };
  if (!existing || !isWithinWindow(existing.firstTouch.at)) {
    return {
      visitorId: ids.visitorId,
      sessionId: ids.sessionId,
      firstTouch: touch,
      lastNonDirectTouch: isDirect(incoming) ? null : touch,
    };
  }
  return {
    ...existing,
    sessionId: ids.sessionId,
    lastNonDirectTouch: isDirect(incoming)
      ? existing.lastNonDirectTouch
      : touch,
  };
}
