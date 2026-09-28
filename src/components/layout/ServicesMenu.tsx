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
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        className="btn btn-ghost cursor-pointer text-[15px] font-medium"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((previous) => !previous)}
      >
        Services
        <Icon
          name="arrow"
          className={`h-3.5 w-3.5 ${open ? "-rotate-90" : "rotate-90"}`}
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
              className="block rounded-[10px] p-3 hover:bg-[color:var(--color-accent-soft)]"
            >
              <span className="block text-[15px] font-semibold">
                {service.name}
              </span>
              <span className="mt-0.5 block text-[13px] leading-snug text-[color:var(--color-muted)]">
                {service.projectTypes.join(" · ")}
              </span>
            </Link>
          ))}
          <Link
            href="/services"
            className="block rounded-[10px] p-3 text-[14px] font-semibold"
            style={{ color: "var(--color-accent)" }}
          >
            All services →
          </Link>
        </div>
      ) : null}
    </div>
  );
}
