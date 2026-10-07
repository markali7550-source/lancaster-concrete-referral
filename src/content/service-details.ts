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
      "Walkway connections to an existing patio",
      "Steps and landings tied into a patio slab",
    ],
  },

  /* ---------------------------------------------------------- slabs */
  "concrete-slabs": {
    mayInclude: [
      "Residential slabs",
      "Garage slabs",
      "Shed and outbuilding slabs",
      "Foundation related slab projects where appropriate",
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
};
