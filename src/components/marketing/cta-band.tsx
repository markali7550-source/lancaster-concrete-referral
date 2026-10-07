import { DynamicPhone } from "@/components/lead/DynamicPhone";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/env";

/**
 * The closing call-to-action band, shared by every page that ends in one.
 *
 * The photograph is anchored to the band and scrolls with it. It is NOT locked
 * to the viewport. An earlier version used `md:bg-fixed` on desktop, which is
 * `background-attachment: fixed`: the image paints against the viewport while
 * the band clips it, so scrolling past drags a different slice of the photo
 * through the band and the picture appears to slide, drift and reframe itself.
 * On phones the same class made iOS Safari repaint every frame, which is the
 * juddering that was reported earlier; that was patched by scrolling on mobile
 * only, leaving the drift in place on desktop. Both are now gone for the same
 * reason: the background simply scrolls with its section.
 *
 * A single instance can still opt into the viewport-locked look via the
 * `fixedBackground` prop (currently: the Lancaster city page closing band, at
 * the owner's explicit request). That is the parallax effect, not a freeze:
 * the image holds still against the viewport while the band -- and its copy --
 * scroll past it, so a different slice of the photo shows through the band at
 * every scroll offset. Do not set it on the shared default path, and do not
 * copy it to other bands without re-checking the letterbox crop at several
 * scroll offsets: the visible slice is no longer the one the contrast audit
 * measured. It also forced body to use `overflow-x: clip` rather than `hidden`,
 * because `hidden` turns body into a scrolling box and breaks viewport-locked
 * backgrounds; that coupling returns for as long as any instance stays fixed.
 *
 * Layers, back to front:
 *
 *   z-0   the photograph        scrolls with the band, at every width
 *   z-10  50% dark overlay
 *   z-20  top/bottom fade       pointer-events-none
 *   z-30  heading and buttons
 *
 * `last:mb-0` drops the bottom margin when the band is the final element on
 * the page, which it is on every page that ends in one. Otherwise the 40px
 * margin renders as a strip of page background between the photograph and the
 * footer, which reads as a black gap under the image.
 */
const CTA_BACKGROUND_LAYER =
  "absolute inset-0 bg-cover bg-center bg-no-repeat z-0 bg-scroll";

/**
 * Fallback photograph for a closing CTA band.
 *
 * Every service page, location page and index passes its own `imageSrc`, so a
 * patio page closes on a patio. This file is only the default for a band that
 * does not name one, which at present is the home page.
 *
 * The home page must not favour one of the four services, so the default is
 * concrete work itself rather than a finished driveway, patio, slab or repair.
 *
 * The band is a letterbox of roughly 207px, so only a thin middle slice of any
 * photograph survives the crop. Check the contrast of any replacement at that
 * crop, under the copy, before trusting it.
 */
const CTA_IMAGE = "/images/cta-home-driveway.webp";
const CTA_IMAGE_ALT =
  "Finished broom finished concrete driveway curving up to the side entrance of a single story brick home, edged by pine straw";

export function CtaBand({
  title,
  body,
  showFormLink = true,
  tone = "accent",
  imageSrc = CTA_IMAGE,
  imageAlt = CTA_IMAGE_ALT,
  actionLabel = "Request a referral",
  actionIcon = false,
  fixedBackground = false,
}: {
  title: string;
  body: string;
  /** Pages without a quote form have nothing to jump to, so they omit it. */
  showFormLink?: boolean;
  /** "section" uses the neutral alternate background instead of the mint tint. */
  tone?: "accent" | "section";
  /**
   * Overrides the shared CTA photograph. Every page currently takes the
   * default; pass this only for a band that genuinely needs its own image,
   * and check it against the letterbox crop first.
   */
  imageSrc?: string;
  imageAlt?: string;
  /** Service detail pages use title case and a trailing arrow. */
  actionLabel?: string;
  actionIcon?: boolean;
  /**
   * Viewport-locks this band's photograph (`background-attachment: fixed`).
   * Instance-level opt-in only -- see the header comment for what this
   * actually does to the visible slice while scrolling.
   */
  fixedBackground?: boolean;
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
            className={
              fixedBackground
                ? "absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                : CTA_BACKGROUND_LAYER
            }
            style={
              fixedBackground
                ? {
                    backgroundImage: `url("${imageSrc}")`,
                    backgroundAttachment: "fixed",
                  }
                : { backgroundImage: `url("${imageSrc}")` }
            }
            aria-hidden="true"
          />
          {/* Flat scrim. Unchanged on mobile, where the copy centres over the
              whole band and there is nowhere to hide it, and much lighter from
              lg up, where the side wash below takes over behind the text. */}
          <div
            className="absolute inset-0 z-10 bg-[#0B1017]/55 lg:bg-[#0B1017]/28"
            aria-hidden="true"
          />
          {/* Same trick the heroes use (PHOTO_SIDE_WASH): put the darkness
              where the words are instead of over the whole photograph. The
              copy sits left and the buttons right, so this deepens the left,
              releases the right, and lets the band read as a photograph again
              rather than a grey panel. Desktop only -- the mobile layout
              centres its copy, where a left-weighted wash does nothing. */}
          <div
            className="pointer-events-none absolute inset-0 z-10 hidden lg:block bg-gradient-to-r from-[#0B1017]/72 via-[#0B1017]/32 to-transparent"
            aria-hidden="true"
          />
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
