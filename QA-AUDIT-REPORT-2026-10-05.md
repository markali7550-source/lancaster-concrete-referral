# WEBSITE QA AUDIT REPORT

**Site:** Lancaster Concrete Connect (concrete contractor referral service)
**Commit:** `a4ec3b0` · branch `arena/01a10d4c-lancaster-concrete-referral`
**Environment:** production build (`next build` + `next start`), Next.js 15.5.27
**Date:** 2026-10-05
**Pages crawled:** 17 indexable + `/thank-you` + 404 handler
**Changes made to the website: NONE.** This is a read-only audit.

---

# OVERALL WEBSITE SCORE

## **Overall Website Score: 87/100**

**Category Scores:**

* Functionality: **19/20**
* UI/Visual Design: **13/15**
* Mobile Responsiveness: **14/15**
* SEO: **12/15**
* Performance: **8/10**
* Accessibility: **9/10**
* Content Quality: **4/5**
* UX/Conversion: **8/10**

**Overall Status: Very Good — only minor issues**

### Why the site received this score

The site scores highly because the things that most often break simply do not
break here: across **180 real browser page-loads (18 pages x 10 viewport
widths)** it produced **zero broken links, zero horizontal overflow, zero
console errors, zero failed requests and a perfect CLS of 0.000**, and the
full referral funnel completes end to end with `POST /api/leads` returning
**202** — so Functionality, Mobile Responsiveness and Accessibility lose almost
nothing. The deductions are concentrated in **SEO (-3)**, where four
`/locations/lancaster-sc/<service>` pages carry the wrong brand name
("Lancaster Concrete Referral" instead of "Lancaster Concrete Connect") plus
titles of 71-75 characters and descriptions of 170-174, with duplicate JSON-LD
on 13 routes; and in **Performance (-2)**, where both logo variants are
preloaded at `w=1920` **and** `w=3840` (~165 KB per page, one of them for an
element that renders at 0x0) while the hero — the confirmed LCP element — is a
960x536 source stretched to 1280x800 and beyond.

**UI/Visual Design (-2)** and **UX/Conversion (-2)** are reduced by the same
two verified defects: that upscaled, visibly soft hero, and the post-submission
confirmation heading sitting **18 px underneath the sticky header** with focus
never moved off `BODY`. **Content Quality (-1)** reflects British spellings
(`vapour`, `fibre`, `destabilise`, `judgement`) on five pages of a US site, and
**Accessibility (-1)** reflects standalone list links measuring 19-20 px
against the 24 px WCAG 2.2 minimum plus `aria-expanded` without `aria-controls`.

No critical issue was found anywhere, which is why the score sits in the "Very
Good" band rather than lower — but it stays below 90 because two **High**
priority items (the logo preload waste and the wrong brand name on four
indexed pages) are still outstanding, and because real iOS/Android Safari,
Lighthouse field data and screen-reader testing could not be performed in this
environment.

**Arithmetic check:** 19 + 13 + 14 + 12 + 8 + 9 + 4 + 8 = **87**, out of a
maximum of 20 + 15 + 15 + 15 + 10 + 10 + 5 + 10 = **100**. Band: 80-89 = **Very
Good — only minor issues**.

---

## IMPORTANT — TESTING METHOD (read first)

**Update — this report has been upgraded with real browser testing.** The first
edition of this audit could not install a browser. A headless **Chromium 153**
has since been obtained and the whole site was re-tested in a real rendering
engine. The sections that previously said "Not verified" have been replaced with
measured results.

**Verified by real browser (Chromium 153, headless):**

- **18 pages x 10 viewport widths = 180 page loads**, at 320, 360, 375, 390,
  414, 430, 768, 1024, 1280 and 1920 px (mobile widths run with a mobile user
  agent, `isMobile` and touch enabled)
- Horizontal overflow, element geometry and overlap detection at every width
- Runtime JavaScript console errors, uncaught page errors, failed requests
- Core Web Vitals via `PerformanceObserver`: **LCP** (element + URL) and **CLS**
  (with layout-shift sources)
- Real image loading after full-page scroll, `naturalWidth` vs displayed size,
  `srcset` candidate selection, AVIF/WebP content negotiation
- Keyboard tabbing, focus order and computed focus-ring styles
- The multi-step quote form end to end, including a real `POST /api/leads`
- Consent banner and sticky bottom bar geometry on a 375x812 mobile viewport
- Runtime `background-attachment` computed style, desktop vs mobile
- Full-page screenshots at 320 / 375 / 768 / 1280 / 1920

**Still NOT VERIFIED (and why):**

- **Real iOS Safari, Android Chrome, Firefox and desktop Safari** — only
  Chromium is available. The iOS-Safari fixed-background caveat in particular is
  reasoned from known engine behaviour, not observed.
- **Lighthouse scores and field/CrUX data** — Lighthouse is not installed and
  there is no real-user telemetry. LCP/CLS below are lab figures from a local
  server, so network time is unrealistically fast; treat the *element* and the
  *CLS* as meaningful and the millisecond LCP as a floor, not a field number.
- **Real screen-reader output** (NVDA/JAWS/VoiceOver) — no AT available. ARIA is
  verified structurally and via live-region presence, not by listening.
- **Automated axe/WAVE rule sweep** — the axe library could not be downloaded;
  accessibility findings below come from targeted scripted checks instead.
- **Subjective image quality and subject matter** — screenshots were captured
  and reviewed, but "is this the right photo" remains a human judgement.

---

## OVERALL STATUS

# 87 / 100 — Very Good (only minor issues)

See **Overall Website Score** at the top of this report for the full weighted
breakdown. The table below is the diagnostic view of the same result, scored
per engineering area rather than per weighted category.

| Area | Score | Note |
|---|---|---|
| Build & technical integrity | 99 | clean build + 29/29 tests; **0 console errors, 0 failed requests across 180 page loads** |
| Links & routing | 100 | zero broken links, anchors or assets |
| Layout & rendering | 97 | **zero overflow at 10 widths, CLS 0.000**; hero upscales on wide screens |
| SEO | 82 | wrong brand name on 4 pages, four over-length titles, duplicate JSON-LD |
| Accessibility | 90 | one ARIA gap, small list-link targets; contrast, labels, focus all excellent |
| Performance | 80 | CLS perfect; logo preloading wasteful; hero source under-resolution |
| Content | 85 | British spellings on a US site |
| Consistency | 98 | header/footer/components byte-identical sitewide |
| UX / conversion | 88 | funnel works end to end; confirmation heading clipped by sticky header |

*(Prior editions scored 86 pre-browser and 88 post-browser on an unweighted
scale. Applying your weighting — which gives SEO 15 points and Performance 10 —
yields **87**, because the two outstanding High-priority items both sit in
those two categories.)*

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

### Issue 7 — Submission confirmation heading is hidden behind the sticky header (BROWSER-VERIFIED)

- **Issue:** After a successful referral submission the success panel renders in place, but the page does not scroll it into view and does not move focus. The confirmation heading ends up **underneath the sticky site header**.
- **Page/URL:** `/contact` (and every page embedding the quote form)
- **Evidence:** Measured in Chromium at 1280x1000 after a real successful submission (`POST /api/leads` -> `202`): success heading `getBoundingClientRect().top = 47px`, sticky header `height = 65px`, so the heading sits **18 px underneath the header**; `scrollY` stayed at 628. `document.activeElement` was still `BODY` — focus was never moved. Screenshot: `form-success.png`.
- **Why it matters:** The single most important moment in the funnel — "did my request go through?" — is presented with its headline clipped. Keyboard users also lose their place, as focus stays where the now-removed form used to be.
- **Mitigating factor (verified):** a `role="status"` live region **is** present and contains the full confirmation text, so screen-reader users are correctly announced. This is a visual/focus issue, not a silent failure.
- **Recommended fix:** On success, `scrollIntoView()` the panel and move focus to it (`tabIndex={-1}` + `.focus()`), or add `scroll-margin-top` equal to the header height.
- **Priority: Medium**

### Issue 8 — Hero/banner source images are too small for large viewports (BROWSER-VERIFIED)

- **Issue:** Several full-bleed images have source files narrower than the space they are displayed in, so the browser upscales them.
- **Page/URL:** `/` primarily; 14 of 50 images are affected sitewide
- **Evidence:** `public/home-hero.webp` is **960x536**. The optimizer correctly refuses to upscale, so `w=1920` and `w=3840` both return 960x536 (verified by fetching each candidate). In Chromium at a 1280 px viewport the hero `<img>` is displayed at **1280x800** — a 1.33x upscale — and at 1920 px it is displayed at roughly 1920x1140, a **2x upscale** (4x on a HiDPI panel). The hero is also confirmed to be the **LCP element** on `/`. Other sub-900 px sources include `how-it-works-hero.webp` (860x642), `lancaster-hero.webp` (860x480), `repair-hero-walkway.webp` (816x545) and `home-service-area-band.webp` (816x545).
- **Why it matters:** The largest, most prominent image on the site — and the LCP element — is visibly soft on any display wider than ~1000 px. This is a quality regression that came from the 100 KB file-size ceiling.
- **Recommended fix:** Re-encode the hero and the other full-bleed heroes at ~1600-1920 px wide. At quality 40-50 a 1600 px WebP of this subject lands near 100-130 KB; a small, deliberate ceiling increase for hero images only is the right trade. Card and band images are fine as they are.
- **Priority: Medium**

### Issue 9 — Standalone list links are below the 24 px minimum target size (BROWSER-VERIFIED)

- **Issue:** Link lists in page body content render **19-20 px tall**, under the WCAG 2.2 AA "Target Size (Minimum)" threshold of 24 px.
- **Page/URL:** `/locations`, `/services`, and the "Full disclosure" / "referral disclosure page" links on several pages
- **Evidence:** Measured at a 375 px mobile viewport: `Concrete Driveways` 137x19, `Concrete Patios` 109x19, `Concrete Slabs` 104x19, `Concrete Repair` 109x19, `All services` 83x19, `Full disclosure` 99x20. Each is `display:inline` but is the **sole content of its own `<li>`**, so the 2.5.8 "inline in a sentence" exception does **not** apply.
- **Why it matters:** Small, closely stacked tap targets are easy to mis-tap on a phone.
- **Note — these are NOT the same as the navigation and button targets,** which were re-verified as fine: `.btn` 52 px, radio rows 48 px, and the skip link measures 143x48 once focused.
- **Recommended fix:** Give list links `display:inline-block; padding-block:4px` (or `min-height:24px`) so each row clears 24 px. No redesign needed.
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

**No mobile layout defects found.** This section is now browser-verified at
**six phone widths plus tablet**: 320, 360, 375, 390, 414, 430 and 768 px, with
a mobile user agent and touch enabled.

| Check | Result (measured in Chromium) |
|---|---|
| **Horizontal overflow** | **ZERO at every width.** `documentElement.scrollWidth` equalled `clientWidth` on all 18 pages x 10 widths (180 combinations). No element extended past the right edge. |
| **Page loads** | **180 / 180 succeeded**, no navigation errors or non-2xx responses |
| **Console / JS errors** | **0** across all 180 loads |
| **Failed requests** | **0** across all 180 loads |
| **Broken images** | **0** after full-page scroll on every page tested. (An initial probe reported 96 "unloaded" images — these were simply below-the-fold lazy images that had not entered the viewport yet. They all load correctly on scroll. **Lazy loading works; this was a probe artefact, not a defect.**) |
| **Consent banner vs sticky bar** | **No overlap, no dead space.** At 375x812 the bottom-fixed consent banner measures exactly **169 px**, and `body` `padding-bottom` is exactly **169 px** — a precise match. Only one bottom-anchored fixed element is present at a time, and the guarded `ResizeObserver` keeps the reservation in sync. |
| **`<table>` on `/services` at 320 px** | **PASSES — not clipped.** The table is 672 px wide inside a 280 px wrapper, and the wrapper computes `overflow-x: auto` and is genuinely scrollable (`scrollWidth > clientWidth`). Horizontal scrolling is contained to the table; the page itself does not overflow. |
| **CTA background on mobile** | **Verified at runtime:** `0` elements compute `background-attachment: fixed` at 375 px. The photo scrolls normally on phones, exactly as specified. |
| Viewport meta | `width=device-width, initial-scale=1` — correct |
| Touch targets | `.btn` 52 px, radio rows 48 px; radio inputs are 20x20 but sit inside a **293x50 `<label>`**, so the effective target passes. Skip link is 143x48 when focused. |
| Smallest font size | 13 px — acceptable |
| Safe area | `.mobile-sticky-form` uses `env(safe-area-inset-bottom)` — correct for the iPhone home indicator |

**Only mobile finding:** Issue 9 — body-content list links are 19-20 px tall.

**One UX observation (not a defect):** at 375x812 the consent banner occupies
169 px, about **21% of the viewport**, on first visit. It is dismissible and
correctly compensated for, but it is a tall first impression on a small phone.

---

## DESKTOP ISSUES

**No desktop layout defects found.** Verified at 1024, 1280 and 1920 px.

| Check | Result (measured in Chromium) |
|---|---|
| Horizontal overflow | **none** at 1024 / 1280 / 1920 on all 18 pages |
| Console errors / failed requests | **0** |
| **CTA fixed background** | **Verified at runtime and behaving exactly as specified.** At 1280 px, **exactly one** element in the whole document computes `background-attachment: fixed` (`absolute inset-0 bg-cover bg-center bg-no-repeat…`). At 375 px the count is **0**. This satisfies your acceptance criterion at runtime, not just by source grep. |
| **Layout stability** | **CLS = 0.000** on every page/viewport measured, with **zero** recorded layout-shift entries. The fixed background causes no shift. |
| Hero rendering | Renders correctly; see Issue 8 — the hero is sharp only up to ~1000 px wide, and soft beyond that because the source is 960 px. |

**Scroll-repaint cost of the fixed background:** with exactly one fixed layer
per page and `0 @keyframes`, `0 will-change` and `0 scroll listeners` sitewide,
the repaint cost is minimal. No jank was detectable in automated measurement,
though genuine subjective scroll smoothness on a high-refresh display remains a
human judgement.

**Tablet (768-1024 px):** renders cleanly with no overflow. The `md` breakpoint
does mean iPad-class Safari gets the fixed attachment, which Safari handles
poorly — **still Not verified**, because only Chromium is available. This
remains the single most valuable thing to spot-check on a real iPad.

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

### Measured Core Web Vitals (BROWSER-VERIFIED, lab)

| Page / viewport | LCP | LCP element | CLS |
|---|---|---|---|
| `/` @1280 | 136 ms | `home-hero.webp` (`IMG.-z-20 object-cover`) | **0.000** |
| `/` @375 | 116 ms | `home-hero.webp` @ `w=640` | **0.000** |
| `/services` @1280 | 136 ms | `services-overview.webp` | **0.000** |
| `/contact` @375 | 132 ms | `contact-front-walkway.webp` | **0.000** |

**CLS is a perfect 0.000 with zero layout-shift entries recorded** — the best
possible result, and it confirms the intrinsic-dimension and
banner-height-reservation work is paying off. LCP figures are from a local
server, so they represent a floor rather than a field number, but the **LCP
element is correctly a preloaded hero image on every page**, which is the part
that matters architecturally.

**Also verified:** the hero carries a proper **8-candidate `srcset`** with
`sizes="100vw"` and a matching `<link rel=preload imagesrcset>`; the browser
correctly selected `w=640` at 375 px and `w=1920` at 1280 px. Content
negotiation returns **AVIF** to browsers advertising it, **WebP** to those
advertising only WebP, and JPEG otherwise — all three confirmed by request.

### Issues

| # | Issue | Evidence | Priority |
|---|---|---|---|
| 1 | Both logos preloaded at `w=1920` and `w=3840` | **Now confirmed in-browser:** two `<link rel=preload as=image>` tags, one per logo, each with `imagesrcset` offering `w=1920` (1x) **and** `w=3840` (2x) and **no `imagesizes`**. Sources are 1808×556; one of the two renders at **0×0** (the hidden theme variant) yet is still preloaded. Displayed size is 143×44. | **High** |
| 8 | Hero source images smaller than their display size | `home-hero.webp` 960×536 shown at 1280×800 / ~1920×1140; 14 of 50 images under 900 px wide | Medium |
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

### Browser-verified accessibility results (new)

| Check | Result (measured in Chromium) |
|---|---|
| **Focus visibility** | **PASS.** Every one of the first 8 tab stops on `/` showed a computed `outline: 2px solid`. No invisible focus states. |
| **Focus order** | **PASS — logical.** Skip link -> logo -> Services -> services-dropdown toggle -> Service areas -> How it works -> Contact -> phone. Matches visual order. |
| **Skip link** | **PASS.** Measures 143×48 px once focused (it is 1×1 when hidden, which is correct technique). |
| **Nav dropdown keyboard/ARIA** | **PASS.** `aria-expanded` correctly transitions `false` -> `true` on activation, reveals 4 service links, and returns to `false` on **Escape**. |
| **Form validation** | **PASS and accessible.** Submitting an incomplete step sets `aria-invalid="true"`, exposes a `role="alert"`, and announces "Fix 1 item to continue — Choose your location." / "Enter your full name." Submission is correctly blocked. |
| **Success announcement** | **PASS.** The post-submission confirmation is inside a `role="status"` live region containing the full text, so it is announced. |
| **Focus after submission** | **FAIL (minor).** Focus remains on `BODY`; no element receives focus and the panel is not scrolled into view. See **Issue 7**. |
| **Touch target re-check** | 20×20 radio inputs sit inside **293×50** `<label>` wrappers — effective target passes. Body-content list links at 19-20 px do **not** — see **Issue 9**. |

**Still Not verified:** real screen reader output, focus trapping
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

Now substantially verified: the full conversion funnel was driven end to end in
a real browser, and screenshots were captured at five widths.

### The referral funnel works (verified end to end)

I completed a real submission on `/contact`:

1. **Step 1 "Your project and location"** — project-type radios + location select. Attempting to continue while incomplete is correctly blocked with an accessible error.
2. **Step 2 "How to reach you"** — name/contact details, again validated.
3. **Submission** — `POST /api/leads` returned **202**, with **0 console errors** and **0 failed requests**.
4. **Confirmation** — an in-place success panel reading *"REQUEST RECEIVED — Your request is with our routing team"*, an honest explanatory line (*"An independent contractor serving your area will contact you directly. We are not the contractor and do not set pricing or schedules."*), a **tracking reference** (`lead_c8a2f171-…`), and a **"What happens next"** button.

This is a genuinely good confirmation experience: it sets expectations, repeats
the referral disclosure at exactly the right moment, and gives the user a
reference. **Two flaws:** the heading is clipped behind the sticky header and
focus is not moved (**Issue 7**).

**Note:** the funnel does **not** navigate to `/thank-you`; it confirms in
place. That is a legitimate pattern and arguably better than a redirect, but it
means the `/thank-you` route is effectively unreachable from the form. Worth a
decision: either link to it from the "What happens next" button or retire it.
Not a defect — flagging the inconsistency only.

### Strengths (confirmed visually)

- Value proposition sits in the `<h1>` and lede of every page; the referral model is disclosed repeatedly and plainly, including in the footer disclaimer strip.
- Two clear conversion paths everywhere — phone button and form link — present in header, hero, CTA band and footer.
- Contrast and legibility over photography are genuinely good; the hero text is comfortably readable against the image.
- Navigation taxonomy is shallow and predictable; breadcrumbs with matching schema on 12 pages.
- The 404 page retains header, footer and a route home.

### Observations, not defects

- `/locations` lists one city and adds a click without adding much; reasonable as a placeholder for expansion, but it remains the weakest page.
- `/contact` is the only main page without a closing CTA band — defensible, as the page is itself the call to action.
- The consent banner occupies ~21% of a 375×812 viewport on first load.

**Still Not verified:** whether real users find the flow intuitive, and
subjective judgement of photo selection. Those need human testers.

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


### Additionally verified in a real browser (Chromium 153)

41. **180 / 180 page-viewport combinations loaded successfully** (18 pages x 10 widths)
42. **Zero horizontal overflow** at 320 / 360 / 375 / 390 / 414 / 430 / 768 / 1024 / 1280 / 1920 px
43. **Zero runtime console errors** across all 180 loads
44. **Zero uncaught JavaScript page errors**
45. **Zero failed network requests** across all 180 loads
46. **CLS = 0.000** on every page/viewport measured, with zero layout-shift entries
47. LCP element is correctly a preloaded hero image on every page measured
48. Hero `srcset` works — browser selected `w=640` at 375 px, `w=1920` at 1280 px
49. AVIF / WebP / JPEG content negotiation all three confirmed by request
50. **All lazy-loaded images load correctly on scroll** — zero broken images sitewide
51. `/services` `<table>` scrolls inside an `overflow-x:auto` wrapper at 320 px and is **not clipped**
52. Consent banner height (169 px) **exactly matches** the reserved `body` padding — no overlap, no dead space
53. **Exactly 1** element computes `background-attachment: fixed` at 1280 px and **0** at 375 px — your acceptance criterion verified at runtime
54. Visible 2px focus outline on every one of the first 8 tab stops
55. Keyboard focus order is logical and matches visual order
56. Nav dropdown `aria-expanded` toggles correctly and closes on **Escape**
57. Form validation blocks incomplete steps with `aria-invalid` + `role="alert"` + clear messages
58. **Full funnel completes end to end** — `POST /api/leads` -> **202** with a tracking reference
59. Success confirmation is inside a `role="status"` live region (announced to screen readers)
60. Radio inputs' effective tap target is 293x50 via label wrapper; skip link is 143x48 when focused

### False alarms investigated and dismissed (do not action)

- **"96 broken images"** — below-fold lazy images not yet in viewport; all load on scroll.
- **"Hero served as JPEG"** — an artefact of requesting without an `Accept` header; real browsers get AVIF.
- **"Hero has no srcset"** — it has 8 candidates; my initial regex matched the wrong tag.
- **"20px radio touch targets"** — wrapped in 293x50 labels.
- **"1x1 skip link"** — correct hidden-until-focused technique; 143x48 when focused.

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
| 7 | `/contact` and every page with the quote form | On successful submission, scroll the confirmation panel into view and move focus to it (`tabIndex={-1}` + `.focus()`), or add `scroll-margin-top` equal to the header height. Currently the heading sits 18 px under the sticky header. |
| 8 | `public/home-hero.webp` (+ `how-it-works-hero`, `lancaster-hero`, `repair-hero-walkway`, `home-service-area-band`) | Re-encode full-bleed hero images at ~1600-1920 px wide. The hero is the LCP element and is currently upscaled up to 2x on wide screens. |
| — | Deployment environment | Confirm `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL` and `NEXT_PUBLIC_FALLBACK_PHONE_*` are real values, not the `.env.example` placeholders. |

### 4. Low Priority

| # | Page/URL | Action |
|---|---|---|
| 6 | All pages — header dropdowns | Add `aria-controls` alongside `aria-expanded`. |
| 7 | 13 pages — `src/app/layout.tsx:37` | Remove the duplicate JSON-LD block. |
| 8 | `/locations` | Expand beyond 268 words and add a title suffix, or accept as a stub until more cities exist. |
| 9 | `.process-step-card` | Consider flattening `backdrop-filter` to a solid colour. |
| 9b | `/locations`, `/services`, disclosure links | Give standalone list links `display:inline-block; padding-block:4px` so each clears the 24 px WCAG 2.2 target-size minimum (currently 19-20 px). |
| 9c | `/thank-you` | The form confirms in place and never navigates here, so the route is unreachable from the funnel. Either link it from "What happens next" or retire it. |
| 10 | `src/components/marketing/sections.tsx` | Remove the unused `ILLUSTRATIVE_IMAGE_NOTE` export. Also, `README.md:53` contains a `min-h-[calc(100dvh-3.5rem)]` string that causes Tailwind to generate dead CSS. |

---

## FINAL VERDICT

# VERY GOOD — ONLY MINOR ISSUES

**Score: 87 / 100 — Very Good (only minor issues).** The site is **close to
production-ready**, and real
browser testing has now removed the main caveat that qualified the first
edition of this verdict.

No critical issue was found. There are no broken links or assets, the lead
pipeline works end to end, and the engineering fundamentals are in better shape
than most sites of this type: zero missing alt text, zero unlabelled inputs,
zero heading-hierarchy errors, valid structured data throughout, and WCAG AA
contrast over every photograph.

**What browser testing added.** Across 180 page-viewport combinations the site
produced **zero horizontal overflow, zero console errors, zero failed requests
and a perfect CLS of 0.000**. The `<table>`, the consent banner, the sticky
bottom bar, the nav dropdown, keyboard focus order and the full referral funnel
were all specifically suspected risks in the first edition — **every one of
them passed**. Your CTA fixed-background rule was confirmed at runtime: exactly
one fixed layer on desktop, zero on mobile.

Browser testing surfaced **three new minor issues**, none severe: the
submission confirmation heading is clipped behind the sticky header (Issue 7),
hero source images are too small for wide screens and visibly upscale (Issue
8), and body-content list links fall just under the 24 px touch-target minimum
(Issue 9).

**Priorities before launch** remain the two High items: the **logo preloading
waste** — now confirmed in-browser as two separate preloads, one for an element
that renders at 0x0 — and the **wrong brand name on four pages**. After those,
Issues 7 and 8 are the most worthwhile, because they affect the two highest-value
moments on the site: the hero and the confirmation screen.

**Remaining conditions on this verdict** — genuinely untestable here:

1. **Real iOS Safari and Android Chrome.** Chromium was the only engine available. The iPad-Safari fixed-background behaviour between 768-1024 px is the single highest-value manual spot-check.
2. **Lighthouse / field Core Web Vitals.** The LCP numbers above come from a local server and are a floor, not a field measurement.
3. **A real screen reader.** ARIA was verified structurally and by live-region presence, not by listening.
4. **Production environment variables** — confirm `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL` and the fallback phone values are real, not the `.env.example` placeholders (`example-referral-brand.com`, `(803) 555-0123`).
5. **Human judgement on photo selection** and whether the flow feels intuitive to real visitors.

With the two High-priority items fixed and the above spot-checked, this site is
ready for production.
