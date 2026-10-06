# Image Authenticity Audit — 2026-10-05

Every image file in `public/` was opened and inspected individually. **Nothing was
replaced, removed, edited, or re-encoded.** This is an inspection report only.

The site presents its photography as **concept / reference imagery** (see the
"Photography policy" card: *"Concept imagery for reference — verified portfolios
on request"*). Nothing below should be read as a claim about completed contractor
projects, and nothing in this audit asserts that any image depicts real work by a
participating provider.

---

## Method and its limits

**Container forensics (objective).** All 50 files are WebP. Every one of the 44
photographic files contains a bare `VP8` bitstream with **no EXIF, no XMP, no ICC
profile and no C2PA/Content Credentials manifest**. A scan of the raw bytes for
generator strings (`midjourney`, `stable diffusion`, `firefly`, `dall`, `c2pa`,
`openai`, camera makes, Adobe/Lightroom markers) returned **zero hits** in every
file.

Every photographic file also lands in a narrow **69–102 KB** band regardless of
pixel dimensions, which is the fingerprint of a batch re-encode to a target file
size.

**What that means:** the metadata was stripped by the build/optimisation pipeline.
Stripping is normal for web delivery, and it is equally consistent with AI
generation. **The container evidence therefore proves nothing about origin in
either direction** — it only proves everything passed through one pipeline. Every
assessment below is a visual judgement, and I have said "unclear" wherever the
visual evidence does not actually settle it.

**Confidence key** — High: multiple independent, hard-to-explain artifacts.
Medium: suggestive indicators, no single decisive one. Low: leaning, not concluding.

---

## Full image table

### Home (`/`)

| Image | Page | What it shows | Assessment | Confidence | Reason |
|---|---|---|---|---|---|
| `home-hero.webp` | Home — hero | Two-storey cream house, porch, front walkway | **Likely AI-generated** | High | Walkway forks and the left branch dissolves into the driveway with mismatched widths and non-aligning joints; porch railing balusters change spacing and one run ends in air; foliage is dense "AI mush" with no resolvable branch structure; flawless airbrushed lawn, no lens defects, no chromatic aberration anywhere |
| `cta-pour-band.webp` | Home — CTA band | Two workers screeding a slab, mixer chute pouring | **Likely AI-generated** | High | Both workers' gloved hands merge into the screed board, fingers not separable; the right worker's grip never closes on the board; concrete leaving the chute is a rope of discrete blobs rather than a slurry; form boards mismatch, stakes absent, bottom-centre form overlaps itself; slab surface jumps from "cottage cheese" to glassy with a hard seam; no mesh or rebar in a slab being poured. Also geographically wrong (see note A) |
| `process-band.webp` | Home — process band | Street scene, pickup and trailer, formwork, red clay | **Possibly AI-generated** | Medium | Regionally convincing (Piedmont red clay, brick ranches, overcast) and the grain is consistent across the frame; but the trailer load is a merged mass, the truck grille is mushy, one slab panel appears to float above the subgrade, and two overhead wires terminate in mid-air. Nothing decisive either way |
| `home-service-area-band.webp` | Home — service-area band | Brick ranch homes, large oak, walkways and driveway | **Professional stock / real-estate photography** | Medium-High | Real weathering: stained driveway, genuine expansion joints, hairline cracks; oak has true branch architecture with consistent dappled light; flat HDR look typical of MLS photography; natural sensor noise |

### Services index (`/services`)

| Image | Page | What it shows | Assessment | Confidence | Reason |
|---|---|---|---|---|---|
| `services-overview.webp` | Services — hero | Macro of a curved broom-finished walkway edge | **Likely AI-generated** | Medium-High | Bokeh is synthetic — some grass blades are razor sharp and adjacent ones smeared with no depth logic; the broom striations are painted on rather than cut into the surface, and they reverse direction across a joint; the control joint shallows out and simply ends; hydrangea blooms repeat |
| `cta-services-index.webp` | Services — CTA band | Low-angle driveway, subdivision, golden light | **Likely AI-generated** | High | Saw-cut joints converge inconsistently and one dead-ends mid-slab; the sidewalk crosses the driveway and resumes at a different elevation; street trees are near-identical copies in a row; mid-ground rooflines melt into one another; low sun but the slab shows a flat sheen with no directional highlight |
| `process-services-index.webp` | Services — process band | Bearded man in work shirt writing on a clipboard | **Unclear — cannot verify** (leans professional stock) | Medium | Favouring real: natural facial asymmetry, visible pores and crow's feet, correct five-finger pen grip, wedding ring, coherent watch, authentically stained work shirt, bokeh that falls off with distance. Against: the truck bed's stake body is soft and the lumber merges; composition is staged commercial. Not enough to call |
| `service-driveways.webp` | Services card + `/services/concrete-driveways` | Wide driveway to a two-car garage, blue house | **Possibly AI-generated** | Medium | Scene is internally coherent with consistent shadow direction; but the slab is implausibly pristine (no tyre marks, staining or efflorescence), the left-hand joint pattern does not correspond to the right, one joint ends at nothing, and the stone veneer repeats in places. Could equally be a heavily HDR-processed builder photo |
| `service-patios.webp` | Services card + `/services/concrete-patios` | Stamped patio with sling furniture, split-rail fence | **Real photographic** | Medium-High | Realistic release-colour mottling and genuine wear in the stamped pattern; furniture is an identifiable consumer set with correct perspective and contact shadows; galvanised window well, weathered irregular fence posts; softness and banding consistent with a video frame grab |
| `service-slabs.webp` | Services card + `/services/concrete-slabs` | Plain square pad beside a house, vinyl fence | **Likely AI-generated** | Medium-High | The slab top is completely texture-free — no broom finish, no trowel marks, no control joints, no colour variation across a 10 ft pad; corners are impossibly crisp with a machined chamfer; the dirt margin is uniformly scalloped all the way round; background blur is synthetic |
| `repair-hero-walkway.webp` | Services card (repair) | Sidewalk slab heaved by tree roots | **Real photographic** | High | The lifted slab shows a genuinely spalled, aggregate-exposed fracture face; roots deform the slab exactly as root heave does; soil wash-over, weeds, bare patches; dappled shade with one consistent light direction; real camera softness |

### Driveways (`/services/concrete-driveways`)

| Image | Page | What it shows | Assessment | Confidence | Reason |
|---|---|---|---|---|---|
| `driveway-pour-joints.webp` | Driveways | New driveway/apron at a garage, caution tape | **Real photographic** | High | Subtle float and broom marks with a properly tooled centre joint; apron pour is a visibly different age/colour from the sidewalk beyond; messy authentic gravel backfill; caution tape and stakes consistent with a live new-build; phone/video-grab softness |
| `driveway-drainage-detail.webp` | Driveways | Driveway edge with river-rock drainage strip | **Real photographic** | Medium-High | Individually distinct, irregular pebbles; genuine edge wear on the slab; soft video-grab focus and flat natural light with no inconsistencies |
| `cta-service-driveways.webp` | Driveways — CTA | New driveway at a brick ranch, white garage door | **Real photographic** | Medium-High | Genuine light broom finish with colour variation and surface blemishes; correct joint grid; realistic dirt-and-gravel margin and fresh topsoil at the edge; ordinary unstaged details (mum pot, door wreath) |

### Patios (`/services/concrete-patios`)

| Image | Page | What it shows | Assessment | Confidence | Reason |
|---|---|---|---|---|---|
| `patio-backyard-slab.webp` | Patios | Weathered patio behind a brick ranch, woods | **Unclear — cannot verify** (leans real) | Medium | Favouring real: authentic staining and moss, leaf litter, a visible cold joint between two pours, standard resin chairs, coherent wet overcast light. Against: the far patio edge curves oddly, the grass-to-leaf transition smears, and a repeating diagonal texture appears bottom-left |
| `patios-process-walkway.webp` | Patios | Backyard patio, wooden dining set, golden hour | **Likely AI-generated** | High | Shadows disagree — the table casts right-forward while the pots beside it cast none; joints form a non-structural pattern with a diagonal running into nothing and wildly uneven panels; the table runner melts into the tabletop; chair slat counts differ and one chair's legs merge with the table base; fence board widths change and the cap rail wobbles; hydrangeas repeat in copy-paste rhythm |
| `cta-service-patios.webp` | Patios — CTA | Stamped patio, umbrella table set, low sun | **Real photographic** | Medium-High | Correct contractor detailing — perimeter border band, antiquing release colour, grout lines that follow the curve; umbrella and chair shadows all agree with the low sun; natural light falloff |

### Slabs (`/services/concrete-slabs`)

| Image | Page | What it shows | Assessment | Confidence | Reason |
|---|---|---|---|---|---|
| `slab-formwork-pad.webp` | Slabs | Poured pad with timber forms in a field | **Likely AI-generated** | High | The formwork does not enclose the pour — boards on the near and right sides lie loose on the gravel, detached and at a different level, with no stakes anywhere; the slab sits above the form in places and below it in others; the top is a pasted flat plane whose perspective disagrees with the forms. Also geographically wrong (see note A) |
| `slabs-process-pad.webp` | Slabs | New pad in a suburban backyard, gravel margin | **Real photographic** | Medium-High | Broom finish with a correctly tooled control-joint cross and radiused edge; work scarring in the surrounding turf; background clutter (playset, parked car, AC units) all consistent; slight surface ponding sheen |
| `cta-service-slabs.webp` | Slabs — CTA | Steel shed on a new pad, gravel border, wood fence | **Real photographic** | Medium-High | Visible float swirl marks and surface mottling; standard ribbed steel shed; patchy grass and dirt scarring from the work; weathered irregular fence boards; consistent overcast light |

### Repair (`/services/concrete-repair`)

| Image | Page | What it shows | Assessment | Confidence | Reason |
|---|---|---|---|---|---|
| `repair-detail-crack.webp` | Repair | Low angle, cracked lifted slab beside a tree root | **Real photographic** | High | Authentic crazing, lichen, moss and spalled edges with exposed aggregate; naturally gnarled root; clover and leaf litter; optical (not synthetic) shallow depth of field |
| `repair-process-trowel.webp` | Repair | Fresh mortar bead in a joint, finishing trowel | **Possibly AI-generated** | Medium | The trowel casts essentially no contact shadow and its blade edge melts into the slab where they touch; the repair bead is unnaturally uniform in width with a knife-clean edge where a real patch feathers; aggregate at the top of frame dissolves. The aggregate texture elsewhere is convincing, so this is not decisive |
| `cta-service-repair.webp` | Repair — CTA | Crumbled walkway meeting a fresh wet pour | **Likely AI-generated** | High | Physically impossible: wet concrete is placed straight against loose rubble with **no formwork and no containment**, yet holds a smooth vertical face; trowel swirls fade into a glassy sheen inconsistently; rubble is uniform-roundness "pebble soup" merging into the base; fence boards warp and the bottom rail line wobbles |

### How it works (`/how-it-works`)

| Image | Page | What it shows | Assessment | Confidence | Reason |
|---|---|---|---|---|---|
| `how-it-works-hero.webp` | How it works — hero | Two hi-vis workers screeding a slab, brick ranch | **Likely AI-generated** | High | Hands merge into the wet concrete and into the form board on both workers; the screed bar has a kinked double profile as if two tools were blended, and passes implausibly across one worker's leg; forms are discontinuous and at differing heights with missing stakes; wet surface switches from "oatmeal" to glass along a hard seam; faces unresolved; wheelbarrow wheel/handle geometry incoherent |
| `estimate-visit-measuring.webp` | How it works | Man kneeling on a driveway with a tape measure | **Likely AI-generated** | High | The tape blade does not connect to its case, lies dead flat and unsupported over a long run with no curl, and vanishes into a joint; fingers merge on the near hand and the thumb geometry is wrong on the other; clipboard "writing" is non-text scribble; the driveway changes texture abruptly from exposed aggregate to smooth; background bokeh is flat and does not fall off with distance; subject lighting does not match the bright background |
| `cta-how-it-works.webp` | How it works — CTA | New-build two-storey house with a wide driveway | **Professional stock / real-estate photography** | Medium-High | Real staining and an uneven broom finish with a correct saw-cut pattern and realistic apron curve; stone veneer varies naturally; sun position consistent across house, trees and the sapling; ordinary functional details (downspout, soffit vents, AC unit); mild lens distortion typical of MLS work |

### Contact (`/contact`)

| Image | Page | What it shows | Assessment | Confidence | Reason |
|---|---|---|---|---|---|
| `contact-front-walkway.webp` | Contact — hero | Brick cottage, front walkway, symmetrical planting | **Likely AI-generated** | High | Shrub rows mirror each other almost exactly left-to-right (copy-paste); mow stripes bend inconsistently and change direction around the walkway; the walkway meets the public sidewalk with non-aligning joints and no expansion joint at the steps; the porch railing ends in air and baluster spacing changes; both neighbouring houses have melted rooflines; shrubs cast almost no shadow despite apparent sunlight |

### Service areas (`/locations`, `/locations/lancaster-sc`)

| Image | Page | What it shows | Assessment | Confidence | Reason |
|---|---|---|---|---|---|
| `service-areas-hero.webp` | Locations — hero | Aerial of a suburban subdivision street | **Likely AI-generated** | Medium-High | Several driveways never reach the street or terminate in lawn, with wrong curb-cut geometry; the sidewalk appears and disappears; multiple houses have impossible intersecting gables and one garage opens onto nothing; parked cars are blobs and one merges into a driveway; mailboxes repeat on a fixed rhythm; canopies repeat without individual structure |
| `lancaster-hero.webp` | Lancaster location — hero | Mossy live-oak street with cottages and a lamp post | **Likely AI-generated** | High | The blue car's body is warped with elliptical wheel blobs and merges into the hedge; the sidewalk forks and one branch stops in the grass; the lamp post has no base detail and casts no shadow; porch columns and window arrangements are inconsistent between houses; moss strands are mush. Also a brand-fit issue (see note B) |
| `locations/lancaster-residential-street.webp` | Lancaster location | Brick-ranch street, cracked sidewalk, red clay patch | **Real photographic** | Medium-High | Cracked, stained sidewalk with weeds in the joints; bare red-clay patch in the verge; algae-streaked roofs; asphalt patching on the road; consistent film-like grain and soft natural light; no geometric faults found |
| `cta-location-lancaster.webp` | Lancaster location — CTA | New driveway at a brick ranch, red clay spoil | **Real photographic** | Medium | Correct and specific construction evidence: broom finish, properly spaced control joints, flared apron at the curb cut, and raw red-clay backfill exactly where forms were stripped. Shares the film-grain look of the other street images |
| `process-location-lancaster.webp` | Lancaster location — process band | Wide new driveway at a brick ranch, red clay both sides | **Unclear — cannot verify** (leans real) | Medium | Favouring real: directional broom striations, properly radiused tooled joints, believable clay spoil, consistent soft overcast shadows. Against: the left edge meets the clay in an oddly scalloped transition, the apron terminates abruptly, and the hydrangea at left looks pasted |

### Location + service combination pages (`/locations/lancaster-sc/<service>`)

| Image | Page | What it shows | Assessment | Confidence | Reason |
|---|---|---|---|---|---|
| `local-driveways-lancaster.webp` | Combo — driveways | Long curved driveway through pines to a brick ranch | **Real photographic** | Medium-High | Correct single centre control joint following the curve; broom finish; pine straw and dormant winter turf; long shadows all consistent; flat phone-camera colour |
| `local-patios-lancaster.webp` | Combo — patios | Large stamped patio, umbrella set, new-build fence | **Real photographic** | Medium-High | Genuine random-stone mat pattern with antiquing and real dirt in the joints; damp sheen in places; chair and umbrella-pole shadows agree with the sun; video-grab compression |
| `local-repair-lancaster.webp` | Combo — repair | Fresh pour meeting an old cracked driveway | **Real photographic** | Medium-High | Authentic map cracking on the old surface; the new pour's wet edge feathers onto it irregularly, as a real patch does; harsh consistent sunlight |
| `local-slabs-lancaster.webp` | Combo — slabs | New pad in an untidy backyard, chain-link fence | **Real photographic** | High | Uneven float finish with staining and a wet patch; formed edge proud of grade with backfill; weeds, unkempt grass, neighbour's deck — an ordinary workmanlike scene with nothing staged |
| `cta-combo-driveways.webp` | Combo — driveways CTA | New driveway, parked SUV, bare winter trees | **Real photographic** | Medium-High | Broom finish with real colour mottling; apron meets the public sidewalk with a correct joint; dormant winter turf; shadows of off-frame trees fall consistently with a low winter sun |
| `cta-combo-patios.webp` | Combo — patios CTA | Large grey patio with wicker chairs, mossy oaks | **Likely AI-generated** | High | The slab is a texture-free flat plane — no broom, no trowel marks — with joints forming a non-structural grid, one running diagonally and stopping, and a border band on only two sides; wicker weave dissolves into noise; the side table's legs merge into the slab and the cushions have no contact shadow; the hose coils into itself; brick-to-batten siding transition is misaligned and the lantern floats off the wall; no cast shadows anywhere |
| `cta-combo-repair.webp` | Combo — repair CTA | Gloved hand floating a fresh overlay | **Real photographic** | Medium-High | Correct physics — a ridge of excess material stands ahead of the float, exactly as it does in use; coherent five-finger grip in a dipped work glove; genuine crazing on the adjacent old slab; consistent harsh sunlight and real motion blur |
| `cta-combo-slabs.webp` | Combo — slabs CTA | Two pads beside a brick house, one with an AC unit | **Possibly AI-generated** | Medium | Both pads are entirely texture-free; the gravel border stones are near-identical in size and look placed rather than graded; refrigerant lines enter the wall at an odd angle and the disconnect box floats slightly proud; the downspout ends without a boot; shingles repeat. Nothing outright impossible |
| `process-combo-driveways.webp` | Combo — driveways process | Man crouching at the edge of a new stoop slab | **Possibly AI-generated** | Medium | The index finger blends into the slab's top surface where the hand rests; skin has the smooth, waxy quality typical of generated portraits; background blur is very "studio". Against that reading: the foundation wall shows correct form marks, the tool pouch and boot wear are convincingly detailed. Not decisive |
| `process-combo-patios.webp` | Combo — patios process | Two workers finishing a backyard slab | **Likely AI-generated** | High | Hands merge into the screed board and into the float; the second worker's posture requires him to reach across the entire slab; the screed is held at one end only and extends past the form unsupported; several stakes sit inside the pour and a form board floats above grade with the bottom-left corner open; the wet surface splits into "gravel soup" and glass along an unnatural boundary; the hose crossing the lawn vanishes |
| `process-combo-repair.webp` | Combo — repair process | Worker running a walk-behind concrete saw | **Likely AI-generated** | Medium-High | The orange layout markings on the slab are garbled pseudo-text; hands merge into the handlebars; the blade's contact point does not align with the cut line and the dust plume issues from the wrong place; the broken-out rubble does not match the sawn edge; the saw casts almost no shadow while the operator does. The saw body itself is largely coherent, which is why this is not "high" |
| `process-combo-slabs.webp` | Combo — slabs process | Braced formwork with steel mesh over gravel | **Real photographic** | High | Textbook-correct and specific: forms properly staked and braced with walers, mesh on spacers above a compacted stone base, overlaps tied — detail sets that generators routinely get wrong. Also geographically wrong (see note A) |

### Brand and metadata assets (not photography)

| Image | Page | What it shows | Assessment | Confidence | Reason |
|---|---|---|---|---|---|
| `logo.webp` | Header, footer (light) | "Lancaster Concrete / Referral Platform" lockup, dark ink | **Vector-style brand graphic — N/A** | High | Flat geometric design, not photographic; clean curves, no raster artifacts |
| `logo-dark.webp` | Header, footer (dark bands) | Same lockup, light ink | **Vector-style brand graphic — N/A** | High | As above |
| `icon.webp` | Favicon / manifest (512px) | "LC" mint app tile | **Vector-style brand graphic — N/A** | High | As above |
| `apple-icon.webp` | Apple touch icon (180px) | "LC" mint app tile | **Vector-style brand graphic — N/A** | High | As above |
| `favicon.webp` | Favicon (16px) | "LC" mark | **Vector-style brand graphic — N/A** | High | As above. Note: this file is an *animated* WebP (5 frames) at 16×16 — almost certainly unintended, though harmless |
| `opengraph-image.webp` | Social share card | Logo on dark card, "Concrete referrals in Lancaster, South Carolina" | **Designed graphic — N/A** | High | Layout graphic, not photographic. Note: its background is the old green-black, not the new navy `#0B1017` — a brand-consistency mismatch, not an authenticity one |

---

## Overall image assessment

Counting the **44 photographic images only** (the 6 brand graphics are excluded as
not applicable):

- **Real photographic:** 17
- **Professional stock photography:** 3
- **Likely AI-generated:** 16
- **Possibly AI-generated:** 5
- **Unclear — cannot verify:** 3

Roughly **45% of the photography is probably or possibly synthetic**, and the
remaining 55% looks like genuine job-site and real-estate photography.

---

## Images that need attention

### Tier 1 — construction-impossible (strongest cases, most damaging)

These contain details a tradesperson would notice immediately, which is the worst
failure mode for a trust-led referral site.

1. **`cta-service-repair.webp`** (repair CTA) — fresh concrete placed against
   loose rubble with no formwork, yet holding a smooth vertical face. Wet concrete
   cannot do this.
2. **`slab-formwork-pad.webp`** (slabs page) — the "formwork" is loose boards
   lying on gravel, detached from the slab, unstaked, at inconsistent levels.
3. **`how-it-works-hero.webp`** (how-it-works hero) — hands merged into concrete
   and lumber; a screed bar with a kinked double profile; discontinuous forms.
4. **`process-combo-patios.webp`** (combo process band) — stakes inside the pour,
   an open form corner, a screed held at one end extending past the form.
5. **`cta-pour-band.webp`** (home CTA) — concrete leaving the chute as discrete
   blobs; merged hands; no reinforcement in a slab mid-pour.
6. **`estimate-visit-measuring.webp`** (how-it-works) — a tape measure not
   connected to its case; non-text scribble on the clipboard.
7. **`process-combo-repair.webp`** (combo process band) — garbled pseudo-text in
   the layout markings; saw blade not aligned to its own cut.

### Tier 2 — impossible concrete surfaces

8. **`service-slabs.webp`** — a 10 ft pad with zero surface texture and machined
   corners. It is the card image for Concrete Slabs, so it represents the service.
9. **`cta-combo-patios.webp`** — texture-free slab, non-structural joint layout,
   no cast shadows, furniture merging into the surface.
10. **`patios-process-walkway.webp`** — contradictory shadow directions, joints
    running into nothing, furniture geometry breaking down.
11. **`cta-combo-slabs.webp`** *(possible)* — texture-free pads, uniform placed
    gravel, floating electrical disconnect.
12. **`services-overview.webp`** — broom texture painted onto the surface rather
    than cut into it; synthetic bokeh. This is the **Services hero**.

### Tier 3 — architectural and environmental artifacts

13. **`home-hero.webp`** — **the site's single most prominent image.** Forking
    walkway dissolving into the driveway, railing ending in air, mushy foliage.
14. **`contact-front-walkway.webp`** — mirror-symmetrical copy-paste planting,
    walkway joints not aligning with the public sidewalk, melted neighbours.
15. **`lancaster-hero.webp`** — warped car with elliptical wheels, a sidewalk
    branch ending in grass, a shadowless lamp post.
16. **`service-areas-hero.webp`** — driveways that never reach the street,
    impossible gables, repeating mailboxes.
17. **`cta-services-index.webp`** — joints dead-ending mid-slab, a sidewalk that
    changes elevation across a driveway, cloned street trees.

### Note A — geographically wrong locations

Separate from authenticity, three images do not depict the US Southeast:

- **`cta-pour-band.webp`** (home CTA): concrete roof tiles, brick-veneer ranch,
  wide nature strip, post-mounted letterbox and kerb profile read as Australian
  suburban, not South Carolina.
- **`slab-formwork-pad.webp`** (slabs): hedgerows, pasture fencing and deciduous
  woodland read as English/Northern-European countryside.
- **`process-combo-slabs.webp`** (combo process band): **this is a genuine
  photograph, but it is a British back garden** — fence panels, that shed type,
  semi-detached brick houses with tile roofs and a TV aerial. Authentic, but not
  local.

### Note B — Lowcountry vs Piedmont

`lancaster-hero.webp`, `cta-combo-patios.webp` and `cta-location-lancaster.webp`
feature Spanish-moss-draped live oaks. Spanish moss is native to the **coastal
plain** and is an emblem of the Lowcountry [1](https://www.scencyclopedia.org/sce/entries/spanish-moss/),
whereas Lancaster sits in the Piedmont, where residents note it does not grow
[3](https://www.quora.com/How-did-Spanish-moss-take-over-down-south). I am
flagging this as **brand fit, not impossibility**: there is a documented wild
population at Landsford Canal State Park, which is in Lancaster County
[2](https://www.palmtalk.org/forum/topic/63827-growing-spanish-moss-in-the-nc-piedmont/?page=2).
A Lancaster homeowner would most likely read these as Charleston, not home.

### Note C — stylistic inconsistency

The set visibly splits into two families: soft, slightly compressed job-site and
video-grab photographs (honest, local, trustworthy), and polished hyperreal
marketing renders (clean, bright, shallow-focus). They sit side by side — for
example `cta-service-driveways.webp` (real) and `cta-services-index.webp`
(synthetic) perform the same job two sections apart. That inconsistency reads as
"assembled from a stock bin" even before anyone spots a specific artifact.

---

## Recommendation

**Option 2 — replace only a few images.**

Not option 1: the Tier 1 set contains construction impossibilities that a
contractor or an informed homeowner will catch, on a site whose entire proposition
is trustworthy routing to licensed providers. The concept-imagery disclosure
covers "these are not our projects"; it does not cover a chute pouring blobs or a
tape measure detached from its case.

Not options 3 or 4: **20 of the 44 images are genuinely good** — `repair-detail-crack`,
`driveway-pour-joints`, `local-slabs-lancaster`, `cta-combo-repair`,
`process-combo-slabs` and the rest of the real set are specific, unglamorous and
correct, exactly the register this brand needs. Replacing them wholesale would
discard the most credible asset the site has.

Suggested sequence, if and when you want changes made:

1. **The 7 Tier 1 images** — highest priority, visible errors of fact.
2. **`home-hero.webp` and `services-overview.webp`** — not the worst artifacts,
   but the two most-seen images on the site.
3. **Tier 2 surfaces**, which undermine the one material the site is about.
4. **Note A geography**, lowest urgency and arguably invisible to most visitors.

The five "possibly" and three "unclear" images should be **left alone**. The
evidence does not support calling them synthetic, and replacing them on suspicion
would mean discarding possibly genuine photography.

---

## Addendum — changes actioned (2026-10-05)

Steps 1 and 2 of the suggested sequence were approved: the **7 Tier 1
construction-impossible images plus the two most-seen slots**, nine in total.
Everything else on the site, including the five "possibly AI" and three
"unclear" images, was left untouched.

The approved method was **hybrid**: re-point a slot to a verified-real photo
already in `public/` wherever one fits, and generate a new image only where no
real photo could carry the slot.

### Re-pointed to existing verified-real photography (3)

| Slot | Was | Now | Why this source |
|---|---|---|---|
| Home hero | `home-hero.webp` | `/images/cta-service-driveways.webp` | Real, 1355×762, brick ranch with a wide driveway. Best real image available for the most-seen slot on the site. |
| Home closing CTA | `cta-pour-band.webp` | `/images/cta-combo-driveways.webp` | Real, 1296×729. Sourced from a deep combo page so the repeat sits far from the normal browsing path. |
| `/how-it-works` process band | `estimate-visit-measuring.webp` | `/images/cta-combo-repair.webp` | Real, and the physics are correct — a gloved hand working a float, which is exactly what a "process" band should show. |

The three replaced files were deleted; nothing else referenced them.

### Newly generated (6)

Each kept its existing filename, so only the `alt` text changed in code.

| Slot | Subject now | Replaces |
|---|---|---|
| `/services` hero | Broom-finished walkway edge, tooled control joint, radiused edge meeting lawn | Impossible broom texture |
| `/how-it-works` hero | Freshly poured slab floated smooth, brick home beyond | Two workers with a merged screed board |
| Slabs detail (`/services/concrete-slabs`) | Fresh pad enclosed by staked timber side forms | Forms detached and floating beside the pad |
| Repair CTA (`/services/concrete-repair`) | Cracked, settled driveway slab with spalled edges and exposed aggregate | Fresh pour impossibly abutting a broken edge |
| Combo patios process band | Finished patio, broom finish, tooled joints, rounded edge | Two workers screeding, impossible formwork |
| Combo repair process band | Section saw-cut out and removed to the gravel base | Worker holding a saw that merged into the slab |

**These six are AI-generated and are recorded as such.** They were constrained to
the subjects this audit found generators actually handle — surfaces, edges,
damage and finished work — with **no people, no hands, no tools in use, no
machinery and no text**, which is where every catalogued artifact in the table
above occurred. Each was inspected against the same checklist before use: joint
tooling, edge radii, broom direction, form staking, aggregate on broken faces,
slab thickness at the saw cut, and consistent overcast lighting. They were
encoded to match the existing pipeline — lossy WebP, no EXIF/XMP/ICC, 95–109 KB.

### Accepted trade-off

Three real photos are now used in two places each (home hero +
`/services/concrete-driveways` CTA; home CTA + combo driveways CTA;
`/how-it-works` process band + combo repair CTA). This breaks the former
"one file per rendered section site-wide" rule, which is why that claim has been
corrected in the two source comments that asserted it. No two combo pages share
a file, so the programmatic pages stay distinct from each other, and no single
page shows the same photo twice. Reused photography on distant pages was judged
a smaller problem than construction-impossible imagery on a contractor site.

### Unchanged

Geist Sans, the colour system, layout, phone number, email, routes, schema and
all legal and referral wording are byte-identical. Every `alt` string was
rewritten to describe the image that now occupies the slot, so no alt text
overstates or misdescribes what a visitor sees. Imagery remains presented as
concept/reference imagery and is still not claimed to be completed work by any
provider.

Verified after the change: typecheck clean, 36/36 tests, all four assert gates,
16/16 routes 200 (404 intact), every referenced image present, no unreferenced
images left on disk, and all nine slots inspected in a browser at 1440×860.

### Revised tally

Real photographic **17** · Professional stock **3** · Likely AI **10** ·
Possibly AI **5** · Unclear **3** · Newly generated, documented **6**.

The count of synthetic images barely moves. What changed is that none of them
now depict a physically impossible construction operation, and the two most-seen
slots on the site hold real photographs.
