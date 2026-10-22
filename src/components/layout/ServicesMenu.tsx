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
 * "Services" is one link: the label and the arrow are children of the same
 * anchor, so the whole padded area navigates, and one hover or focus state
 * covers both. The panel opens on mouse hover and on keyboard focus.
 *
 * A native <details> stayed open forever here: client-side navigation does not
 * reset it, and it has no Escape or outside-click behavior. This closes on
 * route change, Escape, pointer press outside, scroll, and focus leaving.
 */
export function ServicesMenu({ items }: { items: ServicesMenuItem[] }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** Pointer type of the most recent press on the link, read by focus and click. */
  const pressType = useRef<string>("");
  const pathname = usePathname();
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
    closeTimer.current = setTimeout(() => setOpen(false), 180);
  }

  /** Keyboard focus on the link opens the panel; tabbing out of the menu closes it. */
  function handleBlur(event: React.FocusEvent) {
    if (!containerRef.current?.contains(event.relatedTarget as Node | null)) {
      setOpen(false);
    }
  }

  useEffect(() => cancelClose, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      // The focused panel links unmount with the panel; return focus to the
      // parent link so keyboard users are not stranded on <body>.
      linkRef.current?.focus();
    }
    // Scrolling moves the page under a stationary cursor, which can leave the
    // menu open with no pointer movement to close it.
    function onScroll() {
      setOpen(false);
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
      onBlur={handleBlur}
    >
      <Link
        ref={linkRef}
        href="/services"
        aria-controls={open ? panelId : undefined}
        onPointerDown={(event) => {
          pressType.current = event.pointerType;
        }}
        onFocus={() => {
          // A touch press focuses the link too. The click handler opens the
          // panel for touch, so focus must not open it first and skip that step.
          if (pressType.current === "touch" || pressType.current === "pen") return;
          cancelClose();
          setOpen(true);
        }}
        onClick={(event) => {
          const touch = pressType.current === "touch" || pressType.current === "pen";
          pressType.current = "";
          // Touch has no hover, so the first tap opens the panel and the second
          // tap follows the link. Mouse and keyboard keep their behavior.
          if (touch && !open) {
            event.preventDefault();
            cancelClose();
            setOpen(true);
          }
        }}
        className="group btn btn-ghost pr-2.5 text-[15px] font-medium transition-colors duration-150 hover:bg-[color:var(--color-accent-soft)] hover:text-[color:var(--color-accent)] focus-visible:bg-[color:var(--color-accent-soft)]"
      >
        <span>Services</span>
        <Icon
          name="arrow"
          className={`h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-y-0.5 ${
            open ? "-rotate-90" : "rotate-90"
          }`}
        />
      </Link>
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
