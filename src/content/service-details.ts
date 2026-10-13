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
 *   participating providers differ in what they take on.
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
};
