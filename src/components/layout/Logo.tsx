import { site } from "@/lib/env";

/** Text-based brand mark. Content photography is audited separately from the
 * wordmark, so the header/footer avoid repeated image assets entirely. */
export function Logo({ height = 36 }: { height?: number }) {
  const markSize = Math.max(28, Math.round(height * 0.82));

  return (
    <span className="inline-flex items-center gap-2.5" aria-label={site.brand}>
      <span
        className="grid shrink-0 place-items-center rounded-[10px] text-sm font-extrabold tracking-[-0.04em]"
        style={{
          width: markSize,
          height: markSize,
          backgroundColor: "var(--color-accent)",
          color: "var(--color-on-accent)",
          boxShadow:
            "0 8px 22px color-mix(in srgb, var(--color-accent) 22%, transparent)",
        }}
        aria-hidden="true"
      >
        LC
      </span>
      <span
        className="hidden whitespace-nowrap font-extrabold leading-none tracking-[-0.04em] sm:inline"
        style={{ fontSize: Math.max(18, Math.round(height * 0.46)) }}
      >
        {site.brand}
      </span>
    </span>
  );
}
