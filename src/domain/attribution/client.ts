"use client";

import {
  CLICK_ID_KEYS,
  UTM_KEYS,
  mergeTouch,
  type AttributionSnapshot,
  type AttributionState,
} from "./model";

const STORAGE_KEY = "lcr_attribution";
const SESSION_KEY = "lcr_session";

function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function readSnapshotFromUrl(): AttributionSnapshot {
  const params = new URLSearchParams(window.location.search);
  const snapshot: AttributionSnapshot = {
    landingPath: window.location.pathname,
    referrer: document.referrer || undefined,
  };
  for (const [param, field] of UTM_KEYS) {
    const value = params.get(param);
    if (value) snapshot[field] = value.slice(0, 128);
  }
  for (const key of CLICK_ID_KEYS) {
    const value = params.get(key);
    if (value) snapshot[key] = value.slice(0, 256);
  }
  return snapshot;
}

/** Runs once per page load. Opaque IDs only — no PII is stored client-side. */
export function captureAttribution(): AttributionState {
  const visitorId = ((): string => {
    try {
      const existing = localStorage.getItem("lcr_visitor");
      if (existing) return existing;
      const created = uuid();
      localStorage.setItem("lcr_visitor", created);
      return created;
    } catch {
      return uuid();
    }
  })();

  const sessionId = ((): string => {
    try {
      const existing = sessionStorage.getItem(SESSION_KEY);
      if (existing) return existing;
      const created = uuid();
      sessionStorage.setItem(SESSION_KEY, created);
      return created;
    } catch {
      return uuid();
    }
  })();

  let existing: AttributionState | null = null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) existing = JSON.parse(raw) as AttributionState;
  } catch {
    existing = null;
  }

  const merged = mergeTouch(existing, readSnapshotFromUrl(), {
    visitorId,
    sessionId,
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    /* storage blocked — the lead still carries the in-memory snapshot */
  }
  return merged;
}

/** Immutable snapshot attached to a lead at submit time (§7.1). */
export function attributionForLead(): AttributionSnapshot {
  const state = captureAttribution();
  const touch = state.lastNonDirectTouch ?? state.firstTouch;
  return {
    visitorId: state.visitorId,
    sessionId: state.sessionId,
    landingPath: state.firstTouch.landingPath,
    referrer: touch.referrer,
    utmSource: touch.utmSource,
    utmMedium: touch.utmMedium,
    utmCampaign: touch.utmCampaign,
    utmTerm: touch.utmTerm,
    utmContent: touch.utmContent,
    gclid: touch.gclid,
    gbraid: touch.gbraid,
    wbraid: touch.wbraid,
    msclkid: touch.msclkid,
  };
}
