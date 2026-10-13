"use client";

import type { ReactNode } from "react";

/**
 * "Request Service" header button. It keeps the visitor on the current page and
 * scrolls to the quote form instead of navigating away.
 *
 * - On the homepage the first form is the hero form (`#hero-quote-form`).
 * - On any page with a `#quote-form` (service, location, contact) it scrolls there.
 * - On pages with no form, it falls back to the contact page's form.
 *
 * Without JavaScript the link still works: it goes to `/contact#quote-form`.
 */
export function RequestFormLink({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href="/contact#quote-form"
      className={className}
      onClick={(event) => {
        const target =
          document.getElementById("hero-quote-form") ??
          document.getElementById("quote-form");
        if (!target) return; // no form on this page: let the link navigate
        event.preventDefault();
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        // Keep the URL shareable without re-triggering the form's own hash handler.
        history.replaceState(null, "", `#${target.id}`);
        // Move focus into the form so keyboard users land in it.
        const first = target.querySelector<HTMLElement>("input, select, textarea, button");
        first?.focus({ preventScroll: true });
      }}
    >
      {children}
    </a>
  );
}
