# SEO and readability optimisation

Measured across all 18 published routes at 390 / 768 / 1440 px. Design, layout,
colours, branding and page structure were not changed.

## Paragraph length (the hard requirement)

Every text block on the site was measured (`p`, `li`, `dd`, `td`).

| Words per block | Blocks |
|---|---|
| 1 to 20 | 1,344 |
| 21 to 40 | 268 |
| 41 to 60 | 38 |
| 61 to 90 | 2 |
| **91 or more** | **0** |

**1,652 blocks, none over 90 words**, and 97% sit at 40 words or fewer. The two
blocks in the 61 to 90 band are the same mandated legal disclosure (76 words) on
`/how-it-works` and `/referral-disclosure`, which has to stay word for word.

Six blocks that were between 61 and 90 words were tightened without losing a point:

| Where | Before | After |
|---|---|---|
| Patios combo, shade guidance | 72w | 52w |
| Slabs combo, vapour barrier | 68w | 49w |
| Repair combo, settlement cause | 61w | 52w |
| Repair combo, repair vs replace | 76w | 47w |
| Slabs service hero summary | 61w | 47w |
| Repair service hero summary | 61w | 49w |

## Titles and meta descriptions

All 18 titles now fall between 41 and 60 characters, all descriptions between 97
and 154. Four were out of range:

| Page | Before | After |
|---|---|---|
| `/` | 64 chars: "Concrete Referrals in Lancaster, SC \| Lancaster Concrete Connect" | 60: "Lancaster SC Concrete Referrals \| Lancaster Concrete Connect" |
| `/services` | 63 chars | 56: "Concrete Services in Lancaster, SC \| Driveways to Repair" |
| `/contact` | 69 chars | 48: "Contact Us \| Concrete Referrals in Lancaster, SC" |
| `/locations` | 13 chars: "Service areas" | 49: "Concrete Referral Service Areas in South Carolina" |
| `/thank-you` | 16 chars: "Request received" | 56: "Request Received \| Next Steps for Your Concrete Referral" |

Descriptions on `/` (171 chars) and `/services` (177) were trimmed under 160 so they
no longer truncate in results. `/locations` gained a real description.

## Headings

Every page has exactly one H1, with no skipped levels anywhere in the document
outline. No heading exceeds 12 words. One H1 was made more descriptive:

- `/contact`: "Talk to our referral team" → **"Contact Our Lancaster, SC Concrete Referral Team"**

## Image alt text

Service card images previously shipped `alt=""` on the homepage, `/services`, every
service page and every location page. They now carry the descriptive alt already
written for each service, for example *"Newly poured residential concrete driveway
with saw cut control joints and a broom finish"*. Across 18 pages × 3 widths every
image loads and every image has an alt attribute. The only `alt=""` left is the
hidden dark mode copy of the logo, which is correct since the visible logo beside it
is already labelled.

## Duplicate content

The four city and service pages repeated the parent service page's "Worth settling
first" block word for word, roughly 150 duplicated words each. That block is now a
short lead plus a descriptive internal link to the canonical section:

> **What to settle before quoting concrete driveways in Lancaster** → `/services/concrete-driveways#prepare`

Nothing was deleted, the detail lives on the service page and is one click away.
Duplicate blocks across the site dropped from 44 to 34; the remainder is intentional
boilerplate such as the footer disclosure and the lead form legal text.

## Keyword usage

Density was measured per page. The highest term on any substantial page is 3.0%
(`provider` on the homepage); service pages sit at 1.6 to 2.3% for their primary
term. Nothing reaches a stuffing threshold, and no term was repeated artificially.

## Internal links

No generic anchors ("click here", "read more", bare arrows) anywhere. Every internal
link uses descriptive text such as "View driveway referrals", "Concrete Driveways in
Lancaster, SC" and the new "What to settle before quoting…" links.

## Unchanged, on purpose

URLs and slugs, canonicals, structured data graphs, the sitemap's 16 URLs, robots
directives, the referral service framing, the mandated disclosures, the temporary
phone and email, and all mobile centring rules.

## Verification after the changes

TypeScript clean · vitest 29/29 · build 28 static pages · page crawler ALL PASSED ·
API suite 32/32 · content gates 4/4 (services, locations, combos, uniqueness, schema
parity, no excluded geography) · Playwright 26/26 · no horizontal overflow, one H1
and no broken images at 390, 768 and 1440.
