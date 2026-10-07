# Full Website Audit — 6 October 2026

**Scope:** every route, desktop (1440×900) and mobile (390×844), dark scheme.
**Method:** 17 routes captured full-page in both viewports, DOM measured in a
real browser, all 33 content images inspected (6 at 3–5× zoom), copy extracted
and analysed statistically.
**Nothing was modified.** No image, string, token, route or component changed.
This file is the only thing written.

Commit audited: `a433334`. Dev build, env values from `.env.example`.

---

## Executive summary

The thing most people expect to find — slop copy — is **not** what is wrong
here. The prose has zero buzzwords, zero em dashes, zero exclamation marks, and
in places it is genuinely expert ("Heavy clay in Lancaster, SC makes that
preparation matter"). Someone wrote this.

What makes the site read as machine-made is **structural**, and it is severe:

1. **Four service pages are the same page.** 19 sections, 38–39 cards, ~2,000
   words each, and an H3 ladder that is 100% identical with one noun swapped.
2. **A homepage section explains the site's own photography policy.** This is
   the single most damaging element — it tells the visitor to doubt the images.
3. **Hero photos are invisible.** They render at mean brightness 26–46/255
   against a raw value of 151. The site carries nine photographs the visitor
   cannot see.
4. **Several prominent images have genuine AI artifacts** — illegible
   handwriting, a clipboard clip that resolves into metal shards, driveways with
   no control joints.
5. **Pages are enormous.** 11,538px desktop, 18,058px mobile (21.4 screens) —
   past the 16,384px limit a browser will even screenshot.

Fix the structure and the image handling and this becomes a credible local
business site, because the writing underneath is already there.

---

## 1. Visual design

### What the design system actually does (measured, not impressions)

| Property | Measured | Reading |
|---|---|---|
| Border-radius tokens | **2** (`--radius-card:12px`, `--radius-control:10px`) + `rounded-full` for pills | Disciplined. Not the 6-radius soup of a template. |
| `box-shadow` utilities | **0** | Genuinely restrained. |
| Gradient utilities | **5** total site-wide, 1 CSS gradient | Minimal. No "AI gradient" problem. |
| `backdrop-filter` | 2 places (header, process-step card) | Restrained. Not glassmorphism-everywhere. |
| Accent colours | **1** green (`#0b6b45` light / `#3fc98a` dark) | Single accent. No neon, no rainbow. |
| Typeface | Geist Sans only | Consistent. |

**This is the strongest part of the site and should not be touched.** The brief
asked me to look for excessive rounding, gradients and glass. They are not
there. Anyone reporting otherwise is pattern-matching rather than measuring.

### Where the visual design does look machine-made

**1.1 — The eyebrow→H2→lede→content rhythm, 18 times on one page. HIGH**

Every single section opens identically: a small uppercase green label, then a
large heading, then a 2–3 line grey lede, then the content. On
`/services/concrete-driveways` there are **18** such labels:

> Lancaster County, South Carolina · Routed for · Coverage today · Typical site
> visit · Cost to you · Scope · Specification · Process · Pricing · Preparation ·
> How routing works · Step 1 of 2 · More information · Include · How it works ·
> Local pages · FAQ · Other services

A human designer varies the entry into a section — some sections open cold on a
heading, some on an image, some on a number, some on a sentence. Eighteen
identical openings is a loop with a `.map()` in it, and it reads that way.

**1.2 — Card density. HIGH**

Measured in the DOM, not guessed:

| Page | Sections | `.card` elements | Images |
|---|---|---|---|
| `/services/concrete-driveways` | 19 | **39** | **3** |
| `/locations/lancaster-sc` | 9 | 16 | 7 |
| `/` | 10 | 15 | 7 |

39 bordered rounded containers on one page, with only 3 images to break them
up. Every idea on the site — a step, a price factor, a question, a checklist
item, a service, a cross-link — is wrapped in the same 12px-radius box. When
every piece of content gets identical packaging, the eye stops finding hierarchy
and the page reads as generated rows rather than designed content.

**1.3 — Hero photographs are scrimmed into nothing. HIGH**

I measured the right half of each hero (the half with no text over it):

| Page | mean (0–255) | stddev |
|---|---|---|
| `/locations` | 27 | 12 |
| `/locations/lancaster-sc` | 26 | 14 |
| `/services` | 29 | 17 |
| `/services/concrete-driveways` | 32 | 17 |
| `/how-it-works` | 35 | 14 |
| `/` | 40 | 15 |
| **raw source file, unscrimmed** | **151** | **59** |

The photographs transmit roughly a quarter of their original detail. On
`/locations` and `/locations/lancaster-sc` the hero is effectively a flat
charcoal panel. The site pays for nine photographs — download weight, and the
risk that one of them looks synthetic — and shows the visitor almost none of
them. A designer either commits to the photograph or removes it.

**1.4 — Three numbered sequences on the homepage explaining one process. HIGH**

- "Three steps, no obligation" → cards `01 02 03`
- "How your request reaches an independent provider" → cards `01 02 03 04`
- "What happens after you submit" → list `1 2 3 4`

All three describe the same routing flow. Numbered step-cards are the single
most recognisable AI-template component, and this page has three sets of them
within 3,000px.

**1.5 — Two FAQ accordions on the homepage. MEDIUM**

"Questions worth settling before you call" (4 items) and "Straight answers"
(5 items), visually identical, two sections apart. The split is logical
(project questions vs service questions) but nothing communicates that logic, so
it looks like the generator emitted the FAQ component twice.

**1.6 — Scaffolding visible where content is missing. HIGH**

- **"Areas we currently serve"** — a full-width section with eyebrow, H2, lede,
  footnote… and **one pill reading "Lancaster, SC."**
- **"Concrete Driveways by city"** — a full section containing **one link.**

These are multi-city components rendering a single row. A human building a
one-city site writes a sentence; they do not ship an empty directory UI. This is
the clearest "generated from a template that expected more data" tell on the
site.

**1.7 — The section sub-nav is clipped at desktop width. MEDIUM (defect)**

The in-page tab bar measures `scrollWidth 1258` against `clientWidth 1136` at
**1440px desktop**, and 1258 against 350 on mobile. It is horizontally
scrollable with no fade, arrow or any affordance, so the last tab is simply cut
in half. On mobile the screenshot shows "What's covered / More information /
May in…" sliced mid-word.

---

## 2. Content and copy

### What is genuinely good (measured)

Across all 711 body sentences on the site:

| Tell | Count |
|---|---|
| Buzzwords (seamless, leverage, elevate, unlock, robust, tailored, trusted, peace of mind, top-notch, transform, solutions, expertise…) | **0** |
| Em dashes | **0** |
| Exclamation marks | **0** |
| "Not just X, but Y" constructions | **2** |
| Sentence length | mean 14.1, median 13, **stdev 6.6**, range 4–41 |

That is a healthy human distribution, and the near-total absence of marketing
vocabulary is unusual and valuable. Specific lines that could only have been
written by someone who understands the trade:

> "Concrete cracks, so well placed joints control where that happens."
> "A drive that sees a heavy truck is not built like one serving a single sedan."
> "Others are widening a drive that is too narrow, correcting runoff that heads
> for the garage."
> "A category nobody has accepted produces an honest no coverage answer."

The FAQ questions are real customer questions, not SEO bait: *"Do I need a
permit in Lancaster County?"*, *"Why does clay soil keep coming up?"*, *"Will I
be called repeatedly?"*, *"Is there a Lancaster office I can visit?"*

### Where the copy betrays generation

**2.1 — The photography policy section. HIGHEST SINGLE PRIORITY**

On the homepage, between the referral form and the FAQ:

> **PROJECT PHOTOGRAPHY**
> ## Representative quality details, built on transparency
> **PHOTOGRAPHY POLICY**
> ### Concept imagery for reference — verified portfolios on request.
> We use clear illustrative concrete photography to showcase project standards,
> never claiming direct execution. Authentic contractor portfolio photos are
> published only after source, ownership, and permission verification.

Four problems, any one of which would be disqualifying:

1. **No real business explains its image-sourcing policy on its homepage.** This
   is meta-commentary about the website rather than content for a customer. It
   is the most reliable signal on the entire site that the site was assembled
   rather than built.
2. **It actively instructs the visitor to distrust the images.** A homeowner who
   had not thought about the photos now knows they are not real work. It creates
   precisely the suspicion this audit was commissioned to find.
3. **"Representative quality details, built on transparency" means nothing.** It
   is the only genuinely empty phrase on the site — abstract noun, abstract
   noun, abstract virtue.
4. **It is the only eyebrow pair hard-coded in capitals** (`PROJECT
   PHOTOGRAPHY`, `PHOTOGRAPHY POLICY`) while all 16 others are sentence case
   rendered uppercase by CSS. Authoring inconsistency proving the section was
   bolted on separately from the rest of the page.

The underlying honesty is correct and should be preserved — but its home is the
referral-disclosure page, in one line, not a homepage section.

**2.2 — Four service pages that are one page. HIGH**

| | Service pages | Combo pages |
|---|---|---|
| H2s byte-identical across all four | **7 of 13** | **7 of 10** |
| H3 ladder | **100% identical** except the service noun | — |
| Word counts | 2047 / 1976 / 1921 / 1930 | 1353 / 1307 / 1274 / 1296 |

The identical H3 ladder on every service page:

> What a concrete {X} project is · Common reasons homeowners request it ·
> Typical project types · Important considerations · What to know before
> starting · How a project generally runs · Why planning matters

Word counts within 6% of each other across four pages is a statistical
fingerprint of generation. Real pages about different products are different
lengths because different products need different amounts of explanation.

**2.3 — Sentence-level duplication across the site. HIGH**

Of 323 distinct sentences of 6+ words, **87 (27%) appear on two or more pages.**
The eligibility block appears **verbatim on 11 pages**:

> "Participating providers confirm in writing which areas they accept work in."
> "Coverage is never inferred from a radius drawn on a map."
> "Your project type is matched against the categories a provider has agreed to receive."
> "A category nobody has accepted produces an honest no coverage answer."
> "Your details go to a single participating provider rather than a list of companies bidding against each other."

Some repetition is legitimate legal boilerplate. But these four paragraphs are
*marketing* content rendered identically on eleven pages. A visitor who reads two
pages has read the same site twice.

**2.4 — Grammar bug that proves string concatenation. HIGH**

Three of the four combo-page H1s are ungrammatical:

- "Concrete **Driveways Referrals** in Lancaster, SC"
- "Concrete **Patios Referrals** in Lancaster, SC"
- "Concrete **Slabs Referrals** in Lancaster, SC"
- "Concrete Repair Referrals in Lancaster, SC" ← only this one works

`${service.name} Referrals` produces plural-noun + plural-noun. A human writing
four headlines would have written "Concrete Driveway Referrals." This is a
visible-in-the-H1, visible-in-the-SERP artifact of template assembly.

**2.5 — The rhetorical SEO opener, five times. MEDIUM**

> "Looking for a concrete driveway contractor in Lancaster, SC?"
> "Looking for a concrete patio contractor in Lancaster, SC?"
> "Looking for a concrete repair contractor in Lancaster, SC?"
> "Looking for a concrete slab contractor in Lancaster, SC?"
> "Looking for concrete services in Lancaster, SC?"

Opening by restating the visitor's search query back at them is the oldest
SEO-copy formula there is. It signals "page written for a keyword" immediately.

**2.6 — Heading case is inconsistent site-wide. MEDIUM**

- H1: **14 of 17 Title Case**
- H2: **117 of 136 sentence case**

So the site uses Title Case for page titles and sentence case for section
headings — defensible — except five H2s break it: the four "Concrete {X} in
Lancaster, SC" blocks and **"Need Help With Your Concrete Project?"**, the CTA
band heading that appears on every page. A professional picks one convention.

**2.7 — The "Understanding a concrete X project" block is SEO filler. MEDIUM**

Eight sub-cards under a heading formula (*"Understanding a concrete {service}
project in Lancaster, SC"*) with generic sub-headings that would fit any trade
in any city. The *sentences inside are good*; the *container* is keyword
scaffolding. This is the clearest case on the site of quality writing trapped in
a generated structure.

---

## 3. Images — individual verdicts

33 content images (excluding logo, favicon, OG). All inspected; the six marked
**[zoomed]** were examined at 3–5× magnification.

Per the brief: polish alone is never cited as evidence. Every "AI" verdict below
lists a concrete physical or optical impossibility.

### Flagged — specific artifacts found

| Image | Used on | Verdict | Confidence | Evidence |
|---|---|---|---|---|
| `process-services-index.webp` **[zoomed]** | `/services` process band | **AI-generated** | High | The clipboard clip resolves into incoherent metallic shards, not a spring mechanism. The "handwriting" on the page is illegible grey squiggle forming no letters. The supporting hand's fingers merge into an undifferentiated mass. The pen nib does not contact the paper and its lower shaft vanishes into the hand with no exit point. |
| `driveway-pour-joints.webp` **[zoomed]** | `/services/concrete-driveways` | **AI-generated** | High | The surface is large-format polished **tile**, not concrete: uniform pale grey with a faint brushed vertical grain and a glassy sheen. Joints are uniform-width dark hairlines with no tooled radius and no saw-cut chamfer. The slab meets loose soil on the right with no form, no edge thickening and no haunch. A yellow line floats unattached. |
| `service-driveways.webp` **[zoomed]** | **home service card** | **Likely AI-generated** | High | Garage-door window panes are flat saturated blue fills with no reflection, no frame depth and no sky gradient. A driveway of this span carries **no control joints at all** — physically impossible; it would crack within a season. No broom texture anywhere on a surface that requires it for traction. |
| `service-slabs.webp` **[zoomed]** | **home service card** | **Likely AI-generated** | High | The pad has a ~6" vertical face that is perfectly crisp on every visible side with **no form marks, no stake holes, no backfill disturbance** — and it rests on undisturbed turf rather than set into grade. The top is a texture-free plane: no broom, no trowel swirl, no aggregate. |
| `patios-process-walkway.webp` **[zoomed]** | `/services/concrete-patios` | **Possibly AI-generated** | Medium | Low sun behind the trees, yet the dining set casts **almost no shadow** across the slab. Joint layout is non-structural — one joint runs diagonally and stops. Slab is texture-free and meets the lawn on a razor line with no haunching. |
| `process-combo-driveways.webp` **[zoomed]** | combo process bands | **Possibly AI-generated** | Medium | **No fingernails on any of the four visible fingers**; fingertips are smooth rounded blobs. Skin has a waxy, poreless quality. The "driveway" slab is glass-smooth with no broom finish, which is a construction error on a vehicle surface. Face and clothing are otherwise coherent. |
| `lancaster-hero.webp` | `/locations` | **Real photographic, but geographically wrong** | High | Live oaks draped in **Spanish moss**. *Tillandsia usneoides* is a Lowcountry/coastal-plain signature. Lancaster SC is Piedmont, ~40 miles south of Charlotte. The photo says "Charleston," not "Lancaster." (Not impossible — isolated stands exist as far up as Landsford Canal — but it is atypical of the Piedmont and reads as the wrong region.) |

### Known AI-generated, documented, physics checked (5)

Recorded as synthetic in `IMAGE-AUDIT-2026-10-05.md`; generated deliberately to
replace images that depicted impossible construction. Re-inspected, no new
artifacts found:

`services-overview.webp` · `how-it-works-hero.webp` · `slab-formwork-pad.webp` ·
`process-combo-patios.webp` · `process-combo-repair.webp`

### Reads as real photography (21)

No artifacts found at inspection. Construction detail is correct — broom
direction, control-joint spacing, red-clay spoil where forms were stripped,
natural staining, weathering, irregular vegetation:

`contact-front-walkway` · `home-service-area-band` · `cta-combo-driveways` ·
`cta-combo-repair` · `cta-service-driveways` · `driveway-drainage-detail` ·
`local-driveways-lancaster` · `local-patios-lancaster` · `local-repair-lancaster` ·
`local-slabs-lancaster` · `patio-backyard-slab` · `process-combo-slabs` ·
`process-location-lancaster` · `repair-detail-crack` · `repair-hero-walkway` ·
`repair-process-trowel` · `service-patios` · `slabs-process-pad` ·
`locations/lancaster-residential-street` · `process-band` · `service-areas-hero`

Strongest of these: `process-location-lancaster` and `process-band` — raw red
clay exactly where forms were stripped, a real work truck, utility poles. These
look like Lancaster County.

### Image-quality issue independent of origin

Every content image is **800–1440px wide at 67–103 KB**. The suspiciously tight
file-size band indicates a single re-encode pass to one target. Several are used
in full-bleed bands at 1440 CSS px, which means upscaling on any standard
display and roughly 2× upscaling on retina. On a trades site, soft imagery reads
as "not a real company's photos" regardless of provenance.

---

## 4. Image placement

| Finding | Severity | Detail |
|---|---|---|
| Hero photos are decorative only | HIGH | Measured mean 26–46/255. Nine heroes carry photographs no visitor can resolve. They are not communicating; they are weight. |
| One photo now backs every CTA band on 12 pages | MEDIUM | Deliberate (commit `a433334`) and it fixed a real contrast failure. But a visitor moving through three pages sees the same driveway three times at the same scroll position. Consistency reads as "one template" when the repeat is this visible. |
| `lancaster-hero.webp` on `/locations` | MEDIUM | Spanish-moss Lowcountry scene heading a page about Piedmont service areas. The one image whose *content* contradicts the page's geography. |
| `service-areas-hero.webp` | LOW | Generic aerial subdivision — could be Ohio, Texas or Georgia. No Lancaster signal. |
| `/services/concrete-driveways` runs 11,538px with **3 images** | HIGH | 39 cards and three pictures. Nothing breaks the wall of bordered boxes. |
| Service-card images are the two weakest files | HIGH | `service-driveways` and `service-slabs` — both flagged above — sit in the homepage 2×2 grid, among the first things a visitor examines closely. |

---

## 5. Layout and UX

**5.1 — Page length. HIGH**

| Page | Desktop | Mobile | Mobile screens |
|---|---|---|---|
| `/services/concrete-driveways` | 11,538px | **18,058px** | **21.4** |
| `/services/concrete-patios` | 11,141px | 17,722px | 21.0 |
| `/locations/lancaster-sc/concrete-driveways` | 8,546px | 12,961px | 15.4 |
| `/` | 7,642px | 11,150px | 13.2 |

The mobile service pages **exceed Chrome's 16,384px maximum screenshot height** —
they could not be captured in one pass. That is a useful objective threshold:
the page is longer than the browser's own limit for rendering a page to an
image. No homeowner choosing a driveway contractor reads 21 screens.

**5.2 — Mobile centres almost all body copy. HIGH**

Measured on `/services/concrete-driveways`:

| Viewport | Body paragraphs ≥15 words | Centre-aligned |
|---|---|---|
| 390px | 44 | **33** |
| 1440px | 44 | **0** |

Centred multi-line body text is hard to read — the eye loses the left edge on
every return sweep — and it is a hallmark of template/page-builder output.
Centring works for a hero line; it does not work for a six-line paragraph, and
the mobile hero lede is exactly that.

**5.3 — Horizontal overflow. MEDIUM**

- Section sub-nav: `scrollWidth 1258` vs `clientWidth 1136` **at desktop**, 350
  on mobile. Clipped mid-word with no affordance.
- Pricing table: 544 vs 348 on mobile — scrolls sideways inside its card.

Neither overflows the document, so there is no page-level horizontal scroll —
but both are silently truncated UI.

**5.4 — CTA saturation. MEDIUM**

7–9 primary/secondary CTA buttons per page, plus the phone number in the header,
plus the phone in the footer, plus two inline "Rather just talk?" blocks. The
same two actions are offered nine times. Past about three, repetition stops
reading as helpful and starts reading as an automated funnel.

**5.5 — Consent dialog on load. MEDIUM**

The tracking dialog opens immediately over page content, top-left, overlapping
the first section. Before a visitor has read a single line they must dismiss a
box. It is legally sensible and visually unfortunate in its current position.

**5.6 — Page flow is logically sound. STRENGTH**

The actual order — what we route → how it works → eligibility → service area →
form → FAQ → CTA — is a sensible journey. The problem is never the order; it is
that each step is three times longer than it needs to be.

---

## 6. Trust and authenticity

### Genuinely strong — do not weaken

- **The disclosure is everywhere and unambiguous.** "We are a referral service,
  not a concrete contractor" on 16 of 17 pages, in a persistent banner, in the
  footer, in the form, on its own page.
- **It links to SC LLR for licence verification** and explicitly tells the
  visitor to check credentials themselves.
- **It says no.** "Foundation repair, structural engineering, and retaining
  walls sit outside this scope." "A category nobody has accepted produces an
  honest no coverage answer." "Straight answers, including the ones that tell
  you we are not the right service for your project." Admitting what you cannot
  do is the most credible thing a referral service can do, and this site does it
  repeatedly.
- **No invented trust signals.** No fabricated review counts, no fake star
  ratings, no "500+ projects completed", no stock-photo testimonials, no
  made-up licence numbers, no fictional team headshots. This is rarer than it
  should be and it is the site's single best authenticity asset.

### What undermines trust

**6.1 — Placeholder contact details. HIGHEST SEVERITY, but a deployment issue**

The build I audited renders:

- **(803) 555-0123** — `555-01xx` is the range reserved for fiction. Americans
  recognise it from films. It says "this is not a real business" instantly.
- **hello@example-referral-brand.com** and **example-referral-brand.com**.

**Important qualification:** these are **not hard-coded**. They come from
`NEXT_PUBLIC_*` environment variables, and the only file carrying them is
`.env.example`. `src/lib/env/index.ts` validates them at build time. If
production injects real values, this finding evaporates.

I am flagging it because (a) it is what the preview shows, so it is what you see
when you judge the site, and (b) the env schema validates *format*, not
*realness* — `555-0123` passes the regex. If a real number is not wired into the
production environment, the single most damaging trust defect on the site ships
silently. **No change made — contact details were explicitly out of scope.**

**6.2 — The photography policy section.** Covered in §2.1. It is a trust
problem as much as a copy problem: it is the site volunteering that its images
are not its own work.

**6.3 — One city, with multi-city furniture.** "Areas we currently serve" with
one pill, "{Service} by city" with one link, and a `/locations` page of 139
words for a single location. The scaffolding advertises that the content is
thin. A one-market business reads as more credible than a national template with
one row filled in.

**6.4 — No human presence anywhere.** No founder, no name, no "we started this
because…", no office, no years in business, no photograph of an actual person
connected to the company. Everything is institutional voice. For a service whose
entire proposition is *trust me to hand your details to the right contractor*,
the total absence of a human being is conspicuous. (The FAQ "Is there a
Lancaster office I can visit?" acknowledges the gap without filling it.)

### Is the referral positioning clear and believable?

**Clear: yes, emphatically.** Believable: yes, with the caveat that it is
*over*-explained. The model is stated in the banner, the hero, three separate
process sections, the form, the footer and a dedicated page. Explaining an
honest thing nine times starts to sound defensive.

---

## 7. Local authenticity

### Real local signal (keep)

- **"Lancaster County clay"** / "Heavy clay in Lancaster, SC makes that
  preparation matter" / FAQ *"Why does clay soil keep coming up?"* — genuine
  regional soil knowledge, the kind only someone who has worked there mentions.
- **FAQ: "Do I need a permit in Lancaster County?"** — correct local question.
- **SC LLR** as the licence authority — correct state body.
- **Indian Land and Elgin** named as future areas — real nearby SC communities,
  correctly chosen.
- **`process-location-lancaster.webp` and `process-band.webp`** — red-clay spoil
  beside a fresh pour. Piedmont Carolina looks exactly like that.

### Weak or wrong

| Issue | Severity | Detail |
|---|---|---|
| The city name is a variable | HIGH | Swap "Lancaster" for "Rock Hill" and the entire site still reads correctly. Nothing is tied to a road, a neighbourhood, a subdivision, a landmark, a river, a school district or a local condition other than clay. That substitutability *is* the definition of mass-generated local SEO. |
| Spanish moss on `/locations` | MEDIUM | Lowcountry imagery on a Piedmont page. See §3. |
| Generic aerial suburb | LOW | `service-areas-hero.webp` has no Carolina signal. |
| "Lancaster County, South Carolina" eyebrow on every hero | MEDIUM | Repeating the location label on all 9 marketing pages is keyword reinforcement, not design. Humans say where they are once. |
| No sense of place in the prose | MEDIUM | Beyond clay, there is no mention of anything a resident would recognise. No "out toward Van Wyck", no mention of the growth corridor off 521, no acknowledgement that half the county commutes to Charlotte. |

---

## 8. Scores

| Dimension | Score | Reasoning |
|---|---|---|
| **AI-looking** | **6.5 / 10** | Structure is transparently programmatic — four identical service pages, 27% duplicated sentences, scaffolding rendering one row, a grammar bug from string concatenation, and a homepage section about its own photography. Pulled *down* from 8 by copy that has none of the usual lexical tells. |
| **Human-designed** | **5 / 10** | Token discipline, the colour system and the writing voice are clearly human. Section rhythm, card density, image handling and mobile text alignment are clearly not. Split personality. |
| **Professional** | **7 / 10** | Technically well-built: clean token architecture, real accessibility work (CTA band contrast was repaired to pass AA at every pixel), correct metadata lengths, validated env, sitemap, legal pages, a test suite. Held back by the layout defects in §5.3 and the page lengths. |
| **Generic / template** | **7 / 10** | High. The programmatic-SEO skeleton is the dominant impression on the inner pages, and it is the thing a visitor who clicks two service pages will notice immediately. |
| **Trust / authenticity** | **6 / 10** | Would be 8 on the strength of the disclosure discipline and the complete absence of invented credentials. Dragged down by the fictional-range phone number in this build, the photography-policy section, and the absence of any human being. |

---

## 9. Exact problems

| Priority | Page / Section | Problem | Why it looks AI-generated / generic | Severity | Recommended fix |
|---|---|---|---|---|---|
| 1 | Home — "Representative quality details, built on transparency" | A homepage section explaining the site's photography sourcing policy | No real business discusses image provenance on its homepage. It is meta-commentary about the website, it tells the visitor to doubt the photos, "built on transparency" is the only empty phrase on the site, and its eyebrows are hard-coded capitals while all 16 others are not — proving it was bolted on | **HIGH** | Delete the section. Move the honest substance to one line on `/referral-disclosure` |
| 2 | All 4 `/services/*` | 19 sections, 38–39 cards, ~2,000 words; 7/13 H2s and 100% of the H3 ladder identical across pages; word counts within 6% | Identical skeletons with a swapped noun is the definition of programmatic generation. Word-count convergence is a statistical fingerprint | **HIGH** | Cut to 6–8 sections. Let each service differ in length and section set — patios genuinely need different sections from repair |
| 3 | Combo page H1s | "Concrete **Driveways Referrals**", "**Patios Referrals**", "**Slabs Referrals**" | Ungrammatical plural+plural from `${service.name} Referrals`. A human writing four headlines would never produce this. Visible in the H1 and in search results | **HIGH** | Add a singular/adjectival name field per service ("Driveway", "Patio", "Slab") |
| 4 | Site-wide heroes | Photos render at mean 26–46/255 vs 151 raw; stddev 12–17 vs 59 | Nine photographs the visitor cannot see. Decorative texture behind a scrim is what a template does when it needs "a hero image" | **HIGH** | Pick: lift the scrim and let the photo read, or drop the photo and use the flat band. Not both |
| 5 | Home service cards | `service-driveways.webp` (flat blue glazing, zero control joints over a full driveway), `service-slabs.webp` (texture-free pad with no form or stake evidence resting on undisturbed turf) | Physically impossible construction in the two images a visitor inspects most closely | **HIGH** | Replace both with real photography |
| 6 | `/services` process band | `process-services-index.webp` — clipboard clip resolves to metal shards, illegible squiggle "handwriting", merged fingers, pen not touching paper | Textbook generative artifacts in the one image with a human face | **HIGH** | Replace. Prefer no people over synthetic people |
| 7 | `/services/concrete-driveways` | `driveway-pour-joints.webp` is polished tile, not concrete | Wrong material entirely on a concrete company's page. Uniform hairline joints with no tooled radius, glassy sheen, slab meeting soil with no form | **HIGH** | Replace |
| 8 | Home — "Areas we currently serve"; `/services/*` — "{Service} by city" | Full sections wrapping one pill and one link | Multi-city components rendering a single row. Advertises that the template expected more data | **HIGH** | Replace both with a sentence until a second city exists |
| 9 | Mobile, all pages | 33 of 44 body paragraphs centre-aligned (0 on desktop) | Centred multi-line body copy is page-builder default styling and hurts readability | **HIGH** | Left-align body copy below `sm`. Keep centring for short hero lines only |
| 10 | All pages | Eligibility block + disclosure repeated verbatim on 11 pages; 27% of all sentences appear on 2+ pages | Reading two pages means reading the same site twice | **HIGH** | Keep the legal line everywhere; render the four-point eligibility explainer once on `/how-it-works` and link to it |
| 11 | Home | Three numbered sequences (01-02-03, 01-02-03-04, 1-2-3-4) describing one process | Numbered step-cards are the most recognisable AI-template component; three sets in 3,000px | **MEDIUM** | Keep one. Fold the other two into prose or remove |
| 12 | `/services/*`, `/locations/*` | 11,538px desktop / 18,058px mobile — past Chrome's 16,384px screenshot ceiling | Length produced by a content generator meeting a word target, not by a writer | **MEDIUM** | Target ≤6,000px desktop |
| 13 | 5 pages | "Looking for a concrete {X} contractor in Lancaster, SC?" as the opening line | Restating the search query is the oldest SEO-copy formula | **MEDIUM** | Open each page differently; lead with the local condition that matters |
| 14 | Section sub-nav | `scrollWidth 1258` vs `clientWidth 1136` **at 1440px**; clipped mid-word on mobile | Visible truncation with no scroll affordance | **MEDIUM** | Wrap to two rows, or add a gradient fade and a scroll cue |
| 15 | Home | Two visually identical FAQ accordions two sections apart | Looks like the FAQ component was emitted twice | **MEDIUM** | Merge, or make the second visually distinct and retitle it |
| 16 | `/locations` | Spanish-moss Lowcountry hero on a Piedmont page | The only image whose content contradicts the page's geography | **MEDIUM** | Swap for a Piedmont street — the site already owns two good ones |
| 17 | All heroes | "LANCASTER COUNTY, SOUTH CAROLINA" eyebrow on all 9 marketing pages | Keyword reinforcement, not design | **MEDIUM** | Use on the homepage and `/locations/*` only |
| 18 | Site-wide | 7–9 CTA buttons per page offering the same two actions | Automated funnel density | **MEDIUM** | Reduce to hero, mid-page, close |
| 19 | 5 H2s | "Need Help With Your Concrete Project?" and the four "Concrete {X} in Lancaster, SC" are Title Case among 117 sentence-case H2s | Inconsistent conventions indicate assembly from more than one source | **LOW** | Convert to sentence case |
| 20 | Consent dialog | Opens over content immediately on load | Blocks the first impression | **LOW** | Bottom-anchored, after first scroll |
| 21 | All images | 800–1440px at 67–103 KB; upscaled in full-bleed bands | Soft imagery reads as "not a real company's photos" | **LOW** | Source at ≥2× the largest rendered width |
| 22 | Site-wide | No founder, no name, no human, no history | For a trust-brokering service the absence of any person is conspicuous | **LOW** | Add one honest human line — only if a real one exists. Do not invent |
| — | Deployment | `(803) 555-0123` (reserved fiction range), `hello@example-referral-brand.com` | Instant "demo site" signal if it reaches production | **HIGH if shipped** | Verify production env injects real values. Env validation checks format, not realness. **No change made — out of scope** |

---

## 10. Top 10 AI-looking elements

**1. The homepage photography-policy section**
*What:* "PROJECT PHOTOGRAPHY → Representative quality details, built on
transparency → PHOTOGRAPHY POLICY → Concept imagery for reference."
*Where:* Homepage, between the form and the FAQ.
*Why it reads AI:* It is the website talking about itself. Real businesses
discuss driveways; generated sites discuss their own compliance posture. It also
pre-emptively confesses that the imagery is not real work, planting the exact
doubt it is trying to manage. "Built on transparency" is the only genuinely
contentless phrase on an otherwise buzzword-free site.
*What a professional would do:* Delete it. Put "Images are illustrative" in the
footer or on the disclosure page in one line, and let the photography carry
itself.

**2. Four service pages with one skeleton**
*What:* 19 sections, 38–39 cards, 7/13 identical H2s, an identical H3 ladder, and
word counts of 2047/1976/1921/1930.
*Where:* `/services/concrete-driveways|patios|slabs|repair`.
*Why it reads AI:* A visitor who opens two of them in tabs sees the same page
twice. Converging word counts across four pages is something only a generator
produces.
*What a professional would do:* Let the services differ structurally. Repair is
about diagnosis; slabs are about load; patios are about appearance. Different
subjects deserve different sections and different lengths.

**3. "Concrete Driveways Referrals in Lancaster, SC"**
*What:* Three of four combo H1s are ungrammatical.
*Where:* `/locations/lancaster-sc/{service}`.
*Why it reads AI:* Nobody writes "Driveways Referrals." It is `${name} +
" Referrals"` with no singular form available — concatenation leaking into the
largest text on the page and into search results.
*What a professional would do:* Store a singular form per service and write the
four headlines by hand.

**4. The 18-times-repeated eyebrow→heading→lede opening**
*What:* Every section begins with a small green uppercase label.
*Where:* 18 on `/services/concrete-driveways`, 12 on the homepage.
*Why it reads AI:* Perfect regularity is the signature of iteration. Human
layouts breathe — some sections start with an image, a number, a quote, or
nothing.
*What a professional would do:* Keep eyebrows for genuine navigational
landmarks; let most sections open directly on the heading.

**5. Invisible hero photographs**
*What:* Nine heroes at mean brightness 26–46/255 against a raw 151.
*Where:* Every marketing page.
*Why it reads AI:* "Dark photo + scrim + left-aligned text" is the default hero
of every AI site builder. The photo is not chosen to communicate; it is there
because the slot exists.
*What a professional would do:* Either lift the scrim and crop the photo so it
says something, or drop to a clean flat band. The half-measure is the tell.

**6. Three numbered-step sequences on one page**
*What:* 01-02-03, then 01-02-03-04, then 1-2-3-4 — all describing routing.
*Where:* Homepage.
*Why it reads AI:* Numbered step cards are the most over-used generated
component, and generating three sets means no editor ever read the page end to
end.
*What a professional would do:* One sequence, once. The other two become a
sentence.

**7. Sections built for data that does not exist**
*What:* "Areas we currently serve" = one pill. "{Service} by city" = one link.
*Where:* Homepage; all four service pages.
*Why it reads AI:* The UI is sized for a list. Shipping an empty directory
component tells the visitor the site was generated from a multi-city template.
*What a professional would do:* "We currently cover Lancaster, SC. More areas as
providers sign on." One sentence.

**8. Images with construction impossibilities in the most-examined slots**
*What:* A driveway with zero control joints and flat blue glazing; a pad with
razor edges and no form evidence sitting on undisturbed turf; a "concrete"
surface that is polished tile; a clipboard whose clip is metal shards and whose
writing is squiggle.
*Where:* Homepage service cards, `/services` process band,
`/services/concrete-driveways`.
*Why it reads AI:* These are not stylistic judgements — a jointless driveway
cracks, and loose soil cannot hold a crisp slab edge without a form.
*What a professional would do:* Replace with real photography, even if it is
less pretty. Imperfect real beats flawless impossible on a trades site.

**9. Centred body copy on mobile**
*What:* 33 of 44 paragraphs centred at 390px; none at 1440px.
*Where:* Every page, mobile.
*Why it reads AI:* Centre-aligned multi-line body text is page-builder default
styling. No typographer centres a six-line paragraph.
*What a professional would do:* Left-align body copy at every breakpoint.

**10. The eligibility block on eleven pages**
*What:* Four marketing paragraphs rendered verbatim on 11 of 17 pages; 27% of all
sentences appear on 2+ pages.
*Where:* Site-wide.
*Why it reads AI:* A human writer gets bored and rewrites. Identical repetition
across eleven pages is an include, and it feels like one.
*What a professional would do:* Full version once on `/how-it-works`; one line
and a link everywhere else.

---

## 11. What already looks human — do not change

1. **The copy voice.** Zero buzzwords, zero em dashes, zero exclamation marks
   across 711 sentences, with natural length variance (stdev 6.6, range 4–41).
   Lines like *"Concrete cracks, so well placed joints control where that
   happens"* and *"A drive that sees a heavy truck is not built like one serving
   a single sedan"* are trade knowledge, not generated filler. **This is the
   site's biggest asset.** Every fix above should preserve these sentences and
   change only the containers they sit in.

2. **The design token system.** Two radii, zero box-shadows, five gradient
   utilities site-wide, one accent colour, one typeface. This is more disciplined
   than most agency work. The brief asked me to hunt for excessive rounding,
   gradients and glassmorphism — they are measurably absent.

3. **The honesty architecture.** Stating what is out of scope, "an honest no
   coverage answer", "including the ones that tell you we are not the right
   service", linking to SC LLR, and refusing to claim credentials. **No invented
   reviews, ratings, project counts, licences or testimonials anywhere** — the
   most common failure mode of generated trade sites, entirely avoided here.

4. **The FAQ questions.** "Do I need a permit in Lancaster County?", "Why does
   clay soil keep coming up?", "Will I be called repeatedly?", "Is there a
   Lancaster office I can visit?" These are what worried homeowners actually
   ask, including the awkward ones.

5. **The clay thread.** Lancaster County clay appears in the service
   descriptions, the project explainer and the FAQ. It is the one piece of
   genuine regional expertise running through the site, and it is used
   correctly, not sprinkled for keywords.

6. **Technical and accessibility foundations.** Title tags 41–60 characters,
   meta descriptions 97–154, clean sitemap, validated environment, legal pages,
   a test suite, and real contrast work (the CTA band now clears 4.5:1 at every
   pixel). This is competent engineering.

7. **The footer.** Honest, well-organised, correctly scoped, with the SC LLR
   verification link and the publisher disclaimer. It does its job without
   decoration.

8. **The repair and red-clay photography.** `repair-detail-crack`,
   `repair-hero-walkway`, `process-location-lancaster`, `process-band` — real
   damage, real weathering, real Piedmont red clay. These are what the rest of
   the imagery should look like.

---

## 12. Final verdict

### **B — Improve**

Not *Keep as-is*: the photography-policy section, the three flagged images in
high-traffic slots, the four cloned service pages and the mobile text alignment
are real defects with concrete evidence behind them.

Not *Replace*: replacing would destroy the copy voice, the token discipline and
the honesty architecture — the three things that are genuinely good and genuinely
hard to produce. The foundation is sound.

Not *Remove*: nothing here is worthless.

The work is **subtraction, not addition.** Nearly every fix in §9 removes
something: a section, a duplicate, a scrim, a numbered list, a card. The site's
problem is not that it lacks quality — it is that good material has been
multiplied by a template until the repetition is visible. Roughly 40% less site,
with the same voice, would read as entirely human.

### Does this website currently look AI-generated to a normal visitor?

## **SOMEWHAT**

In practical terms, it depends on how far they go:

**A visitor who reads one page and leaves: probably not.** The homepage hero,
the service cards, the honest disclosure banner and the writing all hold up. The
palette is restrained, the typography is consistent, nothing is neon or
glassy. They would read it as a small, slightly corporate local referral site.

**A visitor who opens a second service page: yes, immediately.** That is the
break point. Driveways and patios are visibly the same page — same 19 sections,
same card grid, same price table, same checklist, same H3 ladder, same length.
Once seen, it cannot be unseen, and it reframes everything already read as
machine-produced.

**A visitor who looks closely at the photographs: yes.** The homepage service
card showing a driveway with no control joints, and the "concrete" that is
visibly polished tile, do not survive attention on a site whose entire subject is
concrete.

**A visitor who reads the homepage to the bottom: yes, and worse.** The
photography-policy section converts a vague feeling into an explicit statement.
The site tells them the images are illustrative. Nothing else on the page can
undo that.

**And if the production build ships `(803) 555-0123`: unambiguously yes** — not
AI-generated so much as *unfinished*. A reserved-fiction phone number is the one
detail that ends the conversation. Verify the production environment.

The honest summary: **this does not look like a site an AI wrote. It looks like
a site a human wrote and an AI duplicated.** The fix is to undo the duplication.

---

*Audit only. No files modified, no images replaced, no copy edited, no contact
details, routes, SEO structure, typography, colours or legal positioning
changed.*
