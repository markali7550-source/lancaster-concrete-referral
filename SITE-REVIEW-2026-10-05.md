# Site review — 2026-10-05

Reviewed against a clean production build (`rm -rf .next && npm run build && npm start`),
not the dev server. Every finding below was reproduced on that build; anything I could not
verify is listed in §5 rather than guessed at.

**Verdict:** the site is structurally healthy — all gates pass, no broken links, the lead
pipeline behaves correctly end to end. There is **one P1 SEO regression** affecting the
four newly-published combination pages, plus two P2 items worth fixing before launch.

---

## 1 — P1: combination page titles and descriptions overflow, and use the wrong brand

Since the last review the three gated combo pages were published, so `/locations/lancaster-sc/*`
is now four pages instead of one. All four exceed SERP limits:

| Page | Title | Desc |
|---|---|---|
| `/locations/lancaster-sc/concrete-driveways` | **75** | **174** |
| `/locations/lancaster-sc/concrete-patios` | **72** | **171** |
| `/locations/lancaster-sc/concrete-slabs` | **71** | **170** |
| `/locations/lancaster-sc/concrete-repair` | **72** | **170** |

Every other page on the site is 41–60 / 97–154. These four are the only outliers, and they
are 24% of the indexable set.

The cause is `comboMeta` in `src/lib/seo/metadata.ts:54`:

```ts
title: (serviceName: string, city: string) =>
  `${serviceName} Referrals in ${city}, SC | Lancaster Concrete Referral`,
```

Two separate problems in that one line:

**a) The brand is hardcoded, and it is the wrong brand.** This is the *only* hardcoded brand
string in `src/` — everywhere else reads `site.brand` from `NEXT_PUBLIC_BRAND_NAME`, which is
`Lancaster Concrete Connect`. So these four pages advertise "Lancaster Concrete **Referral**"
in the SERP while the rest of the site, the logo alt text and the `Organization` schema all say
"Lancaster Concrete **Connect**". Renaming the brand via env would silently miss these pages.

**b) The suffix pattern is inconsistent with the rest of the site.** Other pages use a short
descriptive suffix, not the brand:

```
/services/concrete-driveways   Concrete Driveways in Lancaster, SC | Contractor Referrals   (58)
/locations/lancaster-sc        Concrete Contractors in Lancaster, SC | Referral Service     (56)
/locations/.../concrete-driveways  ... | Lancaster Concrete Referral                        (75)
```

Dropping the suffix entirely gives `Concrete Driveways Referrals in Lancaster, SC` = 45 chars,
which fits and matches the house style. The description needs ~20 characters trimmed.

---

## 2 — P2: `Organization` and `WebSite` schema nodes are emitted twice on every page

`src/app/layout.tsx:37` emits `rootGraph()` (Organization + WebSite) into every page, and each
page component *also* emits a graph that re-defines those same two nodes:

```
/                        blocks: 2
  DUP  .../#organization   defined in block 0 AND block 1
  DUP  .../#website        defined in block 0 AND block 1
  ok   ...#webpage
  ok   ...#faq
```

Same on `/services`, `/contact`, `/locations/lancaster-sc` — it is site-wide. Google will
generally reconcile duplicate `@id` nodes, so this is not breaking rich results, but it is
redundant bytes on every page and a correctness smell: if the two definitions ever drift,
the resolved entity is undefined behaviour. Page graphs should reference
`{ "@id": ".../#organization" }` rather than redefining the node.

Minor related inconsistency: the page-level `@id`s omit the trailing slash that the root nodes
use — `https://example-referral-brand.com#webpage` vs `https://example-referral-brand.com/#organization`.
Worth normalising while you're in there.

`npm run assert:schema` passes (8 graphs) because it checks parity, not node uniqueness.

---

## 3 — P2: the JS budget is breached and the docs are stale

`README.md:41` claims *"First Load JS: 116 kB on landing pages (budget 120 kB)"* and the
scorecard at line 51 shows ✅ 116 kB. The actual clean build:

```
/                                   131 kB
/contact                            131 kB
/locations/[city]                   131 kB
/locations/[city]/[service]         131 kB
/services/[service]                 131 kB
+ First Load JS shared by all       103 kB
```

131 kB against a stated 120 kB budget — **11 kB over, on all five heaviest templates**, and the
shared chunk grew from 102 to 103 kB. Nothing in CI enforces this; the budget exists only as a
claim in the README, which is why it drifted unnoticed. Either raise the budget deliberately or
add a gate — right now `npm run verify` will never catch a regression here.

`REMAINING-WORK.md:84` repeats the same stale 116 kB figure, and §4 still says *"Only one
combination page publishes"* when four now do.

---

## 4 — P3: smaller items

- **`/locations` is still thin** — 308 words and a single H2. Better than the 185 words at the
  last review, but it is the weakest indexable page by a wide margin (next thinnest is `/terms`
  at 346, and that's a legal page). As the entry point for the location hierarchy it is
  underbuilt.
- **Missing production security headers.** Responses carry `X-Content-Type-Options`,
  `Referrer-Policy` and a `Content-Security-Policy` — but that CSP sets *only* `frame-ancestors`.
  There is no `default-src`/`script-src`, no `Strict-Transport-Security`, and no
  `Permissions-Policy`. HSTS in particular is a straightforward win before a public launch.
- **The sandbox CSP wildcard is still present** — `frame-ancestors 'self' https://*.e2b.app`.
  Already tracked in `REMAINING-WORK.md` §5; flagging that it is still there.
- **Rate limiting counts rejected requests.** `/api/leads` allows 8/min per IP and increments on
  validation failures too, so a user who fumbles the form eight times is locked out for a minute
  with a bare `{"error":"rate_limited"}`. Worth only counting successful submissions, or at least
  returning a friendlier message.
- **Env placeholders remain** (`example-referral-brand.com`, `+18035550123`). Already documented
  as a launch blocker; they still poison every canonical, `@id` and sitemap entry.

---

## 5 — What I could not verify

Chromium could not be installed in this sandbox (`cdn.playwright.dev` connection reset, and
`fonts-freefont-ttf` is unavailable to `--with-deps`). So **no browser-based checks ran**:
the 19 Playwright specs, visual/responsive layout, colour contrast, focus-visible styling, and
the consent-banner focus trap are all unconfirmed by me this round. The previously-reported
consent-banner overlap is marked fixed in `SITE-REVIEW.md` but I could not independently confirm
it. These remain the biggest untested surface, consistent with `REMAINING-WORK.md` §3.1.

One note on process: an earlier pass of this review reported nine pages returning 500. That was
**my own fault** — I ran `npm run build` against the `.next` directory while the dev server was
live, which wiped its vendor chunks. A clean rebuild shows all routes healthy. Disregard that if
you saw it in the session log.

---

## 6 — Verified healthy

Measured this round, all passing:

- **Routing** — all 17 sitemap URLs return 200; `/nonexistent-page` correctly 404s; 20 unique
  internal links crawled across 18 pages with **zero broken links**.
- **Gates** — `typecheck` clean, **29/29 unit tests**, `assert:routes` (4 services / 1 location /
  4 combos), `assert:geos` (no excluded Phase 2 geography), `assert:content` (4 combos pass
  uniqueness), `assert:schema` (8 graphs), `build` all green.
- **Lead pipeline** — behaves exactly as specified:
  - valid in-area submission → `202 {"leadId":"lead_…","state":"routed"}`
  - same `Idempotency-Key` replayed → `202` with the *same* leadId and `"replay":true`
  - out-of-area ZIP 90210 → `422 no_coverage`, *"Nothing was sent."*
  - missing/short idempotency key → `400`, oversized payload → `413`, rate limit → `429`
- **On-page SEO** — exactly one H1 on all 18 pages, all titles and descriptions unique, no
  heading-level skips anywhere (the `/contact` skip from the last review is fixed), every
  content image has alt text, decorative images correctly `alt="" aria-hidden="true"`.
- **Accessibility basics** — `<html lang="en-US">`, a working "Skip to content" link, a `<main id="main">`
  landmark, all form controls labelled (radios via implicit `<label>` wrapping, select/inputs via
  `htmlFor`), `aria-invalid` wired to validation state, icon-only buttons carry `aria-label`.
- **Compliance** — "referral service" / "not a contractor" disclosure language appears on every
  page checked, including `/thank-you`.
- **Indexation hygiene** — `/thank-you` is `noindex, nofollow` and correctly absent from the
  sitemap; `robots.txt` disallows `/api/`.
- **Images** — 5.1 MB total, largest single asset 97 kB, all WebP. Not the problem the earlier
  report suspected.

---

## Recommended order

1. Fix `comboMeta` title/description — one function, four pages, biggest SEO impact (§1).
2. Stop re-defining `Organization`/`WebSite` in page graphs (§2).
3. Decide the real JS budget and add a CI gate so it stops drifting; refresh the README and
   `REMAINING-WORK.md` numbers (§3).
4. Add HSTS + a fuller CSP as part of the launch checklist (§4).
5. Get a browser into CI so §5 stops being a blind spot.
