# WEBSITE QA AUDIT REPORT

**Site:** Lancaster Concrete Connect (concrete contractor referral service)
**Commit:** `a4ec3b0` · branch `arena/01a10d4c-lancaster-concrete-referral`
**Environment:** production build (`next build` + `next start`), Next.js 15.5.27
**Date:** 2026-10-05
**Pages crawled:** 17 indexable + `/thank-you` + 404 handler
**Changes made to the website: NONE.** This is a read-only audit.

---

## IMPORTANT — TESTING LIMITATIONS (read first)

No browser can be installed in this environment (Playwright/Chromium install
fails: `fonts-freefont-ttf` unavailable, no system Chromium). Therefore:

**Verified** — by fetching every page from the running production server and
analysing the served HTML, the compiled CSS, the shipped JS bundles, the image
files on disk, HTTP status codes and response headers, plus per-pixel contrast
maths on every photograph.

**NOT VERIFIED** — anything requiring a rendering engine:

- Actual rendered layout, spacing, alignment at any viewport
- Whether elements visually overlap or overflow in practice
- Real scroll smoothness / the CTA fixed-background behaviour on desktop
- iOS Safari, Android Chrome, Firefox, Safari behaviour
- Lighthouse / Core Web Vitals field or lab numbers
- Runtime JavaScript console errors
- Interactive behaviour (clicking, typing, submitting, opening menus)
- Automated axe/WAVE accessibility scan
- Focus order as experienced by keyboard
- Image visual quality, cropping, subject matter

Where this report comments on those areas it says so explicitly and reasons
from markup and CSS. **Statements marked "Not verified" must be confirmed
manually in a real browser before relying on them.**

---

## OVERALL STATUS

# 86 / 100

| Category | Score | Note |
|---|---|---|
| Build & technical integrity | 97 | clean typecheck, build, 29/29 tests |
| Links & routing | 100 | zero broken links or anchors |
| SEO | 82 | one real brand bug, four over-length titles |
| Accessibility | 90 | one ARIA gap; contrast and labels excellent |
| Performance | 74 | logo preloading is wasteful; bundle over budget |
| Content | 85 | British spellings on a US site |
| Consistency | 98 | header/footer/components identical sitewide |
| UX | Not scored | requires a browser |

---

## EXECUTIVE SUMMARY

This is a **well-built site in good condition**. The engineering fundamentals
are unusually solid: every internal link resolves, every in-page anchor has a
target, canonicals are correct and self-referencing on all 17 pages, titles and
descriptions are unique everywhere, structured data is valid, heading hierarchy
is correct on every page with exactly one `<h1>`, no image is missing `alt`
text, every image carries intrinsic dimensions (so no layout shift from
images), trailing-slash URLs redirect properly with 308, and `/thank-you` is
correctly `noindex` and excluded from the sitemap.

**No critical, launch-blocking defects were found.**

There are six issues worth fixing. The most consequential is a **performance
defect**: both logo variants are preloaded at full resolution on every page,
costing roughly 165 KB of high-priority bandwidth competing with the hero
image. After that: four pages carry the **wrong brand name** in their title
tag, four pages have **over-length titles and meta descriptions** that will
truncate in search results, and five pages mix **British spellings** into an
`en-US` site.

The remaining items are minor. Nothing here prevents launch.

---

## CRITICAL ISSUES

**None.** No issue found blocks production deployment.

The highest-severity items are listed below as High priority.

---

### Issue 1 — Both logos preloaded at full resolution on every page

- **Issue:** `Logo.tsx` renders *both* `logo.webp` and `logo-dark.webp`, each with `priority` and no `sizes` attribute. Only one is ever visible; the other is hidden via CSS (`.logo-light` / `.logo-dark`).
- **Page/URL:** All 17 pages (component `src/components/layout/Logo.tsx:19–32`)
- **Evidence:** Source files are 1808×556 px, 82.8 KB and 81.8 KB. Because `priority` is set and no `sizes` is given, `next/image` emits `<link rel="preload">` at `w=1920` **and** `w=3840` for both files. Measured in the served `<head>` of `/`. These two files account for **72 of the 85** non-lazy images across the site. Display width in the header is roughly 140 px.
- **Why it matters:** Two high-priority image fetches on every page for an asset where one is invisible. They compete directly with the LCP hero for bandwidth and connections on mobile. This is the single largest performance problem on the site.
- **Recommended fix:** Add `sizes="140px"`; remove `priority` from the hidden variant (or render only the needed variant); re-encode the wordmark near display resolution (~400 px wide) which should drop each file below 10 KB.
- **Priority: High**

### Issue 2 — Wrong brand name in title tag on four pages

- **Issue:** The configured brand is **"Lancaster Concrete Connect"** (`NEXT_PUBLIC_BRAND_NAME`), but the city+service combo pages hardcode **"Lancaster Concrete Referral"**.
- **Page/URL:** `/locations/lancaster-sc/concrete-driveways`, `/concrete-patios`, `/concrete-slabs`, `/concrete-repair`
- **Evidence:** `src/lib/seo/metadata.ts:54` — `` `${serviceName} Referrals in ${city}, SC | Lancaster Concrete Referral` ``. Rendered title verified: `Concrete Driveways Referrals in Lancaster, SC | Lancaster Concrete Referral`. All other 13 pages use "Lancaster Concrete Connect" or a descriptive suffix.
- **Why it matters:** Four pages advertise a different business name in search results. Damages brand consistency and can look like a different entity to both users and search engines.
- **Recommended fix:** Use the brand from env rather than a hardcoded string, as the other metadata builders do.
- **Priority: High**

### Issue 3 — Over-length titles and meta descriptions on four pages

- **Issue:** Titles 71–75 characters, descriptions 170–174 characters.
- **Page/URL:** The same four `/locations/lancaster-sc/<service>` pages
- **Evidence:** Measured per page — e.g. `/locations/lancaster-sc/concrete-driveways` title 75 chars, description 174 chars. Google truncates titles near ~60 and descriptions near ~155.
- **Why it matters:** The brand suffix and the end of every description will be cut off in search results, wasting the most valuable copy on four commercially important pages.
- **Recommended fix:** Shorten the `comboMeta` templates in `src/lib/seo/metadata.ts:54–57`. Fixing Issue 2 at the same time will recover characters.
- **Priority: Medium**

### Issue 4 — British spellings on an `en-US` site

- **Issue:** Five pages use British spellings with **zero** American counterparts anywhere on the site.
- **Page/URL and evidence:**
  - `vapour` ×6 — `/services/concrete-slabs`, `/locations/lancaster-sc/concrete-slabs` ("raise a vapour barrier beneath the slab")
  - `fibre` ×4 — `/services/concrete-driveways`, `/services/concrete-slabs`, `/locations/lancaster-sc/concrete-slabs` ("Fibre mesh, welded wire, or rebar")
  - `destabilise` ×2 — `/locations/lancaster-sc/concrete-repair`
  - `barrowed` / `barrowing` ×4 — patios and slabs pages (US trade usage is "wheelbarrowed")
  - also `judgement` (US: `judgment`)
- **Why it matters:** The document declares `lang="en-US"` and targets Lancaster, South Carolina. "Vapour barrier" and "fibre mesh" read as foreign to a US homeowner and weaken the local-authenticity signal on exactly the pages meant to rank locally.
- **Recommended fix:** `vapour→vapor`, `fibre→fiber`, `destabilise→destabilize`, `judgement→judgment`, `barrowed/barrowing→wheelbarrowed/wheelbarrowing`.
- **Priority: Medium**

### Issue 5 — JS bundle over its stated budget, documentation inaccurate

- **Issue:** Heaviest route is **131 kB** First Load JS against a documented 120 kB budget; docs claim 116 kB.
- **Page/URL:** `/services/[service]` and `/locations/[city]/[service]` (8 pages)
- **Evidence:** Build output — 131 kB. `README.md:41`, `README.md:51`, `REMAINING-WORK.md:84` all state 116 kB.
- **Why it matters:** The budget is breached by ~9%, and the documentation understates it, so the regression is invisible to anyone reading the docs.
- **Recommended fix:** Either update the budget and docs to reflect reality, or trim the route bundles.
- **Priority: Medium**

### Issue 6 — `aria-expanded` without `aria-controls` on nav dropdowns

- **Issue:** Desktop nav dropdown buttons declare `aria-expanded` and `aria-haspopup` but no `aria-controls`.
- **Page/URL:** All 17 pages (header component) — 17 instances per page
- **Evidence:** `<button type="button" … aria-expanded="false" aria-haspopup="true" aria-label="Show services">` — no `aria-controls` attribute present.
- **Why it matters:** Screen reader users are told a control is collapsed/expanded but the assistive technology cannot programmatically locate the controlled region. Minor, not a blocker — the buttons do have accessible names.
- **Recommended fix:** Add `aria-controls` pointing at the dropdown panel's `id`.
- **Priority: Low**

---

## PAGE-BY-PAGE RESULTS

Legend — "—" means nothing found in that category. All pages share the
identical header and footer (verified by markup hash), so global issues
(Issues 1 and 6) apply to every page and are not repeated per row.

### `/` — Homepage
- **Status:** 200 · 1,446 words · 16 headings · title 58 ch · desc OK
- **Functional:** — (all links and anchors resolve)
- **Visual:** Not verified (no browser)
- **SEO:** — Title, description, canonical, OG, Twitter all present and unique
- **Mobile:** Not verified visually. Markup uses the `mobile-sticky-form` bottom bar below `lg`; consent banner reserves body padding for it with a correctly guarded `ResizeObserver`
- **Accessibility:** Issue 6. One `<h1>`, skip link present, all images have alt
- **Performance:** Issue 1. Hero `/home-hero.webp` correctly preloaded and non-lazy; below-fold bands lazy
- **Content:** — No placeholder text, no encoding defects

### `/services` — Services index
- **Status:** 200 · 787 words · 11 headings
- **Functional / SEO / Content:** —
- **Accessibility:** Issue 6
- **Performance:** Issue 1
- **Note:** Contains the site's only `<table>`. Table responsiveness at narrow widths is **Not verified**; `.overflow-x-auto` exists in the CSS, which is the correct guard, but I could not confirm it wraps this table.

### `/services/concrete-driveways`
- **Status:** 200 · 2,387 words · 32 headings
- **SEO:** — (title 60 ch, suffix "Contractor Referrals")
- **Content:** Issue 4 — `fibre` ×1
- **Accessibility / Performance:** Issues 6, 1
- **Other:** FAQ uses native `<details>/<summary>` — keyboard accessible by default

### `/services/concrete-patios`
- **Status:** 200 · 2,274 words · 32 headings
- **Content:** Issue 4 — `barrowed`
- **Everything else:** as above

### `/services/concrete-slabs`
- **Status:** 200 · 2,223 words · 32 headings
- **Content:** Issue 4 — `vapour`, `fibre`, `barrowing`, `judgement` (most affected page)
- **Everything else:** as above

### `/services/concrete-repair`
- **Status:** 200 · 2,237 words · 32 headings
- **Content:** —
- **Everything else:** as above

### `/locations` — Service areas index
- **Status:** 200 · **268 words** · 5 headings
- **SEO:** **Thin content.** Lowest word count on the site and the only page whose title has no brand/descriptor suffix. Lists a single city.
- **Why it matters:** A hub page with one child and 268 words offers little to rank with. Low priority while only one city is served, but it will need real content before more locations are added.
- **Everything else:** —

### `/locations/lancaster-sc`
- **Status:** 200 · 1,175 words · 14 headings
- **SEO:** — (title suffix "Referral Service")
- **Everything else:** —

### `/locations/lancaster-sc/concrete-driveways`
- **Status:** 200 · 1,582 words · 19 headings
- **SEO:** **Issues 2 and 3** — wrong brand name; title 75 ch; description 174 ch
- **Everything else:** —

### `/locations/lancaster-sc/concrete-patios`
- **Status:** 200 · 1,608 words · 19 headings
- **SEO:** Issues 2, 3 (title 72 ch, desc 171 ch)
- **Content:** Issue 4 — `barrowed`

### `/locations/lancaster-sc/concrete-slabs`
- **Status:** 200 · 1,591 words · 19 headings
- **SEO:** Issues 2, 3 (title 71 ch, desc 170 ch)
- **Content:** Issue 4 — `vapour`, `fibre`, `barrowing`

### `/locations/lancaster-sc/concrete-repair`
- **Status:** 200 · 1,569 words · 19 headings
- **SEO:** Issues 2, 3 (title 72 ch, desc 170 ch)
- **Content:** Issue 4 — `destabilise`

### `/how-it-works`
- **Status:** 200 · 624 words · 5 headings
- **All categories:** — nothing found

### `/contact`
- **Status:** 200 · 392 words · 3 headings
- **Functional:** `tel:+18035550123` and `mailto:hello@example-referral-brand.com` present and well-formed. **Not verified** that they dial/open correctly on a device
- **Note:** This is the only page with **no CTA band** among the main marketing pages — arguably correct, since the whole page is contact-focused
- **All other categories:** —

### `/privacy` · `/terms` · `/referral-disclosure`
- **Status:** 200 · 389 / 296 / 440 words
- **SEO:** `/terms` at 296 words is short, but that is normal and acceptable for a legal page — **not** flagged as a defect
- **All other categories:** —

### `/thank-you`
- **Status:** 200 · correctly `noindex, nofollow`, correctly excluded from the sitemap, reachable directly. Correct handling for a conversion page.

### 404 handler (`/nope-xyz` and similar)
- **Status:** Correctly returns **404**. Page includes an `<h1>`, the full header and footer, and a link back home. Good 404 design.
- Verified 404s: `/SERVICES`, `/services/nope`, `/locations/nope`, `/locations/lancaster-sc/nope`, `/index.html`, `/home`

---

## BROKEN LINKS & FUNCTIONAL ISSUES

**None found.**

| Check | Result |
|---|---|
| Internal link targets tested | **27 distinct — 0 broken** |
| In-page anchor links (`#…`) | **67 used — 0 missing targets** |
| Assets referenced (JS/CSS/fonts/images/srcset) | **338 tested — 0 failures** |
| External links | 18 — all to the site's own canonical domain plus `https://llr.sc.gov/` (South Carolina licensing board, contextually correct) |
| `tel:` link | `tel:+18035550123` — well-formed E.164 |
| `mailto:` link | `mailto:hello@example-referral-brand.com` — well-formed |
| Trailing-slash URLs | 308 redirect to canonical form — correct |
| `/api/leads` via GET | 405 Method Not Allowed — correct |

**Lead API functional test (live POST):**

| Test | Result |
|---|---|
| Valid submission | **202** `{"leadId":"lead_…","state":"routed"}` |
| Invalid payload | **400** with field-level error messages |
| Wrong enum value | **400** `Expected 'call' \| 'text' \| 'email'` — correct validation |
| Idempotent replay (same key) | **202**, handled |

**Interactive components inventory** — FAQ accordions and the mobile menu are
native `<details>/<summary>`, so they function without JavaScript and are
keyboard accessible by default. There are **no** carousels, sliders, modals,
galleries, search, or booking widgets on this site, so those categories are
not applicable. Actual click/keyboard interaction is **Not verified**.

---

## MOBILE ISSUES

**Nothing confirmed broken.** Full visual mobile testing is **Not verified**.
What could be checked statically:

| Check | Result |
|---|---|
| Viewport meta | `width=device-width, initial-scale=1` — correct |
| Fixed pixel widths that could overflow | **none** — no `width:≥100px` fixed rules, no `width:100vw` |
| Horizontal overflow guards | `body { overflow-x: hidden }` with an `@supports (overflow-x: clip)` upgrade |
| Breakpoints | 40/48/64/80/96 rem — a clean, conventional mobile-first scale |
| Smallest font size | **13 px** — acceptable; nothing below |
| Touch targets | `.btn` 52 px, `.btn-ghost` 48 px, radio rows `min-h-12` (48 px) — all exceed the 44 px guideline |
| `min-[380px]:grid-cols-2` in `QuoteForm.tsx:381` | **Not a defect.** A min-width query: single column below 380 px, so 320 px and 360 px are safe |
| Mobile sticky form bar | `sticky bottom-0 … lg:static`, with `padding-bottom: max(.5rem, env(safe-area-inset-bottom))` — correctly handles iPhone home indicator |
| Consent banner overlap | Reserves exact banner height as `body` padding on `max-width:767px`, released on dismissal, and the write is guarded against observer feedback loops — correct |
| CTA background on mobile | `bg-scroll` (unprefixed default) — the photo scrolls normally on phones, which is the correct choice since iOS Safari does not honour fixed attachment |

**Must be checked manually at 320 / 360 / 390 / 414 / 430 px:** actual text
wrapping, whether the sticky form bar plus consent banner together obscure too
much of a short viewport, and the `<table>` on `/services`.

---

## DESKTOP ISSUES

**Nothing confirmed broken.** Visual desktop testing is **Not verified**.

One area that warrants manual attention: the CTA banner uses
`background-attachment: fixed` from 768 px up (`md:bg-fixed`, the only such
rule on the site). Fixed backgrounds cannot be composited and repaint on every
scroll frame. With one per page the cost is modest, but **scroll smoothness on
desktop should be confirmed by eye**, particularly on high-resolution displays.
This is also the one element whose appearance has been iterated on repeatedly,
so a visual check of its final spacing (`my-[40px]` outside, `py-[36px]`
inside) is worthwhile.

Between 768 px and 1024 px (tablets), iPad Safari handles fixed attachment
poorly. The breakpoint was explicitly set to `md`, so this is a deliberate
choice, but tablet rendering is **Not verified**.

---

## SEO AUDIT

### Passed

| Check | Result |
|---|---|
| Unique titles | **18/18** |
| Unique meta descriptions | **18/18** |
| Unique canonicals, all self-referencing | **18/18** |
| Open Graph (`og:title/description/image/url/type`) | complete on every page |
| Twitter card | `summary_large_image` on every page |
| Robots directives | `index, follow` on all public pages; `noindex, nofollow` on `/thank-you` |
| `robots.txt` | valid, `Disallow: /api/`, sitemap declared |
| `sitemap.xml` | 17 entries with `lastmod`, conversion page correctly excluded |
| Heading hierarchy | exactly one `<h1>` per page, **no level skips on any page**, no duplicate headings |
| Structured data | 31 JSON-LD blocks, **0 invalid** — `Organization`, `OnlineBusiness`, `WebSite`, `WebPage`, `BreadcrumbList`, `FAQPage`, `Service` |
| Breadcrumb schema | `BreadcrumbList` on 12 pages |
| Image `alt` text | **0 missing** across 113–117 images |
| Image filenames | descriptive and keyword-relevant throughout (`driveway-drainage-detail.webp`, `slab-formwork-pad.webp`) |
| Near-duplicate content | **none** — no two pages exceed 80% body similarity, notable for a templated service×city site |
| URL structure | clean, lowercase, hyphenated, logically nested |
| Internal linking | dense and sensible; 27 distinct internal targets, zero orphan pages |

### Issues

| # | Issue | URLs | Priority |
|---|---|---|---|
| 2 | Wrong brand name in title | 4 × `/locations/lancaster-sc/<service>` | High |
| 3 | Title 71–75 ch, description 170–174 ch | same 4 pages | Medium |
| 7 | Duplicate JSON-LD — `Organization`/`OnlineBusiness`/`WebSite` emitted twice | 13 of 18 pages (`src/app/layout.tsx:37`) | Low |
| 8 | Thin content — 268 words, no title suffix | `/locations` | Low |

---

## PERFORMANCE AUDIT

### Passed

| Check | Result |
|---|---|
| Image format | **100% WebP**, zero PNG/JPEG/GIF in the content set |
| Image sizes | 50 files, **4.1 MB total**, largest **100.0 KB** |
| Layout shift from images | **0 of 113** images lack intrinsic dimensions |
| Lazy loading | below-fold images lazy; hero eager and preloaded — correct split |
| Content negotiation | server returns **AVIF 44 KB** to browsers advertising it, vs 70 KB JPEG fallback |
| Font | single 24.9 KB woff2, `font-display: swap`, preloaded |
| Render-blocking | one 48 KB stylesheet; **all** scripts `async` |
| HTML compression | 132.7 KB → **20.5 KB** gzipped |
| Static caching | `public, max-age=31536000, immutable` on images |
| Animation cost | **0** `@keyframes`, **0** `will-change`, **0** scroll listeners in shipped JS |

### Issues

| # | Issue | Evidence | Priority |
|---|---|---|---|
| 1 | Both logos preloaded at `w=1920` and `w=3840` | 1808×556, 82.8 + 81.8 KB, 72 of 85 non-lazy images | **High** |
| 5 | 131 kB First Load JS vs 120 kB budget | 8 dynamic-route pages | Medium |
| 9 | `backdrop-filter` ×4 on `.process-step-card` | expensive to composite; cards are static so no scroll judder | Low |
| 10 | CTA photos have no responsive `srcset` | they are CSS backgrounds by design; a 320 px phone receives the same 87–96 KB file | Low (accepted trade-off) |

---

## ACCESSIBILITY AUDIT

### Passed

| Check | Result |
|---|---|
| `<html lang>` | `en-US` on every page |
| Skip link | present on every page |
| One `<h1>` per page | 18/18 |
| Heading level skips | **none on any page** |
| `alt` text | **0 missing**; decorative images correctly `aria-hidden` |
| Form labels | **0 unlabelled** — all 44 inputs wrapped in `<label>` |
| Empty links / unlabelled buttons | **0** |
| `aria-labelledby` / `aria-controls` pointing at missing IDs | **0** |
| Focus indicator | `:focus-visible { outline: 2px solid accent; outline-offset: 2px }` |
| `outline: none` | 1 occurrence, on `.field:focus`, but paired with a 4 px `box-shadow` ring — acceptable |
| Touch targets | 48–52 px, above the 44 px guideline |
| Keyboard operability | FAQ accordions and mobile menu are native `<details>`/`<summary>` — operable without JS |
| Colour contrast | see below — all pass |

### Contrast measured per-pixel over every photograph

| Context | Worst case | Floor | Result |
|---|---|---|---|
| CTA heading (white) | **7.39:1** | 3.0 (large text) | Pass |
| CTA body (`#cfdbd5`) | **5.19:1** | 4.5 | Pass |
| Hero/band heading (white) | **7.42:1** | 3.0 | Pass |
| Hero/band body | **5.95:1** | 4.5 | Pass |
| Hero/band eyebrow (`#5fe3a8`) | **4.61:1** | 4.5 | Pass — tightest on the site |

### Issues

| # | Issue | Pages | Priority |
|---|---|---|---|
| 6 | `aria-expanded` without `aria-controls` on nav dropdowns | all 17, ×17 each | Low |

**Not verified:** real screen reader output, actual focus order, focus trapping
in the mobile menu, and automated axe/WAVE results.

---

## CONTENT AUDIT

### Passed

| Check | Result |
|---|---|
| Placeholder text (`lorem`, `TODO`, `TBD`, "coming soon") | **none** |
| Encoding defects / mojibake / replacement characters | **none** |
| Spacing and punctuation defects | **none** (initial flags proved to be artefacts of React's `<!-- -->` text separators, re-tested with render-accurate extraction) |
| Duplicate paragraphs within a page | only intentional legal disclosures |
| Terminology consistency | `third party` ×59, `third-party` ×0 — fully consistent hyphenation |
| Business-model honesty | consistent and prominent: "We connect consumers with independent third party service providers", "We do not perform, supervise, or guarantee services provided by third parties", "No license, rating, review, or project claim on this site represents work performed by the publisher" |

### Issues

| # | Issue | Pages | Priority |
|---|---|---|---|
| 4 | British spellings (`vapour`, `fibre`, `destabilise`, `judgement`, `barrowed/barrowing`) with zero US counterparts | 5 pages | Medium |

### Environment-dependent — verify before launch (NOT code defects)

The following come from `.env.example`, which I copied to `.env.local` to run
the build. They are **env-driven, not hardcoded**, so they are correct in code
but **must be set to real values in production**:

- `NEXT_PUBLIC_SITE_URL=https://example-referral-brand.com` — appears in all canonicals, OG URLs, the sitemap and `robots.txt`
- `NEXT_PUBLIC_CONTACT_EMAIL=hello@example-referral-brand.com`
- `NEXT_PUBLIC_FALLBACK_PHONE_DISPLAY=(803) 555-0123` — a reserved fictional 555 number

**If this site is already deployed, confirm these are overridden.** Shipping
with the 555 number or the placeholder domain would be severe — hence listing
it here despite not being a code bug.

---

## UX/UI AUDIT

Largely **Not verified** — this needs a browser and ideally real users. What
can be assessed from structure:

**Strengths**
- The value proposition is stated in the `<h1>` and lede of every page, and the referral model is disclosed repeatedly and plainly.
- Two clear conversion paths everywhere: a phone button and a form link. The phone number is in the header, hero, CTA band and footer.
- A persistent mobile sticky form bar keeps the primary action reachable.
- Service and location taxonomies are shallow and predictable (`/services/<service>`, `/locations/<city>/<service>`).
- Breadcrumbs with matching schema on 12 pages.
- 404 page retains header, footer and a route home rather than dead-ending.

**Observations, not defects**
- `/locations` currently lists one city; as a hub it adds a click without adding much. Reasonable to keep for future expansion, but it is the weakest page on the site.
- `/contact` is the only main page without a closing CTA band. Defensible, since the page is itself the call to action.

**Cannot assess without a browser:** whether CTAs are visually obvious, whether
navigation feels intuitive, whether any section looks unfinished or crowded,
and whether the site feels trustworthy at a glance.

---

## CROSS-PAGE CONSISTENCY

**Excellent — this is the strongest area of the site.**

| Check | Result |
|---|---|
| Header markup | **1 variant across all 17 pages** (identical MD5) |
| Footer markup | **1 variant across all 17 pages** (identical MD5) |
| Button styles | `.btn-primary`, `.btn-secondary`, `.btn-ghost` on all 17 pages — no ad-hoc button styling |
| Card design | `.card` / `.card-interactive` used consistently |
| Typography | one font family (Geist Sans), one type scale, `.h1` present exactly once per page |
| Layout container | `.container-page` used site-wide |
| CTA band | identical component on all 12 pages that have one |
| Image treatment | consistent scrim system across all photographic bands |

**Minor inconsistencies**

| Issue | Detail |
|---|---|
| Title suffix pattern varies | Four different conventions: `\| Lancaster Concrete Connect` (5 pages), `\| Contractor Referrals` (4), `\| Lancaster Concrete Referral` (4 — **wrong brand**, Issue 2), descriptive suffixes (3), and none at all (`/locations`) |
| `.lede` class | used on 13 of 17 pages; 4 pages open without a lede paragraph |

---

## PASSED CHECKS

A consolidated list of what was tested and found correct:

1. TypeScript compiles clean (`tsc --noEmit`)
2. Production build succeeds
3. Unit tests: 4 files, **29/29 passing**
4. All 17 sitemap routes return 200
5. 404 handling correct on 6 tested bad URLs, with a well-formed 404 page
6. Trailing-slash URLs 308-redirect to canonical form
7. `/api/leads` rejects GET with 405
8. **27 internal link targets — zero broken**
9. **67 in-page anchors — zero missing targets**
10. **338 assets — zero failures**
11. Lead API accepts valid submissions (202), rejects invalid (400), handles idempotent replay
12. 18/18 unique titles, descriptions and canonicals
13. All canonicals self-referencing and correctly formed
14. Complete Open Graph and Twitter metadata on every page
15. 31 JSON-LD blocks, zero invalid
16. Correct `robots.txt` and `sitemap.xml`; `/thank-you` noindexed and excluded
17. Exactly one `<h1>` per page; **no heading level skips anywhere**
18. Zero missing `alt` attributes
19. Zero unlabelled form inputs
20. Zero empty links or unlabelled buttons
21. Zero broken ARIA ID references
22. Visible focus indicators defined
23. Touch targets 48–52 px
24. All contrast ratios pass WCAG AA over every photograph
25. 100% WebP; no image over 100 KB; no oversized sources
26. Zero images lacking intrinsic dimensions (no image-driven CLS)
27. Correct lazy/eager split: hero preloaded, below-fold lazy
28. AVIF served via content negotiation
29. Single preloaded woff2 with `font-display: swap`
30. No render-blocking scripts; all `async`
31. HTML gzips to 20.5 KB
32. Immutable caching on static assets
33. Security headers present (`X-Content-Type-Options`, `Referrer-Policy`, `CSP`)
34. Zero `@keyframes`, zero `will-change`, zero scroll listeners
35. No fixed widths or `100vw` rules that could cause horizontal overflow
36. Header and footer byte-identical across all 17 pages
37. No placeholder or lorem ipsum text
38. No encoding defects or stray characters
39. No punctuation or spacing errors
40. No near-duplicate pages despite a templated service×city structure

---

## PRIORITY FIX LIST

### 1. Critical
**None.**

### 2. High Priority

| # | Page/URL | Action |
|---|---|---|
| 1 | All pages — `src/components/layout/Logo.tsx:19–32` | Add `sizes="140px"`, remove `priority` from the hidden logo variant, re-encode the wordmark near display size. Recovers ~165 KB of high-priority bandwidth per page. |
| 2 | 4 × `/locations/lancaster-sc/<service>` — `src/lib/seo/metadata.ts:54` | Replace the hardcoded `"Lancaster Concrete Referral"` with the brand from env so all 17 pages agree. |

### 3. Medium Priority

| # | Page/URL | Action |
|---|---|---|
| 3 | 4 × `/locations/lancaster-sc/<service>` — `metadata.ts:54–57` | Shorten titles to ≤60 ch and descriptions to ≤155 ch. |
| 4 | `/services/concrete-slabs`, `/services/concrete-driveways`, `/services/concrete-patios`, `/locations/lancaster-sc/concrete-slabs`, `/locations/lancaster-sc/concrete-patios`, `/locations/lancaster-sc/concrete-repair` | Convert British spellings to US: `vapour→vapor`, `fibre→fiber`, `destabilise→destabilize`, `judgement→judgment`, `barrowed/barrowing→wheelbarrowed/wheelbarrowing`. |
| 5 | `README.md:41`, `README.md:51`, `REMAINING-WORK.md:84` | Correct the 116 kB figure to 131 kB, and either raise the budget or trim the route bundles. |
| — | Deployment environment | Confirm `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL` and `NEXT_PUBLIC_FALLBACK_PHONE_*` are real values, not the `.env.example` placeholders. |

### 4. Low Priority

| # | Page/URL | Action |
|---|---|---|
| 6 | All pages — header dropdowns | Add `aria-controls` alongside `aria-expanded`. |
| 7 | 13 pages — `src/app/layout.tsx:37` | Remove the duplicate JSON-LD block. |
| 8 | `/locations` | Expand beyond 268 words and add a title suffix, or accept as a stub until more cities exist. |
| 9 | `.process-step-card` | Consider flattening `backdrop-filter` to a solid colour. |
| 10 | `src/components/marketing/sections.tsx` | Remove the unused `ILLUSTRATIVE_IMAGE_NOTE` export. Also, `README.md:53` contains a `min-h-[calc(100dvh-3.5rem)]` string that causes Tailwind to generate dead CSS. |

---

## FINAL VERDICT

# NEEDS MINOR FIXES

The site is **close to production-ready**. No critical issue was found, there
are no broken links or assets, the lead pipeline works, and accessibility and
SEO fundamentals are in better shape than most sites of this type — notably
zero missing alt text, zero unlabelled inputs, zero heading-hierarchy errors,
valid structured data throughout, and WCAG AA contrast over every photograph.

Two High-priority items should be fixed before or shortly after launch: the
**logo preloading waste** (the clearest performance win available) and the
**wrong brand name on four pages** (a visible brand-consistency error in search
results). The Medium items are quick copy and metadata edits.

**One condition on this verdict:** no visual or browser-based testing was
possible in this environment. Before declaring the site ready, someone must
confirm in a real browser:

1. Rendered layout and spacing at desktop and at 320 / 360 / 390 / 414 / 430 px
2. Scroll smoothness of the CTA fixed background on desktop, and its behaviour on iPad Safari between 768–1024 px
3. The CTA banner's final spacing
4. The `<table>` on `/services` at narrow widths
5. The mobile sticky form bar together with the consent banner on a short viewport
6. Browser console for runtime errors
7. That production environment variables are real, not the `.env.example` placeholders

With those confirmed and the two High-priority items fixed, this site is ready
for production.
