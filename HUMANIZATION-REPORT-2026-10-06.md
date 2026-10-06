# Making the site read as human-designed — final report

**Site:** Lancaster Concrete Connect (referral platform)
**Branch:** `arena/23071b57-lancaster-concrete-referral` · baseline `fb45858` → `9089757`
**Scope:** 16 commits · 59 files · +2,107 / −760 · 26 source files touched
**Method:** editing, subtraction, variation. No redesign. Structure, routes, forms, API, phone, email, domain, services and legal positioning are unchanged.

Every number below was measured against the running site, not estimated. Tooling: a curl+regex scanner across all 17 routes for heading/sentence data, and headless Chromium at 390 / 1024 / 1280 / 1440 px in dark mode for layout and luminance.

---

## 1. What made it look AI-generated before

The copy was not the problem. Measured at baseline: **711 sentences, 0 marketing buzzwords, 0 em dashes, 0 exclamation marks**, mean sentence length 14.1 words. None of the blacklisted phrases ("Whether you're looking to…", "From X to Y…", "Our comprehensive…", "Rest assured…", "Seamlessly…", "Tailored solutions…", "Your trusted partner…", "Elevate/Transform your…", "Peace of mind…") appeared anywhere. The design tokens were already restrained: exactly 2 corner radii, **0 `shadow-*` utilities**, one accent green, Geist Sans only.

So the AI signal was **architectural, not verbal**. Six specific things produced it:

1. **The four service pages were one page with a noun swapped.** 7 of 13 H2s were identical across them and the H3 ladder was **100% identical** bar a single noun. Driveways, patios, slabs and repair each got "Our process", "What it costs", "How to prepare" in the same order with the same sub-headings.
2. **Sentence-level duplication.** **87 of 323 distinct sentences (27%)** appeared on two or more pages.
3. **A templated SEO opener on five pages**: "Looking for a concrete *X* contractor in Lancaster, SC?"
4. **Broken H1 grammar from string interpolation.** The service name is stored plural, so the combo pages rendered "Concrete Driveways Referrals in Lancaster, SC".
5. **Mobile was stacked, not designed.** **33 of 44** long reading paragraphs were centre-aligned at 390 px.
6. **Volume as a substitute for judgement.** 7–9 CTA buttons per page, 39 cards on one service page, a 11,538 px driveways page, a hero photo so heavily scrimmed its right half measured 26–46 mean luminance from a 151-luminance source, and a whole marketing section explaining the site's photography sourcing policy — a section no human designer would write, and one that makes the visitor think about image generation.

---

## 2. What changed — measured

| Metric | Baseline | Now |
|---|---|---|
| Service-page H2s identical across all 4 pages | 7 / 13 | **1 / 9** |
| Service-page H3 ladder identical | 100% | **1 / 10** |
| Combo-page H2 / H3 identical | 7 / 10 | **1 / 4 · 1 / 8** |
| Distinct sentences appearing on 2+ pages | 87/323 = **27%** | 43/481 = **9%** |
| "Looking for a concrete X contractor…?" openers | 5 | **0** |
| Title Case headings | 5 | **0** |
| Reading paragraphs centred @390px | 33 / 44 | **0 / 101** |
| Hero right-half mean luminance | 26–46 | **42–69** (stddev 19–30) |
| CTA buttons per page | 7–9 | **2.9** (23 across 8 pages) |
| Cards on the driveways page | 39 | **28** |
| Cards narrower than 190px @1024px | 4 | **0** |
| Page height: home / driveways / combo | 7,642 / 11,538 / 8,227 px | **6,025 / 9,163 / 4,045 px** |
| Mobile footer height | ~1,300 px | **1,072 px** |
| Content images on disk | 44 | **18** |
| Orphaned images | 8 | **0** |

The one remaining shared service-page H2 is the cross-link section ("Also routed in Lancaster"), which *should* match across pages. Of the 101 long paragraphs at 390 px, the only centred text left is 4 CTA-band bodies, centred deliberately.

---

## 3. Images replaced

**Replaced for named defects, still live (5):**

| File | Defect |
|---|---|
| `lancaster-hero.webp` | Live oaks draped in Spanish moss — a Lowcountry signature, not the Piedmont. Lancaster is ~40 mi south of Charlotte. Replaced with a Piedmont residential street: brick ranches, red clay verges. |
| `service-driveways.webp` | A full residential driveway with **zero control joints** — impossible construction. Replaced with a brick ranch drive showing tooled joints and red clay at the edges. |
| `service-slabs.webp` | A slab sitting on undisturbed turf with no formwork, excavation or spoil. Replaced with a formed pad with gravel and churned clay around it. |
| `how-it-works-hero.webp` | Replaced with a floated slab inside staked timber forms. |
| `services-overview.webp` | Replaced with a broom-finished driveway at a real finish texture. |

**Replaced, then deleted when found to be unreferenced (3):** `driveway-pour-joints.webp` (was polished tile masquerading as concrete), `slab-formwork-pad.webp`, `patios-process-walkway.webp`.

That last one is worth stating plainly. It was a staged golden-hour patio render with real artifacts — the two left chairs' top rails **fused into one piece of timber**, the near-left chair's legs **dissolved before reaching the slab with no contact shadow**, a seat rail on the right **passed through** the rear chair's leg, and the "matching" set had one two-slat and one three-slat back. I regenerated it as a just-floated patio inside its forms. Then a rendered-output audit showed the map that referenced it had been dead code since an earlier commit, so the file appeared on no page at all. The correct fix for an image that renders nowhere is deletion, not regeneration, so it went with the other orphans. The replacement work was wasted; recording it rather than hiding it.

## 4. Images kept

**Kept because they are credible, not merely polished** — verified at native resolution, not thumbnail scale:

- `service-patios.webp`, `local-patios-lancaster.webp` — genuine stamped-concrete pattern and colour-release variation, sling furniture whose legs resolve and cast consistent shadows, bullnose border, natural edge curve.
- `process-location-lancaster.webp`, `process-band.webp` — red clay spoil, a staked form line, a work truck. The strongest local-authenticity images on the site.
- `repair-hero-walkway.webp`, `local-repair-lancaster.webp` — root-heaved slabs and map cracking that read correctly.
- `cta-combo-driveways.webp`, `cta-combo-repair.webp`, `cta-service-driveways.webp`, `local-driveways-lancaster.webp`, `local-slabs-lancaster.webp`, `contact-front-walkway.webp`, `service-areas-hero.webp`.

`local-driveways-lancaster.webp` is the single shared closing-CTA photo across the site. That was a deliberate earlier decision made on contrast measurements — its left third is naturally dark (pine trunks, pine straw), so body copy clears 4.5:1 there while alternatives measured 3.4–3.7:1 behind the same scrim. Left alone.

Images now vary by angle (ground level, standing, aerial), weather (overcast, flat, low sun), stage (formed, floated, cured, failed), finish (broom, stamped, smooth) and setting (brick ranch, vinyl ranch, two-storey).

## 5. Sections removed

- **The photography-policy section** — a marketing block explaining how the site sources its imagery. Removed entirely; the necessary disclosure already lives in the referral disclaimer and the footer.
- **Four combo-page process sections** and the **services-index process section**, whose illustration contained a clipboard dissolving into metal shards and AI handwriting.
- **Eight separate closing CTA bands**, collapsed to one shared band.
- **A second numbered sequence on the home page**, which duplicated the first; now a paragraph.
- **Two dead image maps** (`SERVICE_DETAIL_IMAGES`, `SERVICE_PROCESS_IMAGES`) and the doc comment describing only them.
- **26 image files**, 8 of which were orphans rendering on no route.

## 6. Sections simplified

- The home page's **"Areas we currently serve"** band went from a full card section to one quiet sentence, set at tighter padding than its neighbours so it reads as a footnote rather than a claim.
- **Two home-page question sections** that asked near-identical questions became distinct: "Four things worth deciding yourself" and "How this service works".
- The **key-facts strip** and the **covered/out-of-scope block** were de-carded where cards added nothing.
- The **covered-scope grid** stopped splitting into two columns at `lg` while the page had already given a column to the sticky form — four cards were 151 px wide and wrapping after three words. Both splits now wait for `xl`.
- The **sub-navigation** no longer overflows its container at desktop (was 1258 px of content in 1136 px).
- The **mobile footer** was one centred column: a four-line centred tagline, then four link groups single-file, then a seven-line centred disclaimer. Now left-aligned with the link groups two-up.

## 7. Copy rewritten

Because the prose was already clean, rewriting was targeted, not wholesale:

- **Five templated SEO openers** deleted.
- **Every service-page heading** rewritten to be specific to its service — see §8.
- **Four closing CTA headings** written per service: "Ready to price a driveway?", "Ready to price a patio?", "Ready to price a pad?", "Want someone to look at the damage?". These replaced a bare keyword string, `"Concrete Driveways in Lancaster, SC"`, which was being used as a call to action and repeated the H1 almost verbatim.
- **Two British spellings** in visitor-facing copy — "Colour, texture, and where the joints fall" and the heading "Finish, colour and layout choices" — corrected to American spelling for an American business.
- `"Lancaster, SC"` was reduced in body copy and kept where it carries meaning: H1s, the service-area sentence, and schema.

No statistic, review, rating, licence, award, partnership, address or contractor name was invented. There is no fake urgency, no countdown, no "trusted by N homeowners", no badge the business has not earned.

## 8. How service-page repetition was fixed

A per-service `headings` block was added to `src/content/services.ts`, so each page names its own sections instead of inheriting a generic ladder:

| | Driveways | Patios | Slabs | Repair |
|---|---|---|---|---|
| **options** | Decisions that change the quote | Finish, color and layout choices | Specifying a pad for what it carries | Repair methods and when each applies |
| **process** | What a driveway pour week looks like | How a patio build is sequenced | From staked forms to a usable pad | How a repair job is assessed and done |
| **cost** | Where driveway money actually goes | What makes one patio cost more than another | What drives the price of a pad | Why repair quotes vary so widely |
| **prepare** | Before the contractor walks the drive | Walking the space before you get a price | Knowing the load before the visit | Describing the damage accurately |
| **moreInfo** | Driveways on Lancaster County clay | Getting a patio right the first time | Sizing and siting a residential pad | Repair, resurface, or replace |
| **faq** | Driveway questions we get asked | Patio questions we get asked | Slab and pad questions we get asked | Repair questions we get asked |
| **cta** | Ready to price a driveway? | Ready to price a patio? | Ready to price a pad? | Want someone to look at the damage? |

The body copy, construction considerations, FAQs and CTA context underneath were rewritten to match, and section *shapes* now differ between pages: the patios page uses a comparison table for cost, the driveways page a bordered two-column list for specification decisions, the repair page a method-by-symptom structure.

## 9. H1 and template logic fixed

The bug was string interpolation over a plural noun. `service.name` is `"Concrete Driveways"`, so `` `${service.name} Referrals in ${city}, SC` `` produced **"Concrete Driveways Referrals in Lancaster, SC"**.

Rather than patching the four strings, the content model now carries a singular `projectNoun` beside the plural `name`, and the combo template builds its H1 from the singular. The plural remains correct on the hub pages, which describe the category:

```
/services/concrete-driveways                → Concrete Driveways in Lancaster County, SC
/locations/lancaster-sc/concrete-driveways  → Concrete Driveway Referrals in Lancaster, SC
/locations/lancaster-sc/concrete-patios     → Concrete Patio Referrals in Lancaster, SC
/locations/lancaster-sc/concrete-slabs      → Concrete Slab Referrals in Lancaster, SC
/locations/lancaster-sc/concrete-repair     → Concrete Repair Referrals in Lancaster, SC
```

All 14 H1s were re-verified from rendered HTML. The grammar cannot regress by adding a service, because the template reads the singular field rather than slicing the plural.

## 10. Remaining issues

Named specifically, as asked:

1. **The published contact details are placeholders.** `(803) 555-0123` is in the reserved-fiction 555 range and the email is `hello@example-referral-brand.com`. They come from `.env.example`, not source, so this is a deployment-time fix — but as the site stands it is the single largest trust defect, and I deliberately did not invent real ones.
2. **Two kept patio photos read as Northern, not Carolina.** `service-patios.webp` and `local-patios-lancaster.webp` show split-rail fencing, spruce/fir and no red clay. Neither has a *defect*, so under the rule "replace only for real defects" they stay — but they are the weakest local-authenticity images on the site.
3. **Uniform vertical rhythm.** Every section on every page uses 96 px top and bottom padding. It is consistent and not wrong, but a human-composed page usually breathes unevenly — tighter around short interstitials, looser before a major turn.
4. **The four service pages still share one structural skeleton.** Their content and headings now differ genuinely, but the section *order* is identical. A hand-built site would likely reorder or drop a section where the subject did not need it.
5. **A `CAPTION.sr-only` element reports as overflowing** (363 px of content in 1 px) on the driveways page. It is screen-reader-only and invisible; not a visual defect, listed for completeness.
6. All photography is AI-generated concept imagery. The site never claims the photos show real completed projects, and the alt text says "Representative".

## 11–12. Self-review scores

Scored honestly against the brief's targets. Three of five fall a point short, and I would rather name why than move the numbers.

| | Target | Score | Why this number |
|---|---|---|---|
| **AI-looking** | ≤2 | **3** | The architectural tells are gone — no duplicated ladders, no templated openers, no keyword headings, no photography-policy section. It loses a point because every photograph is AI-generated concept imagery and two frames read as the wrong region, and because the 96 px rhythm is machine-even. |
| **Human-designed** | ≥9 | **8** | Section shapes now vary genuinely — table, bordered list, numbered steps, FAQ, quiet one-line interstitial, photo band. It loses a point for the identical section order across the four service pages and the uniform spacing rhythm. |
| **Professional** | ≥9 | **9** | Typecheck, 36/36 tests and four content-assert gates pass. 17/17 routes 200, 0 orphaned images, 0 broken image requests, titles 41–60 chars, descriptions 97–154. Restrained tokens, one typeface, real legal disclosures, an SC LLR verification link. |
| **Generic / template** | ≤2 | **3** | The content inside the pages is specific and locally grounded. The chassis is still a recognisable local-service order: hero → facts → scope → process → cost → prep → FAQ → cross-links → CTA. |
| **Trust** | ≥9 | **8** | No fabricated reviews, ratings, licences, awards or statistics; the referral relationship is disclosed plainly in the hero, body, footer and a dedicated page. Held back by the 555 placeholder phone number and the example.com email, which a careful visitor will notice. |

The highest-leverage remaining action is item 1 — set the five `NEXT_PUBLIC_*` environment variables to real details at deploy. That alone moves trust to 9.
