# Site review — 2026-10-07

Reviewed against a clean production build (`npm ci && npm run build && npm start`)
on `e8f2ec8`. Every finding below was measured on that build; anything I could not
verify is listed in §5 rather than guessed at.

**Verdict:** the site is healthy and both P1/P2 defects from the 2026-10-05 review
are fixed. What remains is one P2 (JS budget still breached, still unenforced) and
a set of known pre-launch items, most of which need dashboard/env action rather
than code. No new defects found this round.

Status of the 2026-10-05 findings:

| # | Finding | Status |
|---|---|---|
| P1 §1 | Combo titles/descs over-length + wrong hardcoded brand | ✅ **Fixed** — 55–59 / 142–146, no hardcoded brand in `src/` |
| P2 §2 | `Organization`/`WebSite` nodes emitted twice per page | ✅ **Fixed** — defined once in layout, page graphs reference by `@id` |
| P2 §3 | JS budget breached (131 vs 120 kB), stale docs, no gate | ❌ **Still open** — 131 kB, README says 130, no CI gate |
| P3 | `/locations` thin | ❌ **Still open** — thinnest indexable page by far |
| P3 | Missing HSTS / fuller CSP | ❌ **Still open** |
| P3 | Sandbox CSP wildcard `*.e2b.app` | ❌ **Still present** (documented launch task) |
| P3 | Rate limiter counts rejected requests | ❌ **Still open** (verified in code) |
| P3 | Env placeholders (domain, 555 number) | ❌ **Still open** (deployment step) |
| §5 | No browser-based checks in sandbox | ❌ **Still unverified** (same sandbox limitation) |

---

## 1 — P2: the JS budget is still breached and still unenforced

Clean-build numbers, unchanged from the last review:

```
/                                   131 kB
/contact                            131 kB
/locations/[city]                   131 kB
/locations/[city]/[service]         131 kB
/services/[service]                 131 kB
+ First Load JS shared by all       103 kB
```

131 kB against the stated 120 kB budget — 11 kB over on the five form-bearing
templates. The docs situation improved halfway and then stopped: `README.md:41`
now says 130 kB (actual 131 — stale by 1 kB the moment it was written) and
`REMAINING-WORK.md:104` still says *"Only one combination page publishes"* when
four have published for two review cycles. Nothing in CI enforces the budget, so
`npm run verify` will never catch the next regression either.

Either raise the budget to 135 kB deliberately (the documented overage is the
quote form itself, the primary conversion path — it cannot be cut to fit 120)
and add a build gate that fails above it, or accept the drift. The current state
— a budget that exists only as prose, wrong by 1 kB — is the worst of both.

## 2 — P3: `/locations` is still the weakest indexable page

~140 words of main content and a single H2, against 1,100+ words and 8–9 H2s on
every sibling. The copy it has is honest ("One service area today… only after
coverage, content, and compliance gates pass"), so this is a depth problem, not a
quality problem. As the entry point for the location hierarchy it remains
underbuilt. Options unchanged: extend it with a real coverage explanation, or
`noindex` it to pure navigation.

## 3 — P3: smaller items, all carried forward

- **Security headers.** Responses carry `X-Content-Type-Options`, `Referrer-Policy`
  and a CSP that sets *only* `frame-ancestors`. No `Strict-Transport-Security`,
  no `default-src`/`script-src`, no `Permissions-Policy`. HSTS remains the
  straightforward pre-launch win.
- **Sandbox CSP wildcard still present** — `frame-ancestors 'self' https://*.e2b.app`
  (`next.config.ts`). Tracked in `REMAINING-WORK.md` §5; tighten to `'self'` at launch.
- **Rate limiting counts rejected requests** (`src/app/api/leads/route.ts:51` runs
  before validation). Eight fumbled submissions in a minute locks the user out with
  a bare `{"error":"rate_limited"}`. Count only accepted submissions, or return a
  friendlier message with `Retry-After`.
- **Env placeholders remain** (`example-referral-brand.com`, `(803) 555-0123`,
  `hello@example-referral-brand.com`). They poison every canonical, `@id` and
  sitemap entry. Deployment step, still the largest launch blocker.
- **`dev-only-*` webhook/hash secrets** still in place (`CALL_WEBHOOK_SECRET`,
  `PARTNER_WEBHOOK_SECRET`, `LEAD_HASH_SECRET`). Regenerate before real traffic.
- **Cosmetic:** page-level `@id`s omit the trailing slash the root nodes use
  (`https://…com#webpage` vs `https://…com/#organization`). Harmless — fragment IDs
  only need uniqueness and stability — but worth normalising if the schema file is
  touched again.
- **Dev-experience papercut:** a fresh clone fails `npm test` (`schema.test.ts`
  throws on missing env) until `.env.example` is copied to `.env.local`. The README
  documents the copy step, so this is a one-line setup note, not a bug — but a
  `.env.test` committed with fixture values, or a clearer error, would remove the trap.

## 4 — Verified fixed since the last review

- **Combo SEO (§1 of last review).** All four `/locations/lancaster-sc/*` pages now
  measure 55–59 char titles / 142–146 char descs, unique site-wide, no brand
  hardcoding anywhere in `src/`. `comboMeta` builds titles as
  `{city}, SC {serviceName} | Local Provider Referrals`.
- **Schema duplication (§2 of last review).** Verified node-by-node from rendered
  HTML: `Organization` + `WebSite` are defined exactly once (layout block 0); page
  graphs contain only `WebPage`/`Service`/`BreadcrumbList`/`FAQPage` nodes that
  *reference* the root entities by `@id`. The earlier duplication report would still
  trip a naive `@id`-counting check — references repeat by design — so the check
  must distinguish definition (`@type` present) from reference.

## 5 — What I could not verify

No browser in this sandbox (`~/.cache/ms-playwright` empty, and `cdn.playwright.dev`
is outside the egress allowlist so Chromium cannot be installed). The 3 Playwright
spec files, visual/responsive layout, colour contrast, focus-visible styling, and the
consent-banner behaviour are all unconfirmed by me. This is the same blind spot as
the last two reviews, and it remains the biggest untested surface. Getting a browser
into CI is still the highest-value process change.

## 6 — Verified healthy

Measured this round, all passing:

- **Gates** — `typecheck` clean, **36/36 unit tests** (after `.env.local` setup),
  `assert:routes` (4/1/4), `assert:geos`, `assert:content` (4 combos),
  `assert:schema` (8 graphs), `build` all green.
- **Routing** — all 17 sitemap URLs 200; `/nonexistent-page`, `/locations/indian-land-sc`,
  `/services/foundation-repair` correctly 404; **20 unique internal links, zero broken**.
- **Lead pipeline** — valid in-area → `202 {"leadId":"lead_…","state":"routed"}`;
  same `Idempotency-Key` replay → same ID + `"replay":true`; ZIP 90210 →
  `422 no_coverage, "Nothing was sent."`; short key → `400`; `GET /api/tracking-number` → `405`.
- **On-page SEO** — one H1 on all 18 pages, all titles 41–60 / descs 97–154 and unique,
  no heading skips, every `<img>` has alt, canonicals self-referential, `og:image` present.
- **Schema** — valid JSON-LD on every page, `Organization`/`OnlineBusiness` root
  (no `LocalBusiness`/`GeneralContractor`/rating/address claims), all FAQ entries
  verified present as visible text.
- **Accessibility basics** — `<html lang="en-US">`, working skip link, `<main id="main">`
  landmark, labelled form controls, disclosure copy on every page including `/thank-you`.
- **Indexation hygiene** — `/thank-you` is `noindex, nofollow` and absent from the
  sitemap (17 URLs); `robots.txt` disallows `/api/`.
- **Images** — 3.1 MB total across 39 WebP files, none over 100 kB.
- **Dependencies** — Next.js 15.5.27 (patched for CVE-2025-66478).

## Recommended order

1. Decide the real JS budget (135 kB), add a CI gate, fix the two stale doc lines (§1).
2. Extend `/locations` or `noindex` it (§2).
3. Add HSTS + tighten CSP as part of the launch checklist (§3).
4. Stop the rate limiter counting rejected requests (§3).
5. Get a browser into CI so §5 stops being a blind spot.
6. Launch-blocker dashboard work (unchanged): real domain in `NEXT_PUBLIC_SITE_URL`,
   real phone/email, Deployment Protection off, secrets rotated.
