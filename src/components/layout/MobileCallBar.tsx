import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/env";

/**
 * Mobile and tablet only (below Tailwind's md breakpoint, 768px). A fixed bar
 * at the bottom of the viewport with a tel: link to the configured phone.
 *
 * Layout: the bar is `position: fixed`, so it never changes document flow.
 * The matching bottom padding is applied to <body> in the root layout, so the
 * page reserves that space from the first paint and nothing shifts (CLS 0).
 * Server-rendered, no client JavaScript.
 */
export function MobileCallBar() {
  return (
    <div className="gpu-layer fixed inset-x-0 bottom-0 z-40 border-t bg-[color:var(--color-surface)] px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-6px_18px_rgba(16,24,34,0.12)] md:hidden"
      style={{ borderColor: "var(--color-line)" }}
    >
      <a
        href={`tel:${site.phoneE164}`}
        aria-label="Call us for a quote"
        className="flex min-h-[56px] w-full touch-manipulation items-center justify-center gap-2.5 rounded-full bg-[color:var(--color-accent-fill)] px-6 text-base font-semibold text-[color:var(--color-on-accent-fill)] shadow-[0_6px_16px_rgba(16,24,34,0.28)] transition-transform duration-150 active:scale-[0.98] motion-reduce:transition-none"
      >
        <Icon name="phone" className="h-5 w-5 shrink-0" />
        Call Us for a Quote
      </a>
    </div>
  );
}
