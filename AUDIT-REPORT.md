# Full site audit and optimisation

Scope: 18 routes, instrumented at 320 / 360 / 375 / 390 / 414 / 430 px and
768 / 1024 / 1280 / 1440 / 1920 px. Branding, palette, layout concept and
content intent preserved.

## What was fixed in this pass

| # | Issue | Evidence | Fix |
|---|---|---|---|
| 1 | **Colour contrast below WCAG AA.** Accent green `#0e7a4c` on the soft accent tint `#d8efe3` measured **4.45:1** against the 4.5:1 minimum. It affected every eyebrow label on soft toned sections and the numbered badges (01 to 04, step circles, accordion icons). | computed on live DOM | Lightened `--color-accent-soft` to `#e0f3e9`. Ratio now **4.65:1**. The accent green itself is unchanged, so branding is identical. |
| 2 | **Ghost buttons below the tap target minimum.** Header navigation and in page nav links rendered at **42 px**. | measured at all widths | `.btn-ghost` min height raised to **48 px**, matching the primary and secondary buttons. |
| 3 | Breadcrumb links at 20 px (earlier pass) | | hit area grown to 28 px without changing the bar height |

## What was verified clean, with numbers

**SEO.** 18 unique titles (41 to 60 characters), 18 unique descriptions (97 to
154). **Zero duplicate titles or descriptions.** One canonical per page, OpenGraph
on every page, `lang="en-US"`.

**Headings.** Exactly one H1 per page, **zero skipped levels** across all 18 pages,
no heading longer than 12 words, no heading used purely for styling.

**Content.** 1,684 text blocks measured: longest paragraph on the site is **60
words**, zero above 80. **Zero dash or underscore separators** in visible copy,
titles, descriptions, alt text or aria labels.

**Services.** Each of the four service pages carries 2,076 to 2,219 words across
What it is, More information (7 titled blocks), What it may include, Options,
Process, Cost factors, Preparation, Routing, FAQ, verbatim disclosure and CTA,
with a unique hero photo, a unique supporting photo and three sibling links.

**FAQ.** 220 FAQ rows and 35 accordion rows across 12 pages at 5 widths: every
question and answer left aligned, question and answer text sharing an identical
left edge, accordion icon on the right at every width, no overlap, no overflow.
Accordion opens and closes with Enter, focus ring visible, native `details` and
`summary` so expanded state is exposed to assistive tech.

**Typography.** Geist Sans only. One self hosted variable woff2, latin subset,
**25,492 bytes**, loaded with `next/font/local`. 16,959 rendered elements checked,
every one resolves to Geist. Zero requests to Google Fonts or any CDN.
`--font-sans`, `--font-mono` and `--font-serif` all map to Geist so no utility can
reintroduce another family.

**Mobile.** At 320, 360, 375, 390, 414 and 430: **zero horizontal overflow, zero
broken images, zero clipped text, zero text touching a screen edge, zero tap
targets under 44 px**, identical container padding.

**Navigation.** Every header, footer, breadcrumb, card, CTA and in page link
resolves 200. No placeholder links, no bare `#` links, no generic anchors, no
links to gated routes. Mobile menu opens, lists all destinations, closes on
navigation; services dropdown closes on Escape and outside click.

**Accessibility.** 22 keyboard tab stops on the form page, **all with a visible
2 px focus ring**. Every input labelled, every link and button has an accessible
name, every image has an alt attribute, no reliance on colour alone.

**Performance.** Measured CLS **0.0000** on normal load; 0.0000 with the font
blocked, proving nothing else shifts. All 22 WebP assets under 100 KB. Hero images
use `priority`, below fold images lazy load. No third party scripts.

**Structured data.** Valid JSON-LD on every page. `OnlineBusiness` plus
`Organization` and `WebSite` sitewide, `WebPage`, `BreadcrumbList`, `FAQPage` and
`Service` where they match visible content. No reviews, no ratings, no licence or
credential claims, no claim that the publisher performs the work.

**Technical SEO.** Sitemap lists 17 URLs, every one returns 200, no duplicates, no
gated routes. `robots.txt` allows all and disallows only `/api/`. The 404 page
returns a real 404 with an H1 and navigation back into the site. All seven gated
routes confirmed 404: Charlotte NC, Rock Hill SC, Fort Mill SC, Indian Land SC,
Elgin SC, `/services/foundation-repair`, and the Indian Land combo.

## Intentionally excluded from indexing

| Route | Reason |
|---|---|
| `/thank-you` | Conversion confirmation page, `noindex, nofollow`, excluded from sitemap |
| Charlotte NC, Rock Hill SC, Fort Mill SC, Indian Land SC, Elgin SC | Not published. Routes 404, absent from sitemap, never linked |
| `/services/foundation-repair` | Outside the Phase 1 service set. 404 |

Every other route is `index, follow` and present in the sitemap.

## Unsupported claims: none present, none added

No licences, certifications, insurance, ratings, reviews, years in trade, project
history, BBB or award claims anywhere. The publisher is described only as a
referral service throughout, with the mandated disclosure rendered verbatim in the
footer, the lead form, each service page and the disclosure page. Nothing had to be
removed in this pass because the copy rules have held since the content was
written.

## Remaining issues and manual verification

1. **`NEXT_PUBLIC_SITE_URL` is still `https://example-referral-brand.com`.** Every
   canonical, every schema `@id` and all 17 sitemap entries point at a domain you
   do not own. Nothing can be indexed until this is set. **Needs you.**
2. **Vercel Deployment Protection is on**, so the deployment returns a 302 to
   crawlers and to anyone without an SSO session. **Needs you.**
3. **Phone and email are placeholders** by your instruction: `(803) 555-0123` dials
   nothing and `hello@example-referral-brand.com` does not receive mail.
4. **Three GitHub tokens were exposed** earlier in this project and none have been
   confirmed revoked. Worth rotating.
5. The apex domain alias is unassigned on Vercel.

## Verification run

TypeScript clean · vitest 29/29 · build 28 static pages · page crawler ALL PASSED
(0 page checks failed, 0 gate failures, 0 broken links, 0 sitemap problems) · API
suite 32/32 · content gates 4/4 · Playwright 26/26.
