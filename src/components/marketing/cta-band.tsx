import { DynamicPhone } from "@/components/lead/DynamicPhone";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/env";

/**
 * The closing call-to-action band, shared by every page that ends in one.
 *
 * This is the ONE place in the repository that locks a background to the
 * viewport. Nothing else on the site does, and nothing else should: keep the
 * desktop-locked background class below confined to this file.
 *
 * Layers, back to front:
 *
 *   z-0   the photograph        scrolls on mobile, locked from 48rem up
 *   z-10  50% dark overlay
 *   z-20  top/bottom fade       pointer-events-none
 *   z-30  heading and buttons   scrolls normally over the rest
 *
 * The photograph scrolls on phones on purpose. iOS Safari does not honor a
 * viewport-locked background and approximates it by repainting every frame,
 * which is exactly the juddering that was reported. Below 48rem it is an
 * ordinary section background and cannot move relative to the band.
 *
 * `last:mb-0` drops the bottom margin when the band is the final element on
 * the page, which it is on every page that ends in one. Otherwise the 40px
 * margin renders as a strip of page background between the photograph and the
 * footer, which reads as a black gap under the image.
 *
 * The locking works at all only because body uses `overflow-x: clip` rather
 * than `hidden`; `hidden` turns body into a scrolling box, which breaks
 * viewport-locked backgrounds. The layer is `absolute inset-0` inside a band
 * with `overflow: hidden`, so the painting is clipped back to the band and
 * cannot bleed into neighboring sections.
 */
const CTA_BACKGROUND_LAYER =
  "absolute inset-0 bg-cover bg-center bg-no-repeat z-0 bg-scroll md:bg-fixed";

export function CtaBand({
  title,
  body,
  showFormLink = true,
  tone = "accent",
  imageSrc,
  imageAlt,
  actionLabel = "Request a referral",
  actionIcon = false,
}: {
  title: string;
  body: string;
  /** Pages without a quote form have nothing to jump to, so they omit it. */
  showFormLink?: boolean;
  /** "section" uses the neutral alternate background instead of the mint tint. */
  tone?: "accent" | "section";
  /** Optional CTA photograph. Pass only when that asset is not used elsewhere. */
  imageSrc?: string;
  imageAlt?: string;
  /** Service detail pages use title case and a trailing arrow. */
  actionLabel?: string;
  actionIcon?: boolean;
}) {
  void tone;
  void imageAlt;

  return (
    <section
      className="cta-photo relative isolate my-[40px] h-auto overflow-hidden py-[44px] last:mb-0"
      /* Flat band navy, not the three-stop green gradient this used to
         carry. The CTA earns its prominence from being the only full-bleed
         dark surface between two warm paper sections, plus the single filled
         emerald button on it -- a gradient on top of that was the site
         shouting over itself. */
      style={imageSrc ? undefined : { backgroundColor: "var(--color-band)" }}
    >
      {imageSrc ? (
        <>
          <div
            className={CTA_BACKGROUND_LAYER}
            style={{ backgroundImage: `url("${imageSrc}")` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 z-10 bg-[#0B1017]/55" aria-hidden="true" />
          {/* The fade's plateau is 40% rather than fully transparent. The 50%
              overlay on its own measures 2.63:1 on the body copy over these
              photographs; 50% under 40% composites to an effective 70%, which
              clears the 4.5:1 AA floor.

              The ramps to that plateau live in .cta-photo-fade because they
              need fixed pixel lengths and partial end stops, which a Tailwind
              three-stop gradient cannot express. Opaque end stops used to
              black out the top and bottom of the band. */}
          <div
            className="cta-photo-fade pointer-events-none absolute inset-0 z-20"
            aria-hidden="true"
          />
        </>
      ) : null}

      <div className="container-page relative z-30 flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div className="max-w-xl">
          <h2 className="text-[1.375rem] font-semibold tracking-[-0.022em] md:text-[1.625rem]">
            {title}
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-[color:var(--color-muted)]">
            {body}
          </p>
        </div>
        <div
          className={
            showFormLink
              ? "grid w-full max-w-sm shrink-0 gap-3 md:w-auto md:max-w-none md:grid-cols-2"
              : "grid w-full max-w-sm shrink-0 gap-3 md:w-auto md:max-w-none"
          }
        >
          <DynamicPhone
            fallbackDisplay={site.phoneDisplay}
            fallbackE164={site.phoneE164}
            placement="cta_band"
            className="btn btn-primary"
          />
          {showFormLink ? (
            <a href="#quote-form" className="btn btn-secondary">
              {actionLabel}
              {actionIcon ? <Icon name="arrow" /> : null}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
