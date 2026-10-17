import type { ServiceSlug } from "@/content/services";

/**
 * Extended, homeowner-facing detail for each Phase 1 service.
 *
 * Editorial rules that apply to every string in this file:
 * - The publisher is a local service site. Nothing here may imply that we pour,
 *   supervise, inspect, or warrant concrete work.
 * - No specific prices, no guaranteed timelines, no licensing, insurance,
 *   certification, or outcome guarantees.
 * - Scope language stays conditional ("may include", "can involve") because
 *   partner contractors differ in what they take on.
 */
export interface ServiceDetail {
  /** Common project components. Rendered under an explicit "may include" caveat. */
  mayInclude: string[];
}

export const serviceDetails: Record<ServiceSlug, ServiceDetail> = {
  /* ------------------------------------------------------ driveways */
  "concrete-driveways": {
    mayInclude: [
      "New driveway installation",
      "Driveway replacement",
      "Concrete driveway expansion",
      "Driveway slab work",
      "Removal and replacement of damaged concrete",
      "Aprons and street connections",
      "Parking pads and turnarounds",
    ],
  },

  /* --------------------------------------------------------- patios */
  "concrete-patios": {
    mayInclude: [
      "New patio installation",
      "Patio replacement",
      "Patio slab work",
      "Outdoor concrete areas",
      "Patio extensions",
      "Patio slab work at the rear of the home",
      "Outdoor living areas with a sealed finish",
    ],
  },

  /* ---------------------------------------------------------- slabs */
  "concrete-slabs": {
    mayInclude: [
      "Residential slabs",
      "Garage slabs",
      "Shed and outbuilding slabs",
      "Workshop floors",
      "Replacement of damaged slabs",
      "Equipment and HVAC pads",
      "Slabs prepared for a future structure",
    ],
  },

  /* --------------------------------------------------------- repair */
  "concrete-repair": {
    mayInclude: [
      "Cracks",
      "Surface deterioration",
      "Damaged concrete",
      "Uneven or deteriorated areas",
      "Repair or replacement assessment",
      "Spalling, flaking, and pitted surfaces",
      "Trip hazards at joints and edges",
    ],
  },

  /* ------------------------------------------------- stamped concrete */
  "stamped-concrete": {
    mayInclude: [
      "Stamped patio finishes",
      "Stamped entry and porch finishes",
      "Integral color",
      "Decorative texture and borders",
      "Sealing and recoat planning",
    ],
  },

  /* ----------------------------------------------------- foundations */
  "concrete-foundations": {
    mayInclude: [
      "Continuous and spread footings",
      "Stem walls",
      "Foundation reinforcement",
      "Anchor bolts and sleeves",
      "Foundations for new homes and additions",
    ],
  },

  /* -------------------------------------------------------- walkways */
  "concrete-walkways": {
    mayInclude: [
      "New front walks",
      "Walk replacement",
      "Sidewalk sections",
      "Broom finished walkway edges",
      "Control joint layout",
    ],
  },

  /* ----------------------------------------------------------- steps */
  "concrete-steps": {
    mayInclude: [
      "New front steps",
      "Porch landings",
      "Step replacement",
      "Nosing and broom finish",
    ],
  },

  /* ------------------------------------------------------ leveling */
  "concrete-leveling": {
    mayInclude: [
      "Sunken driveway slabs",
      "Uneven sidewalks and patios",
      "Settled slab edges at steps",
      "Trip hazard correction at joints",
      "Patching of drilled holes",
    ],
  },

  /* ------------------------------------------------ garage coatings */
  "concrete-garage-coatings": {
    mayInclude: [
      "Epoxy and polyurea floor coatings",
      "Flake and decorative finishes",
      "Crack and joint repair before coating",
      "Moisture and surface preparation",
      "Topcoat and recoat planning",
    ],
  },

  /* ----------------------------------------------------- resurfacing */
  "concrete-resurfacing": {
    mayInclude: [
      "Thin overlays on driveways",
      "Patio and walkway overlays",
      "Crack repair before overlay",
      "Texture and color options",
      "Sealing after overlay",
    ],
  },

  /* ------------------------------------------------------ aprons */
  "concrete-aprons": {
    mayInclude: [
      "Driveway to street aprons",
      "Driveway to garage aprons",
      "Replacement of sunken or cracked aprons",
      "Grade correction toward the gutter",
      "Joints aligned with the driveway",
    ],
  },

  /* ------------------------------------------------------ sealing */
  "concrete-sealing": {
    mayInclude: [
      "Penetrating and film forming sealers",
      "Cleaning before sealing",
      "Minor crack repair before sealing",
      "Recoat planning",
      "Driveways, patios, and walkways",
    ],
  },

  /* ------------------------------------------------ exposed aggregate */
  "concrete-exposed-aggregate": {
    mayInclude: [
      "Exposed aggregate driveways",
      "Exposed aggregate patios and walkways",
      "Decorative stone and color choices",
      "Accent and border bands",
      "Sealing after exposure, if recommended",
    ],
  },
};
