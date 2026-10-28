"use client";

import type { ReactNode } from "react";

/**
 * "Request Service" header button. On any page that has the quote form, it
 * keeps the visitor on that page and scrolls to the form (`#quote-form`, the
 * form at the bottom of the page) instead of navigating away.
 *
 * On a page with no quote form, it falls back to the contact page's form.
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
        const form = document.getElementById("quote-form");
        if (!form) return; // no form on this page: let the link navigate
        event.preventDefault();
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        form.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        // Keep the URL shareable without re-triggering the form's own hash handler.
        history.replaceState(null, "", "#quote-form");
        // Move focus into the form so keyboard users land in it.
        const first = form.querySelector<HTMLElement>("input, select, textarea, button");
        first?.focus({ preventScroll: true });
      }}
    >
      {children}
    </a>
  );
}
