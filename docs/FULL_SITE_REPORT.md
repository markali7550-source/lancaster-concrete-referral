# Full Site Audit and Launch Readiness Report

- **Project:** Lancaster Concrete Connect (`lancaster-concrete`)
- **Branch:** `arena/ca9fd23a-lancaster-concrete-referral`
- **Commit audited:** `1408a08`
- **Date:** 2026-10-15
- **Scope:** code, build, tests, responsive layout, content and contact data, assets, performance, security, SEO, and the lead intake pipeline.
- **Method:** read-only. No styles, layouts, colors, fonts, or components were changed. The only file added is this report.
- **Environment:** production build (`next build`) served with `next start` on port 3100, and headless Chromium for layout and link checks. Tests ran against the source code.

---

## 1. Executive Summary and Overall Score

### Scores (out of 100)

| Area | Score | Basis |
|---|---:|---|
| Code health | 95 | Typecheck, lint, 42/42 tests, build, and route and schema assertions all pass. Three production dependency findings remain. |
| Security | 60 | A webhook secret fallback is public, so forged webhook events are accepted when the env var is unset. The CSP is partial. Lead storage is in memory. |
| SEO and metadata | 75 | All 39 pages have a title, a description, one H1, and a canonical tag. Sitemap and robots are correct. Canonicals point at a placeholder domain. |
| Responsive UX | 92 | No page overflows horizontally at 320px to 1280px. The only overflow is inside intentional scroll containers. |
| Content and contact accuracy | 50 | The phone, email, and domain are still placeholders. Some copy still uses "matched" wording. Legal review is pending. |
| Assets and performance | 90 | 472 asset references across 39 pages all return 200. 61 of 62 WebP files are within budget. First Load JS is 103 to 118 kB. |
| **Launch readiness (weighted)** | **74** | Weights: code 20%, security 20%, content and legal 20%, SEO 15%, UX 15%, assets 10%. |

The launch readiness score is a weighted judgment, not a published standard. The weighted total is 74 out of 100, but **the site is not ready for live traffic.** Four P0 items block launch (section 7).

### Production-ready

- Build, typecheck, lint, tests, and route, geography, content, and schema assertions all pass.
- The layout holds at every tested width from 320px through 1280px, with no page-level horizontal scroll.
- Every image reference resolves. The image formats are WebP, and the file sizes are within budget apart from one approved exception.
- SEO basics are in place on every page: titles, descriptions, canonicals, a sitemap with 38 URLs, and a robots file that blocks `/api/`.
- The contact form accepts submissions, validates input, and returns the correct status codes. Tests cover the failure paths.
- Hardening headers are present: HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, and `Permissions-Policy`.
- Inline text links, buttons, and FAQ accordions follow the brand accent and meet contrast requirements.

### Requires action before live traffic

- Replace the placeholder domain, phone, and email with production values.
- Make the webhook endpoints refuse to run without real secrets in production.
- Set up durable lead storage and delivery. Leads currently live in process memory.
- Complete legal review and remove "matched" wording that conflicts with the disclosure approach.

---

## 2. Build, Code Health, and Tests

| Check | Command | Result |
|---|---|---|
| TypeScript | `npm run typecheck` | **Pass.** 0 errors. |
| ESLint | `npm run lint` | **Pass.** No warnings or errors. |
| Unit and integration tests | `npm run test` | **Pass.** 6 files, 42 of 42 tests. Covers webhooks, routing, typography, lead submission, schema, and attribution. |
| Route assertions | `npm run assert:routes` | **Pass.** 14 services, 1 location, 14 combinations. |
| Excluded geography | `npm run assert:geos` | **Pass.** No excluded geography in output. |
| Content uniqueness | `npm run assert:content` | **Pass.** 14 combination pages pass the uniqueness gate. |
| Schema parity | `npm run assert:schema` | **Pass.** 28 page graphs pass schema parity. |
| Production build | `next build` (inside `verify`) | **Pass.** Compiled, and 45 of 45 static pages generated. |
| Full pipeline | `npm run verify` | **Pass.** Exit 0. |

### Route bundle sizes (production build)

| Route type | Size | First Load JS |
|---|---:|---:|
| Home `/` | 127 B | 118 kB |
| Contact `/contact` | 127 B | 118 kB |
| Service pages `/services/[service]` | 127 B | 118 kB |
| Location pages `/locations/[city]/[service]` | 127 B | 118 kB |
| FAQ, How it works, Privacy, Terms, Services index | 2.01 kB | 113 kB |
| Thank-you `/thank-you` | 164 B | 106 kB |
| Shared by all routes | | 103 kB |

There is no written JavaScript budget. The largest critical route is 118 kB, which is reasonable for this kind of site. A budget of 120 kB for critical routes would make regressions visible.

### Dependency vulnerabilities (`npm audit`)

| Scope | Info | Low | Moderate | High | Critical | Total |
|---|---:|---:|---:|---:|---:|---:|
| Production | 0 | 0 | 1 | 2 | 0 | 3 |
| All (including dev) | 0 | 1 | 12 | 30 | 3 | 46 |

Production findings:

- `next` (moderate). The fix is `next@16.4.2`, a major version upgrade from the installed `15.5.27`.
- `postcss` (high). Also fixed by `next@16.4.2`.
- `source-map-js` (high). A fix is available.

The development-only findings are in build and test tooling and do not ship to visitors. They should still be cleared before the next dependency update. Upgrading `next` is a breaking change, so it needs a separate branch with a full test pass and visual check.

---

## 3. Responsive Layout, Interaction, and Theme Verification

No design edits were made for this section. This is a verification pass.

### Responsive coverage

- **Method:** headless Chromium loaded all 39 pages at 320, 375, 414, 640, 768, 1024, and 1280px. For each page it measured whether the document is wider than the viewport, and whether any element extends past the viewport edge.
- **Result:** no page overflows horizontally at any width. `scrollWidth` equals the viewport width on every page.
- **Earlier fixes:** the contact page at 320px had a column that grew wider than the screen. That is fixed by giving stacked grids a single base column. See the earlier responsive pass.
- **Remaining flagged elements:** these are intentional horizontal scroll containers. They are the service sub-navigation pills on location pages, and the comparison tables on `/services`. Their overflow stays inside their own scroll wrappers and does not move the page. Both are reachable by swipe.
- **Touch targets:** no buttons, summaries, inputs, or selects under 44px were found on the mobile pages checked.
- **Clipping:** no visible text is clipped by an `overflow: hidden` container. The only clipped nodes are screen-reader-only text, which is hidden by design.

| Width | Page overflow | Notes |
|---|---|---|
| 320px to 414px | None | Scroll strips and one table scroll inside their wrappers. |
| 640px to 768px | None | Scroll strips and tables scroll inside their wrappers. |
| 1024px and 1280px | None | No flagged elements. |

### Accordions and navigation

- **FAQ accordion:** checked at 375px. The first question opens to a panel of 166 px, the long question wraps inside the card, and the answer stays within the viewport.
- **Mobile menu:** opens at 375px. Panel width is 272 px, which fits the screen. It scrolls internally and closes on route change.
- **Desktop navigation:** the services dropdown and header links render at 1280px without overlap.

### Forms and quote flows

- The site has **no modal**. The quote flow is an inline form on the contact page and on the home, service, and location pages, anchored at `#quote-form`.
- **Inputs:** text inputs, selects, and textareas are 16px. This prevents iOS Safari from zooming on focus.
- **Buttons:** primary buttons are 52px tall. Form buttons go full width on mobile.
- **Submission:** covered by automated tests. Success, validation, and rate-limit responses are tested. Live email delivery is not tested, because the email provider's API host is not reachable from the audit sandbox.

### Theme: links, hover, focus, and contrast

- **Inline text links** in paragraphs, definitions, table cells, and quotes use the brand accent. Light mode uses `#0b6b45` and dark mode uses `#3fc98a`. Inside dark bands and the footer, the mint band accent `#4ed29a` applies.
- **Hover:** inline links darken to `--color-accent-hover`, and the underline strengthens.
- **Focus:** a global 2px focus outline applies to all links and controls.
- **Contrast:** accent link text measures above 4.5:1 against its background in both themes. The accent-on-paper and accent-on-navy pairs are both above the WCAG AA threshold for body text.
- **Buttons and CTAs** keep their own styles and are not changed by the link rule.
- **Known measurement limit:** breadcrumbs over hero photos can't be measured automatically, because the photo is the background. A screenshot confirms they are readable on the dark photo overlay.

---

## 4. Content, Branding, and Local Accuracy

### Contact details

Business identity is defined once, in `src/config/site.ts`. The header, footer, schema, and copy read from that file through `src/lib/env`. Every contact value in the rendered site comes from this single source.

| Field | Value | Status |
|---|---|---|
| Phone | `(803) 555-0123` / `+18035550123` | **Placeholder.** 555-01xx numbers are reserved for fiction. |
| Email | `contact@lancasterconcreteconnect.com` | **Placeholder mailbox**, flagged in the config comments. |
| Domain | `https://lancaster-concrete-one.vercel.app` | **Placeholder.** Used for canonicals, sitemap, robots, and schema. |
| Service area | Lancaster, SC | Consistent across pages. Street address and ZIP are intentionally empty, which matches the stated no-public-address policy. |

### Placeholder and dummy text

- No visible page copy contains `555-0123` outside of the config value. The phone appears in the header, footer, and contact page only through `site.phoneDisplay`.
- `DEPLOY-GUIDE.md` lists a fallback phone of `(803) 555-1234`, and `.env.example` and `site.ts` use `555-0123`. This drift is documented in `docs/AUDIT.md` item 13 and should be corrected.
- No `lorem ipsum`, `TODO`, `FIXME`, or `example.com` strings were found in visible copy.
- The Required Disclosure label on How It Works now uses the primary ink color for readability (commit `1408a08`).

### Legal and compliance copy

- **Call disclosure:** `CALL_DISCLOSURE` in `src/lib/seo/disclosure.ts` is shown on the contact page and in the call flow.
- **Service disclosure:** `/service-disclosure` is present and is linked from the home page FAQ and from the footer.
- **Privacy and terms:** `/privacy` and `/terms` are present and linked.
- **Thank-you page:** states that pricing and the contract are between the homeowner and the contractor. It avoids "24 hrs" response claims and "Free estimate" claims. Both were reworded in an earlier pass.
- **Wording to review:** some copy still says requests are "matched" to providers. Examples are on the location pages and in one thank-you line. Because the earlier audit asked for this language to be removed, these lines should go through legal review before launch.
- **Pending:** legal review of the full legal set is still outstanding.

### FAQ

- All FAQ answers render with the correct link text. Inline links in answers use the brand accent.
- The FAQ accordion uses real buttons with `aria-expanded` and `aria-controls`. Closed panels are `inert`.

---

## 5. Assets and Performance

### Image audit

| Check | Result |
|---|---|
| Formats in `public/` | 62 WebP files. No JPEG, PNG, or AVIF originals are in `public/`. |
| Budget (under 150 KB) | 61 of 62 files are within budget. One exception: `lancaster-sc-driveways.webp` at 159,506 bytes. The owner approved this file over the cap. |
| Sealing hero | `sealing.jpg` is 612×344. The owner accepted the lower resolution. |
| Services hero | Owner-supplied upload, 612×408, 98,108 bytes. Kept at native size. |
| Broken references | **None.** 472 asset references across 39 pages all return 200. |
| Missing files | **None.** Every `/images/...` path in source resolves to a file. |
| Unreferenced files | `public/images/home/home-service-area.webp` is not referenced by any code. It can be removed in a cleanup pass. |
| AVIF | Configured in `next.config.ts` for `next/image`, which serves AVIF or WebP by negotiation. Six components use `next/image`. Static images in `public/` are WebP only. |

### Image cache headers

WebP files are served with `Cache-Control: public, max-age=31536000, immutable`. This is correct for content-hashed or versioned assets. Replacing an image under the same filename will be cached for up to a year, so use a new filename when replacing an image.

### Page caching

Prerendered HTML is served with `s-maxage=31536000`. This is standard for statically generated Next.js pages on Vercel, where each deploy purges the cache. It is not a problem as long as content changes ship through a deploy.

### Bundle and JavaScript

- Critical routes sit at 118 kB First Load JS. The shared chunk is 103 kB.
- There is no written JavaScript budget. Adding a 120 kB budget for critical routes would make regressions visible in CI.

---

## 6. Security, SEO, and Lead Intake

### Lead intake pipeline

| Area | Status | Notes |
|---|---|---|
| Form submission | Working | `POST /api/leads` returns 202 for accepted leads, 422 for validation failures, 413 for oversized bodies, 429 when rate limited, and 405 for other methods. |
| Input validation | Working | Zod schemas on every endpoint. Tested. |
| Rate limiting | Working, with a known limit | Keys come from `x-vercel-forwarded-for` or `x-real-ip`. Clients with no IP header share one bucket at 8 requests per minute. Shared-network users, or previews without these headers, can get false 429 responses. |
| Storage | **Not durable** | Leads are stored in a process-memory `Map`. Data is lost on restart and is not shared between instances. This is a launch blocker. |
| Delivery | **Not wired** | No email, CRM, or queue delivery is connected. Live email delivery was not testable from the sandbox. |
| Duplicate detection | Working within one instance | Uses `LEAD_HASH_SECRET`. |
| `LEAD_HASH_SECRET` fallback | Working | In production, a missing secret falls back to a random per-process secret and logs a warning. It no longer throws, so customer submissions are not blocked. Duplicate detection then only holds within one instance. |

### Webhooks (**P0 security finding**)

- The call webhook (`/api/webhooks/calls`) and the partner webhook (`/api/webhooks/partners`) verify an HMAC-SHA256 signature over the timestamp and body.
- **The secret falls back to a public string.** The call webhook uses `process.env.CALL_WEBHOOK_SECRET ?? "dev-only-call-secret"`, and the partner webhook uses `"dev-only-partner-secret"`. Neither fallback checks `NODE_ENV`.
- **Verified in this audit:** a signature computed with the public default secret is accepted by the verifier. If either environment variable is missing in production, anyone who knows the default string can send forged call or partner events.
- **Unsigned requests** are correctly rejected with 401.
- The deploy guide lists both secrets, so this is a misconfiguration risk rather than a flaw in the signing code. The fix is to refuse to start, or to return 503, when the secret is unset in production.

### Security headers and CSP

Live response headers on `/`:

| Header | Value | Status |
|---|---|---|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | Present |
| `X-Content-Type-Options` | `nosniff` | Present |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Present |
| `X-Frame-Options` | `SAMEORIGIN` | Present |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=()` | Present |
| `Content-Security-Policy` | `frame-ancestors 'self'` | **Partial.** Covers framing only. No `script-src`, `style-src`, `img-src`, or `default-src`. |

A full CSP needs nonces or hashes for Next.js inline scripts, and it needs to allow the consent and analytics hosts. This is a P1 item.

### SEO metadata

Checked on all 39 pages:

- **Titles:** present on every page and 60 characters or fewer.
- **Meta descriptions:** present on every page. Lengths run from 114 to 162 characters. One page, `/service-disclosure`, is 162 characters, slightly over the 160 guideline.
- **H1:** exactly one per page.
- **Canonical links:** present on every page. **All canonicals use the placeholder domain.** This must be fixed with `NEXT_PUBLIC_SITE_URL` before launch.
- **Robots meta:** `index, follow` on 38 pages. `noindex, nofollow` on `/thank-you`, which is intentional.
- **`DEMO_NOINDEX`:** set to `false` in `src/lib/seo/metadata.ts`. Any preview or staging deployment would therefore be indexable. Preview deployments should set `noindex`.
- **Sitemap (`/sitemap.xml`):** 38 URLs, all on the placeholder domain.
- **Robots (`/robots.txt`):** `Allow: /`, `Disallow: /api/`, and a `Sitemap:` line. Correct once the domain is updated.
- **Structured data:** schema parity checked by `assert:schema`. 28 page graphs pass.
- **Redirects:** `/concrete-driveways`, `/concrete-patios`, `/lancaster`, and `/referral-disclosure` return 301 to their current routes.

---

## 7. Prioritized Launch Checklist

### P0: Launch blockers

1. **Set production identity.** Set `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_FALLBACK_PHONE_E164`, `NEXT_PUBLIC_FALLBACK_PHONE_DISPLAY`, and `NEXT_PUBLIC_CONTACT_EMAIL` to real values. Every canonical, sitemap entry, robots line, schema node, and visible phone or email depends on these.
2. **Remove the public webhook secret fallbacks.** Make `/api/webhooks/calls` and `/api/webhooks/partners` return 503 when `CALL_WEBHOOK_SECRET` or `PARTNER_WEBHOOK_SECRET` is unset in production. Set both secrets in the hosting environment. Verified in this audit: a signature made with the public default is accepted.
3. **Make lead storage durable.** The in-memory `Map` loses leads on restart and does not share them across instances. Replace it with a database or another durable store before any paid traffic.
4. **Wire lead delivery.** Connect leads to email or CRM delivery so they reach a person. Test delivery against the live provider, since the sandbox cannot reach it.

### P1: High priority (before or shortly after launch)

5. **Complete legal review.** Get sign-off on the privacy, terms, service disclosure, and call disclosure. Remove or reword "matched" language on the location pages and in the thank-you copy.
6. **Clear production dependency vulnerabilities.** `next` (moderate) and `postcss` (high) are fixed by `next@16.4.2`, a major upgrade. Upgrade on a separate branch with a full test pass and visual check. Fix `source-map-js` (high) at the same time.
7. **Add a full Content Security Policy.** Replace the `frame-ancestors`-only header with a policy that covers scripts, styles, images, and connections. Use nonces or hashes for Next.js inline scripts.
8. **Set `noindex` on non-production hosts.** `DEMO_NOINDEX` is `false`. Preview and staging deployments must send `noindex`, or they will be indexed.
9. **Fix the rate limiter's shared bucket.** Unidentified clients share one 8-per-minute bucket. Use a more specific fallback key, or raise the limit for requests without an IP header, so shared networks are not blocked.
10. **Correct the deploy guide fallback phone.** `DEPLOY-GUIDE.md` lists `(803) 555-1234`, but the site uses `555-0123`. Make these match once the real number is set.

### P2: Nice to have (post-launch)

11. Remove `public/images/home/home-service-area.webp`, which nothing references.
12. Add a written JavaScript budget (for example, 120 kB First Load JS on critical routes) and check it in CI.
13. Shorten the `/service-disclosure` meta description to 160 characters or fewer.
14. Replace the low-resolution sealing hero (612×344) and the services hero (612×408) with larger originals when available.
15. Review the 159 KB Lancaster driveways image, which is over the 150 KB budget. It is an approved exception, but a smaller version would help mobile load time.
16. Make the mobile scroll strips on location pages and the `/services` comparison tables more discoverable. Keep the scroll behavior and the visual design unchanged.
17. Confirm the "Coverage today" text color after launch in both themes. It was fixed in commit `76d01ad`.

---

## Verification limits

- Live email, CRM, and webhook delivery could not be tested. Those hosts are not reachable from the audit sandbox.
- Testing used headless Chromium, not physical phones or tablets.
- Page weight was measured from the production build, not from a field test.
- The health scores are a judgment-based rubric applied to the measurements above.
- Nothing in the site was changed. The only file added is `docs/FULL_SITE_REPORT.md`.
