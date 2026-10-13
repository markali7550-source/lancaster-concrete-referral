export type ServiceSlug =
  | "concrete-driveways"
  | "concrete-patios"
  | "concrete-slabs"
  | "concrete-repair";

export type PublicationState = "published" | "gated" | "blocked";

export type ServiceSectionId =
  "scope" | "options" | "process" | "cost" | "prepare";

export interface ServiceRecord {
  slug: ServiceSlug;
  name: string;
  shortName: string;
  nameLower: string;
  /** Singular noun for sentence templating, e.g. "How a driveway project usually runs". */
  projectNoun: string;
  state: PublicationState;
  intent: string;
  /** One-line card summary. */
  summary: string;
  /** Short scope line shown on the service card, e.g. the main jobs covered. */
  cardScope: string;
  /** Steps the provider's work typically includes, shown under What We Include. */
  workIncluded: readonly string[];
  /** Hero paragraph on the service hub. */
  heroSummary: string;
  /*
   * Section headings written per service rather than built from the service
   * name. Four pages previously shared seven byte-identical H2s, which is what
   * made them read as one page with a noun swapped. These are the headings a
   * writer would choose for each subject: a patio page should not be headed
   * "What actually drives the price" just because the driveway page is.
   */
  /*
   * Main-column section order. Identical on all four services by owner
   * direction: every service page and every location/service page follows
   * the one master template (scope, specification, process, cost,
   * prepare), and only the title, the service/city-specific text and the
   * image differ between pages.
   */
  sectionOrder: readonly ServiceSectionId[];
  headings: {
    /** Scope heading. Per service because the component hardcoded
     *  "What we take on under {name}", which opened all four pages on the
     *  same sentence with one noun swapped. */
    scope: string;
    options: string;
    process: string;
    cost: string;
    prepare: string;
    faq: string;
    /** Closing CTA heading. Service-specific so the four pages do not all
     *  end on the same sentence, and so the combo pages stop using a bare
     *  keyword string ("Concrete Driveways in Lancaster, SC") as a CTA. */
    cta: string;
  };
  /** Lede under the specification heading. */
  optionsLead: string;
  /** Lede under the process heading. */
  processLead: string;
  /** Lede under the pricing heading. */
  costLead: string;
  /** Body of the closing CTA. Per service so the four pages do not end on
   *  an identical paragraph. */
  ctaLead: string;
  image: string;
  imageAlt: string;
  projectTypes: string[];
  /** Quick-reference facts strip under the hero. */
  keyFacts: { label: string; value: string }[];
  /** Scope we will send. */
  covered: { title: string; body: string }[];
  /** Scope we decline outright. */
  outOfScope: string[];
  /** Specification choices the contractor will raise. */
  options: { name: string; description: string }[];
  /** Construction specifications presented as items to confirm with the provider. */
  tradeSpecs: readonly string[];
  /** Typical project sequence. Durations are ranges, never promises. */
  process: { phase: string; duration: string; detail: string }[];
  /** What actually moves the price. */
  costFactors: {
    factor: string;
    impact: "High" | "Medium" | "Low";
    note: string;
  }[];
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
    projectNoun: "driveway",
    state: "published",
    intent: "Driveway tear-out, replacement, and new pour requests",
    summary:
      "Tear-out, replacement, and new pours on a 4,000 PSI high-strength mix with rebar reinforcement and a broom finish.",
    heroSummary:
      "A driveway carries vehicles every day, so the details matter. Requests cover tear-out and removal of a failed slab, full replacement, and expansions of an existing drive. Typical specifications include a 4,000 PSI high-strength mix, steel rebar reinforcement, and a broom finish for traction. Request a quote and a local provider will confirm the scope, mix, and joint layout at a site visit.",
    sectionOrder: ["scope", "options", "process", "cost", "prepare"],
    headings: {
      scope: "What counts as a driveway job",
      options: "Decisions that change the quote",
      process: "What a driveway pour week looks like",
      cost: "Where driveway money actually goes",
      prepare: "Before the contractor walks the drive",
      faq: "What homeowners ask about driveways",
      cta: "Ready to price a driveway?",
    },
    optionsLead:
      "Your contractor specifies the driveway. These are the calls they will ask you to make, so you will already know them when they arrive.",
    processLead:
      "A driveway is a one day pour on the end of a week of preparation. The sequence below is what that week usually looks like; your contractor sets the real dates.",
    costLead:
      "Nobody can price a driveway from an address. Square footage is only the start of it. What the old slab costs to break up and haul away, and whether a truck can reach the pour, often move the number more.",
    ctaLead:
      "Share the length of the drive and whether the old slab has to come out. A local provider will confirm the scope at a site visit.",
    cardScope: "Tear-out, replacement, and expansions",
    workIncluded: [
      "Grading and excavation to the planned subgrade",
      "Forming and reinforcement set to the layout",
      "Placing and pouring the concrete",
      "Finishing to the chosen texture",
      "Site clean-up and haul-away of debris",
    ],
    tradeSpecs: [
      "High-strength concrete mix, commonly 4,000 PSI for residential work. Your provider confirms the mix for your project.",
      "Steel rebar or welded wire reinforcement placed to help limit cracking.",
      "Compacted gravel sub-base and a planned drainage slope set before the forms go in.",
      "Control and expansion joints laid out for South Carolina's seasonal heat, rain, and clay soil movement.",
    ],
    image: "/images/locations/lancaster-sc/lancaster-sc-driveways.webp",
    imageAlt:
      "Concrete driveway with control joints and weather staining running up to the garage of a brick ranch house, with patchy lawn, red clay at the verge and pines behind",
    projectTypes: ["New driveway", "Driveway replacement"],
    keyFacts: [
      { label: "Served for", value: "Residential driveways and aprons" },
      { label: "Coverage today", value: "Lancaster, SC" },
      {
        label: "Typical site visit",
        value: "Response timing confirmed by the local provider",
      },
      { label: "Cost to you", value: "No charge for the quote request" },
    ],
    covered: [
      {
        title: "New driveway pours",
        body: "First time concrete over an existing gravel or dirt drive, including the excavation, subbase, and apron connection to the street or existing approach.",
      },
      {
        title: "Full replacement",
        body: "Demolition and haul away of a failed slab, regrading, and a new pour. Local providers quote demolition separately so you can see what you are paying for.",
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
          "Residential drives are commonly placed thicker where vehicles are heavy. Fiber mesh, welded wire, or rebar is specified by the contractor based on load and soil.",
      },
      {
        name: "Control joint layout",
        description:
          "Saw cut joints placed on a grid to control where the slab cracks. Joint spacing is a workmanship detail worth asking about.",
      },
      {
        name: "Exposed aggregate or stamped edge",
        description:
          "Decorative options are only offered when a local provider has confirmed that capability. Otherwise the job is quoted as a standard pour.",
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
          "Compacted base material, formwork set to grade, and reinforcement placed. On clay, compaction has a particular bearing on how the slab ages.",
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
          "Foot and vehicle traffic timing depend on mix, weather, and thickness. Your contractor gives the figures for your pour.",
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
        note: "Affects the price, though access and site preparation can move a quote just as much.",
      },
      {
        factor: "Decorative finish",
        impact: "Medium",
        note: "Stamping, color, and exposed aggregate add labor and material.",
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
          "No. Excavation, subbase preparation, forming, and the pour are carried out by the local provider who takes your request. Confirm their insurance and license status with the provider and on the SC LLR website before work begins.",
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
          "Red clay holds water and moves with moisture content, so compaction, base depth, and drainage are worth settling before the pour is priced. Expect a contractor to ask about all three.",
      },
    ],
  },
  {
    slug: "concrete-patios",
    name: "Concrete Patios",
    shortName: "Patios",
    nameLower: "a concrete patio",
    projectNoun: "patio",
    state: "published",
    intent: "Stamped, colored, and decorative patio requests",
    summary:
      "Stamped, colored, and decorative patios for backyard living spaces, finished with a weather-resistant sealant.",
    heroSummary:
      "A patio is where the finish matters as much as the slab under it. Requests cover stamped concrete, colored and decorative finishes, and broom-finished patios for backyard living spaces. Sealing is part of the plan: a weather-resistant sealant helps protect color and surface from rain, sun, and staining. Request a quote and a local provider will confirm the finish, layout, and sealing schedule at a site visit.",
    sectionOrder: ["scope", "options", "process", "cost", "prepare"],
    headings: {
      scope: "Where patio work starts and stops",
      options: "Finish, color and layout choices",
      process: "How a patio build is sequenced",
      cost: "What makes one patio cost more than another",
      prepare: "Walking the space before you get a price",
      faq: "Common questions about patios",
      cta: "Thinking about a patio?",
    },
    optionsLead:
      "Patios are where the finish decisions live. Pick these before you compare quotes, or you will be comparing two different projects.",
    processLead:
      "Patios are built in a different order from driveways, because the finish is decided before the forms go in rather than after. Timings are typical, not promised.",
    costLead:
      "Patios are the project people most often price before they commit, so it is worth knowing what actually moves the figure. Finish and shape change it far more than size does.",
    ctaLead:
      "Send the rough size and say whether it ties into an existing porch or stoop. A local provider will review it and reply.",
    cardScope: "Stamped, colored, decorative, and broom-finish patios, plus walkways and entryways",
    workIncluded: [
      "Grading and excavation to the planned subgrade",
      "Forming and reinforcement set to the layout",
      "Placing and pouring the concrete",
      "Finishing to the chosen texture",
      "Site clean-up and haul-away of debris",
    ],
    tradeSpecs: [
      "High-strength concrete mix, commonly 4,000 PSI for residential work. Your provider confirms the mix for your project.",
      "Steel rebar or welded wire reinforcement placed to help limit cracking.",
      "Compacted gravel sub-base and a planned drainage slope set before the forms go in.",
      "Control and expansion joints laid out for South Carolina's seasonal heat, rain, and clay soil movement.",
    ],
    image: "/images/locations/lancaster-sc/lancaster-sc-patios.webp",
    imageAlt:
      "Stamped concrete patio with a curved edge and a metal table and chairs beside a siding house, with a mown lawn and split rail fence",
    projectTypes: ["New patio", "Patio replacement", "Stamped patio"],
    keyFacts: [
      {
        label: "Served for",
        value: "Residential patios and walkway connections",
      },
      { label: "Coverage today", value: "Lancaster, SC" },
      {
        label: "Decorative work",
        value: "Only where a local provider confirms the capability",
      },
      { label: "Cost to you", value: "No charge for the quote request" },
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
        title: "Stamped and colored finishes",
        body: "Pattern stamped or integrally colored slabs, offered only by local providers who have confirmed that capability for your area.",
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
          "Stone, slate, or plank patterns pressed into the fresh slab. Availability depends on the local provider and adds cost and cure time sensitivity.",
      },
      {
        name: "Integral color and release",
        description:
          "Color mixed into the concrete rather than applied on top. Discuss fade expectations and sealing schedule with the contractor.",
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
          "Finish, pattern, color, and edge detail are priced. Decorative options should be quoted as clearly separable extras.",
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
        note: "Stamped and colored work is substantially more labor intensive than a broom finish.",
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
        note: "Gate width and slope decide whether concrete is wheelbarrowed, pumped, or chuted.",
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
      "Is the stamped or colored option priced separately?",
      "How will you tie into the existing slab or threshold height?",
      "Where will joints fall, and how will they look in the pattern?",
      "Do you seal it, and when is the first reseal due?",
      "How long before furniture can go back on it?",
    ],
    considerations: [
      {
        question: "Who designs and builds the patio?",
        answer:
          "The contractor confirms the scope on site. Layout, finish selection, scheduling, and construction are carried out by the local provider who takes your request, and availability depends on local providers in your area.",
      },
      {
        question: "Is a stamped finish always available?",
        answer:
          "No. Stamped work is only offered when a local provider has confirmed that capability for your area. If it is not supported, the job is quoted as a standard patio, and the provider tells you so before any work begins.",
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
    name: "Concrete Slabs & Foundations",
    shortName: "Slabs & Foundations",
    nameLower: "concrete slabs and foundations",
    projectNoun: "slab",
    state: "published",
    intent: "Shed pads, garage slabs, and workshop foundations",
    summary:
      "Shed pads, garage slabs, and workshop foundations over a compacted gravel base, with a vapor barrier.",
    heroSummary:
      "A slab stays level only if what sits under it is right. Requests cover shed pads, garage slabs, and workshop foundations. Typical specifications include a compacted gravel base, a vapor barrier under the slab to limit moisture rising from the ground, and reinforcement sized to the load. Request a quote and a local provider will confirm base depth, drainage, and thickness at a site visit.",
    sectionOrder: ["scope", "options", "process", "cost", "prepare"],
    headings: {
      scope: "Pads this category covers",
      options: "Specifying a pad for what it carries",
      process: "From staked forms to a usable pad",
      cost: "What drives the price of a pad",
      prepare: "Knowing the load before the visit",
      faq: "Slab and pad questions",
      cta: "Need a pad poured?",
    },
    optionsLead:
      "A pad is specified by what sits on it. Load comes first, because it decides thickness, reinforcement and base depth before anything else is priced.",
    processLead:
      "A pad is mostly groundwork. By the time the concrete arrives, the hard part is done: the base is right and the forms are square. Durations are typical ranges, not commitments.",
    costLead:
      "Pricing comes last here for a reason: until the load, the access and the base are known, any number is a guess. Once those are settled a contractor can quote a pad quickly.",
    ctaLead:
      "Say what the pad has to carry and roughly where it goes. A local provider will review it and reply.",
    cardScope: "Garages, sheds, pole barns, equipment pads, and sidewalks",
    workIncluded: [
      "Grading and excavation to the planned subgrade",
      "Forming and reinforcement set to the layout",
      "Placing and pouring the concrete",
      "Finishing to the chosen texture",
      "Site clean-up and haul-away of debris",
    ],
    tradeSpecs: [
      "High-strength concrete mix, commonly 4,000 PSI for residential work. Your provider confirms the mix for your project.",
      "Steel rebar or welded wire reinforcement placed to help limit cracking.",
      "Compacted gravel sub-base and a planned drainage slope set before the forms go in.",
      "Control and expansion joints laid out for South Carolina's seasonal heat, rain, and clay soil movement.",
    ],
    image: "/images/locations/lancaster-sc/lancaster-sc-slabs.webp",
    imageAlt:
      "Newly poured concrete slab with form lines on its edge, set in a lawn beside a house",
    projectTypes: ["Residential slab", "Concrete pad"],
    keyFacts: [
      {
        label: "Served for",
        value: "Nonstructural residential slabs and pads",
      },
      { label: "Coverage today", value: "Lancaster, SC" },
      {
        label: "Direct communication / No middleman",
        value: "Foundations and engineered structural slabs",
      },
      { label: "Cost to you", value: "No charge for the quote request" },
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
        body: "Landing pads, trash can pads, and short connecting flatwork poured alongside a larger job.",
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
          "Fiber mesh, welded wire, or rebar. The choice follows load, soil, and the contractor's judgment.",
      },
      {
        name: "Vapor barrier",
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
        note: "Rear yard pads that cannot be chuted from the truck need wheelbarrowing or pumping.",
      },
      {
        factor: "Reinforcement specification",
        impact: "Medium",
        note: "Rebar mats cost more than fiber mesh and are not always necessary.",
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
      "Is a vapor barrier included, and is it needed here?",
      "Are anchor bolts or sleeves set during the pour?",
      "How long before I can place the shed or park on it?",
      "Do I need a license to hire for this work?",
    ],
    considerations: [
      {
        question: "Is the slab poured by your own team?",
        answer:
          "Requirements vary by project type, scope, and total cost. Confirm licensing, insurance, and eligibility with the provider you hire, and verify credentials through SC LLR before you hire.",
      },
      {
        question: "Do you handle foundations or structural slabs?",
        answer:
          "No. Foundation repair, structural engineering, and retaining walls are outside this service's scope. We decline those requests rather than send them to a concrete finisher who should not take them on.",
      },
      {
        question: "What thickness does a pad need?",
        answer:
          "Thickness and reinforcement follow the load, the soil, and applicable code. That specification comes from your contractor after seeing the site, not from a table on a website.",
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
    name: "Concrete Repair & Resurfacing",
    shortName: "Repair & Resurfacing",
    nameLower: "concrete repair and resurfacing",
    projectNoun: "repair",
    state: "published",
    intent: "Crack sealing, joint repair, and surface restoration",
    summary:
      "Crack sealing, joint repair, and surface restoration that also address the water that causes further damage.",
    heroSummary:
      "Small cracks and worn joints cost less to fix early. Requests cover crack sealing, joint repair, and surface restoration. Every repair starts with finding the source of the damage, because water getting into cracks and joints is a common cause of further deterioration. Request a quote and a local provider will assess the surface at a site visit before recommending a method.",
    sectionOrder: ["scope", "options", "process", "cost", "prepare"],
    headings: {
      scope: "Responsibility for damage",
      options: "Repair methods and when each applies",
      process: "How a repair job is assessed and done",
      cost: "Why repair quotes vary so widely",
      prepare: "Describing the damage accurately",
      faq: "Questions worth asking before a repair visit",
      cta: "Want someone to look at the damage?",
    },
    optionsLead:
      "Repair is diagnosis before method. The right fix depends on why the concrete failed, which is why two jobs that look alike are quoted differently.",
    processLead:
      "Repair starts with working out why the concrete failed. Until that is established, choosing a method is guesswork, which is why the assessment comes first.",
    costLead:
      "Repair quotes vary more than any other concrete work, because two slabs with identical cracks can need completely different work underneath. These are the things that move it.",
    ctaLead:
      "Describe the damage and where it is. A local provider looks at it on site before anyone talks about price.",
    cardScope: "Crack filling, joint restoration, and sealing",
    workIncluded: [
      "Surface preparation and cleaning",
      "Crack routing or patch layout",
      "Repair material placement",
      "Finishing and joint sealing",
      "Site clean-up and haul-away of debris",
    ],
    tradeSpecs: [
      "Cracks and spalled areas cleaned and prepared before any filler or overlay goes on.",
      "Repair mortar or flexible sealant chosen for the surface and the movement it has to handle.",
      "Drainage checked first, because water is a common cause of repeat cracking.",
      "Joints restored, a sealer selected for the finish, and a cure time confirmed before traffic returns.",
    ],
    image: "/images/locations/lancaster-sc/lancaster-sc-repair.webp",
    imageAlt:
      "Sidewalk slab heaved and cracked by exposed tree roots beside a large oak, with a residential street behind",
    projectTypes: ["Crack and surface repair", "Resurfacing"],
    keyFacts: [
      { label: "Served for", value: "Nonstructural repair and resurfacing" },
      { label: "Coverage today", value: "Lancaster, SC" },
      {
        label: "Direct communication / No middleman",
        value: "Structural, heaving, or load failure assessment",
      },
      { label: "Cost to you", value: "No charge for the quote request" },
    ],
    covered: [
      {
        title: "Crack repair",
        body: "Cleaning and filling shrinkage and surface cracks on slabs that are otherwise stable.",
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
      "Slab jacking, mudjacking, and foam leveling of settled slabs",
      "Foundation crack repair and waterproofing",
      "Anything caused by active ground movement or heave",
    ],
    options: [
      {
        name: "Sealed crack repair",
        description:
          "The crack is opened slightly, cleaned, and filled so the repair bonds instead of sitting on the surface.",
      },
      {
        name: "Partial depth patching",
        description:
          "Damaged surface material is removed back to sound concrete and replaced. Color match is never perfect. Expect a visible repair.",
      },
      {
        name: "Cementitious overlay",
        description:
          "A thin resurfacing layer over the whole slab. Requires a clean, sound, properly prepared substrate to bond.",
      },
      {
        name: "Joint resealing",
        description:
          "Low-cost preventive work that keeps water out of the base. Often the most useful thing to do on an aging slab.",
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
          "Cleaning, grinding, or profiling. Surface preparation has a direct bearing on whether the repair bonds and lasts.",
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
      "Will the repair be visible, and how closely will the color match?",
      "Would replacement be the better value here, honestly?",
      "What temperature or weather conditions do you need to do the work?",
    ],
    considerations: [
      {
        question: "Do you carry out the repair?",
        answer:
          "No. Repairs are carried out by a local provider who takes your request. The assessment, method, and result are that provider's responsibility under your agreement with them.",
      },
      {
        question: "What counts as nonstructural?",
        answer:
          "Surface spalling, shrinkage cracking, and cosmetic deterioration on a slab that is not moving. Movement, heaving, a height difference across a crack, or load bearing failure needs a professional structural assessment instead, and we decline those as repair jobs.",
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

export const publishedServices = services.filter(
  (s) => s.state === "published",
);

export function getService(slug: string): ServiceRecord | undefined {
  return publishedServices.find((s) => s.slug === slug);
}

