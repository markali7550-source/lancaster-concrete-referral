# Site wide SEO, content and responsive audit

18 routes audited against all 15 checkpoints at 390, 768 and 1440 px. Design,
branding, palette, typography and page structure unchanged.

## 5. Paragraph length (the hard requirement)

Every text block on the site measured (`p`, `li`, `dd`, `td`, `blockquote`).

| Words per block | Blocks |
|---|---|
| 1 to 20 | 1,357 |
| 21 to 40 | 283 |
| 41 to 60 | 40 |
| 61 to 80 | 0 |
| 81 to 90 | 0 |
| **91 or more** | **0** |

**1,680 blocks. The longest paragraph on the entire website is 60 words.**

The only two blocks that had been over 60 were the mandated legal disclosure
(76 words) on `/how-it-works` and `/referral-disclosure`. The words are legally
fixed, so instead of rewriting it the rendering now splits it at a sentence
boundary into two paragraphs of 37 and 39 words. The text is still verbatim,
sliced from the same constant.

## Defects found and fixed this pass

| # | Defect | Where | Fix |
|---|---|---|---|
| 1 | **Duplicate meta descriptions.** Each service hub shared its description word for word with its Lancaster page, 4 duplicated pairs across 8 indexable pages. | `/services/[service]` vs `/locations/lancaster-sc/[service]` | Hub descriptions rewritten to match informational intent ("what the referral covers, what falls outside it, how the request is routed"); local pages keep the transactional "Call now or request a quote" wording |
| 2 | **Broken heading from templating.** `/services/concrete-slabs` rendered "How a **slabs and pad** project usually runs" because the H2 stripped a trailing "s" from "Slabs and pads". | Services H2 | Added a `projectNoun` field per service; now "How a **slab** project usually runs" |
| 3 | **Legal disclosure was a 76 word wall.** | `/how-it-works`, `/referral-disclosure` | Split into two paragraphs, words untouched |
| 4 | **Radio inputs 16 px.** | Lead form, 11 pages | 20 px, matching the consent checkbox |
| 5 | **Breadcrumb links 20 px tall**, under the 24 px WCAG 2.5.8 minimum. | 9 pages | `-my-1 py-1` grows the hit area to 28 px with no change to the bar height |

## Checkpoint results after the fixes

**1, 4. SEO and keywords** — no stuffing. Highest term density on any substantial
page is 3.0%; service pages run 1.6 to 2.3% on their primary term. Local terms
("Lancaster", "Lancaster County", "SC") appear naturally in H1s, intros and local
sections rather than being repeated.

**2, 11. Headings** — exactly one H1 per page, zero level jumps across 18 pages, no
heading over 12 words, none empty. Every H1 carries the page's primary keyword and
location.

**3. Meta** — all 18 titles 41 to 60 characters, all descriptions 97 to 154, zero
duplicate titles, **zero duplicate descriptions**. Canonical and OpenGraph present
on every page. `lang="en-US"`.

**6, 7. Images** — 9 images on the homepage and each service page, 8 on each local
page, 4 to 5 on thin pages. Every image has a descriptive alt. Zero broken images
across 18 pages × 3 widths. All content photos use `object-fit: cover`, so no
distortion; every one has a responsive `sizes` attribute and all WebP files are
under 100 KB.

**8. Internal links** — 23 to 45 per page. Zero generic anchors, zero links without
an accessible name, zero external links missing `rel=noopener`, zero non clean URLs
(no underscores, no uppercase, no query strings).

**9, 10, 12, 13. Responsive, alignment, spacing** — zero horizontal overflow, zero
clipped text, zero overlapping sections and identical `.container-page` padding at
390, 768 and 1440. Tap targets: every button, nav link and breadcrumb clears 24 px;
the form's radio and consent inputs sit inside labels measuring 150×66 and 308×80.

**14, 15. Readability and consistency** — same section rhythm, card style, heading
scale and CTA treatment on every page; mobile centring rules unchanged.

## Indexability

| Robots | Pages |
|---|---|
| `index, follow` | 16 |
| `noindex, nofollow` | `/locations`, `/thank-you` (intentional) |

Sitemap lists the 16 indexable URLs. Structured data: `Organization` +
`OnlineBusiness` + `WebSite` sitewide, plus `WebPage`, `BreadcrumbList`, `FAQPage`
and `Service` where applicable.

## Page by page

| Page | Words | Images | Links | Schema |
|---|---|---|---|---|
| `/` | 1,190 | 9 | 34 | WebPage, FAQPage |
| `/services` | 536 | 9 | 33 | WebPage, Breadcrumb, FAQPage |
| `/services/concrete-driveways` | 2,219 | 9 | 45 | Service, WebPage, Breadcrumb, FAQPage |
| `/services/concrete-patios` | 2,124 | 9 | 45 | Service, WebPage, Breadcrumb, FAQPage |
| `/services/concrete-slabs` | 2,076 | 9 | 45 | Service, WebPage, Breadcrumb, FAQPage |
| `/services/concrete-repair` | 2,082 | 9 | 45 | Service, WebPage, Breadcrumb, FAQPage |
| `/locations` | 29 | 5 | 23 | noindex hub |
| `/locations/lancaster-sc` | 921 | 9 | 37 | WebPage, Breadcrumb, FAQPage |
| `/locations/lancaster-sc/concrete-driveways` | 1,402 | 8 | 37 | Service, WebPage, Breadcrumb, FAQPage |
| `/locations/lancaster-sc/concrete-patios` | 1,388 | 8 | 37 | Service, WebPage, Breadcrumb, FAQPage |
| `/locations/lancaster-sc/concrete-slabs` | 1,371 | 8 | 37 | Service, WebPage, Breadcrumb, FAQPage |
| `/locations/lancaster-sc/concrete-repair` | 1,350 | 8 | 37 | Service, WebPage, Breadcrumb, FAQPage |
| `/how-it-works` | 473 | 5 | 25 | WebPage, Breadcrumb |
| `/contact` | 234 | 4 | 26 | WebPage, Breadcrumb |
| `/privacy` | 276 | 4 | 27 | legal |
| `/terms` | 177 | 4 | 27 | legal |
| `/referral-disclosure` | 323 | 4 | 27 | legal |
| `/thank-you` | 131 | 4 | 24 | noindex conversion |

## Verification

TypeScript clean · vitest 29/29 · build 28 static pages · page crawler ALL PASSED ·
API suite 32/32 · content gates 4/4 · Playwright 26/26.

## Still outstanding (needs your input)

`NEXT_PUBLIC_SITE_URL` is still the placeholder `https://example-referral-brand.com`,
so every canonical, `@id` and sitemap entry points at a domain you do not own, and
Deployment Protection returns a 302 to crawlers. Until both are changed none of this
optimisation can be indexed.
