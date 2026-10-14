"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export interface ServicesMenuItem {
  slug: string;
  name: string;
  projectTypes: string[];
}

/**
 * A native <details> stayed open forever here: client-side navigation does not
 * reset it, and it has no Escape or outside-click behavior. This closes on
 * route change, Escape, and any pointer press outside the menu.
 */
export function ServicesMenu({ items }: { items: ServicesMenuItem[] }) {
  const [open, setOpen] = useState(false);
  // A click on the caret pins the menu open for keyboard and touch use. Leaving
  // the menu with a mouse still closes it, pinned or not, so it never lingers.
  const [pinned, setPinned] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  // Stable id so `aria-expanded` can be paired with `aria-controls`, letting
  // assistive tech locate the panel this caret owns.
  const panelId = `${useId()}-services-panel`;

  function cancelClose() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  /** Hover-open, mouse only: touch would otherwise fire on first tap. */
  function handlePointerEnter(event: React.PointerEvent) {
    if (event.pointerType !== "mouse") return;
    cancelClose();
    setOpen(true);
  }

  /** Small grace period so moving the cursor into the panel does not close it. */
  function handlePointerLeave(event: React.PointerEvent) {
    if (event.pointerType !== "mouse") return;
    cancelClose();
    closeTimer.current = setTimeout(() => {
      setPinned(false);
      setOpen(false);
    }, 180);
  }

  useEffect(() => cancelClose, []);

  function closeAll() {
    setPinned(false);
    setOpen(false);
  }

  useEffect(() => {
    setPinned(false);
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) closeAll();
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      closeAll();
      // The focused link unmounts with the panel; return focus to the toggle
      // so keyboard users are not stranded on <body>.
      toggleRef.current?.focus();
    }

    // Scrolling moves the page under a stationary cursor, which can leave the
    // menu open with no pointer movement to close it. Close it on scroll.
    function onScroll() {
      closeAll();
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  return (
    <div
      className="relative"
      ref={containerRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div className="flex items-center">
        {/* The label navigates; the caret only toggles the panel. */}
        <Link
          href="/services"
          className="btn btn-ghost pr-1.5 text-[15px] font-medium transition-colors duration-150 hover:bg-[color:var(--color-accent-soft)] hover:text-[color:var(--color-accent)]"
        >
          Services
        </Link>
        <button
          type="button"
          ref={toggleRef}
          className="btn btn-ghost cursor-pointer px-1.5 transition-colors duration-150 hover:bg-[color:var(--color-accent-soft)] hover:text-[color:var(--color-accent)]"
          aria-expanded={open}
          // Only advertised while the panel is mounted: the dropdown is
          // conditionally rendered, so pointing at the id when closed would be
          // a dangling ARIA reference.
          aria-controls={open ? panelId : undefined}
          aria-haspopup="true"
          aria-label={open ? "Hide services" : "Show services"}
          onClick={() => {
            if (pinned) {
              closeAll();
              return;
            }
            cancelClose();
            setPinned(true);
            setOpen(true);
          }}
        >
          <Icon
            name="arrow"
            className={`h-3.5 w-3.5 transition-transform duration-150 ${
              open ? "-rotate-90" : "rotate-90"
            }`}
          />
        </button>
      </div>
      {open ? (
        <div
          id={panelId}
          className="card absolute left-0 top-[calc(100%+0.5rem)] z-[110] w-[26rem] p-2"
          style={{ boxShadow: "var(--shadow-raised)" }}
        >
          <div className="grid grid-cols-2 gap-x-1">
            {items.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group/item block rounded-[10px] p-3 transition-colors duration-150 hover:bg-[color:var(--color-accent-soft)]"
              >
                <span className="block text-[15px] font-semibold transition-colors duration-150 group-hover/item:text-[color:var(--color-accent)]">
                  {service.name}
                </span>
              </Link>
            ))}
          </div>
          <Link
            href="/services"
            className="block rounded-[10px] p-3 text-[14px] font-semibold transition-colors duration-150 hover:bg-[color:var(--color-accent-soft)]"
            style={{ color: "var(--color-accent)" }}
          >
            All services →
          </Link>
        </div>
      ) : null}
    </div>
  );
}
