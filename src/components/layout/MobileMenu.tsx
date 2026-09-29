"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wrapper around the native <details> mobile menu.
 *
 * The header is rendered by the root layout, so App Router client navigation
 * never unmounts it. A native <details> therefore keeps `open` set after you
 * tap a link, leaving the panel covering the new page. This closes it on route
 * change, on any link tap inside the panel (covers same-route links, where the
 * pathname never changes), on Escape, and on an outside click.
 *
 * The markup stays a real <details>, so the menu still opens with JS disabled.
 */
export function MobileMenu({
  children,
  className = "relative lg:hidden",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  // Route changed: the panel must not survive into the next page.
  useEffect(() => {
    const el = ref.current;
    if (el?.open) el.open = false;
  }, [pathname]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      const el = ref.current;
      if (!el?.open) return;
      if (!el.contains(event.target as Node)) el.open = false;
    }

    function onKeyDown(event: KeyboardEvent) {
      const el = ref.current;
      if (event.key !== "Escape" || !el?.open) return;
      el.open = false;
      el.querySelector("summary")?.focus();
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <details
      ref={ref}
      className={className}
      onClick={(event) => {
        // A link inside the panel was tapped. Close immediately so the panel
        // does not linger during navigation, and so same-route links work.
        const target = event.target as HTMLElement;
        if (target.closest("a")) {
          const el = ref.current;
          if (el) el.open = false;
        }
      }}
    >
      {children}
    </details>
  );
}
