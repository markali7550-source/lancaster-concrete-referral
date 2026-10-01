# Site wide SEO, content and responsive audit

18 routes audited against all 15 checkpoints at 390, 768 and 1440 px. Design,
branding, palette and typography unchanged.

## 5. Paragraph length (the hard requirement)

Every text block measured (`p`, `li`, `dd`, `td`, `blockquote`).

| Words per block | Blocks |
|---|---|
| 1 to 20 | 1,359 |
| 21 to 40 | 285 |
| 41 to 60 | 40 |
| 61 to 80 | 0 |
| **81 or more** | **0** |

**1,684 blocks. The longest paragraph on the entire website is 60 words**, well
inside the 80 word ceiling, and 98% sit at 40 words or fewer.

## Defect found and fixed this pass

**`/locations` was a primary navigation destination that search engines were told
to ignore.** After the header link was renamed to "Service areas" it pointed at a
page carrying `noindex, nofollow`, 29 words of copy and a single bare button. That
breaks "every important page is properly indexable".

Fixed:

| | Before | After |
|---|---|---|
| Robots | `noindex, nofollow` | `index, follow` |
| In sitemap | no | yes (17 URLs) |
| H1 | "Areas We Currently Serve" | "Concrete Referral Service Areas in South Carolina" |
| Body | 29 words | 158 words, in 40 to 60 word blocks under their own H3s |
| Internal links out | 1 | 5 (city card plus all four local service pages) |

The new copy explains how an area qualifies for coverage and what happens if an
address is not covered, which is the distinct value the spec required before the
route could be indexed. The crawler fixture and sitemap expectations were updated
to match.

## Checkpoint results

**1, 4. SEO and keywords** — no stuffing anywhere. Peak term density on a
substantial page is 3.0%; service pages run 1.6 to 2.3% on their primary term.
Local terms appear naturally in H1s, intros and the local sections.

**2, 11. Headings** — exactly one H1 per page, **zero level jumps** across all 18
pages, none longer than 12 words, none empty. The card sub-headings added earlier
sit correctly as H4 under their H3.

**3. Meta** — all 18 titles 41 to 60 characters, descriptions 97 to 154.
**Zero duplicate titles, zero duplicate descriptions.** Canonical and OpenGraph on
every page.

**6, 7. Images** — every section that benefits now carries a relevant photo.
Zero broken images, zero missing alt, zero duplicate alt strings across different
files, every image above 300 px has a `sizes` attribute, all WebP under 100 KB,
all content photos `object-fit: cover` so nothing distorts.

**8. Internal links** — 23 to 45 per page. Zero generic anchors, zero links without
an accessible name, zero external links missing `rel=noopener`, zero unclean URLs.
Lancaster service cards now use local anchor text ("View driveways in Lancaster").

**9, 10, 12, 13. Responsive, alignment, spacing** — zero horizontal overflow, zero
clipped text, zero genuine overlaps, identical container padding at all three
widths. Every button, nav link and breadcrumb clears the 24 px tap minimum.

*(The sweep reports the sticky in-page nav on service pages as overlapping once
scrolled. That is what `position: sticky` does; the gap is zero at rest.)*

**14, 15. Readability and consistency** — same section rhythm, card style, heading
scale and CTA treatment on every page.

## Indexability

| Robots | Pages |
|---|---|
| `index, follow` | **17** |
| `noindex, nofollow` | `/thank-you` only (conversion page, intentional) |

Sitemap now lists 17 URLs. Structured data: `Organization` + `OnlineBusiness` +
`WebSite` sitewide, plus `WebPage`, `BreadcrumbList`, `FAQPage` and `Service`.

## Page by page

| Page | Words | Images | Links | Robots |
|---|---|---|---|---|
| `/` | 1,190 | 9 | 34 | index |
| `/services` | 536 | 9 | 33 | index |
| `/services/concrete-driveways` | 2,219 | 9 | 45 | index |
| `/services/concrete-patios` | 2,124 | 9 | 45 | index |
| `/services/concrete-slabs` | 2,076 | 9 | 45 | index |
| `/services/concrete-repair` | 2,082 | 9 | 45 | index |
| `/locations` | **158** | 5 | **27** | **index** |
| `/locations/lancaster-sc` | 921 | 9 | 37 | index |
| `/locations/lancaster-sc/concrete-driveways` | 1,402 | 9 | 37 | index |
| `/locations/lancaster-sc/concrete-patios` | 1,388 | 9 | 37 | index |
| `/locations/lancaster-sc/concrete-slabs` | 1,371 | 9 | 37 | index |
| `/locations/lancaster-sc/concrete-repair` | 1,350 | 9 | 37 | index |
| `/how-it-works` | 473 | 6 | 25 | index |
| `/contact` | 234 | 5 | 26 | index |
| `/privacy` | 276 | 4 | 27 | index |
| `/terms` | 177 | 4 | 27 | index |
| `/referral-disclosure` | 323 | 4 | 27 | index |
| `/thank-you` | 131 | 4 | 24 | noindex |

## Verification

TypeScript clean · vitest 29/29 · build 28 static pages · page crawler ALL PASSED
(0 page checks, 0 gate failures, 0 broken links, 0 sitemap problems) · API suite
32/32 · content gates 4/4 · Playwright 26/26.

## Still blocking real search visibility

`NEXT_PUBLIC_SITE_URL` remains `https://example-referral-brand.com`, so every
canonical, `@id` and sitemap entry points at a domain you do not own, and Vercel
Deployment Protection returns a 302 to crawlers. Until both change, none of this
can be indexed.
