"use client";

import { useEffect, useState } from "react";
import { DynamicPhone } from "@/components/lead/DynamicPhone";
import { Icon } from "@/components/ui/Icon";

interface MobileActionBarProps {
  fallbackDisplay: string;
  fallbackE164: string;
}

const WATCHED_IDS = ["hero-actions", "quote-form", "consent-section", "site-footer"];

export function MobileActionBar({
  fallbackDisplay,
  fallbackE164,
}: MobileActionBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const state = new Map<string, boolean>();
    const elements = WATCHED_IDS.map((id) => document.getElementById(id)).filter(
      (element): element is HTMLElement => element !== null,
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          state.set(entry.target.id, entry.isIntersecting);
        }
        const heroVisible = state.get("hero-actions") ?? true;
        const blocked = ["quote-form", "consent-section", "site-footer"].some(
          (id) => state.get(id) === true,
        );
        setVisible(!heroVisible && !blocked);
      },
      { threshold: 0.01 },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.paddingBottom = visible ? "5.5rem" : "";
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t md:hidden"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-line)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="grid grid-cols-2 gap-2 p-3">
        <DynamicPhone
          fallbackDisplay="Call now"
          fallbackE164={fallbackE164}
          placement="mobile_action_bar"
          className="btn btn-secondary"
        />
        <a href="#quote-form" className="btn btn-primary">
          <Icon name="form" />
          Get a quote
        </a>
      </div>
      <span className="sr-only">Fallback number {fallbackDisplay}</span>
    </div>
  );
}
