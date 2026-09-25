"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/domain/attribution/client";

/** Captures first touch / last non-direct touch once per page load (§7.1). */
export function AttributionBootstrap() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
