export type ServiceSlug =
  | "concrete-driveways"
  | "concrete-patios"
  | "concrete-slabs"
  | "concrete-repair";

export type PublicationState = "published" | "gated" | "blocked";

export interface ServiceRecord {
  slug: ServiceSlug;
  name: string;
  shortName: string;
  nameLower: string;
  state: PublicationState;
  intent: string;
  /** One-line card summary. */
  summary: string;
  /** Hero paragraph on the service hub. */
  heroSummary: string;
  image: string;
  imageAlt: string;
  projectTypes: string[];
  /** Quick-reference facts strip under the hero. */
  keyFacts: { label: string; value: string }[];
  /** Scope we will route. */
  covered: { title: string; body: string }[];
  /** Scope we decline outright. */
  outOfScope: string[];
  /** Specification choices the contractor will raise. */
  options: { name: string; description: string }[];
  /** Typical project sequence. Durations are ranges, never promises. */
  process: { phase: string; duration: string; detail: string }[];
  /** What actually moves the price. */
  costFactors: { factor: string; impact: "High" | "Medium" | "Low"; note: string }[];
  /** Homeowner prep before the estimate visit. */
  prepChecklist: string[];
  /** Questions to put to the contractor, not to us. */
  quoteQuestions: string[];
  considerations: { question: string; answer: string }[];
}

export const services: readonly ServiceRecord[] = [
  {
    slug: "concrete-driveways",
    name: "Concrete Driveways",
    shortName: "Driveways",
    nameLower: "a concrete driveway",
    state: "published",
    intent: "New and replacement driveway enquiries",
    summary:
      "New pours and full replacements, including tear out of failed slabs and the drainage questions that come with Lancaster County clay.",
    heroSummary:
      "Looking for a concrete driveway contractor in Lancaster, SC? We help homeowners connect with independent local service providers who may be able to assist with new pours and full replacements. Submit your project details to request a referral. We are a referral service and do not perform concrete work ourselves. The provider quotes, schedules, and performs the work.",
    image: "/services/concrete-driveways.webp",
    imageAlt:
      "Newly poured residential concrete driveway with saw cut control joints and a broom finish",
    projectTypes: ["New driveway", "Driveway replacement"],
    keyFacts: [
      { label: "Routed for", value: "Residential driveways and aprons" },
      { label: "Coverage today", value: "Lancaster, SC" },
      { label: "Typical site visit", value: "Within the participating provider's contracted response window" },
      { label: "Cost to you", value: "No charge for the referral" },
    ],
    covered: [
      {
        title: "New driveway pours",
        body: "First time concrete over an existing gravel or dirt drive, including the excavation, subbase, and apron connection to the street or existing approach.",
      },
      {
        title: "Full replacement",
        body: "Demolition and haul away of a failed slab, regrading, and a new pour. Participating providers quote demolition separately so you can see what you are paying for.",
      },
      {
        title: "Widening and extensions",
        body: "Adding a parking pad, a turnaround, or extra width alongside an existing drive, where the connection and joint layout can be done cleanly.",
      },
      {
        title: "Rebuilds driven by drainage",
        body: "Pours where standing water, a low spot, or a downhill approach is the actual problem and grade correction is part of the scope.",
      },
    ],
    outOfScope: [
      "Asphalt, paver, and gravel installation",
      "Public road or commercial access work",
      "Structural engineering or geotechnical assessment",
      "Retaining walls supporting a driveway cut",
    ],
    options: [
      {
        name: "Broom finish",
        description:
          "The default for driveways. Textured for traction, easiest to repair, lowest cost to place.",
      },
      {
        name: "Thickness and reinforcement",
        description:
          "Residential drives are commonly placed thicker where vehicles are heavy. Fibre mesh, welded wire, or rebar is specified by the contractor based on load and soil.",
      },
      {
        name: "Control joint layout",
        description:
          "Saw cut joints placed on a grid to control where the slab cracks. Joint spacing is a workmanship detail worth asking about.",
      },
      {
        name: "Exposed aggregate or stamped edge",
        description:
          "Decorative options are only routed when a participating provider has documented that capability. Otherwise the request goes through as a standard pour.",
      },
    ],
    process: [
      {
        phase: "Site visit and measurement",
        duration: "Usually under an hour",
        detail:
          "The contractor measures, checks access for a mixer, looks at grade and drainage, and confirms whether demolition is needed.",
      },
      {
        phase: "Written quote and scheduling",
        duration: "Varies by contractor",
        detail:
          "You receive their quote directly. Demolition, haul away, subbase, and reinforcement should each be visible as line items.",
      },
      {
        phase: "Demolition and excavation",
        duration: "Typically one day",
        detail:
          "Old slab out, spoil removed, subgrade cut to the specified depth. This is where access width matters most.",
      },
      {
        phase: "Subbase, forms, and reinforcement",
        duration: "Typically one day",
        detail:
          "Compacted base material, formwork set to grade, and reinforcement placed. On clay, compaction is the step that decides how the slab ages.",
      },
      {
        phase: "Pour and finish",
        duration: "Usually one working day",
        detail:
          "Placement, screeding, floating, broom finish, and saw cut joints once the slab has set enough to cut.",
      },
      {
        phase: "Cure and return to use",
        duration: "Ask the contractor",
        detail:
          "Foot and vehicle traffic timing depend on mix, weather, and thickness. Your contractor gives the figures for your pour. We do not.",
      },
    ],
    costFactors: [
      {
        factor: "Demolition and haul away",
        impact: "High",
        note: "Removing and disposing of an existing slab is a separate cost from the new pour.",
      },
      {
        factor: "Subbase preparation",
        impact: "High",
        note: "Clay subsoil holding water often means more excavation and imported base material.",
      },
      {
        factor: "Site access",
        impact: "High",
        note: "Narrow lots in town restrict mixer staging and can force wheelbarrow or pump placement.",
      },
      {
        factor: "Thickness and reinforcement",
        impact: "Medium",
        note: "Heavier vehicles and softer soils push the specification up.",
      },
      {
        factor: "Square footage",
        impact: "Medium",
        note: "Matters, but it is a weaker predictor than access and prep on most Lancaster jobs.",
      },
      {
        factor: "Decorative finish",
        impact: "Medium",
        note: "Stamping, colour, and exposed aggregate add labour and material.",
      },
      {
        factor: "Drainage correction",
        impact: "Medium",
        note: "Regrading, a channel drain, or a culvert connection is extra scope.",
      },
    ],
    prepChecklist: [
      "Measure the rough length and width of the existing drive",
      "Note where water stands after heavy rain",
      "Photograph the worst cracking and any settled panels",
      "Check whether the approach ties into a county or city road",
      "Clear vehicles and obstacles so the drive can be walked end to end",
      "Decide whether you want the same footprint or a wider one",
    ],
    quoteQuestions: [
      "What thickness and reinforcement are you specifying, and why?",
      "Is demolition and disposal included, and at what figure?",
      "What base material are you using and how is it compacted?",
      "How will you handle the water that stands near the garage?",
      "Where will the control joints be cut, and how soon after the pour?",
      "When can I walk on it, and when can I park on it?",
      "What is your workmanship warranty, in writing?",
    ],
    considerations: [
      {
        question: "Do you pour the driveway yourselves?",
        answer:
          "No. We are a referral service that connects homeowners with independent third party concrete service providers. Excavation, subbase preparation, forming, and the pour itself are carried out by the provider you engage, and your contract is with them.",
      },
      {
        question: "How long does a residential driveway pour take?",
        answer:
          "Most residential driveways are placed in one working day once demolition and subbase prep are complete. Prep and curing are separate from that day. Your assigned contractor gives the schedule for your site.",
      },
      {
        question: "When is replacement discussed instead of repair?",
        answer:
          "Widespread settlement, a failing subbase, or cracking across most panels usually moves the conversation toward replacement. Isolated surface cracking on a sound slab often does not. Only the contractor who inspects the slab can make that call.",
      },
      {
        question: "Do I need a permit in Lancaster County?",
        answer:
          "Requirements vary by project type, scope, and total cost, and an apron connection to a public road may involve the road authority. Confirm permitting with your contractor and the authority having jurisdiction before work starts.",
      },
      {
        question: "Why does clay soil keep coming up?",
        answer:
          "Red clay holds water and moves with moisture content. That makes compaction, base depth, and drainage the three details most likely to decide whether a driveway lasts, which is why participating providers ask about them before quoting.",
      },
    ],
  },
  {
    slug: "concrete-patios",
    name: "Concrete Patios",
    shortName: "Patios",
    nameLower: "a concrete patio",
    state: "published",
    intent: "Residential patio enquiries",
    summary:
      "New patio pours, replacements, and stamped finishes where a participating provider has documented that capability.",
    heroSummary:
      "Looking for a concrete patio contractor in Lancaster, SC? A patio is the one concrete project where finish and layout matter as much as the slab. We help homeowners connect with independent service providers who may be able to assist, and the provider walks the space with you and quotes it directly. Submit your project details to request a referral.",
    image: "/services/concrete-patios.webp",
    imageAlt:
      "Rectangular concrete backyard patio with a smooth troweled finish and control joints",
    projectTypes: ["New patio", "Patio replacement", "Stamped patio"],
    keyFacts: [
      { label: "Routed for", value: "Residential patios and walkway connections" },
      { label: "Coverage today", value: "Lancaster, SC" },
      { label: "Decorative work", value: "Only where a participating provider documents the capability" },
      { label: "Cost to you", value: "No charge for the referral" },
    ],
    covered: [
      {
        title: "New patio pours",
        body: "Ground level slabs off a rear door, around a grill area, or as a standalone seating pad, with grade set to shed water away from the house.",
      },
      {
        title: "Patio replacement",
        body: "Removing a cracked, settled, or badly sloped patio and pouring again with corrected grade and fresh joint layout.",
      },
      {
        title: "Extensions and connections",
        body: "Enlarging an existing patio or connecting it to a walkway, where the existing slab is sound enough to tie into.",
      },
      {
        title: "Stamped and coloured finishes",
        body: "Pattern stamped or integrally coloured slabs, routed only to participating providers who have documented that capability for your area.",
      },
    ],
    outOfScope: [
      "Elevated or structural decks and balconies",
      "Pool shells and pool structural surrounds",
      "Paver, flagstone, and natural stone installation",
      "Outdoor kitchens, pergolas, and roofed structures",
    ],
    options: [
      {
        name: "Broom finish",
        description:
          "Textured and slip resistant. The straightforward, lowest cost choice for a working patio.",
      },
      {
        name: "Smooth trowel finish",
        description:
          "Cleaner appearance for covered areas. Less grip when wet, so placement matters.",
      },
      {
        name: "Stamped pattern",
        description:
          "Stone, slate, or plank patterns pressed into the fresh slab. Availability depends on the participating provider and adds cost and cure time sensitivity.",
      },
      {
        name: "Integral colour and release",
        description:
          "Colour mixed into the concrete rather than applied on top. Discuss fade expectations and sealing schedule with the contractor.",
      },
      {
        name: "Sealing",
        description:
          "Decorative work is normally sealed, and sealer is reapplied periodically. Ask who does that and how often.",
      },
    ],
    process: [
      {
        phase: "Layout walkthrough",
        duration: "Usually under an hour",
        detail:
          "The contractor checks the footprint against door swings, furniture, downspouts, and the fall away from the house.",
      },
      {
        phase: "Written quote and finish selection",
        duration: "Varies by contractor",
        detail:
          "Finish, pattern, colour, and edge detail are priced. Decorative options should be quoted as clearly separable extras.",
      },
      {
        phase: "Excavation and base",
        duration: "Typically one day",
        detail:
          "Sod and topsoil out, base material placed and compacted, forms set with a deliberate slope away from the structure.",
      },
      {
        phase: "Pour and finishing",
        duration: "Usually one working day",
        detail:
          "Placement, screeding, and the chosen finish. Stamping is time critical and is done as the slab sets.",
      },
      {
        phase: "Joints, cure, and sealing",
        duration: "Ask the contractor",
        detail:
          "Joints are cut, the slab cures, and any sealer is applied on the contractor's schedule, not before it is ready.",
      },
    ],
    costFactors: [
      {
        factor: "Finish type",
        impact: "High",
        note: "Stamped and coloured work is substantially more labour intensive than a broom finish.",
      },
      {
        factor: "Footprint and shape",
        impact: "High",
        note: "Curves, multiple levels, and cutouts cost more per square foot than a simple rectangle.",
      },
      {
        factor: "Demolition of an old patio",
        impact: "Medium",
        note: "Removal and disposal are separate from the new pour.",
      },
      {
        factor: "Grade and drainage correction",
        impact: "Medium",
        note: "A patio that currently drains toward the house needs the fall rebuilt, not just resurfaced.",
      },
      {
        factor: "Access to the rear yard",
        impact: "Medium",
        note: "Gate width and slope decide whether concrete is barrowed, pumped, or chuted.",
      },
      {
        factor: "Sealing and maintenance",
        impact: "Low",
        note: "A recurring cost on decorative slabs rather than a single job.",
      },
    ],
    prepChecklist: [
      "Mark the rough footprint with a hose or spray paint",
      "Note where rainwater currently runs and where downspouts discharge",
      "Check gate and side yard access width for equipment",
      "Think about furniture layout and door clearance before sizing",
      "Photograph any existing slab you want removed or tied into",
      "Locate irrigation lines and low voltage cabling in the area",
    ],
    quoteQuestions: [
      "Which way will the finished slab drain, and at what fall?",
      "Is the stamped or coloured option priced separately?",
      "How will you tie into the existing slab or threshold height?",
      "Where will joints fall, and how will they look in the pattern?",
      "Do you seal it, and when is the first reseal due?",
      "How long before furniture can go back on it?",
    ],
    considerations: [
      {
        question: "Who designs and builds the patio?",
        answer:
          "An independent third party service provider does. We connect you with a provider who may be able to assist; layout, finish selection, scheduling, and construction are entirely their work, and availability depends on participating providers.",
      },
      {
        question: "Is a stamped finish always available?",
        answer:
          "No. Stamped work is routed only when a participating provider has documented that capability for your area. If it is not supported, your request goes through as a standard patio enquiry and we say so rather than promising a finish nobody can deliver.",
      },
      {
        question: "What size should a usable patio be?",
        answer:
          "Furniture layout, door swing, and grade drive the footprint more than any standard number. Sketch where a table and chairs actually go, then bring rough dimensions to the estimate conversation.",
      },
      {
        question: "Can a patio tie into an existing slab?",
        answer:
          "Sometimes. Connections depend on the condition of the existing slab, its elevation, and where joints can be placed. The contractor confirms this on site.",
      },
      {
        question: "Will a new patio crack?",
        answer:
          "Concrete moves, and control joints exist to decide where it cracks rather than whether it does. Ask your contractor about joint spacing and what their workmanship warranty actually covers.",
      },
    ],
  },
  {
    slug: "concrete-slabs",
    name: "Concrete Slabs",
    shortName: "Slabs and pads",
    nameLower: "a concrete slab",
    state: "published",
    intent: "Residential slab and pad enquiries",
    summary:
      "Residential slabs and pads for sheds, equipment, vehicles, and outbuildings, nonstructural work only.",
    heroSummary:
      "Looking for a concrete slab contractor in Lancaster, SC? Shed bases, equipment pads, RV and boat parking, and similar flatwork. We help homeowners connect with independent service providers who may be able to assist with this category. This is the narrowest of our referrals on purpose: anything that carries a building load or needs an engineer is declined rather than routed.",
    image: "/services/concrete-slabs.webp",
    imageAlt:
      "Finished flat concrete slab pad in a residential backyard with a small storage shed",
    projectTypes: ["Residential slab", "Concrete pad"],
    keyFacts: [
      { label: "Routed for", value: "Nonstructural residential slabs and pads" },
      { label: "Coverage today", value: "Lancaster, SC" },
      { label: "Never routed", value: "Foundations and engineered structural slabs" },
      { label: "Cost to you", value: "No charge for the referral" },
    ],
    covered: [
      {
        title: "Shed and outbuilding pads",
        body: "Level bases for prefabricated sheds and small outbuildings, sized with the overhang and anchor points in mind.",
      },
      {
        title: "Equipment and generator pads",
        body: "Small pads for HVAC units, generators, and tanks, placed at the elevation the installer requires.",
      },
      {
        title: "Vehicle, RV, and trailer parking",
        body: "Thicker pads for heavier static loads, with reinforcement specified for the weight being parked.",
      },
      {
        title: "Utility and walkway flatwork",
        body: "Landing pads, bin pads, and short connecting flatwork poured alongside a larger job.",
      },
    ],
    outOfScope: [
      "House foundations, footings, and stem walls",
      "Engineered or load bearing structural slabs",
      "Garage foundations forming part of a permitted structure",
      "Retaining walls and any earth retention design",
    ],
    options: [
      {
        name: "Thickness",
        description:
          "Driven by the load. A shed pad and an RV pad are not the same specification, and your contractor should say why.",
      },
      {
        name: "Reinforcement",
        description:
          "Fibre mesh, welded wire, or rebar. The choice follows load, soil, and the contractor's judgement.",
      },
      {
        name: "Vapour barrier",
        description:
          "Relevant where anything moisture sensitive will sit on or be enclosed above the slab.",
      },
      {
        name: "Thickened edge",
        description:
          "A deeper perimeter where a structure will be anchored to the slab edge.",
      },
      {
        name: "Anchor provision",
        description:
          "Bolts or sleeves set during the pour if a shed or unit needs to be tied down. Decide this before, not after.",
      },
    ],
    process: [
      {
        phase: "Scope and load discussion",
        duration: "Usually under an hour",
        detail:
          "What is going on the pad, how heavy it is, and whether anything needs anchoring. This decides the entire specification.",
      },
      {
        phase: "Written quote",
        duration: "Varies by contractor",
        detail:
          "Thickness, reinforcement, base depth, and any anchors should appear as stated items, not assumptions.",
      },
      {
        phase: "Excavation and base",
        duration: "Typically one day",
        detail:
          "Cut to depth, place and compact base material, set forms square and level to the required elevation.",
      },
      {
        phase: "Pour and finish",
        duration: "Usually part of one day",
        detail:
          "Most residential pads are placed in a single visit, screeded flat, and finished to suit what sits on top.",
      },
      {
        phase: "Cure before loading",
        duration: "Ask the contractor",
        detail:
          "Do not place a shed or park on a pad before the contractor says the slab is ready. Early loading is a common, avoidable failure.",
      },
    ],
    costFactors: [
      {
        factor: "Load and required thickness",
        impact: "High",
        note: "An RV pad costs materially more per square foot than a shed base.",
      },
      {
        factor: "Excavation depth and spoil removal",
        impact: "High",
        note: "Sloped or soft ground means more cut, more base, and more material hauled away.",
      },
      {
        factor: "Access to the location",
        impact: "High",
        note: "Rear yard pads that cannot be chuted from the truck need barrowing or pumping.",
      },
      {
        factor: "Reinforcement specification",
        impact: "Medium",
        note: "Rebar mats cost more than fibre mesh and are not always necessary.",
      },
      {
        factor: "Anchors and embedded items",
        impact: "Low",
        note: "Cheap to include during the pour, expensive to retrofit afterwards.",
      },
    ],
    prepChecklist: [
      "Confirm the exact footprint of the shed, unit, or vehicle",
      "Add the manufacturer's required overhang or clearance",
      "Check the supplier's base requirements before pouring anything",
      "Identify the fall of the ground across the intended location",
      "Locate buried utilities, septic components, and irrigation",
      "Confirm setback distances from boundaries if a structure is going on it",
    ],
    quoteQuestions: [
      "What thickness and reinforcement are you specifying for this load?",
      "How deep is the base, and what material is it?",
      "Is a vapour barrier included, and is it needed here?",
      "Are anchor bolts or sleeves set during the pour?",
      "How long before I can place the shed or park on it?",
      "Does my project need anything you are not licensed to do?",
    ],
    considerations: [
      {
        question: "Is the slab poured by your own crew?",
        answer:
          "We have no crew. We are a referral service, and slab work is performed by an independent third party service provider serving the requested area. We do not perform, supervise, or guarantee that work.",
      },
      {
        question: "Do you handle foundations or structural slabs?",
        answer:
          "No. Foundation repair, structural engineering, and retaining walls are outside this referral scope. Those enquiries are declined rather than routed to a concrete finisher who should not be taking them on.",
      },
      {
        question: "What thickness does a pad need?",
        answer:
          "Thickness and reinforcement follow the load, the soil, and applicable code. That specification comes from your contractor after seeing the site, not from a table on a referral website.",
      },
      {
        question: "Does the site need to be cleared first?",
        answer:
          "Clearing, access, and spoil removal are priced per site. Tell the contractor about slope, trees, and access width early. Those three things change the quote more than the slab size does.",
      },
      {
        question: "My shed supplier says I need a level base. Is that all?",
        answer:
          "Level is the minimum. Base depth, compaction, drainage away from the pad, and anchor provision decide whether it stays level. Share the supplier's written requirements with the contractor.",
      },
    ],
  },
  {
    slug: "concrete-repair",
    name: "Concrete Repair",
    shortName: "Repair",
    nameLower: "concrete repair",
    state: "published",
    intent: "Nonstructural repair enquiries",
    summary:
      "Nonstructural crack repair, surface repair, and resurfacing. Structural assessment is out of scope.",
    heroSummary:
      "Looking for a concrete repair contractor in Lancaster, SC? We help homeowners connect with independent service providers who may be able to assist with surface level problems on otherwise sound concrete: crazing, spalling, shrinkage cracks, and tired finishes. If what you are describing sounds like movement or load failure instead, we will tell you plainly that you need a different professional.",
    image: "/services/concrete-repair.webp",
    imageAlt:
      "Residential walkway half weathered and cracked, half freshly resurfaced with smooth concrete",
    projectTypes: ["Crack and surface repair", "Resurfacing"],
    keyFacts: [
      { label: "Routed for", value: "Nonstructural repair and resurfacing" },
      { label: "Coverage today", value: "Lancaster, SC" },
      { label: "Never routed", value: "Structural, heaving, or load failure assessment" },
      { label: "Cost to you", value: "No charge for the referral" },
    ],
    covered: [
      {
        title: "Crack repair",
        body: "Routing, cleaning, and filling shrinkage and surface cracks on slabs that are otherwise stable.",
      },
      {
        title: "Spalling and surface damage",
        body: "Patching flaked or pitted areas where the wearing surface has broken down but the slab beneath is sound.",
      },
      {
        title: "Resurfacing and overlays",
        body: "A new wearing surface over an existing slab to restore appearance and texture, where the substrate can carry it.",
      },
      {
        title: "Joint maintenance",
        body: "Cleaning out and resealing control joints so water stops getting into the subbase.",
      },
    ],
    outOfScope: [
      "Structural assessment, engineering reports, and load calculations",
      "Slab jacking, mudjacking, and foam levelling of settled slabs",
      "Foundation crack repair and waterproofing",
      "Anything caused by active ground movement or heave",
    ],
    options: [
      {
        name: "Routed and sealed crack repair",
        description:
          "The crack is opened slightly, cleaned, and filled so the repair bonds instead of sitting on the surface.",
      },
      {
        name: "Partial depth patching",
        description:
          "Damaged surface material is removed back to sound concrete and replaced. Colour match is never perfect. Expect a visible repair.",
      },
      {
        name: "Cementitious overlay",
        description:
          "A thin resurfacing layer over the whole slab. Requires a clean, sound, properly prepared substrate to bond.",
      },
      {
        name: "Joint resealing",
        description:
          "Low cost preventative work that keeps water out of the base. Often the most useful thing to do on an ageing slab.",
      },
    ],
    process: [
      {
        phase: "Diagnosis on site",
        duration: "Usually under an hour",
        detail:
          "The contractor establishes whether this is surface deterioration or a symptom of movement. That answer decides whether repair is even appropriate.",
      },
      {
        phase: "Written quote and honest limits",
        duration: "Varies by contractor",
        detail:
          "A good repair quote says what it will not fix. If the subbase is the cause, resurfacing only buys time.",
      },
      {
        phase: "Surface preparation",
        duration: "Typically part of one day",
        detail:
          "Cleaning, grinding, or profiling. Preparation is the step that decides whether the repair bonds and lasts.",
      },
      {
        phase: "Repair or overlay application",
        duration: "Typically one day",
        detail:
          "Product specific and weather sensitive. Temperature limits are set by the material, not by the calendar.",
      },
      {
        phase: "Cure and sealing",
        duration: "Ask the contractor",
        detail:
          "Overlays and patches need protected cure time before traffic. Ask for the figure before you plan around it.",
      },
    ],
    costFactors: [
      {
        factor: "Cause of the damage",
        impact: "High",
        note: "Surface wear is a repair. Movement or a failing base is a replacement conversation.",
      },
      {
        factor: "Area and extent",
        impact: "High",
        note: "Spot patching a few square feet and overlaying an entire drive are different jobs.",
      },
      {
        factor: "Surface preparation required",
        impact: "High",
        note: "Grinding, cleaning, and profiling often cost more than the repair material itself.",
      },
      {
        factor: "Product selection",
        impact: "Medium",
        note: "Overlay systems vary widely in price, durability, and cure requirements.",
      },
      {
        factor: "Weather window",
        impact: "Low",
        note: "Temperature limits can delay scheduling rather than change the price.",
      },
    ],
    prepChecklist: [
      "Photograph the damage in daylight, wide and close up",
      "Note whether cracks have a height difference across them",
      "Note whether the damage is getting worse and how quickly",
      "Check whether water pools on or beside the affected area",
      "Note the approximate age of the slab if you know it",
      "Look for the same pattern elsewhere on the property",
    ],
    quoteQuestions: [
      "What do you think caused this, and will the cause remain?",
      "Is this repair cosmetic or does it restore the surface properly?",
      "How long should the repair reasonably last?",
      "Will the repair be visible, and how closely will it match?",
      "Would replacement be the better value here, honestly?",
      "What temperature or weather conditions do you need to do the work?",
    ],
    considerations: [
      {
        question: "Do you carry out the repair?",
        answer:
          "No. Repairs are carried out by an independent third party service provider. We connect homeowners with providers who may be able to assist, and the assessment, method, and result remain the provider's responsibility.",
      },
      {
        question: "What counts as nonstructural?",
        answer:
          "Surface spalling, shrinkage cracking, and cosmetic deterioration on a slab that is not moving. Movement, heaving, a height difference across a crack, or load bearing failure needs a licensed professional assessment instead, and we will not route it as a repair job.",
      },
      {
        question: "Is resurfacing a permanent fix?",
        answer:
          "Resurfacing addresses the wearing surface. If the subbase is the cause, the same failure returns through the new surface. Your contractor should tell you which situation you are in before taking the work.",
      },
      {
        question: "Can repair be scheduled in cold weather?",
        answer:
          "Temperature limits vary by product, and rushing a repair outside those limits is how repairs fail. Scheduling is confirmed by the contractor performing the work.",
      },
      {
        question: "Should I repair or replace?",
        answer:
          "Repair makes sense on a sound slab with surface problems. Once cracking is widespread, panels have settled relative to each other, or the base has failed, repeated repairs usually cost more over time than replacing the slab once.",
      },
    ],
  },
] as const;

export const publishedServices = services.filter((s) => s.state === "published");

export function getService(slug: string): ServiceRecord | undefined {
  return publishedServices.find((s) => s.slug === slug);
}
