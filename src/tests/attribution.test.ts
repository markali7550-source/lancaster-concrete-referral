import { describe, expect, it } from "vitest";
import { isDirect, mergeTouch, type AttributionState } from "@/domain/attribution/model";

describe("attribution model (§7.1)", () => {
  const ids = { visitorId: "v1", sessionId: "s1" };

  it("classifies a bare visit as direct", () => {
    expect(isDirect({ landingPath: "/" })).toBe(true);
  });

  it("classifies a click-id visit as non-direct", () => {
    expect(isDirect({ gclid: "abc" })).toBe(false);
  });

  it("preserves first touch across later visits", () => {
    const first = mergeTouch(null, { utmSource: "google" }, ids, "2026-09-01T00:00:00.000Z");
    const second = mergeTouch(first, { utmSource: "bing" }, ids, "2026-09-10T00:00:00.000Z");
    expect(second.firstTouch.utmSource).toBe("google");
    expect(second.lastNonDirectTouch?.utmSource).toBe("bing");
  });

  it("does not overwrite last non-direct touch with a direct visit", () => {
    const first = mergeTouch(null, { utmSource: "google" }, ids, "2026-09-01T00:00:00.000Z");
    const second = mergeTouch(first, { landingPath: "/" }, ids, "2026-09-02T00:00:00.000Z");
    expect(second.lastNonDirectTouch?.utmSource).toBe("google");
  });

  it("restarts attribution once the 90 day window lapses", () => {
    const stale: AttributionState = {
      ...ids,
      firstTouch: { utmSource: "google", at: "2020-01-01T00:00:00.000Z" },
      lastNonDirectTouch: null,
    };
    const fresh = mergeTouch(stale, { utmSource: "bing" }, ids);
    expect(fresh.firstTouch.utmSource).toBe("bing");
  });
});
