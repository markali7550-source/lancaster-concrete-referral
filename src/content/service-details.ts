import type { ServiceSlug } from "@/content/services";

/**
 * Extended, homeowner-facing detail for each Phase 1 service.
 *
 * Editorial rules that apply to every string in this file:
 * - The publisher is a referral service. Nothing here may imply that we pour,
 *   supervise, inspect, or warrant concrete work.
 * - No specific prices, no guaranteed timelines, no licensing, insurance,
 *   certification, or outcome guarantees.
 * - Scope language stays conditional ("may include", "can involve") because
 *   participating providers differ in what they take on.
 */
export interface ServiceDetail {
  /** Supporting photo shown beside the scope list. Distinct from the hero image. */
  detailImage: string;
  /** Descriptive alt text for the supporting photo. */
  detailImageAlt: string;
  /** Common project components. Rendered under an explicit "may include" caveat. */
  mayInclude: string[];
  /** Narrative explainer blocks, rendered in reading order. */
  /** Each entry renders as its own short paragraph. */
  moreInfo: { heading: string; body: string[] }[];
}

export const serviceDetails: Record<ServiceSlug, ServiceDetail> = {
  /* ------------------------------------------------------ driveways */
  "concrete-driveways": {
    detailImage: "/services/concrete-driveways-detail.webp",
    detailImageAlt:
      "Residential concrete driveway in Lancaster SC with jointed panels and a broom finish",
    mayInclude: [
      "New driveway installation",
      "Driveway replacement",
      "Concrete driveway expansion",
      "Driveway slab work",
      "Removal and replacement of damaged concrete",
      "Aprons and street connections",
      "Parking pads and turnarounds",
    ],
    moreInfo: [
      {
        heading: "What a concrete driveway project is",
        body: [
          "A concrete driveway is a poured, reinforced surface built to carry vehicle loads for years.",
          "The work is more than the visible slab. It covers clearing, a compacted subbase, forms set to the correct fall, reinforcement, the pour, the finish, and control joints. Heavy clay in Lancaster, SC makes that preparation matter.",
        ],
      },
      {
        heading: "Common reasons homeowners request it",
        body: [
          "Most requests start with a gravel or dirt drive that is hard to maintain, or an older slab that has cracked, settled, or spalled past patching.",
          "Others are widening a drive that is too narrow, correcting runoff that heads for the garage, or adding a pad for a trailer or boat.",
        ],
      },
      {
        heading: "Typical project types",
        body: [
          "Projects usually fall into four groups: a new pour over an unpaved drive, full replacement with demolition and haul away, widening an existing driveway, or a rebuild driven by drainage.",
          "Each carries different site work, and that difference usually affects cost and scheduling more than square footage does.",
        ],
      },
      {
        heading: "Important considerations",
        body: [
          "Thickness and reinforcement should suit the vehicles that will actually use the surface. A drive that sees a heavy truck is not built like one serving a single sedan.",
          "Joint layout, slope away from the house, and the street transition all matter. Concrete cracks, so well placed joints control where that happens.",
        ],
      },
      {
        heading: "What to know before starting",
        body: [
          "Useful to know: approximate dimensions, whether an existing surface has to come out, where water goes in heavy rain, and whether utilities or irrigation run beneath the area.",
          "Access matters too, since a truck needs a route to the pour, and fresh concrete needs time before it carries traffic. Confirm the details with the provider who quotes.",
        ],
      },
      {
        heading: "How a project generally runs",
        body: [
          "A typical sequence is a site look at the area and its drainage, a written scope and quote, removal of any existing surface, then excavation and subbase preparation.",
          "Forming and reinforcement follow, then the pour, the finish, joint cutting, and a curing period. Weather affects both the pour and the finish, so dates shift.",
        ],
      },
      {
        heading: "Why planning matters",
        body: [
          "Most driveway problems that appear years later trace back to a decision made before the pour: a subbase that was not compacted, a slope that moved water the wrong way, or joints spaced too far apart.",
          "Settling those details in writing at quote stage is the most useful thing a homeowner can do.",
        ],
      },
    ],
  },

  /* --------------------------------------------------------- patios */
  "concrete-patios": {
    detailImage: "/services/concrete-patios-detail.webp",
    detailImageAlt:
      "Residential concrete patio in Lancaster SC with outdoor dining furniture",
    mayInclude: [
      "New patio installation",
      "Patio replacement",
      "Patio slab work",
      "Outdoor concrete areas",
      "Patio extensions",
      "Walkway connections to an existing patio",
      "Steps and landings tied into a patio slab",
    ],
    moreInfo: [
      {
        heading: "What a concrete patio project is",
        body: [
          "A concrete patio is an outdoor living surface poured as a slab, usually sized around how the space will be furnished and used.",
          "It carries lighter loads than a driveway, so attention shifts to finish, slope, and how the slab meets the house, the steps, and the yard around it.",
        ],
      },
      {
        heading: "Common reasons homeowners request it",
        body: [
          "Requests usually follow a change in how the yard is used: adding a seating or dining area, replacing a slab that has cracked or settled, or extending one that turned out too small.",
          "Others are covering ground that stays muddy, or preparing a level base for a cover, pergola, or outdoor kitchen.",
        ],
      },
      {
        heading: "Typical project types",
        body: [
          "Common work includes a new patio on open ground, replacement of a deteriorated slab, and an extension poured against existing concrete.",
          "Connected areas such as a walkway to the driveway or a side entry are often included, and steps or landings join the scope where the patio sits below a door.",
        ],
      },
      {
        heading: "Important considerations",
        body: [
          "Slope is the detail most often underestimated. A patio needs enough fall to shed water away from the foundation without feeling tilted underfoot.",
          "Where new concrete meets old, the joint between them needs thought, because the two sections move independently. Texture is worth discussing too, since a smooth finish behaves differently when wet.",
        ],
      },
      {
        heading: "What to know before starting",
        body: [
          "Gather rough dimensions, how the space will be furnished, whether a cover or structure is planned later, and where downspouts discharge.",
          "Note any irrigation, low voltage lighting, or drainage crossing the area. Confirm finish, jointing, and edge details with the provider before work begins rather than during the pour.",
        ],
      },
      {
        heading: "How a project generally runs",
        body: [
          "Work usually begins with a site visit to check grade and drainage, followed by a written scope and quote.",
          "Then comes layout and excavation, subbase preparation, forming, reinforcement where specified, the pour, finishing to the agreed texture, joints, and curing. Keep furniture off until the provider says it is ready.",
        ],
      },
      {
        heading: "Why planning matters",
        body: [
          "Patios are easy to undersize and hard to enlarge neatly later, because an addition poured afterwards rarely matches the original in colour or texture.",
          "Deciding size, finish, and drainage before the forms go in avoids the two common regrets: a slab that feels cramped once furnished, and water collecting near the house.",
        ],
      },
    ],
  },

  /* ---------------------------------------------------------- slabs */
  "concrete-slabs": {
    detailImage: "/services/concrete-slabs-detail.webp",
    detailImageAlt:
      "Finished residential concrete slab and equipment pad in Lancaster SC beside a brick home, with an HVAC condenser on the pad",
    mayInclude: [
      "Residential slabs",
      "Garage slabs",
      "Shed and outbuilding slabs",
      "Foundation related slab projects where appropriate",
      "Replacement of damaged slabs",
      "Equipment and HVAC pads",
      "Slabs prepared for a future structure",
    ],
    moreInfo: [
      {
        heading: "What a concrete slab project is",
        body: [
          "A slab is a flat, reinforced element poured to support something specific: a building, a vehicle, equipment, or a structure planned for later.",
          "Because its job is set by what sits on it, thickness, reinforcement, subbase, and edge detail matter more than appearance. A shed slab and a garage slab can look alike yet differ.",
        ],
      },
      {
        heading: "Common reasons homeowners request it",
        body: [
          "Typical triggers include preparing a base for a shed, workshop, or detached garage, replacing a slab that has cracked or settled, or creating a pad for HVAC equipment or a generator.",
          "Others want a level surface for storage now sitting on soil or gravel, often ahead of a delivery the pad must be ready for.",
        ],
      },
      {
        heading: "Typical project types",
        body: [
          "Work commonly covers new residential slabs, garage and outbuilding slabs, small equipment pads, and foundation related slab work where that falls within a provider's scope.",
          "Removal and replacement of failed slabs is also common. Where a slab supports a permanent structure, the project may involve requirements beyond flatwork.",
        ],
      },
      {
        heading: "Important considerations",
        body: [
          "The intended load should drive thickness and reinforcement, and the subbase needs proper compaction, since most slab problems begin below the concrete.",
          "Edge thickening, vapour control under enclosed spaces, anchor placement, and perimeter drainage are worth settling early. Some slab work may be subject to permitting, which should be confirmed locally.",
        ],
      },
      {
        heading: "What to know before starting",
        body: [
          "Be ready to describe what the slab will carry, the finished dimensions needed, the site's drainage, and access for equipment and delivery.",
          "If a building kit specifies a pad size and tolerance, or a manufacturer supplies a foundation specification, share it early. Ask the provider what falls inside their scope.",
        ],
      },
      {
        heading: "How a project generally runs",
        body: [
          "The usual sequence is a site assessment, a written scope and quote, layout and excavation, then subbase placement and compaction.",
          "Forming, reinforcement, any under slab provisions, the pour and finish, joint cutting, and curing follow. Squareness and level are checked first, because they are fixed once concrete is placed.",
        ],
      },
      {
        heading: "Why planning matters",
        body: [
          "A slab is one of the hardest elements to change afterwards. Dimensions slightly off, a pad that is not square, or reinforcement suited to a lighter load usually cannot be corrected without removal.",
          "Confirming purpose, size, and specification in writing before the pour prevents the most expensive category of rework.",
        ],
      },
    ],
  },

  /* --------------------------------------------------------- repair */
  "concrete-repair": {
    detailImage: "/services/concrete-repair-detail.webp",
    detailImageAlt:
      "Concrete repair project in Lancaster SC showing a filled and smoothed crack in a slab",
    mayInclude: [
      "Cracks",
      "Surface deterioration",
      "Damaged concrete",
      "Uneven or deteriorated areas",
      "Repair or replacement assessment",
      "Spalling, flaking, and pitted surfaces",
      "Trip hazards at joints and edges",
    ],
    moreInfo: [
      {
        heading: "What concrete repair covers",
        body: [
          "Concrete repair addresses existing slabs that have cracked, deteriorated at the surface, settled unevenly, or become a trip hazard.",
          "It starts with the cause, because a crack from ongoing movement needs a different response to one from a single event. Repair can mean treating the concrete, addressing what is happening beneath it, or replacing it.",
        ],
      },
      {
        heading: "Common reasons homeowners request it",
        body: [
          "Frequent reasons include a widening crack across a driveway or patio, a surface that is flaking or pitting, or a section that has dropped relative to its neighbour.",
          "Standing water over a settled area and broken edges are common too. Safety is often the trigger, particularly where an uneven joint sits on a walking route.",
        ],
      },
      {
        heading: "Typical project types",
        body: [
          "Requests commonly involve individual cracks, areas of surface deterioration, uneven or settled sections, and damaged edges and corners.",
          "Others are assessments, where the homeowner wants an informed view on repair against replacement. Some jobs cover one area, others a whole surface that has aged unevenly.",
        ],
      },
      {
        heading: "Important considerations",
        body: [
          "Repairs are rarely invisible. Patched concrete usually differs in colour and texture from the slab around it, and that difference tends to remain.",
          "Where the cause is active, such as soil movement or poor drainage, a surface only repair may not hold. Repeated patching of an old slab can cost more than one replacement.",
        ],
      },
      {
        heading: "What to know before starting",
        body: [
          "Helpful information includes when the damage appeared, whether it is changing, what the area is used for, and what happens there in heavy rain. Photographs are genuinely useful.",
          "Ask the provider what they believe is causing it, what the repair should achieve, and how the repaired area is likely to look next to the rest of the slab.",
        ],
      },
      {
        heading: "How a project generally runs",
        body: [
          "A repair usually starts with a site assessment of the damage and its likely cause, followed by a written scope setting out the approach.",
          "Preparation of the area, the repair itself, and a curing period follow. Where the assessment points to replacement, the provider should explain why and what that scope involves.",
        ],
      },
      {
        heading: "Why planning matters",
        body: [
          "Diagnosis is the part of concrete repair that decides whether the result lasts. Repairing a symptom while leaving drainage or movement unaddressed often returns the surface to its previous condition.",
          "Time at the assessment stage, and asking for the reasoning behind the recommended approach, separates a repair that holds from one that has to be redone.",
        ],
      },
    ],
  },
};
