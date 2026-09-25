"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

interface DynamicPhoneProps {
  fallbackDisplay: string;
  fallbackE164: string;
  placement: string;
  className?: string;
  showIcon?: boolean;
}

interface Allocation {
  display: string;
  e164: string;
}

function hasTrackingConsent(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.includes("tracking_consent=granted");
}

/**
 * Client leaf. Static HTML always ships the verified fallback number; the
 * visible text and tel: href are swapped atomically, never separately.
 */
export function DynamicPhone({
  fallbackDisplay,
  fallbackE164,
  placement,
  className,
  showIcon = true,
}: DynamicPhoneProps) {
  const [allocation, setAllocation] = useState<Allocation | null>(null);

  useEffect(() => {
    if (!hasTrackingConsent()) return;
    const controller = new AbortController();
    void (async () => {
      try {
        const response = await fetch("/api/tracking-number", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
          body: JSON.stringify({ consent: true }),
          signal: controller.signal,
        });
        if (!response.ok) return;
        const data = (await response.json()) as {
          allocated: boolean;
          displayNumber?: string;
          e164Number?: string;
        };
        if (data.allocated && data.displayNumber && data.e164Number) {
          setAllocation({ display: data.displayNumber, e164: data.e164Number });
        }
      } catch {
        /* Fallback number stays functional. */
      }
    })();
    return () => controller.abort();
  }, []);

  const display = allocation?.display ?? fallbackDisplay;
  const e164 = allocation?.e164 ?? fallbackE164;

  return (
    <a
      href={`tel:${e164}`}
      data-placement={placement}
      data-number-type={allocation ? "session" : "fallback"}
      className={className}
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent("cta_call_click", {
            detail: {
              placement,
              path: window.location.pathname,
              numberType: allocation ? "session" : "fallback",
            },
          }),
        );
      }}
    >
      {showIcon ? <Icon name="phone" /> : null}
      <span>{display}</span>
    </a>
  );
}
