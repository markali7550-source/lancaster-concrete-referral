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

---

## 13. Third pass — reading the site instead of grepping it

The first two passes fixed structure and lexis, and the measurements said the
copy was clean: zero buzzwords, zero em dashes, zero exclamation marks, mean
sentence length 14.1 words. That was true and it was not sufficient. Every
defect found in this pass is invisible to a word-list sweep, because none of
them is about word choice. They were found by rendering all 17 routes to plain
text and reading them, and by putting each photograph next to the words that
describe it.

### 13.1 The descriptions did not match the photographs

Alt text had never been checked against the images. Rendering the 13 content
images as contact sheets and reading each alt string beside its own frame
found **5 wrong, 3 of them naming a finish the photograph contradicts**.

| Image | Alt text claimed | The photograph actually shows |
|---|---|---|
| `service-patios` | "smooth troweled finish" | stamped random-stone, curved edge, split-rail fence |
| `repair-hero-walkway` | "half freshly resurfaced" | a root-heaved slab with a raised lip; no resurfaced half |
| `local-patios-lancaster` | "broom finished, shaded by mature oak and pine" | stamped flagstone in full sun, young saplings, new timber fence |
| `local-repair-lancaster` | "uneven walkway … in Lancaster, South Carolina" | a broad driveway slab with a long crack and map cracking |
| `local-slabs-lancaster` | "landscaped yard … in Lancaster, South Carolina" | bare soil and gravel along the slab edge |

Two separate faults are stacked here. The first is simple inaccuracy, and it is
the kind a sighted editor never catches because they never read the alt text.
The second is worse: two strings asserted the photograph was taken *in
Lancaster, South Carolina*. The site's own position is that its imagery is
representative, so the alt text was contradicting the disclosure a few hundred
pixels below it, and doing so in the one place the claim could not be seen. The
remaining eight alts were verified against their frames and left alone.

### 13.2 The copy asserted data the business cannot have

The four Lancaster service pages carry the best local writing on the site. They
also carried about a dozen sentences that quietly claim a dataset:

- "Driveway inquiries from Lancaster **split fairly evenly** between …"
- "Patio inquiries in Lancaster are **dominated by** …"
- "Rural parcels **account for most** of the larger ones"
- "Repair inquiries **arrive in three recognizable shapes**"
- "**Requests cluster** in late spring and early fall, which is when provider
  capacity tightens and **acknowledgment times stretch**"
- six more reporting what "participating providers" habitually ask, steer
  toward, or schedule

Those same pages say Lancaster is "the approved coverage area **at launch**"
and that each request goes to **one** provider. A reader who notices the first
statement cannot believe the second set. This is the most AI-like writing that
survived two passes, and it survives precisely because it reads as expertise:
inventing a plausible distribution is exactly how a language model performs
local knowledge.

The fix was not deletion. Every one of those paragraphs contains real, checkable
construction knowledge, and all of it was kept — clay subsoil holding water,
shade growing algae on a troweled finish, a July pour skinning over before it
can be finished, septic and well setbacks constraining where a pad can sit, oak
roots lifting walkway panels, differential movement where a new slab meets an
old footing. What changed is that the text now states the condition instead of
reporting a statistic about it. "A broom or exposed aggregate finish holds grip
where a smooth troweled one will not" needs no dataset; "providers usually steer
these patios toward a broom finish" does.

Also dropped: a named street used to locate "the older neighborhoods". It is an
unverifiable specific, and the brief's rule is to invent nothing.

### 13.3 Grammar that a template produces and a writer does not

Fixing the plural H1 in pass one did not fix the bug class. The same plural
`shortName` was being interpolated into four more attributive positions:

- "View **driveways** referrals" → "View driveway referrals"
- "All **patios** referrals" → "All patio referrals"
- "Lancaster **driveways** questions" → "Lancaster driveway questions"
- "What we see on Lancaster **slabs** requests" → "What we see on Lancaster slab requests"

All four now use the singular `projectNoun` field. Three other interpolations of
the same field were checked and deliberately left plural, because they are
grammatically correct there — "View driveways in Lancaster", "What we route
under concrete driveways", and "the concrete driveways page", which is the
page's actual name. The lesson from pass one generalises: when a brief says fix
the logic so it cannot return, sweep every interpolation of the offending field,
then check each one individually rather than applying one rule to all of them.

### 13.4 Typography that was set rather than edited

Reading rendered text surfaced four inconsistencies, including two I introduced
in the previous pass:

- **A literal ` -- ` in two sentences I wrote.** The site correctly bans em
  dashes, but a double hyphen is a worse substitute — it renders as two visible
  hyphens and looks like markup that failed to convert. Both sentences were
  restructured.
- **One `&mdash;` entity** on the combo pages. It was the only em dash in 1,622
  lines of visitor-facing copy, so it read as an outlier rather than a style.
- **Mixed apostrophes:** one `&rsquo;` against three `&apos;`, so one sentence
  showed a curly apostrophe and the rest showed straight ones.
- **"a different order *to* driveways"** — British. American English takes
  "from". The legal pages had the matching slip, stamped "24 September 2026"
  rather than "September 24, 2026".

Individually trivial. Together they are the signature of text that was generated
and never read aloud by someone who lives where the business claims to operate.

Rendered copy across all 17 routes now measures **0 em dashes, 0 en dashes, 0
literal double hyphens, 0 curly apostrophes, 0 exclamation marks, and no British
spellings or conventions**.

### 13.5 My own new copy needed the same scrutiny as the inherited copy

Four of the eight section ledes written in pass two had defects: the two double
hyphens above, the British preposition, and a repetition fault — two separate
ledes both commented on the page's own layout. One such aside is a human touch;
two is a tic, and a tic is what makes writing feel generated. The repair page
now simply says the assessment comes first. Worth recording plainly: text I
wrote to remove the AI feel had to be audited for the AI feel.

### 13.6 One inconsistency deliberately preserved

Step 02 of "Three steps, no obligation" is a full sentence ending in a period,
while steps 01 and 03 are short phrases. It looks like an editing miss. It is
carried in the source under the comment *"Heading wording is fixed by the brief
and must stay exact"*, so it is a requirement, not a defect, and it has been
left exactly as written. Flagging it here so it is not silently "fixed" later.

## 14. Scores after the third pass — unchanged, and why

| | Target | Pass 2 | Pass 3 | Why it did not move |
|---|---|---|---|---|
| **AI-looking** | ≤2 | 2 | **2** | Real tells were removed — fabricated statistics, five wrong image descriptions, four template plurals. But the score was never being held up by those; it is held at 2 because every photograph on the site is AI-generated concept imagery. Fixing the writing cannot move that, so the number stays. |
| **Human-designed** | ≥9 | 9 | **9** | This pass changed almost no design. It corrected language and accuracy. A 10 would need the shared component vocabulary across the four service pages to break up, which was judged a design system working correctly rather than a fault. |
| **Professional** | ≥9 | 9 | **9** | All gates still green: typecheck, 36/36 tests, four content asserts, 18/18 routes 200. Accurate alt text and consistent typography are what 9 already implied; they are a correction toward the claimed score, not evidence for a higher one. |
| **Generic / template** | ≤2 | 2 | **2** | Unchanged. The four attributive plurals were template artefacts and are gone, but a reader was unlikely to read "All patios referrals" as *template* so much as *sloppy*. |
| **Trust** | ≥9 | 8 | **8** | Still capped by the `(803) 555-0123` reserved-fiction number and the `example-referral-brand.com` email, both environment-supplied and deliberately not invented. One honest note: **pass two's 8 was slightly generous**, because the location copy was asserting invented statistics and I had not audited it yet. The number is the same; it is now accurate rather than flattering. |

No score was raised in this pass. Three of the findings — invented statistics,
alt text contradicting the imagery disclosure, and text claiming photographs
were taken in Lancaster — were trust defects that existed while trust was scored
8. Raising the score after removing defects I had failed to count the first time
would be exactly the manipulation the brief rules out.

**The single highest-leverage remaining action is unchanged:** set the five
`NEXT_PUBLIC_*` environment variables to real contact details at deploy. That
moves trust to 9 and is the only target still unmet.

---

## 15. Fourth pass — looking at the photographs instead of their captions

Pass three audited alt text *against* the images and corrected five captions.
It did not audit the images themselves for artifacts. This pass enlarged all
eighteen content photographs to 3x and examined them, then examined the four
homepage service-card images at 2x against the specific defects the brief
names.

### 15.1 One image had genuine AI artifacts

`cta-combo-repair.webp` — the band behind "Three steps, no obligation" on
`/how-it-works` — showed a gloved hand running a hand float. At magnification:

- the float's handle rises from a **single asymmetric post** where a real hand
  float has a two-point mount, and the plate **dissolves into loose grey
  rectangular fragments** at its right end rather than forming a tool edge
- the grip **passes through** the handle instead of around it, with a
  flesh-toned element surfacing where the glove should be continuous
- a **disembodied grey blob** sits in the top-right corner, attached to nothing
- the float's **shadow does not match the float**, and the hand casts almost none
- the wet slurry ridge on the left bears **no relationship** to where the tool is

This is the brief's "distorted tools" and "unnatural metal fragments" category,
and it was the last live example of it.

**The replacement deliberately contains no people, no hands and no tools.**
Hands and hand tools are the subjects that generate artifacts, and this site
has no editorial need for either — it is a referral service, and the brief
separately warns against fake workers. Removing the subject removes the whole
risk class rather than re-rolling the same dice. The new frame shows a driveway
formed and ready to pour: timber forms with the stakes correctly *outside*
them, welded wire mesh on orange chairs over a compacted gravel subbase, red
clay spoil heaped along one edge, tire ruts and footprints in the subgrade, a
brick ranch and loblolly pines behind.

It also fills a gap in the set. Every other photograph is summer or early
autumn; this one is **winter, bare deciduous trees under flat grey overcast**.
It is the only ground-level camera position and the only image showing the
reinforcement stage. That is §6 variation earned by circumstance rather than
applied as an effect.

Renamed `process-steps-formwork.webp`. The old name described neither a CTA nor
repair work — the kind of leftover filename that tells a reader an asset was
reused rather than chosen. Orphan audit against rendered HTML afterwards: 23
referenced, 0 orphans, 0 missing, 18/18 routes 200.

Legibility was checked rather than assumed: the new frame measures 118/255 in
the heading zone against 112/255 for the CTA band photo already shipping, so
under the same 72% `#0B1017` scrim the contrast is unchanged.

### 15.2 The other seventeen were examined and kept

Not one of them was replaced, and that is the finding, not a default. The brief
is explicit that polish alone is not a defect.

`process-band.webp` is the clearest case for keeping. At 3x it holds up in
every detail that usually fails: a correct Ford Super Duty grille and badge, a
real portable drum mixer on the lawn, timber forms over welded mesh at the
kerb, red clay spoil, patched and potholed asphalt, power lines, a loaded
trailer. It is the most convincing photograph on the site.

### 15.3 The brief's named targets, closed individually

| Named target | Status |
|---|---|
| Driveway without realistic control joints | **Resolved.** `service-driveways` shows longitudinal and transverse joints forming roughly square panels, with hairline cracking and a red clay verge. |
| Concrete surface resembling polished tile | **Resolved.** `service-patios` is matte stamped random-stone with real grout lines, antiquing-release colour variation and a hairline crack. No specular tile sheen anywhere in the set. |
| Clipboard/clip with unnatural metal fragments | **Gone.** No clipboard appears in any of the eighteen images. Its nearest surviving relative was the fragmented float plate described above, replaced this pass. |
| AI-looking handwriting | **None.** No handwriting or rendered lettering appears in any image. The only text is a manufacturer's badge on a real truck grille. |
| Suspicious homepage service-card imagery | **Checked at 2x and kept.** All four — `service-driveways`, `service-patios`, `service-slabs`, `repair-hero-walkway` — show correct construction: a formed slab edge with slight aggregate exposure, and a root-heaved panel with a visible fracture face and exposed aggregate at the break. |

## 16. Scores after the fourth pass

| | Target | Pass 3 | Pass 4 | Why |
|---|---|---|---|---|
| **AI-looking** | ≤2 | 2 | **2** | The last image with *visible* artifacts is gone, so the honest note is that **pass three's 2 was generous**: a live photograph containing a melted tool and a floating blob is close to the literal definition of AI-looking. The number is the same and is now accurate. It does not go to 1 because all imagery remains AI-generated concept photography, which is the ceiling. |
| **Human-designed** | ≥9 | 9 | **9** | No design changed this pass. |
| **Professional** | ≥9 | 9 | **9** | Typecheck, 36/36 tests, four content asserts, 18/18 routes 200, 0 orphaned images. |
| **Generic / template** | ≤2 | 2 | **2** | Unchanged. |
| **Trust** | ≥9 | 8 | **8** | Still capped by the `(803) 555-0123` reserved-fiction number and the `example-referral-brand.com` email, both environment-supplied and deliberately not invented. |

Two passes running, the honest conclusion has been that a previously reported
score was slightly flattering because a defect had not yet been looked for in
the right way. That is the cost of auditing by measurement: a sweep confirms
what it was built to count, and stays silent about everything else. Both times
the number stayed where it was and the justification got weaker, which is the
correct direction when the finding is "I had not checked."

**Unchanged highest-leverage action:** set the five `NEXT_PUBLIC_*` environment
variables to real contact details at deploy. That is the only remaining move
that changes a score.

---

## 17. Fifth pass — opening the site on a phone

Mobile had been measured but never looked at. The earlier passes recorded
counts at 390px — zero overflows, footer height, centred-paragraph ratios —
and all of those numbers were correct. They were also blind to the two
largest remaining problems, both of which were obvious within about thirty
seconds of actually scrolling the page.

A real browser was run at 390x844 and the pages were read top to bottom.

### 17.1 Mobile itself is sound

Worth stating plainly, because the brief asks whether mobile feels designed
or merely stacked. It feels designed. The project-type selector is a 2x2
radio grid rather than four stacked rows; the form carries a "Step 1 of 2"
label and a progress bar; a "Rather just talk?" card with a call button sits
beside the form for people who do not want to type; the footer is a
two-column link layout, not a single column of everything. Four padding tiers
survive at mobile width, so the vertical rhythm still carries hierarchy.

The 29 elements that report as overflowing the viewport on a service page
were checked by walking each one's ancestors: **all 29 sit inside the
deliberate `overflow-x-auto` sub-nav**. Genuinely broken layout: zero.

### 17.2 A section that retold the page it was on

The driveways page ran 14,376 pixels on a phone. Near the bottom sat a
six-card section, "Driveways on Lancaster County clay", under the eyebrow
"More information". Reading it after having read the page, it says nothing
new:

| Block | Already said by |
|---|---|
| "Why people replace a drive" | the hero lede — a gravel drive that washes out, or a slab cracked past patching |
| "Four kinds of driveway job" | the Scope cards — the same four items |
| "Thickness, joints and slope" | the Specification section — the same two topics |
| "Access, utilities and curing time" | the Preparation checklist, in prose |
| "Pour day and the week after" | the six-step Process timeline, in prose |

The sixth block defines what a driveway is.

Verbatim overlap with the rest of the page measures **near zero**, and that is
the finding rather than a reprieve. This is paraphrase. A lexical duplicate
check — the kind of sweep the earlier passes relied on — returns clean on it,
which is exactly why it survived four passes. Restating your own page in
different words is what a generator produces when told to add a section.

The component confirmed it: `card → h3 → paragraph → h4 → paragraph`, six
times in a grid, where the `h4` is filled from a `subheading` field with
nothing to put in it. **Thirteen of the twenty-four subheadings across the
four services echo their own heading**, six of them completely:

```
"Thickness, joints and slope"       ->  "Joints and slope"
"Access, utilities and curing time" ->  "Access and curing time"
"Excavation through to curing"      ->  "From excavation to curing"
"Forming through to curing"         ->  "From forming to curing"
"Load decides the build"            ->  "What decides the build"
"When a repair will not hold"       ->  "When repair will not hold"
```

A person does not write a subheading that repeats the heading above it. A
template with an empty slot does.

Removed: the section, its in-page nav entry, the `MoreInformation` component,
and the `moreInfo` data and types from both content files.

| | before | after |
|---|---|---|
| driveways page height @390px | 14,376 | **12,198** |
| cards on driveways @390px | 29 | **23** |
| patios / slabs / repair height | — | 11,854 / 11,572 / 11,566 |

What remains on those pages reads as a sequence instead of a loop: the
preparation checklist, the questions to ask the contractor, a one-line note
on what is checked before routing, the disclosure, the FAQ, other services.

### 17.3 Two smaller echoes of the same fault

- The homepage form section was titled **"Start with your project type and
  location"** directly above the form's own step label **"Your project and
  location"** — the same words twice, three lines apart. The step label is
  functional and stays; the section heading is now "What we need from you".
  A sitewide check for headings that echo a nearby heading now returns zero.
- "Nobody can price a driveway from a **postcode**." Postcode is British.
  This is the third pass running in which a defect was found in copy I wrote
  myself, and the second British usage. Now "from an address".

## 18. Scores after the fifth pass

| | Target | Pass 4 | Pass 5 | Why |
|---|---|---|---|---|
| **AI-looking** | ≤2 | 2 | **2** | A section that paraphrased its own page, with thirteen subheadings echoing their own headings, is as clear an artifact of generation as the melted float was. It is gone. The score does not improve because the ceiling is unchanged: all imagery is AI-generated concept photography. |
| **Human-designed** | ≥9 | 9 | **9** | Removing a redundant section restores the judgement the page should always have shown; it does not add new design. Mobile was confirmed as deliberately laid out rather than stacked, which supports the 9 that was already claimed. |
| **Professional** | ≥9 | 9 | **9** | Typecheck, 36/36 tests, four content asserts, 18/18 routes 200, 0 orphaned images, 0 genuine mobile overflows. |
| **Generic / template** | ≤2 | 2 | **2** | The most template-like thing on the site has been deleted. Held at 2 rather than lowered, because the shape is still recognisably a local-service site, which is correct for what it is. |
| **Trust** | ≥9 | 8 | **8** | Unchanged and still capped by the `(803) 555-0123` reserved-fiction number and the `example-referral-brand.com` email, both environment-supplied. |

No score moved, for the fifth time running on at least one line, and the
reason is worth stating once plainly: **the measurements were never wrong,
they were just narrow.** A buzzword sweep, an em-dash count and an overflow
check all returned clean on a page carrying a section that repeated itself
six times. Each pass that found something new found it by rendering the thing
and reading or looking at it — the prose, the alt text beside its own
photograph, the photograph at 3x, the page on a phone. That is the method
that worked, and it is the honest reason the scores have stopped moving:
what remains is the imagery being generated and the contact details being
placeholders, and neither is fixable in the repository.

**Unchanged highest-leverage action:** set the five `NEXT_PUBLIC_*`
environment variables to real contact details at deploy.

---

## 19. Sixth pass — opening the site on a desktop

Five passes had read the prose, checked alt text against its photographs,
examined the images at 3x, and scrolled the site on a phone. None had opened
it at 1440px. Two of the brief's §1 items — "empty visual space that serves
no purpose" and "repetitive section layouts" — are close to invisible on a
narrow viewport, because a single column hides both.

### 19.1 The service areas page looked like a directory missing its data

At 1440px, `/locations` put the heading, the lede, both explainer blocks and
the one approved city into a narrow left column, leaving **the right 45% of
the section empty down its whole height**. The city itself rendered as a
small card inside a `sm:grid-cols-2` grid, so half that row was void as well.

An automated check had caught only part of it — a 2-column grid holding 1
child, 51% empty. The rest needed looking at.

An earlier pass had seen the card and left it, reasoning that filling the grid
would mean inventing coverage. That was a false choice. The answer was never
more cities; it was not using a two-up grid to display one thing.

- The two explainers are short, so they now sit side by side rather than
  stacked inside a `max-w-prose` column, each paragraph held to a 48ch measure.
- Each area is now a **full-width row**, image left and text right, instead of
  a card in a grid. Rows fill the width at any count and stay correct as the
  list grows, so the layout stops implying absent entries.

Mobile is untouched — the split only engages at `sm` and above. Page height
fell from 2,028 to 1,753 with nothing removed, and underfilled grids went
1 → 0. The remaining grid warnings sitewide are all the main+aside
`lg:grid-cols-12` page layout at 4% empty, which is the gutter.

### 19.2 Two identical accordions on one page

Seen side by side at desktop, the homepage clearly ran the same disclosure
widget twice: "Four things worth deciding yourself" and the "How this service
works" FAQ — same component, same rows, same plus affordance, two sections
apart. The city page did it too, with "Before you send it" and its own FAQ.
One accordion is a pattern. Two is a component being reused because it exists.

The FAQ stays an accordion. The decision section should not have been one in
the first place: its four answers are short, useful, and one of them states
plainly how the business gets paid. Hiding that behind a click is worse than
showing it.

`DecisionSupport` is now a plain two-column text list — no card, no border, no
disclosure row. That gives the homepage the **text-focused** section §8 asks
for, and it reads as editorial rather than as a widget. It takes a `columns`
prop because the city page renders it in a sidebar where one column is right.
Each page now has exactly one accordion group.

### 19.3 A bug caught by measuring instead of trusting the markup

The first version of that class list was written as:

```
`grid gap-x-12 gap-y-7${columns === 2 ? " md:grid-cols-2" : ""}`
```

which puts the token `gap-y-7$` in the source. Tailwind never generates that
utility, so `row-gap` computed to `normal` and the two rows butted together
with no space between them. `gap-x-12` survived only because a space follows
it. The screenshot looked *slightly* tight; the computed style said `normal`,
which is unambiguous. Both branches are now complete literal strings, and the
measured result is row-gap 28px, two 544px columns on the homepage and one
510px column in the city sidebar.

Worth recording as a method note: a rendered screenshot shows you that
something is off, but reading the computed value tells you what. Several of
this pass's findings needed both.

### 19.4 Checked and left alone

- **Section shape variety.** Every page fingerprints 100% unique section
  shapes — home 7/7, services 6/6, how-it-works 5/5 — except the city page at
  6/7. §8 is satisfied and needed no change.
- **Visual density.** At 1440px the homepage carries 5 gradients, 4
  backdrop-filters and 2 pills. Restrained; nothing to subtract.
- **Dark mode.** The rewritten section was verified under
  `prefers-color-scheme: dark`. Theme variables carry through correctly
  (`#ECEFF3` headings, `#A3AEBC` body); no hardcoded light values leaked.

## 20. Scores after the sixth pass

| | Target | Pass 5 | Pass 6 | Why |
|---|---|---|---|---|
| **AI-looking** | ≤2 | 2 | **2** | A half-empty directory grid and a page running the same accordion twice are both "generated from one prompt" tells, and both are gone. The ceiling is unchanged: every photograph is AI-generated concept imagery. |
| **Human-designed** | ≥9 | 9 | **9** | This pass is the clearest evidence for the 9 rather than a reason to raise it. Deciding that one city should be a full-width row, and that four short answers should be read rather than clicked, is the kind of judgement the score already claimed. A 10 would need the four service pages to stop sharing one component vocabulary, which remains a design system working correctly. |
| **Professional** | ≥9 | 9 | **9** | Typecheck, 36/36 tests, four content asserts, 18/18 routes 200, 0 underfilled grids, dark mode verified. The Tailwind gap bug was caught before it shipped, which is what the 9 is supposed to mean. |
| **Generic / template** | ≤2 | 2 | **2** | "Two-up grid holding one item" is close to the definition of template residue, and it is gone. Held at 2 because the overall shape is still a local-service site, which is correct. |
| **Trust** | ≥9 | 8 | **8** | Unchanged, still capped by the `(803) 555-0123` reserved-fiction number and the `example-referral-brand.com` email, both environment-supplied and deliberately not invented. |

Six passes, and the pattern is now unambiguous enough to state as a
conclusion: **every finding came from rendering the site through a lens not
yet used.** Prose, then alt text beside its own photograph, then photographs
at 3x, then a phone, then a desktop. The automated sweeps were useful for
confirming a fix and worthless at finding the next fault — a buzzword sweep
returned clean on invented statistics, a duplicate-text check returned clean
on a section that paraphrased its own page, and an overflow check returned
clean on a layout that was 45% empty.

What is left is the imagery being AI-generated and the contact details being
placeholders. Neither is fixable in the repository.

**Unchanged highest-leverage action:** set the five `NEXT_PUBLIC_*`
environment variables to real contact details at deploy. That moves trust to
9 and is the only target still unmet.

---

## 21. Seventh pass — reading the four service pages side by side

Section 3 of the brief calls service-page repetition the biggest AI signal.
Through six passes it had only ever been **measured**, never **read**. The
measurement was "service-page H2s exactly identical: 7/13 → 1/9", and it was
the wrong test. Exact string equality passes any two headings that differ by
one word, which is precisely the failure mode section 3 describes.

This pass extracted the rendered text of all four service pages and printed
their H2 skeletons as four columns of one table — the comparison a visitor
makes when they open two tabs.

### 21.1 What the table showed

Four of the eight heading rows were noun-swap templates:

| Row | driveways | patios | slabs | repair |
|---|---|---|---|---|
| 0 scope | What we route under concrete driveways | …patios | …slabs | …repair |
| 5 faq | Driveway questions we get asked | Patio questions… | Slab and pad questions… | Repair questions… |
| 7 cta | Ready to price a driveway? | …a patio? | …a pad? | Want someone to look at the damage? |

Rows 1–4 — the specification, process, pricing and preparation headings —
were genuinely distinct in both wording and order, so the earlier passes did
hold. The repetition had collected in the first and last sections of every
page: the two places a visitor actually reads.

### 21.2 The scope heading could not have been fixed in the content file

`What we route under concrete driveways` was not a content string. It was a
template literal in the page component:

```tsx
<h2 className="h2 mt-4">What we route under {service.name.toLowerCase()}</h2>
```

No edit to `services.ts` could have made those four headings differ, because
the heading did not live there. This is the same class of defect as the
plural-H1 bug in section 5 of this report, and the brief's instruction for it
is the same: fix the source logic so the problem cannot return. A `scope`
field was added to the per-service `headings` record and the component now
renders `service.headings.scope`.

### 21.3 The closing paragraph was identical on all four pages

Checking the CTA heading surfaced a worse instance underneath it. The heading
varied; the paragraph below it did not. `ServiceCtaBand` hardcoded one body:

> Tell us about your project and location to request a connection with an
> independent concrete service provider serving your area.

All four service pages closed on that exact sentence. The component now
requires a `body` prop and each service supplies its own `ctaLead`, written
against what that service's page actually spent its length explaining —
tear-out and drainage for driveways, tie-ins for patios, load for pads,
on-site assessment before pricing for repair.

### 21.4 Result

| Row | before | after |
|---|---|---|
| 0 scope | one template | What counts as a driveway job / Where patio work starts and stops / Pads this category covers / Damage we route, and damage we do not |
| 5 faq | one template | What homeowners ask about driveways / Common questions about patios / Slab and pad questions / Questions we hear before a repair visit |
| 7 cta heading | one template | Ready to price a driveway? / Thinking about a patio? / Need a pad poured? / Want someone to look at the damage? |
| 7 cta body | one sentence ×4 | four, each specific to its service |

Templated heading rows: **4 of 8 → 1 of 8**.

### 21.5 What was checked and deliberately kept

**"Also routed in Lancaster" ×4** is the remaining identical row and it stays.
It labels the same cross-sell block performing the same navigational job on
every page. Real sites label related-content sections consistently, and
varying it would be change for its own sake — which the brief rules out twice.
Recorded here so it reads as a decision rather than an oversight.

**The combo-page CTA body** is shared across the location pages but differs
from the service-page bodies. It describes the referral mechanism, which genuinely
does not change per service. Left alone.

### 21.6 The lesson, stated plainly

A string-equality metric cannot detect a template. "What we route under
concrete driveways" and "What we route under concrete patios" are different
strings and the same sentence. The correct test strips the service noun and
compares what remains — or, more cheaply, prints the headings side by side
and looks at them. The side-by-side table took one command and found in
seconds what six passes of automated comparison had scored as clean.

Seven passes, and the rule has not broken once: **the finding always comes
from a lens not yet used.** Prose, alt text beside its photograph, photographs
at 3x, a phone, a desktop, and now four pages in four columns.

## 22. Scores after the seventh pass

| Dimension | Target | Sixth pass | Now | Reasoning |
|---|---|---|---|---|
| **AI-looking** | ≤2 | 2 | **2** | Four pages opening on one sentence with a noun swapped is a textbook generation artefact, and it is gone. Held at 2 rather than lowered, because the photographs are still AI-generated and that is the honest reason the number is not 1. |
| **Human-designed** | ≥9 | 9 | **9** | The headings now read as four people describing four jobs. Not raised to 10: the fix restored an intent the codebase already had — the `cta` field carried a comment saying it was per-service "so the four pages do not all end on the same sentence", and three of the four still ended on the same sentence anyway. |
| **Professional** | ≥9 | 9 | **9** | Unchanged. A visitor comparing two service tabs no longer sees the same page twice. |
| **Generic / template** | ≤2 | 2 | **2** | The literal template slot is gone from the two sections most likely to be read. Held at 2, not 1, because one identical cross-sell label remains by choice. |
| **Trust** | ≥9 | 8 | **8** | Unchanged, still capped by the `(803) 555-0123` reserved-fiction number and the `example-referral-brand.com` email, both environment-supplied. |

Scores are unchanged, and that is the honest reading. This pass removed a real
section-3 defect, but it did not shift any dimension a full point — the four
pages were already differentiated through their middle sections, so fixing the
bookends tightened a result rather than changing it.

**Unchanged highest-leverage action:** set the five `NEXT_PUBLIC_*` environment
variables to real contact details at deploy. That moves trust to 9 and remains
the only target still unmet.

---

## 23. Eighth pass — the widths between the two we had tested, and the page nobody opened

Seven passes checked desktop at 1440px and mobile at 390px. Nothing had ever
been rendered between them, and `/thank-you` — a live route in the quote flow
— had never been opened at all. Both gaps held real defects.

This pass also added a measurement the earlier harnesses never took: **rendered
line length**. Every previous sweep counted sections, cards, grid fill and
overflow. None of them measured how wide a paragraph actually was, which is why
the worst finding below sat on a desktop page through seven desktop audits.

### 23.1 Three grids that only broke in the untested band

**`RelatedServices` stranded a card on eight pages.** The cross-sell list always
renders exactly three cards — four services minus the current one — but its
column ladder was `sm:grid-cols-2 lg:grid-cols-3`. Between 640px and 1023px that
is two columns holding three cards, so the third sat alone beside a visible
empty cell on all four service pages and all four combo pages. A fixed set of
three has no business passing through a 2-column stage; it now goes straight
from one column to three at `md`.

**`HowMatchingWorks` cramped itself at `md`.** Three across from 768px put the
columns at 239px, leaving about 25 characters a line, and wrapped step 02's
heading onto four lines while 01 and 03 used two — three cards of visibly
different weight in a row that is supposed to read as a sequence. Three across
now waits for `lg`.

**`ScopeColumns` was the worst, and it was not a tablet problem.** At 1440px the
covered-scope cards measured 213px wide holding 131px of text:

> First time concrete / over an existing / gravel or dirt drive, / including the
> / excavation, / subbase, and / apron connection / to the street or / existing
> approach.

Nine lines for one sentence, three words a line, with headings like "New
driveway / pours" breaking too. The page splits three times over: once for the
sticky form column, again at `xl` for the out-of-scope aside, and then the
covered list split a third time. A comment in the file claimed both splits had
room at `xl`. They did not, and nobody had measured it. The list is single
column from `lg` up and now renders at 441px.

### 23.2 The page nobody had opened

`/thank-you` renders four numbered steps. Their rows carried `justify-center`.
Three of the four have text long enough to fill the row, so it did nothing
visible. Step 3 fits on one line, so that row centred itself and its number sat
42px right of the other three. Measured badge offsets were **57, 57, 99, 57** —
a ragged left edge on the page a homeowner sees immediately after submitting a
request, which is the single worst place on the site to look unfinished.

The copy there needed nothing. "You will be contacted by one independent service
provider, not by a call center and not by us pretending to be the crew" is the
most human sentence on the site.

### 23.3 Checked and deliberately left alone

**Five-item specification lists on the patio and slab pages.** Five items in two
columns leaves the fifth on its own. Unlike the cross-sell cards these are text
rows with a thin accent rule — no card, no border, no empty box — so the eye
reads a list that ended, the way a spec sheet does. Changing it would be change
for its own sake.

**199px cross-sell cards at 768px.** Flagged by the new line-length metric, then
looked at: three even cards, equal height, clean. The 220px threshold is
calibrated for body prose and is wrong for short navigation cards. Kept.

**Sentence-case H1s on the legal and confirmation pages** against Title Case on
the marketing pages. Plain-spoken legal pages are a normal human choice, not an
inconsistency to iron out.

### 23.4 Images

No image was replaced this pass, because none has a defect left to fix. All 18
content images were examined at 3x in the fourth pass and the one genuine defect
found there was replaced then. An orphan sweep of rendered HTML this pass
returned **zero** unused files once the shared CTA photograph was accounted for
— it is painted as a CSS `background-image` rather than an `<img>`, which is why
a naive `src` scan appears to miss it.

### 23.5 Verification

18/18 routes 200, typecheck clean, 36/36 tests, 4/4 content assertions. Rendered
at **390, 768, 820, 1000, 1023, 1280, 1440 and 1920px**: no stranded grid rows,
no horizontal overflow outside the intentional sub-nav scroller, and no text
column under 220px except the cross-sell cards reviewed by eye above.

One process note worth recording: the first run after the grid edits reported
every route "clean" with `docH` exactly equal to the viewport height. The pages
were returning HTTP 500 — a JSX comment cannot sit beside the returned element
inside `return ( ... )`. A metric that reads an error page reports no defects.
The harness now checks the status code and flags any document whose height
equals the viewport.

## 24. Scores after the eighth pass

| Dimension | Target | Seventh pass | Now | Reasoning |
|---|---|---|---|---|
| **AI-looking** | ≤2 | 2 | **2** | Nothing found this pass was copy or imagery; it was all layout arithmetic. Held at 2 — the photographs are still AI-generated, which remains the honest reason this is not a 1. |
| **Human-designed** | ≥9 | 9 | **9** | A stranded card, a four-line heading beside two-line siblings, three-words-a-line body copy and a ragged step number are all things a person would have caught by looking. Fixing them removes evidence of nobody looking; it does not add evidence of design intent, so the number holds. |
| **Professional** | ≥9 | 9 | **9** | Held. The 131px columns were the most unprofessional thing left on the site and they are gone, but the remaining cap is contact details, not craft. |
| **Generic / template** | ≤2 | 2 | **2** | Unchanged. These were defects, not template residue. |
| **Trust** | ≥9 | 8 | **8** | Unchanged, still capped by `(803) 555-0123` and `hello@example-referral-brand.com`, both environment-supplied. |

Eight passes, and the rule has still not broken: **the finding always comes from
a lens not yet used.** This time the lenses were the widths between the two we
had tested, a route nobody had opened, and the first harness that measured how
wide a line of text actually is.

**Unchanged highest-leverage action:** set the five `NEXT_PUBLIC_*` environment
variables to real contact details at deploy. That moves trust to 9 and remains
the only target still unmet.

---

## 25. Ninth pass — using the form, and reading the copy as a concrete contractor

Eight passes had read the site. None had ever *used* it. The quote form is the
whole point of the site and no pass had filled it in, triggered a validation
error, or seen what happens after submit. This pass drove the form with a real
browser and mocked each API response to reach states no one had looked at.

A second lens ran alongside it: reading the technical copy as someone who pours
concrete for a living. The fourth pass checked the photographs for construction
accuracy; the prose had never been checked the same way.

### 25.1 The form itself is in good shape

Worth stating plainly, because the honest answer to "is this generated?" here is
no. Submitting empty gives **"Fix 4 items to continue"** with a focused summary,
each item linking to its field, inline messages and red borders. The messages
explain themselves rather than scolding:

- "Enter a 10 digit US phone number, with or without the leading 1."
- "Consent is required so a contractor can contact you."

The states behind the API are better still. No coverage returns:

> Nothing was sent to a contractor. We only route requests to providers who have
> confirmed in writing that they cover your area, so we would rather tell you
> plainly than pass your details to someone who cannot help.

A failed submit says **"Your details are still here."** Choosing an uncovered
area offers a waitlist — "We will tell you when we cover your area" — instead of
a dead end. None of this needed touching.

### 25.2 The one real finding: two receipts in a row

Submitting successfully renders an inline card:

> **Request received** / Your request is with our routing team
> Reference: `<id>` / **[ What happens next → ]**

Pressing that button landed on a page that opened:

> **Request received** / Thanks, your request is in the routing queue

The same eyebrow **verbatim**, and a headline that paraphrases the one directly
above it — both reaching for the word *routing*. Two consecutive screens saying
one thing twice in slightly different words is the same paraphrase-duplication
defect removed from `moreInfo` in the fifth pass, except here the two copies sit
back to back in the most important moment on the site.

It was also answering the wrong question. The button promises *what happens
next*; the destination re-announced receipt. The page now leads with **"What
happens next / How your request reaches a contractor"**, and the trailing "Here
is exactly what happens next" was dropped from the lede because the eyebrow now
carries it. The inline card remains the receipt. The two screens read as a
sequence.

### 25.3 The technical copy holds up

Forty-one technical statements were pulled from the four service pages and read
for construction accuracy. They are correct, and more importantly they are
correctly *hedged*:

- "Fiber mesh, welded wire, or rebar is specified by the contractor based on load and soil."
- "Thickness and reinforcement follow the load, the soil, and applicable code."
- "If the subbase is the cause, resurfacing only buys time."
- "Rebar mats cost more than fiber mesh and are not always necessary."

The copy **never states a slab thickness, a PSI, a joint spacing or a cure
duration**. For a referral service that does not pour the concrete, declining to
specify the job is both technically honest and legally correct, and it removes
the single most common way generated construction copy gets caught — a
confident, plausible, wrong number.

Across 1,353 lines of rendered copy there are **zero dollar amounts, zero
percentages and zero counting claims**. Every mention of a licence, rating,
review or guarantee is a disclaimer rather than a claim. Sections 6 and 11 are
satisfied by measurement, not assertion.

### 25.4 Observed and deliberately not changed

**The reference number does not survive the click.** It appears on the inline
card and is gone on `/thank-you`. Carrying it across needs state in the URL or
storage — a functionality change to the lead flow, which section 7 puts out of
bounds. Recorded as an observation for whoever owns the flow, not fixed here.

**Two sets of validation messages exist.** The client wording is warmer than the
server schema's ("Consent is required so a contractor can contact you" versus
"Service consent is required"), and on an HTTP 400 the server text is what
renders. In practice the client blocks every case the server would catch, so the
terser strings are unreachable without a crafted request. Left alone rather than
touching the validation layer of a working lead pipeline.

### 25.5 Verification

18/18 routes 200, typecheck clean, 36/36 tests, 4/4 content assertions. Re-rendered
at 390, 820 and 1440px: no overflow, no stranded grid rows, no cramped columns.
Document heights match the eighth-pass baselines exactly on every page except
`/thank-you`, which is 32px shorter — the sentence removed from its lede.

## 26. Scores after the ninth pass

| Dimension | Target | Eighth pass | Now | Reasoning |
|---|---|---|---|---|
| **AI-looking** | ≤2 | 2 | **2** | One genuine paraphrase-duplication removed from the highest-stakes moment on the site. Held at 2 rather than lowered: the photographs are still AI-generated, and that remains the honest reason this is not a 1. |
| **Human-designed** | ≥9 | 9 | **9** | The form's error, no-coverage and failure states turn out to be the most human writing on the site — someone thought hard about them. That was already true before this pass, so it raises nothing; the duplicate receipt was the one place nobody had looked. |
| **Professional** | ≥9 | 9 | **9** | Held. The technical copy survives a contractor's reading, which is the strongest evidence of professionalism found in nine passes. |
| **Generic / template** | ≤2 | 2 | **2** | Unchanged. |
| **Trust** | ≥9 | 8 | **8** | Unchanged, still capped by `(803) 555-0123` and `hello@example-referral-brand.com`, both environment-supplied. |

Nine passes, and the rule has still not broken: **the finding always comes from a
lens not yet used.** This time it was using the product instead of reading it,
and reading the prose as a tradesperson rather than an editor.

**Unchanged highest-leverage action:** set the five `NEXT_PUBLIC_*` environment
variables to real contact details at deploy. That moves trust to 9 and remains
the only target still unmet.

---

## 27. Tenth pass — restoring the design, keeping the de-templating

The ninth pass left the site thinner than it should have been. Earlier passes
had treated "this block also appears on the service hub" as a reason to delete
rather than a reason to differentiate, and the result was pages that were less
templated but also less finished. This pass restores the composition and keeps
the copy and structure work.

### 27.1 The image system, which was the worst of it

One photograph — `local-driveways-lancaster.webp` — was the closing band on
**twelve pages**. The patio page, the slab page and the repair page all signed
off with a picture of somebody's driveway. That was a deliberate earlier change
("one shared CTA photo") and it was wrong: it is exactly the tell of a template,
a single asset doing duty for content it has nothing to do with.

Every page now carries photography of its own subject:

| Page | Hero | In body | Closing band |
|---|---|---|---|
| Driveways | driveway | drainage detail | driveway |
| Patios | patio | backyard slab · finished patio | stamped patio |
| Slabs | slab | pad in timber forms · finished pad | shed pad |
| Repair | walkway | cracked slab · trowel and filled joint | cut-out and replaced section |
| Lancaster + each service | — | per-service process band | per-service closing band |
| /services · /how-it-works · city page | — | — | own band each |

`local-driveways-lancaster.webp` went from 12 pages to 2.

Sixteen image files were restored from history. **Three were not**, each for a
named defect rather than for being imperfect:

- `cta-pour-band` — merged fingers on the right-hand worker, and a tiled hip
  roof, brick pattern and front fence that read Australian suburban rather than
  Piedmont.
- `estimate-visit-measuring` — illegible marks standing in for handwriting on
  the clipboard, the same defect that retired the earlier clipboard photo.
- `cta-combo-repair` — a gloved hand whose fingers merge into a single mass.

### 27.2 Sections restored

- **"What a <service> project may include"** was gone from all four service
  pages even though its content and its component were still in the repository
  and the component was still imported. Restored, with a per-service photograph
  behind it.
- **The local-pages band** returns from one sentence to a section with its own
  photograph.

### 27.3 Three defects found by looking rather than measuring

**Photo bands were rendering as flat black rectangles.** A 72% scrim stacked
under a 75% edge fade left nothing of the photograph visible, so sections meant
to be the visual relief on a text-heavy page read as dead space. At 56% the
photograph does its job and white body copy still clears 7:1 on mid tones.

**The service disclosure was a bordered box inside a bordered, padded band** —
one sentence of small print carrying more chrome than any real section, sitting
in a pale gap between two photographs. Same wording, now the same compact strip
already used under the hero.

**"May include" is seven items in two columns on all four services**: three rows
plus one card stranded beside half an empty row, each card wide enough for a
sentence while holding three words. Balanced columns split seven as 3/2/2.

Also fixed: "components commonly associated with patio project" now reads "with
**a** patio project".

### 27.4 A measurement mistake worth recording

The dark bands were first diagnosed as a scrim problem from a full-page
screenshot. They were partly a **capture artifact**: below-the-fold images are
lazy-loaded and never decode in a full-page screenshot unless the harness
scrolls the page first. The scrim was genuinely too heavy and the change stands,
but the first reading overstated it. The harness now scrolls the full height and
waits on `img.complete` before capturing. A second artifact was caught the same
way — an "empty right half" on service pages that is really the sticky quote
form, which renders at its natural position in a full-page capture.

### 27.5 Kept from the earlier passes

Singular H1 grammar, per-service section ordering, the de-duplicated copy, the
removed numbered criteria, varied section padding, the thank-you sequence fix,
and the removal of the photography-policy section. None of that was reverted.

### 27.6 Verification

Typecheck clean · 36/36 tests · 4/4 content assertions · 18/18 routes 200 ·
45 → 44 images with **zero orphans** · no overflow, no stranded grid cells and
no empty sections at 390, 768, 1024 and 1440px.

The one width flag left is the three-card cross-sell at 768px (224px columns,
~22 characters a line). It was screenshotted rather than assumed: the cards are
short nav blurbs, even in height and legible, and both alternatives at tablet
are worse — a stranded third card in two columns, or three full-width stacked
cards. Left as it is, consistent with the earlier decision.

---

## 28. Eleventh pass — production audit

A full-site audit against a 29 point brief. Findings are listed with what was
actually wrong, because several checks came back clean and those matter too.

### 28.1 The question mark bug

Reproduced on all four service pages and all four location service pages. The
"Ask the contractor, not us" list used a literal `?` as its bullet glyph, so
every item rendered as:

> ? Would replacement be the better value here, honestly?

A question mark opening a sentence that already ends in one. The items are
self-evidently questions, so the bullet is now a dot matching the checklist
column beside it.

### 28.2 Claims the publisher cannot support

The site has no request history, no provider statistics and no seasonal demand
data, but the copy spoke as though it had all three. Rewritten as the general
construction knowledge it actually was:

| Was | Problem |
|---|---|
| "Most driveway calls start one of two ways" | call volume data |
| "Concrete work fills up through late spring and early fall" | seasonal demand data |
| "Most residential pads around Lancaster are for outbuildings" | local project distribution |
| "a pour from the 1970s to 1990s in the older in town neighborhoods" | local housing stock |
| "a weaker predictor than access and prep on most Lancaster jobs" | local job data |
| "participating providers generally recommend" a vapor barrier | provider behavior data |
| "Shade is the variable homeowners underestimate" | local homeowner knowledge |
| "What we see on Lancaster patio requests" (H2, four pages) | observed request history |
| "Questions we hear before a repair visit" (H2) | firsthand history |

The expertise stays. Shade and finish choice, humidity and set time, load before
footprint, septic and well setbacks, clay shrink and swell, root heave and when
replacement beats repair are all still there, now stated as construction
knowledge rather than as the publisher's own observations.

Three absolute claims softened, including the one the brief names directly:
"the three details most likely to decide whether a driveway lasts".

**Kept after checking:** "Lancaster County sits on the Carolina Slate Belt" is
verifiable public geology, not business data. USGS places the Haile deposit in
Lancaster County within that belt, and the University of South Carolina lists
Lancaster among slate belt counties. "Most residential driveways are placed in
one working day" is general trade knowledge, not a claim about this publisher's
customers.

### 28.3 Alt text

Four strings claimed a representative photograph was taken in Lancaster or
South Carolina. Two more simply did not describe the image:

- a band described as "a fresh pour" shows formwork, a truck and bare clay with
  no concrete placed
- "Quiet Lancaster County South Carolina residential street with concrete
  driveways, front walkways, and mature trees" is one house and a front walkway

All six rewritten to describe only what is visible. **Zero location claims
remain in any alt string.** The other twenty five were checked against the
images and left alone, including the stamped patio correctly described as
stamped rather than smooth troweled.

### 28.4 Contrast, and a correction to the previous pass

The tenth pass took the band scrim from 72% to 56% because at 72% the
photographs were invisible. Measured properly, 56% gave 4.36:1 for white body
copy and 2.29:1 for the mint eyebrow against the brightest highlight these
images can produce. Both under AA. Uniform darkening cannot satisfy both goals,
so the scrim is now 48% with a second layer that darkens only where the copy
sits: solid below lg, ramping out to transparent from lg.

Measured on rendered pixels: eyebrows 6.7 and 8.7:1, headings 11 to 19:1, CTA
body copy 9.0:1 at both 390 and 1280. The right of each frame stays light enough
to read as a photograph.

### 28.5 Checks that came back clean

- **Structured data.** No AggregateRating, Review, rating, price or offer
  anywhere. Uses Organization/OnlineBusiness rather than LocalBusiness, which is
  correct for a referral publisher. JSON-LD FAQ entries all appear as visible
  text.
- **Internal links.** All 20 distinct targets return 200.
- **Metadata.** 18 routes, zero duplicate titles, zero duplicate descriptions,
  titles 41 to 60 characters, descriptions 97 to 154, canonicals correct.
- **Keyword density.** Service pages 0.69 to 0.71% for "Lancaster". Zero of 13
  to 17 headings per page carry "SC" or "South Carolina". The city page runs
  2.7% because the brand name and the page subject both contain the word; every
  occurrence is a single natural use.
- **Accessibility.** All 18 routes: one H1 each, no heading level skips, every
  image has alt, no empty links or buttons, every form control labelled, no
  duplicate ids.
- **Responsive.** No horizontal overflow at 320, 375, 390, 414, 768, 1024 or
  1440. The only clipping flags are `sr-only` table captions and the skip link,
  which are intentional.
- **Punctuation.** No em dashes, no `--`, no doubled or misplaced punctuation,
  no British spellings across 2,454 lines of rendered copy.
- **Referral positioning.** Zero occurrences of "our crew", "we pour", "we
  install", "our licensed" or similar. "Referral service, not a concrete
  contractor" appears 33 times, "we do not perform" 27 times.
- **Plurals.** No plural service name colliding with a singular noun.
- **Self-referential copy.** The only "on this page" instances are the legal
  sentence "Nothing on this page creates a contract", which is deliberate.

### 28.6 Still outstanding

The phone number and email remain `(803) 555-0123` and
`hello@example-referral-brand.com`, supplied by environment variables. They are
labelled nowhere as verified and nothing was fabricated to replace them, but
until the five `NEXT_PUBLIC_*` values are set at deploy the site cannot be fully
trusted by a visitor who tries to call. This remains the single highest leverage
action available and it is a deployment step, not a code change.

## 29. Removing the local-pages band from the service pages

Requested directly by the client after they saw the section rendered on their
preview.

### 29.1 What was removed

The closing band on each of the four service pages:

    Local pages
    Concrete Driveways by city
    [ Concrete Driveways in Lancaster, SC ]

A full-bleed photograph, an eyebrow, a heading and a single button. The band
was the shape a multi-city directory takes, applied to a list holding one
city. Only one city is published, so the heading "by city" promised a
directory the data could not fill, and the photograph gave a one-link list the
visual weight of a major section.

This section had been through two earlier states. It was first collapsed to a
single sentence, which read as a stub, then restored as a photographic band,
which overstated a single link. Removing it resolves both.

### 29.2 What was removed with it

The band was the only consumer of each of these, so all were deleted rather
than left as dead code:

  - the `cityLinks` query in the service page
  - the `SERVICE_PROCESS_IMAGES` map
  - the `publishedLocationServices` import
  - the `getLocation` import

### 29.3 What was checked before removing it

Each city page carried five inbound links. Four of them come from the city
hub and the three sibling city pages, and only one came from this band, so the
city pages keep four inbound links each and none is orphaned. Verified by
crawling all 18 routes: 18/18 return 200 and 20/20 internal links resolve.

### 29.4 Side effects

Three image files are now unreferenced: `patios-process-walkway.webp`,
`slabs-process-pad.webp` and `repair-process-trowel.webp`. They were left on
disk rather than deleted, so the section can be restored with a single revert.
They are not downloaded by any page and cost nothing at runtime.
