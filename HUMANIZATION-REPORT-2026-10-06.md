# Making the site read as human-designed — final report

**Site:** Lancaster Concrete Connect (referral platform)
**Branch:** `arena/23071b57-lancaster-concrete-referral` · baseline `fb45858` → `db44675`
**Scope:** 21 commits · 62 files · 30 source files touched
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
6. **One structural skeleton under all four service pages.** Even after the wording was fixed, every service page rendered the same hardcoded sequence — scope, specification, process, cost, prepare — with the same five eyebrows in the same five slots. The pages said different things in the same shape.
7. **One padding value for the whole site.** All 24 `Section` instances used identical vertical padding, so every page breathed the same from first section to last. Consistent, but machine-even, with no hierarchy between a page's main argument and its appendix.
8. **Numbered cards used for things that are not sequences.** *How it works* ran a 01–04 grid of routing checks directly above the genuine 01–03 process steps. The checks all apply at once, so the numerals asserted an order that does not exist, and the same numbered-card pattern appeared twice in one scroll.
9. **Volume as a substitute for judgement.** 7–9 CTA buttons per page, 39 cards on one service page, a 11,538 px driveways page, a hero photo so heavily scrimmed its right half measured 26–46 mean luminance from a 151-luminance source, and a whole marketing section explaining the site's photography sourcing policy — a section no human designer would write, and one that makes the visitor think about image generation.

---

## 2. What changed — measured

| Metric | Baseline | Now |
|---|---|---|
| Service-page H2s identical across all 4 pages | 7 / 13 | **1 / 9** |
| Service-page H3 ladder identical | 100% | **1 / 10** |
| Combo-page H2 / H3 identical | 7 / 10 | **1 / 4 · 1 / 8** |
| Distinct sentences appearing on 2+ pages | 87/323 = **27%** | 36/544 = **7%** |
| "Looking for a concrete X contractor…?" openers | 5 | **0** |
| Title Case headings | 5 | **0** |
| Reading paragraphs centred @390px | 33 / 44 | **0 / 101** |
| Hero right-half mean luminance | 26–46 | **42–69** (stddev 19–30) |
| CTA buttons per page | 7–9 | **2.9** (23 across 8 pages) |
| Cards on the driveways page | 39 | **28** |
| Cards narrower than 190px @1024px | 4 | **0** |
| Page height: home / driveways / combo | 7,642 / 11,538 / 8,227 px | **5,987 / 8,914 / 3,943 px** |
| Mobile footer height | ~1,300 px | **1,072 px** |
| Content images on disk | 44 | **18** |
| Orphaned images | 8 | **0** |
| Distinct main-column section orders across the 4 service pages | 1 | **4** |
| Distinct section padding tiers in use | 1 | **4** (96 / 80 / 56 / 44) |
| Numbered card sequences on *How it works* | 2 | **1** |

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
- **Vertical rhythm became a hierarchy.** All 24 sections shared one padding value and the `Section` component's `compact` variant was unused. One rule now applies: material that resolves a page rather than carrying it — FAQ blocks, "Also routed in" and "Adjacent published areas" cross-links, the out-of-scope note — sits in a tighter tier. Pages step 96 / 80 / 56 / 44 instead of flat 96.
- **The routing checks on *How it works* lost their step numbers.** All four are checked on every request, so 01–04 stated an order that does not exist, directly above the real three-step sequence. They are now a hairline-divided list of titled criteria.
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

**Section order now differs too, and is reasoned rather than shuffled.** It comes from the service record, not a hardcoded sequence:

```
driveways  scope -> options -> process -> cost -> prepare
patios     scope -> options -> cost -> process -> prepare
slabs      scope -> options -> process -> prepare -> cost
repair     scope -> process -> options -> cost -> prepare
```

A patio is discretionary spend, so people price it before they care how it is built. A pad cannot be priced until the load, access and base are known, so cost comes last. A repair has to be diagnosed before any method can be specified, so assessment leads and the methods follow from it. The in-page nav is generated from the same field, so it cannot drift out of step with the page.

The process and pricing ledes were two hardcoded strings shared by all four pages; they are now written per service.

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
2. **Two kept patio photos read as Northern, not Carolina.** `service-patios.webp` and `local-patios-lancaster.webp` show split-rail and cedar fencing, spruce/fir in the background and no red clay. I considered replacing them and decided against it, which is worth explaining: both read convincingly as real photographs — slightly soft, handheld, mundane composition, correct stamp pattern and colour-release variation. Regenerating them would trade a credible photograph for a fresh render against the one defect the brief cares most about. Neither has an actual defect, and the rule is to replace only for defects. They stay, and this is the weakest local-authenticity link on the site.
3. **The four service pages still share one component vocabulary** — timeline, cost table, prep checklist. Their order, headings, ledes and content now differ, but a visitor who reads all four will recognise the same building blocks. That is a design system doing its job rather than a defect, but it is the honest reason the structural variation is not total.
4. **The locations index has one service area**, so its card grid renders a single card with empty space beside it. That is the truthful state of the business — one approved area — and padding it with unapproved cities would be inventing coverage. Left as is.
5. **A `CAPTION.sr-only` element reports as overflowing** (363 px of content in 1 px) on the driveways page. It is screen-reader-only and invisible; not a visual defect, listed for completeness.
6. All photography is AI-generated concept imagery. The site never claims the photos show real completed projects, and the alt text says "Representative".

## 11–12. Self-review scores

Scored honestly against the brief's targets, after a second pass that fixed the structural sameness, the flat rhythm and the false numbering. Four of five targets are met; trust is not, for a reason that lives outside the code.

| | Target | First pass | Now | Why this number |
|---|---|---|---|---|
| **AI-looking** | ≤2 | 3 | **2** | The remaining tells from the first pass are gone: the four service pages no longer share a skeleton, the site no longer breathes at one interval, and the only numbered sequence left is the one that is actually a sequence. No buzzwords, no em dashes, no exclamation marks in rendered copy. It is not 1 because every photograph is AI-generated concept imagery and two frames are regionally generic. |
| **Human-designed** | ≥9 | 8 | **9** | Section order is now an editorial judgement per service rather than a template, spacing carries hierarchy, and section shapes genuinely vary — table, timeline, hairline list, checklist, accordion, quiet one-line interstitial. Not 10: the four pages still draw on one component vocabulary. |
| **Professional** | ≥9 | 9 | **9** | Typecheck, 36/36 tests and four content-assert gates pass. 18/18 routes 200, 0 orphaned images, 0 broken image requests, 0 real layout overflows at 390px or 1440px. Titles 41–60 chars, descriptions 97–154. One typeface, restrained tokens, real legal disclosures, an SC LLR verification link. |
| **Generic / template** | ≤2 | 3 | **2** | The chassis is no longer uniform: each service page runs its own order and the rhythm has tiers. It is not 1 because the overall shape is still recognisably a local-service site, which is appropriate rather than wrong. |
| **Trust** | ≥9 | 8 | **8** | Unchanged, and I am not moving it. No fabricated reviews, ratings, licences, awards or statistics; the referral relationship is disclosed in the hero, body, footer and a dedicated page; no fake urgency or badges. It is held at 8 solely by the 555 placeholder phone number and the example.com email, which a careful visitor will notice. Nothing I can do in the repository changes that. |

The highest-leverage remaining action is still item 1 — set the five `NEXT_PUBLIC_*` environment variables to real details at deploy. That alone moves trust to 9.
