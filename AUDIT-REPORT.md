# Site-wide bug audit — Lancaster Concrete Referral

Scope: all 18 published routes, tested at 320 / 375 / 390 / 430 / 768 / 1440 px.
No design, branding, copy, content strategy or page structure was changed.

## Routes covered (18)

`/` · `/services` · `/services/concrete-driveways` · `/services/concrete-patios` ·
`/services/concrete-slabs` · `/services/concrete-repair` · `/locations` ·
`/locations/lancaster-sc` · `/locations/lancaster-sc/concrete-driveways` ·
`/locations/lancaster-sc/concrete-patios` · `/locations/lancaster-sc/concrete-slabs` ·
`/locations/lancaster-sc/concrete-repair` · `/how-it-works` · `/contact` ·
`/privacy` · `/terms` · `/referral-disclosure` · `/thank-you`

An earlier sweep only covered 15 routes — the three extra published city+service
combinations (patios, slabs, repair) were added to the audit set and are included
in every result below.

## Defects found and fixed

| # | Defect | Where | Fix |
|---|--------|-------|-----|
| 1 | **Dead anchor after form submission.** `id="quote-form"` lived only on the `<form>`. After a successful submit (or a no-coverage answer) the form unmounted and the id vanished, so every "Request a referral" button on that page pointed at a target that no longer existed. | `QuoteForm` success + no-coverage panels; affects `/`, `/contact`, `/locations/lancaster-sc`, all 4 service pages, all 4 combo pages | `id="quote-form"` added to both result panels so the anchor target always exists |
| 2 | **Form inputs missing `name` attributes.** `email`, `phone`, `note` and the consent checkbox had `id` and `autoComplete` but no `name`, unlike `fullName`, `postalCode` and `serviceSlug`. Breaks browser autofill heuristics and native form semantics. | `QuoteForm` step 2 | `name="email" / "phone" / "note" / "serviceConsent"` added |
| 3 | **Consent checkbox below the tap-target floor** (16 × 16 px). | `QuoteForm` consent row | 20 × 20 px (`h-5 w-5`), alignment nudged to match |
| 4 | **Anchor landing offset.** The form card had no scroll margin, so a `#quote-form` jump could sit tight under the sticky header. | `QuoteForm` root | `scroll-mt-32` on the form and both panels |

## Checks that passed with no defects

**Errors** — 0 console errors, 0 uncaught JS/React exceptions, 0 failed network
requests across all 18 routes × 6 widths (108 page loads).

**Links & navigation** — 17 unique internal targets, all HTTP 200; no internal link
reaches a 404; no empty or `#`-only `href`; no dead in-page anchor; every link has an
accessible name. Trailing-slash URLs correctly 308-redirect. Header, footer, service,
location, breadcrumb and in-page nav links all resolve. Mobile menu opens, lists all
10 destinations, navigates, and closes itself on route change; back/forward restore
clean states. Desktop services dropdown opens, closes on Escape and on outside click.

**Gating (fail-closed)** — `/locations/charlotte-nc`, `/services/foundation-repair`
and `/nope` all return a real 404 with a working link home.

**Images** — 250 image instances checked; **0 broken, 0 missing, 0 with a missing
`alt` attribute, 0 distorted** (every photo uses `object-cover` or its natural ratio).
Responsive `sizes` resolve correctly per breakpoint (e.g. a card image serves w=640 at
390 px and w=256 at 768 px). No important text lives inside an image.

**Layout** — 0 horizontal overflow and 0 elements outside the viewport at every width;
no clipped text; no overlapping sections; no collapsed containers; no gap larger than
72 px between top-level sections; consistent 20 px mobile / 32 px desktop container
padding.

**Forms** — step 1 blocks an empty submit; invalid email and phone produce inline
messages plus `aria-invalid`; a valid submission returns HTTP 202 and renders the
success panel with a reference id and a "what happens next" link; the no-coverage path
renders its own panel; step 2 has a working back control; no console errors during the
whole flow.

**Accessibility / SEO** — one `<h1>` per route; no heading-level jumps; `lang="en-US"`;
correct viewport meta; visible 2 px focus outline; skip link is the first tab stop and
targets `#main`; every input is labelled; no duplicate element ids; consent banner
offers Decline/Allow, dismisses and stays dismissed. Titles, meta descriptions,
canonicals, JSON-LD graphs, sitemap (16 URLs), robots directives, slugs and alt text
are unchanged.

## Test suite after the fixes

TypeScript clean · vitest 29/29 · build 28 static pages · page crawler ALL PASSED ·
API suite 32/32 · content gates 4/4 (4 services, 1 location, 4 combos, no excluded
geography, combo uniqueness, 8 schema graphs) · Playwright 26/26.
