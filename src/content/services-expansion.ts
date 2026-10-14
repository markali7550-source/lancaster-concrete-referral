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
      "Worker's hands and a red-handled finishing tool on freshly placed gray concrete",
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
      "Worker's boots beside a concrete vibrator pipe on fresh concrete over a steel rebar grid",
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
      "Forms set to the path and the drainage slope",
      "Placing, edging, and broom finishing the concrete",
      "Site clean-up and haul-away of debris",
    ],
    heroSummary:
      "A front walkway is the first thing guests see, and it gets walked on every day. Requests cover new front walks from the driveway or sidewalk to the door, replacement of cracked walks, and individual sidewalk sections. Typical work includes a compacted base, control joints, a broom finish, and edges set to grade. Request a concrete service and a local provider will confirm the path, slope, and joint layout at a site visit.",
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
      "Send the path, the approximate length, and photos. A local provider will confirm the grade and joint layout.",
    image: "/images/services/concrete-walkways/concrete-walkways-hero.webp",
    imageAlt:
      "Worker's hands setting gray concrete pavers with a rubber mallet on a sand base",
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
        body: "Replacement of individual sidewalk panels, with consistent decorative finish and joints where the layout allows.",
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
        description: "Set to the path and the number of people using it, confirmed at the visit.",
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
        detail: "The provider checks the path, the grade to the door, and drainage away from the house.",
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
      "Mark the path from the driveway or sidewalk to the door",
      "Note any drainage problems near the walk",
      "Photograph the existing walk and its edges",
      "Clear the walkway layout for the crew",
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
    projectNoun: "steps",
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
      "Concrete front steps with a finished surface at a home entrance beside white siding",
    imageCaption:
      "Example photo of concrete steps. Work is performed by independent local providers, not by this site.",
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

  {
    slug: "concrete-leveling",
    name: "Concrete Leveling",
    shortName: "Concrete Leveling",
    nameLower: "concrete leveling",
    projectNoun: "concrete leveling",
    state: "published",
    intent: "Sunken, uneven, or settling slabs",
    summary:
      "Lifting sunken driveways, sidewalks, and patios by injecting filler under the slab, instead of replacing it.",
    cardScope: "Sunken slabs, uneven walks and patios, settling driveways",
    workIncluded: [
      "Inspection of the slab and the likely cause of settling",
      "Drilling small holes at planned points under the slab",
      "Injecting a leveling material while the slab height is checked",
      "Patching the holes after the lift",
      "Site clean-up and haul-away of debris",
    ],
    heroSummary:
      "Concrete leveling lifts a settled slab back toward its original height by injecting a filler through small holes drilled in the surface. It is often less disruptive than replacing a slab that has sunk at one edge, but the provider confirms whether a slab can be lifted at the site visit, and checks the cause of settling first. Request a concrete service and a local provider will look at the slab with you.",
    sectionOrder: ["scope", "options", "process", "cost", "prepare"],
    headings: {
      scope: "What slab leveling can address",
      options: "Leveling method and material choices",
      process: "How a leveling job is sequenced",
      cost: "What moves the price of leveling",
      prepare: "Before the provider visits",
      faq: "Concrete leveling questions",
      cta: "Have a sunken slab?",
    },
    optionsLead:
      "Leveling methods differ in the material used and the number of holes. The provider chooses based on the slab and the cause of settling.",
    processLead:
      "Leveling is usually quick once the holes are placed. The sequence below shows the order the work usually follows; the provider sets the actual dates.",
    costLead:
      "Leveling is often compared against replacement. The number of injection points and the size of the slab are the main drivers.",
    ctaLead:
      "Send photos of the sunken area and tell us where it sits. A local provider will confirm whether leveling is suitable.",
    image: "/images/services/concrete-leveling/concrete-leveling-hero.webp",
    imageAlt:
      "Grey concrete driveway slab that has sunk at one edge, leaving a small gap against the curb",
    projectTypes: ["Sunken driveway", "Uneven sidewalk", "Settled patio"],
    keyFacts: [
      { label: "Typical use", value: "Sunken or uneven slabs" },
      { label: "Method", value: "Injected filler under the slab" },
    ],
    covered: [
      {
        title: "Sunken driveway slabs",
        body: "Slabs that have dropped at a joint or edge, lifted back toward their original grade.",
      },
      {
        title: "Uneven walks and patios",
        body: "Trip edges and settled sections of sidewalks and patios.",
      },
      {
        title: "Gaps at steps and thresholds",
        body: "Slabs that have settled away from a step or doorway threshold.",
      },
    ],
    outOfScope: [
      "Structural foundation repair",
      "Full slab replacement when the slab is cracked through",
      "Drainage and grading work beyond the slab edge",
    ],
    options: [
      {
        name: "Injection material",
        description:
          "Polyurethane foam or cement-based slurry. The provider chooses based on load, cure speed, and the soil.",
      },
      {
        name: "Number of injection points",
        description:
          "More points give finer control over the lift and take more time.",
      },
      {
        name: "Patch finish",
        description:
          "Patched holes can be matched to the surrounding color and texture.",
      },
    ],
    tradeSpecs: [
      "Small holes drilled at planned points, then patched after the lift.",
      "Leveling material injected under the slab while its height is monitored.",
      "Cause of settling checked first, such as soil moisture or drainage, before lifting.",
    ],
    process: [
      {
        phase: "Site visit and assessment",
        duration: "Scheduled by provider",
        detail:
          "The provider checks the slab, the cause of settling, and where the holes will go.",
      },
      {
        phase: "Drilling and injection",
        duration: "Typically 1 day",
        detail:
          "Holes are drilled and the filler is injected while the slab height is checked.",
      },
      {
        phase: "Cure and patching",
        duration: "Several hours to a day",
        detail: "The lifted slab is allowed to set, then the holes are patched.",
      },
      {
        phase: "Final check",
        duration: "Scheduled by provider",
        detail: "Height and drainage are checked before the area is used again.",
      },
    ],
    costFactors: [
      {
        factor: "Number of injection points",
        impact: "High",
        note: "More points mean more drilling, more material, and more time.",
      },
      {
        factor: "Slab size and thickness",
        impact: "Medium",
        note: "Larger or thicker slabs need more material to lift evenly.",
      },
      {
        factor: "Injection material",
        impact: "Medium",
        note: "Material type changes the cost per point and the cure time.",
      },
      {
        factor: "Access and site conditions",
        impact: "Low",
        note: "Tight access or heavy soil can add setup time.",
      },
    ],
    prepChecklist: [
      "Note which slab has sunk and when you first noticed it",
      "Photograph the gap or trip edge",
      "Clear the surface around the area",
      "Note any drainage problem near the slab",
    ],
    quoteQuestions: [
      "Can this slab be lifted, or does it need replacement?",
      "Which material is recommended, and why?",
      "How many injection points are expected?",
      "How will the patched holes look?",
    ],
    considerations: [
      {
        question: "Will the slab stay level?",
        answer:
          "Leveling can correct settling, but the cause must be addressed or the slab may settle again. The provider explains this risk before the work starts.",
      },
      {
        question: "Is leveling cheaper than replacing?",
        answer:
          "It is often less disruptive than replacement, but the right choice depends on the slab. The provider compares the options at the visit.",
      },
      {
        question: "Can leveling fix a cracked slab?",
        answer:
          "Cracks can be brought back into alignment, but a slab cracked through may need replacement. The provider checks the condition first.",
      },
      {
        question: "When can I walk on it again?",
        answer:
          "The wait depends on the material used. The provider gives the wait time for the product chosen.",
      },
    ],
  },

  {
    slug: "concrete-garage-coatings",
    name: "Garage Floor Coatings",
    shortName: "Garage Coatings",
    nameLower: "garage floor coatings",
    projectNoun: "garage floor coating",
    state: "published",
    intent: "Garage floor epoxy and coatings",
    summary:
      "Epoxy and polyurea coatings for garage floors that resist stains, make cleaning easier, and brighten the space.",
    cardScope: "Epoxy and polyurea garage floors, flake systems, sealed floors",
    workIncluded: [
      "Surface assessment for cracks, moisture, and old coatings",
      "Grinding or etching to open the surface for bonding",
      "Crack and joint repair before coating",
      "Primer and coating applied in the planned coats",
      "Clean-up and cure-time guidance",
    ],
    heroSummary:
      "A garage floor coating puts a protective layer over the slab. Epoxy and polyurea systems resist oil, salt, and staining, and decorative flakes or color give the floor a finished look. Surface preparation decides how well a coating bonds, so the provider checks the slab, moisture, and any existing coating before quoting. Request a concrete service and a local provider will confirm the right system for your garage.",
    sectionOrder: ["scope", "options", "process", "cost", "prepare"],
    headings: {
      scope: "What a garage coating covers",
      options: "Coating system and finish choices",
      process: "How a coating job is sequenced",
      cost: "What moves the price of a garage coating",
      prepare: "Before the provider visits",
      faq: "Garage coating questions",
      cta: "Ready to coat your garage floor?",
    },
    optionsLead:
      "Coating systems differ in hardness, look, and cure time. The choice affects how the floor handles cars, heat, and chemicals.",
    processLead:
      "Coatings only bond to a properly prepared surface, so preparation takes most of the time. The sequence below shows the usual order; the provider sets the actual dates.",
    costLead:
      "Garage coatings cost more per square foot than bare concrete. Preparation and the system chosen are the main drivers.",
    ctaLead:
      "Send the garage size, the current floor condition, and any photos. A local provider will confirm the system and the preparation it needs.",
    image: "/images/services/concrete-garage-coatings/concrete-garage-coatings-hero.webp",
    imageAlt:
      "Clean two-car garage floor with a glossy grey epoxy coating and light decorative flakes",
    projectTypes: ["Two-car garage", "Single-car garage", "Workshop floor"],
    keyFacts: [
      { label: "Coating types", value: "Epoxy, polyurea, flake systems" },
      { label: "Typical use", value: "Garages, workshops, storage" },
    ],
    covered: [
      {
        title: "Epoxy floor coatings",
        body: "Solid, chemical-resistant coatings that bond to a prepared slab.",
      },
      {
        title: "Flake and decorative systems",
        body: "Colored flakes broadcast into the coating for a speckled, finished look.",
      },
      {
        title: "Crack and joint repair",
        body: "Cracks filled before coating so the surface stays even.",
      },
    ],
    outOfScope: [
      "Overlay concrete resurfacing",
      "Garage slab replacement",
      "Waterproofing of below-grade walls",
    ],
    options: [
      {
        name: "Coating type",
        description:
          "Epoxy is common for garages. Polyurea cures faster and handles more heat and moisture.",
      },
      {
        name: "Finish",
        description:
          "Solid color, flake, or metallic. Flake hides wear and tire marks; solid color is simpler to clean.",
      },
      {
        name: "Topcoat",
        description:
          "A clear topcoat adds gloss and stain resistance and needs recoating over time.",
      },
    ],
    tradeSpecs: [
      "Surface prepared by grinding or etching so the coating can bond.",
      "Cracks and joints filled before coating so the surface stays even.",
      "Primer, body coat, and topcoat applied in the sequence the system requires.",
      "Moisture checked before coating, since moisture can cause bubbling or peeling.",
    ],
    process: [
      {
        phase: "Assessment and moisture check",
        duration: "Scheduled by provider",
        detail:
          "The provider checks the slab, cracks, existing coatings, and moisture.",
      },
      {
        phase: "Surface preparation",
        duration: "Typically 1 day",
        detail:
          "The surface is ground or etched and cleaned to open it for bonding.",
      },
      {
        phase: "Repairs and coating",
        duration: "1 to 2 days",
        detail:
          "Cracks are filled, then primer and coating go on in planned coats.",
      },
      {
        phase: "Cure and return",
        duration: "Several days",
        detail:
          "The floor cures for the time the product requires before vehicles return.",
      },
    ],
    costFactors: [
      {
        factor: "Surface preparation",
        impact: "High",
        note: "Grinding and cleaning take the most labor on most garages.",
      },
      {
        factor: "Coating system",
        impact: "Medium",
        note: "Polyurea and specialty systems cost more than standard epoxy.",
      },
      {
        factor: "Garage size",
        impact: "Medium",
        note: "Larger floors take more material and more time per coat.",
      },
      {
        factor: "Crack and moisture repairs",
        impact: "Medium",
        note: "Repairs needed before coating add material and time.",
      },
      {
        factor: "Topcoat and recoat schedule",
        impact: "Low",
        note: "Recoating adds a small ongoing cost.",
      },
    ],
    prepChecklist: [
      "Remove oil stains and loose debris where you can",
      "Empty the garage so the floor is clear",
      "Note any cracks, moisture, or peeling areas",
      "Decide on a color or flake style before the visit",
    ],
    quoteQuestions: [
      "Which coating system do you recommend for this slab?",
      "How was moisture checked?",
      "How long before vehicles can return?",
      "What is the recoat schedule for the topcoat?",
    ],
    considerations: [
      {
        question: "Will a coating peel?",
        answer:
          "Coatings peel mainly when the surface is not prepared or when moisture is present. Preparation and a moisture check reduce this risk.",
      },
      {
        question: "Can I park on it right away?",
        answer:
          "Most systems need several days before vehicles return. The provider gives the wait time for the product used.",
      },
      {
        question: "Is epoxy slippery?",
        answer:
          "Flake finishes and textured topcoats add grip. A smooth gloss finish can be slippery when wet.",
      },
      {
        question: "Does a coating need maintenance?",
        answer:
          "Regular sweeping and occasional recoating keep the finish looking good. The provider explains the schedule for the system chosen.",
      },
    ],
  },

  {
    slug: "concrete-resurfacing",
    name: "Concrete Resurfacing",
    shortName: "Resurfacing",
    nameLower: "concrete resurfacing",
    projectNoun: "concrete resurfacing",
    state: "published",
    intent: "Worn surfaces and thin overlays",
    summary:
      "A thin new concrete overlay that renews worn driveways, patios, and walks without tearing out the existing slab.",
    cardScope: "Worn driveways, patios, and walks; thin overlays",
    workIncluded: [
      "Inspection of the existing slab for cracks and movement",
      "Cleaning and roughening the surface so the overlay can bond",
      "Repair of cracks that would show through",
      "Bonding agent and thin overlay applied",
      "Texturing and curing of the new surface",
    ],
    heroSummary:
      "Concrete resurfacing covers a worn slab with a thin new concrete layer. It can renew the look of a driveway, patio, or walk without full removal, when the existing slab is sound enough to bond to. The provider checks the slab first, because loose or moving slabs need repair or replacement instead. Request a concrete service and a local provider will confirm whether an overlay suits your slab.",
    sectionOrder: ["scope", "options", "process", "cost", "prepare"],
    headings: {
      scope: "What a resurfacing job covers",
      options: "Overlay finish and texture choices",
      process: "How a resurfacing job is sequenced",
      cost: "What moves the price of resurfacing",
      prepare: "Before the provider visits",
      faq: "Resurfacing questions",
      cta: "Want to renew a worn surface?",
    },
    optionsLead:
      "Overlay finishes change the look and the traction. Texture and color are chosen together.",
    processLead:
      "The bond depends on preparation, so the existing surface is cleaned and roughened before the overlay goes on. The sequence below shows the usual order; the provider sets the actual dates.",
    costLead:
      "Resurfacing usually costs less than replacement, but the condition of the existing surface decides how much preparation is needed.",
    ctaLead:
      "Send photos of the worn surface and its size. A local provider will tell you whether an overlay will bond.",
    image: "/images/services/concrete-resurfacing/concrete-resurfacing-hero.webp",
    imageAlt:
      "Aging concrete driveway with a fresh, smooth, light-grey overlay",
    projectTypes: ["Worn driveway", "Tired patio", "Faded walkway"],
    keyFacts: [
      { label: "Typical use", value: "Worn or faded concrete surfaces" },
      { label: "Overlay", value: "Thin new concrete layer" },
    ],
    covered: [
      {
        title: "Driveway overlays",
        body: "A thin new surface over a sound driveway slab, textured for traction.",
      },
      {
        title: "Patio and walk overlays",
        body: "Renewed color and texture for patios and walkways.",
      },
      {
        title: "Crack preparation",
        body: "Cracks that would reflect through are repaired before the overlay goes on.",
      },
    ],
    outOfScope: [
      "Overlays on slabs that are moving or badly cracked",
      "Full slab replacement",
      "Paver or tile installation over concrete",
    ],
    options: [
      {
        name: "Texture",
        description:
          "Broom, smooth, or stamped texture. Texture controls traction.",
      },
      {
        name: "Color",
        description:
          "Integral or stained color. Stain sits on top and needs upkeep.",
      },
      {
        name: "Edge detail",
        description:
          "Feathered or formed edges, chosen to suit the surrounding slab.",
      },
    ],
    tradeSpecs: [
      "Existing surface cleaned and roughened so the overlay can bond.",
      "Bonding agent applied before the overlay goes on.",
      "Overlay placed in a thin layer, then textured while workable.",
      "Control joints placed to match the existing joint pattern where possible.",
    ],
    process: [
      {
        phase: "Site visit and bond check",
        duration: "Scheduled by provider",
        detail:
          "The provider checks the slab for cracks, movement, and likely bond strength.",
      },
      {
        phase: "Cleaning and roughening",
        duration: "Typically 1 day",
        detail:
          "The surface is cleaned and roughened so the overlay can bond.",
      },
      {
        phase: "Overlay and texture",
        duration: "Typically 1 day",
        detail:
          "The bonding agent and overlay are placed, then the surface is textured.",
      },
      {
        phase: "Cure and seal",
        duration: "Several days",
        detail:
          "The overlay cures under protection, then a sealer goes on if the provider recommends one.",
      },
    ],
    costFactors: [
      {
        factor: "Surface condition",
        impact: "High",
        note: "A worn but sound slab needs less preparation than one with loose or cracked areas.",
      },
      {
        factor: "Overlay area",
        impact: "Medium",
        note: "Larger areas take more material and more placement time.",
      },
      {
        factor: "Texture and color",
        impact: "Medium",
        note: "Decorative texture and integral color add material and labor.",
      },
      {
        factor: "Crack and edge repairs",
        impact: "Low",
        note: "Repairs before the overlay add a small amount of labor.",
      },
    ],
    prepChecklist: [
      "Note the surface and its approximate size",
      "Photograph cracks, low spots, and stains",
      "Decide on texture and color",
      "Note any drainage problem that leaves water sitting on the surface",
    ],
    quoteQuestions: [
      "Is the existing slab sound enough for an overlay?",
      "How will the overlay bond to the old surface?",
      "Which texture gives the traction I need?",
      "How long before vehicles can drive on it?",
    ],
    considerations: [
      {
        question: "Will the overlay crack?",
        answer:
          "Thin overlays can crack if the old slab moves. Crack repair and control joints reduce this risk, and the provider explains what an overlay can and cannot prevent.",
      },
      {
        question: "How long does an overlay last?",
        answer:
          "Lifespan depends on the surface condition, traffic, and maintenance. The provider gives an estimate for your slab.",
      },
      {
        question: "Is resurfacing cheaper than replacement?",
        answer:
          "It can be, when the slab is sound. A failing slab usually needs replacement, and the provider will advise on that.",
      },
      {
        question: "Can I resurface a stamped patio?",
        answer:
          "Sometimes. The provider checks the existing finish before recommending an overlay.",
      },
    ],
  },


  {
    slug: "concrete-aprons",
    name: "Concrete Aprons",
    shortName: "Aprons",
    nameLower: "concrete aprons",
    projectNoun: "concrete apron",
    state: "published",
    intent: "Driveway-to-street and driveway-to-garage aprons",
    summary:
      "Concrete aprons that connect a driveway to the garage or street, graded so water runs off instead of pooling.",
    cardScope: "Driveway-to-street and driveway-to-garage aprons",
    workIncluded: [
      "Measuring the apron and checking the grade toward the street or gutter",
      "Subbase preparation and form setting to the planned slope",
      "Placing and finishing the concrete to match the driveway",
      "Control joints placed to line up with the driveway joints",
      "Site clean-up and haul-away of debris",
    ],
    heroSummary:
      "A concrete apron is the slab that joins a driveway to the street or to the garage floor. Its slope decides whether water runs off the driveway or pools at the edge, so the grade is planned before the forms go in. Request a concrete service and a local provider will check the grade, the curb, and the existing driveway at a site visit.",
    sectionOrder: ["scope", "options", "process", "cost", "prepare"],
    headings: {
      scope: "What an apron project covers",
      options: "Finish and grade choices",
      process: "How an apron pour is sequenced",
      cost: "What moves the price of an apron",
      prepare: "Before the provider visits",
      faq: "Concrete apron questions",
      cta: "Need a new apron?",
    },
    optionsLead:
      "Aprons are usually finished to match the driveway, but finish and grade still need to be chosen before the pour.",
    processLead:
      "The grade is set before the concrete goes in. The sequence below shows the order the work usually follows; the provider sets the actual dates.",
    costLead:
      "Aprons are small slabs, so the cost depends more on access, the grade work, and the finish than on area alone.",
    ctaLead:
      "Send photos of the driveway edge, the curb, and the gutter. A local provider will confirm the grade and the finish.",
    image: "/images/services/concrete-aprons/concrete-aprons-hero.webp",
    imageAlt:
      "Grey concrete apron connecting a residential driveway to the street curb, sloping toward the gutter",
    projectTypes: ["Street apron", "Garage apron", "Replacement apron"],
    keyFacts: [
      { label: "Typical use", value: "Driveway-to-street and garage connections" },
      { label: "Key factor", value: "Slope toward the gutter" },
    ],
    covered: [
      {
        title: "Street aprons",
        body: "The slab between the driveway and the curb or gutter, graded so water runs off.",
      },
      {
        title: "Garage aprons",
        body: "The connection between the driveway and the garage floor.",
      },
      {
        title: "Replacement aprons",
        body: "Removal of a cracked or sunken apron and a new pour at the correct grade.",
      },
    ],
    outOfScope: [
      "Curb and gutter installation",
      "Storm drain connections",
      "Work in the public right of way without the required permit",
    ],
    options: [
      {
        name: "Finish",
        description:
          "Broom or smooth. Broom finish gives better traction; smooth is simpler to clean.",
      },
      {
        name: "Color",
        description:
          "Natural gray matches most driveways. Integral color or a stain must be planned before the pour.",
      },
      {
        name: "Joint layout",
        description:
          "Joints placed to line up with the driveway to reduce cracking.",
      },
    ],
    tradeSpecs: [
      "Compacted gravel base set to the planned slope before the forms go in.",
      "Concrete placed and finished to the grade confirmed at the visit.",
      "Control joints placed along the driveway joint lines.",
      "Curing protection applied after finishing, as the mix requires.",
    ],
    process: [
      {
        phase: "Site visit and grade check",
        duration: "Scheduled by provider",
        detail:
          "The provider measures the apron, checks the slope to the street, and confirms the finish.",
      },
      {
        phase: "Excavation and forms",
        duration: "1 day",
        detail: "The old apron is removed if needed, the base is compacted, and forms are set.",
      },
      {
        phase: "Pour and finish",
        duration: "1 day",
        detail: "Concrete is placed, finished to the grade, and joints are cut.",
      },
      {
        phase: "Cure",
        duration: "Several days",
        detail: "The apron cures under protection before vehicles use it.",
      },
    ],
    costFactors: [
      {
        factor: "Removal of the old apron",
        impact: "High",
        note: "Breaking out and hauling away old concrete adds labor and disposal.",
      },
      {
        factor: "Grade work",
        impact: "Medium",
        note: "Changing the slope takes more base work and more forming.",
      },
      {
        factor: "Finish and color",
        impact: "Medium",
        note: "Decorative finishes add material and labor.",
      },
      {
        factor: "Access",
        impact: "Low",
        note: "Tight access can slow the pour.",
      },
    ],
    prepChecklist: [
      "Note which apron you want replaced or added",
      "Photograph the edge, curb, and gutter",
      "Clear vehicles and debris from the area",
      "Note where water currently collects",
    ],
    quoteQuestions: [
      "Will the new grade direct water toward the gutter?",
      "Do I need a permit for work near the street?",
      "How will the joints line up with my driveway?",
      "How long before a vehicle can use the apron?",
    ],
    considerations: [
      {
        question: "Will an apron crack?",
        answer:
          "Concrete can crack. Control joints and proper base preparation reduce the risk, and the provider explains what can and cannot be prevented.",
      },
      {
        question: "Do I need a permit?",
        answer:
          "Work near the street may need a permit from the local authority. The provider confirms whether one applies.",
      },
      {
        question: "Can an apron be matched to my driveway color?",
        answer:
          "Gray concrete usually matches. Colored or stamped driveways need the finish planned before the pour.",
      },
      {
        question: "Why does my apron hold water?",
        answer:
          "A flat or sunken apron can trap water. The provider checks the slope and recommends a grade correction when needed.",
      },
    ],
  },

  {
    slug: "concrete-sealing",
    name: "Concrete Sealing",
    shortName: "Sealing",
    nameLower: "concrete sealing",
    projectNoun: "concrete sealing",
    state: "published",
    intent: "Concrete sealing and cleaning",
    summary:
      "Cleaning followed by a penetrating or film-forming sealer for driveways, patios, and walks, to help resist stains, water, and freeze-thaw damage.",
    cardScope: "Cleaning, sealing, and recoat planning for driveways, patios, and walks",
    workIncluded: [
      "Inspection of the surface and any existing sealer",
      "Cleaning to remove dirt, oil, and efflorescence",
      "Repairing minor cracks before sealing",
      "Applying the sealer in the planned coats",
      "Recoat schedule and care instructions",
    ],
    heroSummary:
      "Concrete sealing puts a protective layer over a clean slab. Penetrating sealers soak into the surface, while film-forming sealers sit on top. Cleaning comes first, since sealer bonds only to a clean, dry surface. Request a concrete service and a local provider will confirm the sealer and the cleaning method for your surface.",
    sectionOrder: ["scope", "options", "process", "cost", "prepare"],
    headings: {
      scope: "What a sealing job covers",
      options: "Sealer type and finish choices",
      process: "How a sealing job is sequenced",
      cost: "What moves the price of sealing",
      prepare: "Before the provider visits",
      faq: "Concrete sealing questions",
      cta: "Ready to seal your concrete?",
    },
    optionsLead:
      "Sealers differ in how they bond, how they look, and how often they need recoating. Cleaning method also changes with the surface.",
    processLead:
      "Cleaning and drying take as much attention as the sealer. The sequence below shows the usual order; the provider sets the actual dates.",
    costLead:
      "Sealing is usually priced by area, with cleaning and any crack repair added. The surface condition decides how much cleaning it needs.",
    ctaLead:
      "Send the area, the surface type, and photos. A local provider will confirm the cleaning and the sealer.",
    image: "/images/services/concrete-sealing/concrete-sealing-hero.webp",
    imageAlt:
      "Clean residential concrete patio with a freshly applied clear sealer giving a subtle sheen",
    projectTypes: ["Driveway sealing", "Patio sealing", "Walkway sealing"],
    keyFacts: [
      { label: "Sealer types", value: "Penetrating, film-forming" },
      { label: "Typical use", value: "Driveways, patios, walks" },
    ],
    covered: [
      {
        title: "Cleaning before sealing",
        body: "Removal of dirt, oil, and salt residue so the sealer can bond.",
      },
      {
        title: "Penetrating sealers",
        body: "Sealers that soak into the surface and keep its natural look.",
      },
      {
        title: "Film-forming sealers",
        body: "Sealers that sit on the surface and add a sheen or color depth.",
      },
    ],
    outOfScope: [
      "Garage floor epoxy and coatings",
      "Sealing of wood, brick, or stone without a specific request",
      "Waterproofing of below-grade walls",
    ],
    options: [
      {
        name: "Sealer type",
        description:
          "Penetrating sealers keep the natural look. Film-forming sealers add sheen and color depth but need more upkeep.",
      },
      {
        name: "Finish",
        description:
          "Matte, satin, or gloss. Gloss shows more color but can look slick when wet.",
      },
      {
        name: "Recoat schedule",
        description:
          "How often the sealer is reapplied, set by traffic, sun, and the product used.",
      },
    ],
    tradeSpecs: [
      "Surface cleaned and allowed to dry before sealing.",
      "Sealer applied in thin, even coats at the rate the product requires.",
      "Minor cracks repaired before sealing so the sealer covers them evenly.",
      "Traffic restriction and cure time confirmed for the product chosen.",
    ],
    process: [
      {
        phase: "Site visit and surface check",
        duration: "Scheduled by provider",
        detail: "The provider checks the surface, any existing sealer, and the cleaning needed.",
      },
      {
        phase: "Cleaning",
        duration: "Typically 1 day",
        detail: "The surface is cleaned and rinsed, then allowed to dry before sealing.",
      },
      {
        phase: "Sealer application",
        duration: "Typically 1 day",
        detail: "The sealer is applied in the planned coats.",
      },
      {
        phase: "Cure",
        duration: "Several hours to several days",
        detail: "The surface cures before foot and vehicle traffic resume.",
      },
    ],
    costFactors: [
      {
        factor: "Area",
        impact: "High",
        note: "Larger areas take more sealer and more application time.",
      },
      {
        factor: "Surface condition",
        impact: "High",
        note: "Heavy staining or old sealer needs more cleaning and stripping.",
      },
      {
        factor: "Sealer type",
        impact: "Medium",
        note: "Film-forming sealers cost more to apply and to remove.",
      },
      {
        factor: "Crack repairs",
        impact: "Low",
        note: "Minor repairs before sealing add a small amount of labor.",
      },
    ],
    prepChecklist: [
      "Note the area and surface type",
      "Remove vehicles, furniture, and planters",
      "Note any stains, oil spots, or old sealer",
      "Decide on a finish before the visit",
    ],
    quoteQuestions: [
      "Which sealer do you recommend for this surface?",
      "What cleaning method do you use?",
      "How long before vehicles and furniture can return?",
      "When should the surface be resealed?",
    ],
    considerations: [
      {
        question: "How often should concrete be sealed?",
        answer:
          "The interval depends on traffic, sun, and the sealer used. The provider gives the schedule for the product recommended.",
      },
      {
        question: "Will sealing make concrete slippery?",
        answer:
          "Gloss sealers can be slick when wet. Matte or slip-resistant additives reduce the risk.",
      },
      {
        question: "Can I seal new concrete right away?",
        answer:
          "New concrete usually needs to cure first. The provider confirms how long to wait for the mix used.",
      },
      {
        question: "Does sealing stop all cracking?",
        answer:
          "No. Sealing helps resist water and staining, but it does not stop slab movement or cracks.",
      },
    ],
  },

  {
    slug: "concrete-exposed-aggregate",
    name: "Exposed Aggregate",
    shortName: "Exposed Aggregate",
    nameLower: "exposed aggregate",
    projectNoun: "exposed aggregate",
    state: "published",
    intent: "Decorative exposed aggregate finishes",
    summary:
      "Decorative concrete with the top layer removed to show the stones, for driveways, patios, and walkways.",
    cardScope: "Exposed aggregate driveways, patios, and walkways",
    workIncluded: [
      "Site and surface assessment before the pour",
      "Subbase preparation and form setting",
      "Placing the concrete and spreading the aggregate",
      "Exposing the stones by washing or grinding at the planned time",
      "Sealing, if the provider recommends it",
    ],
    heroSummary:
      "Exposed aggregate concrete shows the stones in the mix. After the surface sets, the top layer is removed to expose the aggregate, giving a textured, decorative finish. Stone choice, depth of exposure, and timing decide how the finished surface looks. Request a concrete service and a local provider will confirm the stone and the finish for your project.",
    sectionOrder: ["scope", "options", "process", "cost", "prepare"],
    headings: {
      scope: "What an exposed aggregate finish covers",
      options: "Stone, exposure, and finish choices",
      process: "How an exposed aggregate pour is sequenced",
      cost: "What moves the price of exposed aggregate",
      prepare: "Before the provider visits",
      faq: "Exposed aggregate questions",
      cta: "Want a textured finish?",
    },
    optionsLead:
      "Stone type, size, and the depth of exposure change the look and the traction. Samples help before the pour.",
    processLead:
      "Timing matters when the stones are exposed. The sequence below shows the usual order; the provider sets the actual dates.",
    costLead:
      "Exposed aggregate costs more than a plain broom finish, because of the stone, the extra steps, and the timing needed.",
    ctaLead:
      "Send the area and the look you like, and ask for stone samples. A local provider will confirm the finish on your slab.",
    image: "/images/services/concrete-exposed-aggregate/concrete-exposed-aggregate-hero.webp",
    imageAlt:
      "Residential exposed aggregate concrete driveway with mixed tan and grey stones across the surface",
    projectTypes: ["Exposed aggregate driveway", "Exposed aggregate patio", "Exposed aggregate walkway"],
    keyFacts: [
      { label: "Finish", value: "Stone-textured, decorative" },
      { label: "Typical use", value: "Driveways, patios, walks" },
    ],
    covered: [
      {
        title: "Exposed aggregate driveways",
        body: "A textured driveway with the stones showing across the surface.",
      },
      {
        title: "Patios and walkways",
        body: "Decorative patios and walks in a stone-textured finish.",
      },
      {
        title: "Border and accent bands",
        body: "Exposed aggregate bands that frame a plain or stamped field.",
      },
    ],
    outOfScope: [
      "Stone pavers and flagstone installation",
      "Polished concrete grinding",
      "Overlay over an old slab without a bond check",
    ],
    options: [
      {
        name: "Stone type",
        description:
          "River stone, crushed stone, or decorative aggregate. Stone color and shape change the look and traction.",
      },
      {
        name: "Exposure depth",
        description:
          "A light exposure shows the top of the stones; a deeper one shows more of each stone and a more uniform surface.",
      },
      {
        name: "Edge detail",
        description:
          "A troweled or formed edge around the exposed field to keep the stones contained.",
      },
    ],
    tradeSpecs: [
      "Aggregate spread evenly into the surface before it sets.",
      "Surface exposed by washing or grinding at the time the provider sets.",
      "Control joints placed to limit cracking in the textured slab.",
      "Sealer applied only when the provider recommends one for the stone.",
    ],
    process: [
      {
        phase: "Site visit and sample review",
        duration: "Scheduled by provider",
        detail: "The provider reviews stone samples, the area, and the drainage.",
      },
      {
        phase: "Subbase and forms",
        duration: "1 to 2 days",
        detail: "Excavation to depth, a compacted base, and forms set to the planned grade.",
      },
      {
        phase: "Pour and aggregate",
        duration: "1 day",
        detail: "Concrete is placed and the aggregate is spread into the surface before it sets.",
      },
      {
        phase: "Exposure and cure",
        duration: "Several days",
        detail: "The stones are exposed at the set time, then the surface cures under protection.",
      },
    ],
    costFactors: [
      {
        factor: "Stone type",
        impact: "High",
        note: "Decorative stone costs more than standard aggregate.",
      },
      {
        factor: "Area",
        impact: "Medium",
        note: "Larger areas take more material and more exposure time.",
      },
      {
        factor: "Exposure method",
        impact: "Medium",
        note: "Grinding costs more than washing and takes more time.",
      },
      {
        factor: "Sealing",
        impact: "Low",
        note: "Sealing after exposure adds a small cost and a recoat schedule.",
      },
    ],
    prepChecklist: [
      "Note the area and how it will be used",
      "Choose a stone look from samples or photos",
      "Note drainage problems near the pour",
      "Clear the surface and the edges",
    ],
    quoteQuestions: [
      "Which stones do you recommend, and can I see samples?",
      "Will the stones be exposed by washing or by grinding?",
      "How even will the exposure look across the slab?",
      "What care does the finish need?",
    ],
    considerations: [
      {
        question: "Is exposed aggregate slippery?",
        answer:
          "The stones add grip, but very smooth stones can be slick when wet. The provider chooses stone size and exposure with traction in mind.",
      },
      {
        question: "Does exposed aggregate crack?",
        answer:
          "Concrete can crack. Control joints and proper base preparation reduce the risk, and the provider explains what can and cannot be prevented.",
      },
      {
        question: "Can exposed aggregate be done over an old slab?",
        answer:
          "Sometimes, but an overlay needs a sound surface to bond to. The provider checks the existing slab first.",
      },
      {
        question: "How is it maintained?",
        answer:
          "Regular sweeping and occasional washing keep the stones clean. Sealing may be recommended for the stone and the area.",
      },
    ],
  },

];
