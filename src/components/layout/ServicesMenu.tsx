"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export interface ServicesMenuItem {
  slug: string;
  name: string;
  projectTypes: string[];
}

/**
 * A native <details> stayed open forever here: client-side navigation does not
 * reset it, and it has no Escape or outside-click behaviour. This closes on
 * route change, Escape, and any pointer press outside the menu.
 */
export function ServicesMenu({ items }: { items: ServicesMenuItem[] }) {
  const [open, setOpen] = useState(false);
  // Hover opens transiently; a click pins the menu so it survives the cursor
  // leaving, and clicking again (or Escape / outside / navigation) unpins it.
  const [pinned, setPinned] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

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
    if (event.pointerType !== "mouse" || pinned) return;
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 180);
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
      if (event.key === "Escape") closeAll();
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      className="relative"
      ref={containerRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <button
        type="button"
        className="btn btn-ghost cursor-pointer text-[15px] font-medium transition-colors duration-150 hover:bg-[color:var(--color-accent-soft)] hover:text-[color:var(--color-accent)]"
        aria-expanded={open}
        aria-haspopup="true"
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
        Services
        <Icon
          name="arrow"
          className={`h-3.5 w-3.5 transition-transform duration-150 ${
            open ? "-rotate-90" : "rotate-90"
          }`}
        />
      </button>
      {open ? (
        <div
          className="card absolute left-0 top-12 w-80 p-2"
          style={{ boxShadow: "var(--shadow-raised)" }}
        >
          {items.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group/item block rounded-[10px] p-3 transition-colors duration-150 hover:bg-[color:var(--color-accent-soft)]"
            >
              <span className="block text-[15px] font-semibold transition-colors duration-150 group-hover/item:text-[color:var(--color-accent)]">
                {service.name}
              </span>
              <span className="mt-0.5 block text-[13px] leading-snug text-[color:var(--color-muted)]">
                {service.projectTypes.join(" · ")}
              </span>
            </Link>
          ))}
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
