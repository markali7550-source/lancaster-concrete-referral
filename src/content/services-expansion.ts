import type { ServiceRecord } from "./services";

/*
 * Single-topic service records added in the eight-page structure. Each page
 * covers one trade only. Shared section order and CTA wording match the core
 * records so every service page reads consistently.
 */

const STANDARD_SECTIONS = ["scope", "options", "process", "cost", "prepare"] as const;

export const expansionServices: readonly ServiceRecord[] = [
  {
    slug: "stamped-concrete",
    name: "Stamped Concrete",
    shortName: "Stamped Concrete",
    nameLower: "stamped concrete",
    projectNoun: "stamped concrete",
    state: "published",
    intent: "Stamped and decorative pattern requests",
    summary:
      "Stamped patterns, integral color, and decorative texture for patios, entries, and outdoor living areas.",
    cardScope: "Stamped patterns, integral color, and decorative texture",
    workIncluded: [
      "Subbase preparation and form setting to the planned grade",
      "Placing the concrete with the color and release agents specified",
      "Stamping the pattern while the surface is still workable",
      "Joint layout that follows the pattern lines",
      "Site clean-up and haul-away of debris",
    ],
    heroSummary:
      "Stamped concrete is a decorative finish pressed into freshly placed concrete. Requests cover slate, stone, and plank patterns, integral color, and texture for patios and entries. The pattern is set in a short window while the slab is still workable, so the design, color, and sealing plan are decided before the forms go in. Request a concrete service and a local provider will confirm the pattern and color at a site visit.",
    sectionOrder: [...STANDARD_SECTIONS],
    headings: {
      scope: "What a stamped finish includes",
      options: "Pattern, color, and texture choices",
      process: "How a stamped pour is sequenced",
      cost: "What moves the price of stamped work",
      prepare: "Before the provider visits",
      faq: "Stamped concrete questions",
      cta: "Ready to choose a stamped finish?",
    },
    optionsLead:
      "Pattern, color, and texture are chosen together. Each one changes how the finish looks and how much work it takes.",
    processLead:
      "Stamping is time sensitive. The sequence below shows the order decorative work usually follows; the provider sets the actual dates.",
    costLead:
      "Stamped work costs more than a broom finish because it takes more labor, more material, and a sealing step. Area is only part of the figure.",
    ctaLead:
      "Send the pattern you have in mind, the area, and any photos. A local provider will confirm what is achievable on your slab.",
    image: "/images/services/stamped-concrete/stamped-concrete-hero.webp",
    imageAlt:
      "Stamped concrete surface with a paver-style pattern and curved edge beside a lawn",
    projectTypes: ["Stamped patio", "Stamped entry", "Decorative slab"],
    keyFacts: [
      { label: "Finish types", value: "Stamped, integral color, texture" },
      { label: "Typical use", value: "Patios, entries, outdoor living" },
    ],
    covered: [
      {
        title: "Stamped patterns",
        body: "Slate, stone, and plank patterns pressed into fresh concrete, with the release agent and pattern confirmed before the pour.",
      },
      {
        title: "Integral color",
        body: "Color mixed into the concrete so it runs through the slab rather than sitting on top, with shade choices confirmed at the visit.",
      },
      {
        title: "Decorative borders",
        body: "Border bands and edge details that frame a stamped field and tie it to the house.",
      },
    ],
    outOfScope: [
      "Paver and flagstone installation",
      "Overlay coatings applied over an existing slab",
      "Structural decks and balconies",
    ],
    options: [
      {
        name: "Pattern",
        description:
          "Slate, stone, or plank. Pattern size changes how the finish reads from the house and how many joints show.",
      },
      {
        name: "Color",
        description:
          "Integral color or surface stain. Integral color runs through the slab; stains sit on top and need regular upkeep.",
      },
      {
        name: "Texture",
        description:
          "Light or deep texture. Deeper texture shows more dirt and takes more effort to clean.",
      },
      {
        name: "Sealer",
        description:
          "Film-forming or penetrating sealer. Sealing protects color and needs a recoat schedule.",
      },
    ],
    tradeSpecs: [
      "High-strength concrete mix, commonly 4,000 PSI for residential work. Your provider confirms the mix for your project.",
      "Welded wire or fiber reinforcement placed to help limit cracking.",
      "Compacted gravel sub-base and a planned drainage slope set before the forms go in.",
      "Control joints laid out along pattern lines, with the sealer schedule confirmed before the work starts.",
    ],
    process: [
      {
        phase: "Site visit and measurement",
        duration: "Scheduled by provider",
        detail:
          "The provider measures the area, checks drainage away from the house, and reviews pattern and color samples.",
      },
      {
        phase: "Subbase and forms",
        duration: "1 to 2 days",
        detail: "Excavation to depth, a compacted gravel base, and forms set to the planned grade.",
      },
      {
        phase: "Pour and stamp",
        duration: "1 day",
        detail:
          "Concrete is placed and colored, and the pattern is stamped while the surface is still workable.",
      },
      {
        phase: "Cure and seal",
        duration: "Several days to weeks",
        detail: "The slab cures under protection, then the sealer goes on as the provider schedules it.",
      },
    ],
    costFactors: [
      {
        factor: "Pattern complexity",
        impact: "High",
        note: "Intricate patterns take longer to stamp and cost more in labor.",
      },
      {
        factor: "Integral color or stain",
        impact: "Medium",
        note: "Color adds material cost; stains add a recurring upkeep cost.",
      },
      {
        factor: "Area and shape",
        impact: "Medium",
        note: "Small or curved areas take more handling per square foot.",
      },
      {
        factor: "Sealing and maintenance",
        impact: "Low",
        note: "Recoat intervals add a small ongoing cost.",
      },
    ],
    prepChecklist: [
      "Note the area and the patterns you like",
      "Photograph the existing surface and any drainage problems",
      "Decide on a color range before the visit",
      "Note which way water currently runs off the surface",
    ],
    quoteQuestions: [
      "Which patterns and colors are available for this slab?",
      "How long is the sealer expected to last, and what does a recoat cost?",
      "How is the pattern aligned with joints and the house edge?",
      "What cure time is needed before furniture goes on it?",
    ],
    considerations: [
      {
        question: "Will stamped concrete crack?",
        answer:
          "Concrete can crack. Control joints placed along pattern lines and proper base preparation reduce the risk, and the provider explains what a finish can and cannot prevent.",
      },
      {
        question: "How often does stamped concrete need sealing?",
        answer:
          "Sealer is usually reapplied on a regular schedule that depends on traffic, sun exposure, and the product. Your provider confirms the interval for the sealer chosen.",
      },
      {
        question: "Can stamped concrete go over an old patio?",
        answer:
          "Sometimes, but an overlay needs a sound surface to bond to. Most stamped work is a new pour, so the provider assesses the existing slab before recommending a method.",
      },
      {
        question: "Is stamped concrete slippery?",
        answer:
          "Texture and sealer affect slip resistance. A lighter texture and a sealer with an anti-slip additive are common choices near pools and steps.",
      },
    ],
  },

  {
    slug: "concrete-foundations",
    name: "Concrete Foundations",
    shortName: "Foundations",
    nameLower: "concrete foundations",
    projectNoun: "foundation",
    state: "published",
    intent: "Footing and house foundation requests",
    summary:
      "Footings, stem walls, and foundation work built to the engineer's drawings and the soil conditions on the site.",
    cardScope: "Footings, stem walls, and foundation reinforcement",
    workIncluded: [
      "Layout from the plan set and excavation to the specified depth",
      "Forming and bracing to the engineer's dimensions",
      "Reinforcement placed to the engineer's schedule and inspected before the pour",
      "Placing and consolidating the concrete",
      "Site clean-up and haul-away of spoil",
    ],
    heroSummary:
      "Foundations carry the weight of the whole structure, so they are specified by an engineer and built to code and the soil conditions on site. Requests cover footings and stem walls for new homes and additions. Every foundation starts from the engineer's drawings and the soil report. Request a concrete service and a local provider will confirm the requirements for your site at a site visit.",
    sectionOrder: [...STANDARD_SECTIONS],
    headings: {
      scope: "What a foundation pour includes",
      options: "Specifications set by the engineer",
      process: "How a foundation is built",
      cost: "What drives foundation cost",
      prepare: "Before the site visit",
      faq: "Foundation questions",
      cta: "Need a foundation quoted?",
    },
    optionsLead:
      "Foundation specifications come from the engineer's drawings and the soil report. These are the items the provider checks against them.",
    processLead:
      "A foundation follows the engineer's sequence: layout, excavation, forming, reinforcement inspection, then the pour.",
    costLead:
      "Foundation cost follows depth, length, soil conditions, and the engineered reinforcement. Access and excavation often move the figure more than concrete volume does.",
    ctaLead:
      "Send the plan set, the soil report if you have one, and the location. A local provider will confirm what the engineer requires.",
    image: "/images/services/concrete-foundations/concrete-foundations-hero.webp",
    imageAlt:
      "Concrete foundation slab with steel reinforcing bars and formwork on a construction site",
    projectTypes: ["House foundation", "Footing", "Addition foundation"],
    keyFacts: [
      { label: "Scope", value: "Footings and stem walls" },
      { label: "Specified by", value: "Engineer's drawings and soil report" },
    ],
    covered: [
      {
        title: "Footings",
        body: "Continuous and spread footings excavated to the width and depth on the engineer's drawings.",
      },
      {
        title: "Stem walls",
        body: "Formed and poured walls that carry the structure up from the footing, placed to the drawings.",
      },
      {
        title: "Foundation reinforcement",
        body: "Rebar placed to the engineer's schedule and inspected before the pour.",
      },
    ],
    outOfScope: [
      "Foundation repair and underpinning",
      "Structural engineering and load calculations",
      "Retaining walls",
    ],
    options: [
      {
        name: "Footing size",
        description:
          "Set by the engineer based on the load, the soil bearing capacity, and frost or code requirements.",
      },
      {
        name: "Reinforcement",
        description: "Bar size, spacing, and cover follow the engineer's schedule.",
      },
      {
        name: "Anchor bolts",
        description: "Placed during the pour where the framing requires them.",
      },
      {
        name: "Waterproofing",
        description: "Dampproofing or drainage detailing as specified for the site.",
      },
    ],
    tradeSpecs: [
      "Concrete strength and mix set by the engineer's drawings and confirmed by the provider before the pour.",
      "Steel rebar placed to the engineer's schedule, with the required cover maintained.",
      "Excavation to the depth on the drawings, with a compacted base where the soil requires one.",
      "Anchor bolts and sleeves set during the pour as the framing requires.",
    ],
    process: [
      {
        phase: "Layout and inspection",
        duration: "Scheduled by provider",
        detail:
          "The provider sets layout lines from the plan and checks the excavation against the drawings.",
      },
      {
        phase: "Excavation and forming",
        duration: "1 to 3 days",
        detail: "Trenches are dug to the specified depth, and forms are set and braced.",
      },
      {
        phase: "Reinforcement and inspection",
        duration: "1 day",
        detail: "Rebar is placed to the engineer's schedule, and the inspection is completed before the pour.",
      },
      {
        phase: "Pour and cure",
        duration: "Placed in one day; cures over days",
        detail: "Concrete is placed and consolidated, then cured under protection before framing loads it.",
      },
    ],
    costFactors: [
      {
        factor: "Depth and footprint",
        impact: "High",
        note: "Deeper and longer footings use more excavation and concrete.",
      },
      {
        factor: "Soil conditions",
        impact: "High",
        note: "Poor bearing soil can change the engineered design and the base work.",
      },
      {
        factor: "Access and excavation",
        impact: "Medium",
        note: "Tight sites and rock or clay soils add labor and equipment time.",
      },
      {
        factor: "Reinforcement schedule",
        impact: "Medium",
        note: "Engineered rebar schedules add material and placement time.",
      },
    ],
    prepChecklist: [
      "Gather the plan set and any engineer's drawings",
      "Locate underground utilities before any digging",
      "Note access for excavation and concrete trucks",
      "Share the soil report if one exists",
    ],
    quoteQuestions: [
      "Which engineer's drawings and soil report does the quote follow?",
      "Who inspects the reinforcement before the pour?",
      "What is the cure time before framing loads the foundation?",
      "Are excavation, spoil removal, and the base included?",
    ],
    considerations: [
      {
        question: "Do I need an engineer for a foundation?",
        answer:
          "Foundation work is built to engineered drawings and local code. The provider confirms the requirements for your site before work begins.",
      },
      {
        question: "How deep do footings need to be?",
        answer:
          "Depth depends on the engineer's design, the soil bearing capacity, and frost or code requirements. It is never set from a table on a website.",
      },
      {
        question: "Can you repair an existing foundation?",
        answer:
          "Foundation repair and underpinning are outside this page's scope. Ask a local provider about that work separately.",
      },
      {
        question: "Is a foundation the same as a slab?",
        answer:
          "No. A foundation carries structural loads and is built to engineered drawings. A slab is a floor or pad, covered on our Concrete Slabs page.",
      },
    ],
  },

  {
    slug: "concrete-walkways",
    name: "Concrete Walkways",
    shortName: "Walkways",
    nameLower: "concrete walkways",
    projectNoun: "walkway",
    state: "published",
    intent: "Front walk and sidewalk requests",
    summary:
      "Front walks and sidewalks poured with control joints, tooled edges, and a broom finish for everyday foot traffic.",
    cardScope: "Front walks, sidewalks, and entry paths",
    workIncluded: [
      "Removal of the old walk when replacement is needed",
      "Base excavation and compaction to the planned grade",
      "Forms set to the route and the drainage slope",
      "Placing, edging, and broom finishing the concrete",
      "Site clean-up and haul-away of debris",
    ],
    heroSummary:
      "A front walkway is the first thing guests see, and it gets walked on every day. Requests cover new front walks from the driveway or sidewalk to the door, replacement of cracked walks, and individual sidewalk sections. Typical work includes a compacted base, control joints, a broom finish, and edges set to grade. Request a concrete service and a local provider will confirm the route, slope, and joint layout at a site visit.",
    sectionOrder: [...STANDARD_SECTIONS],
    headings: {
      scope: "What a walkway project includes",
      options: "Walkway finish and layout choices",
      process: "How a walkway pour is sequenced",
      cost: "What moves the price of a walkway",
      prepare: "Before the provider visits",
      faq: "Walkway questions",
      cta: "Ready to plan a walkway?",
    },
    optionsLead:
      "Walkway choices affect safety, appearance, and how the slab handles rain and daily foot traffic.",
    processLead:
      "A walkway is a short, precise pour. The sequence below is typical; the provider sets the dates and the layout.",
    costLead:
      "Walkway cost follows length, width, grade changes, and removal of the old walk. Short walks cost more per foot because setup stays the same.",
    ctaLead:
      "Send the route, the approximate length, and photos. A local provider will confirm the grade and joint layout.",
    image: "/images/services/concrete-walkways/concrete-walkways-hero.webp",
    imageAlt:
      "Curved concrete walkway with saw-cut expansion joints beside a lawn",
    projectTypes: ["New walkway", "Walk replacement", "Sidewalk section"],
    keyFacts: [
      { label: "Scope", value: "Front walks and sidewalks" },
      { label: "Finish", value: "Broom finish, control joints, tooled edges" },
    ],
    covered: [
      {
        title: "New front walks",
        body: "First-time walkways from the driveway, sidewalk, or parking area to the front door, with a planned grade.",
      },
      {
        title: "Walk replacement",
        body: "Removal of a cracked or heaved walk and a new pour on a corrected base.",
      },
      {
        title: "Sidewalk sections",
        body: "Replacement of individual sidewalk panels, with matching finish and joints where the layout allows.",
      },
    ],
    outOfScope: [
      "Steps and porch landings, covered on our Concrete Steps page",
      "Driveways and parking pads",
      "Pavers and natural stone walks",
    ],
    options: [
      {
        name: "Width",
        description: "Set to the route and the number of people using it, confirmed at the visit.",
      },
      {
        name: "Finish",
        description:
          "Broom finish is the common choice for traction. Smooth finishes are slicker in wet weather.",
      },
      {
        name: "Edging",
        description: "Tooled edges protect the corners and look cleaner than cut edges.",
      },
      {
        name: "Joint layout",
        description: "Control joints at regular spacing guide where the walk cracks.",
      },
    ],
    tradeSpecs: [
      "High-strength concrete mix, commonly 4,000 PSI for residential work. Your provider confirms the mix for your project.",
      "Welded wire or fiber reinforcement placed to help limit cracking.",
      "Compacted gravel sub-base and a planned drainage slope set before the forms go in.",
      "Control joints spaced to guide cracking, with edges tooled at the finish.",
    ],
    process: [
      {
        phase: "Site visit and layout",
        duration: "Scheduled by provider",
        detail: "The provider checks the route, the grade to the door, and drainage away from the house.",
      },
      {
        phase: "Removal and base",
        duration: "1 to 2 days",
        detail: "The old walk is removed if needed, and the base is excavated and compacted.",
      },
      {
        phase: "Forms and pour",
        duration: "1 day",
        detail: "Forms are set to grade, reinforcement is placed, and the walk is poured and finished.",
      },
      {
        phase: "Cure and joint sealing",
        duration: "Several days",
        detail: "The walk cures under protection, and joints are sealed on the provider's schedule.",
      },
    ],
    costFactors: [
      {
        factor: "Length and width",
        impact: "High",
        note: "Longer and wider walks use more concrete and more base.",
      },
      {
        factor: "Removal of the old walk",
        impact: "High",
        note: "Demolition and haul-away are separate from the new pour.",
      },
      {
        factor: "Grade changes",
        impact: "Medium",
        note: "Slope corrections and transitions add forming time.",
      },
      {
        factor: "Finish and edging",
        impact: "Low",
        note: "Decorative edges and finishes add labor.",
      },
    ],
    prepChecklist: [
      "Mark the route from the driveway or sidewalk to the door",
      "Note any drainage problems near the walk",
      "Photograph the existing walk and its edges",
      "Clear the route for the crew",
    ],
    quoteQuestions: [
      "How is the walk graded to drain away from the house?",
      "What is the joint layout and spacing?",
      "Is removal of the old walk included?",
      "How long before the walk can be used?",
    ],
    considerations: [
      {
        question: "How long before I can walk on a new walkway?",
        answer:
          "Foot traffic is usually possible after a short cure, but the provider gives the figure for your pour, mix, and weather.",
      },
      {
        question: "Will my walkway crack?",
        answer:
          "Concrete can crack. Control joints and proper base preparation guide where cracks form, and the provider explains how the layout handles movement.",
      },
      {
        question: "Do I need a permit for a sidewalk?",
        answer:
          "Sidewalk work in the public right of way may need approval from the local authority. Confirm permitting with the provider and the authority before work starts.",
      },
      {
        question: "Can new concrete match an existing walk?",
        answer:
          "Color and texture can differ between pours. The provider shows what a close match is likely to look like before work begins.",
      },
    ],
  },

  {
    slug: "concrete-steps",
    name: "Concrete Steps",
    shortName: "Steps & Porches",
    nameLower: "concrete steps and porch landings",
    projectNoun: "steps project",
    state: "published",
    intent: "Front steps and porch landing requests",
    summary:
      "Poured concrete steps and porch landings with a consistent rise and run, a broom finish, and nosing.",
    cardScope: "Front steps, porch landings, and entry stairs",
    workIncluded: [
      "Removal of existing steps when replacement is needed",
      "Base excavation and compaction under the steps and landing",
      "Forms set to the planned rise and run",
      "Placing, nosing, and broom finishing the steps and landing",
      "Site clean-up and haul-away of debris",
    ],
    heroSummary:
      "Steps are the part of a front entry that gets used most, and they cause the most trouble when the rise and run are off. Requests cover new concrete steps, porch landings, and replacement of cracked or uneven steps. Typical work includes a compacted base, a consistent rise and run, and a finish chosen with slip resistance in mind. Request a concrete service and a local provider will confirm the layout and any code requirements at a site visit.",
    sectionOrder: [...STANDARD_SECTIONS],
    headings: {
      scope: "What a steps project includes",
      options: "Step and landing choices",
      process: "How concrete steps are built",
      cost: "What moves the price of steps",
      prepare: "Before the provider visits",
      faq: "Step and porch questions",
      cta: "Ready to replace or add steps?",
    },
    optionsLead:
      "Step dimensions, landings, and finish are set together, because they decide how comfortable and safe the steps are to use.",
    processLead:
      "Steps are formed and poured in a set sequence. The provider sets the actual dates and the layout for your entry.",
    costLead:
      "Steps are priced by the number of risers, the landing size, and the work to remove or form the existing entry. A small set of steps costs more per step than the count suggests.",
    ctaLead:
      "Send the number of steps, the height to the door, and photos. A local provider will confirm the rise, run, and code requirements.",
    image: "/images/services/concrete-steps/concrete-steps-hero.webp",
    imageAlt:
      "Concrete front steps being formed and poured beside a brick edge and shrubs",
    imageCaption:
      "Example photo of concrete steps in progress. Work is performed by independent local providers, not by this site.",
    projectTypes: ["Front steps", "Porch landing", "Step replacement"],
    keyFacts: [
      { label: "Scope", value: "Front steps and porch landings" },
      { label: "Finish", value: "Broom finish with nosing" },
    ],
    covered: [
      {
        title: "New front steps",
        body: "Steps formed and poured to a consistent rise and run, from the walk or driveway up to the porch.",
      },
      {
        title: "Porch landings",
        body: "A level landing at the top or between runs, sized to the door and to code requirements.",
      },
      {
        title: "Step replacement",
        body: "Removal of cracked or uneven steps and a new pour on a corrected base.",
      },
    ],
    outOfScope: [
      "Walkways and driveways, covered on our Concrete Walkways and Concrete Driveways pages",
      "Retaining walls around steps",
      "Wood or metal porch framing",
    ],
    options: [
      {
        name: "Rise and run",
        description: "Set to a consistent rise and run for safe use, and checked against code at the visit.",
      },
      {
        name: "Nosing",
        description: "Edge treatment at each tread that helps define the step and reduce slips.",
      },
      {
        name: "Finish",
        description: "Broom finish for traction. Smooth finishes are slicker when wet.",
      },
      {
        name: "Landing size",
        description: "Sized to the door swing and the number of people who use it.",
      },
    ],
    tradeSpecs: [
      "High-strength concrete mix, commonly 4,000 PSI for residential work. Your provider confirms the mix for your project.",
      "Steel rebar or welded wire reinforcement placed to help limit cracking.",
      "Compacted gravel base set before the forms go in, with drainage away from the house.",
      "Nosing and broom finish specified for traction, with control joints laid out for the landing.",
    ],
    process: [
      {
        phase: "Site visit and measurement",
        duration: "Scheduled by provider",
        detail: "The provider measures the total rise, the run, and the door height.",
      },
      {
        phase: "Removal and base",
        duration: "1 to 2 days",
        detail: "Old steps are removed if needed, and the base is excavated and compacted.",
      },
      {
        phase: "Forms and pour",
        duration: "1 day",
        detail: "Forms are set to the planned rise and run, then the steps and landing are poured and finished.",
      },
      {
        phase: "Cure and finish",
        duration: "Several days",
        detail: "The steps cure under protection, and the nosing and finish are checked before use.",
      },
    ],
    costFactors: [
      {
        factor: "Number of steps",
        impact: "High",
        note: "More steps mean more forming and more concrete.",
      },
      {
        factor: "Removal of existing steps",
        impact: "High",
        note: "Demolition and haul-away are separate from the new pour.",
      },
      {
        factor: "Landing size",
        impact: "Medium",
        note: "Larger landings use more concrete and forming.",
      },
      {
        factor: "Finish and nosing",
        impact: "Low",
        note: "Decorative edges and finishes add labor.",
      },
    ],
    prepChecklist: [
      "Count the steps and note the height to the door",
      "Photograph the existing steps and any cracks",
      "Note any handrail requirements you already know about",
      "Clear the area in front of the entry",
    ],
    quoteQuestions: [
      "What rise and run are proposed, and how do they comply with code?",
      "Is removal of the existing steps included?",
      "How is the landing sized to the door?",
      "How long before the steps can be used?",
    ],
    considerations: [
      {
        question: "Do steps need a handrail?",
        answer:
          "Many steps need handrails under code, depending on height and use. The provider confirms what your jurisdiction requires before the layout is set.",
      },
      {
        question: "Why do steps crack?",
        answer:
          "Steps crack when the base settles or the rise and run are uneven. A proper base and joint layout reduce that risk, and the provider explains the choice for your site.",
      },
      {
        question: "Can you add steps to an existing porch?",
        answer:
          "Sometimes. The provider checks the existing slab, the door height, and the drainage before recommending a layout.",
      },
      {
        question: "How long before the steps can be used?",
        answer:
          "Light use is usually possible after a short cure, but the provider gives the figure for your pour and the weather.",
      },
    ],
  },
];
