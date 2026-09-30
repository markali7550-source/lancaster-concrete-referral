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
  moreInfo: { heading: string; body: string }[];
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
        body: "A concrete driveway is a poured, reinforced surface built to carry vehicle loads over many years. The work is more than the visible slab: it involves clearing the area, shaping and compacting a stable subbase, setting forms to the correct fall, placing reinforcement, pouring, finishing the surface, and cutting control joints so the slab cracks where it is meant to. Driveways in Lancaster, SC are often poured over heavy clay soils, which makes the preparation underneath the concrete just as important as the pour itself.",
      },
      {
        heading: "Common reasons homeowners request it",
        body: "Most requests come from one of a few situations: an existing gravel or dirt drive that has become difficult to maintain, an older slab that has cracked, settled, or spalled past the point of patching, a drive that is too narrow for a second vehicle, or standing water and a downhill approach that sends runoff toward the garage. Some homeowners are preparing to sell and want a tidier approach; others are adding a parking pad for a trailer, boat, or additional car.",
      },
      {
        heading: "Typical project types",
        body: "Projects generally fall into new pours over an unpaved drive, full replacement of a failed slab including demolition and haul away, widening or extending an existing driveway, and rebuilds driven by drainage where grade correction is the real objective. Each of these carries different site work, and the difference between them usually matters more to scheduling and cost than the square footage alone.",
      },
      {
        heading: "Important considerations",
        body: "Thickness and reinforcement should suit the vehicles that will actually use the surface, since a drive that will see a heavy truck is not built like one serving a single sedan. Joint layout, slope away from the house and garage, and the transition at the street all affect how the surface performs over time. Concrete is also a material that cracks; well placed control joints manage where that happens rather than preventing it entirely.",
      },
      {
        heading: "What to know before starting",
        body: "It helps to know the approximate dimensions, whether an existing surface has to come out, where water currently goes during heavy rain, and whether utility lines, irrigation, or septic components run beneath the area. Access matters too: a truck needs a route to the pour. Fresh concrete also needs time before it carries traffic, so plan for a period where the drive cannot be used. Confirm scope, sequence, and site conditions directly with the provider who quotes the work.",
      },
      {
        heading: "How a project generally runs",
        body: "A typical sequence is an on site look at the area and its drainage, a written scope and quote from the provider, removal of any existing surface, excavation and subbase preparation, forming and reinforcement, the pour and surface finish, joint cutting, then a curing period before use. Weather influences both the pour and the finish, so dates commonly shift with conditions.",
      },
      {
        heading: "Why planning matters",
        body: "Nearly every driveway problem that shows up years later traces back to something decided before the pour: a subbase that was not compacted, a slope that moved water the wrong way, joints placed too far apart, or a thickness chosen for lighter use than the drive actually sees. Settling those details in writing at quote stage is the single most useful thing a homeowner can do.",
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
        body: "A concrete patio is an outdoor living surface poured as a slab, usually sized around how the space will be furnished and used. Compared with a driveway it carries light loads, so attention shifts from load capacity toward surface finish, slope, and how the slab meets the house, existing steps, and the surrounding yard. Finish choice has a large effect on how the patio looks and how it behaves when wet.",
      },
      {
        heading: "Common reasons homeowners request it",
        body: "Requests often follow a change in how the yard is used: adding a seating or dining area, replacing a patio that has cracked or settled unevenly, extending a slab that turned out too small once furniture arrived, or covering an area of lawn that stays muddy. Others are preparing for a cover, pergola, or outdoor kitchen and need a level, durable base first.",
      },
      {
        heading: "Typical project types",
        body: "Common work includes a new patio on previously open ground, replacement of a deteriorated slab, an extension poured against existing concrete, and connected outdoor areas such as a walkway joining the patio to a driveway or side entry. Steps and landings are frequently part of the same scope when the patio sits below a door threshold.",
      },
      {
        heading: "Important considerations",
        body: "Slope is the detail most often underestimated: a patio needs enough fall to shed water away from the foundation without feeling tilted underfoot. Where new concrete meets existing concrete, the joint between them needs thought, since the two sections move independently. Surface texture is worth discussing as well, because a smooth finish that looks appealing dry can behave differently when wet or shaded.",
      },
      {
        heading: "What to know before starting",
        body: "Useful details to gather include rough dimensions, how the space will be furnished, whether a cover or structure is planned later, where downspouts discharge, and how the patio should meet doors and steps. Note any irrigation, low voltage lighting, or drainage lines crossing the area. Confirm finish, jointing, and edge details with the provider before work begins rather than during the pour.",
      },
      {
        heading: "How a project generally runs",
        body: "Work usually begins with a site visit to check grade and drainage, followed by a written scope and quote. Then comes layout and excavation, subbase preparation, forming, reinforcement where specified, the pour, finishing to the agreed texture, joint placement, and a curing period. Furniture and heavy planters should stay off until the provider says the surface is ready.",
      },
      {
        heading: "Why planning matters",
        body: "Patios are easy to undersize and hard to enlarge neatly afterwards, because an addition poured later rarely matches the original in colour or texture. Deciding dimensions, finish, and drainage before the forms go in avoids the two most common regrets: a slab that feels cramped once furnished, and water that collects near the house.",
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
        body: "A slab is a flat, reinforced concrete element poured to support something specific: a building, a vehicle, stored equipment, or a structure planned for later. Because the slab's job is defined by what sits on it, the important decisions are thickness, reinforcement, subbase preparation, and edge detail rather than appearance. A shed slab and a garage slab can look similar and still be built quite differently.",
      },
      {
        heading: "Common reasons homeowners request it",
        body: "Typical triggers include preparing a base for a shed, workshop, or detached garage, replacing a slab that has cracked or settled, creating a pad for HVAC equipment or a generator, or providing a level surface for storage that currently sits on soil or gravel. Some requests come ahead of a structure being delivered, where the pad has to be ready and square before a set date.",
      },
      {
        heading: "Typical project types",
        body: "Work commonly covers new residential slabs, garage and outbuilding slabs, small equipment pads, foundation related slab work where that falls within a provider's scope, and removal and replacement of slabs that have failed. Where a slab supports a permanent structure, the project may involve requirements that go beyond flatwork.",
      },
      {
        heading: "Important considerations",
        body: "The intended load should drive thickness and reinforcement, and the subbase needs to be properly compacted, since most slab problems begin below the concrete. Edge thickening, vapour control under enclosed spaces, anchor placement for a structure, and how the slab drains at its perimeter are all worth settling early. Some slab work may be subject to permitting or inspection depending on scope, which should be confirmed locally.",
      },
      {
        heading: "What to know before starting",
        body: "Be ready to describe what the slab will carry, the finished dimensions required, whether a building kit or structure has a specified pad size and tolerance, the site's current drainage, and access for equipment and delivery. If a manufacturer supplies a foundation specification, share it early. Where a structure is involved, ask the provider what falls inside their scope and what does not.",
      },
      {
        heading: "How a project generally runs",
        body: "The usual sequence is a site assessment, a written scope and quote, layout and excavation, subbase placement and compaction, forming, reinforcement, any under slab provisions, the pour and finish, joint cutting where applicable, and curing. Squareness and level are checked before the pour, because they are effectively fixed once concrete is placed.",
      },
      {
        heading: "Why planning matters",
        body: "A slab is one of the hardest elements to change after the fact. Dimensions that are slightly off, a pad that is not square, or reinforcement that suits a lighter load than intended usually cannot be corrected without removal. Confirming purpose, size, and specification in writing before the pour prevents the most expensive category of rework.",
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
        body: "Concrete repair addresses existing slabs that have cracked, deteriorated at the surface, settled unevenly, or become a trip hazard. The work begins with understanding the cause, because the appropriate response to a crack caused by ongoing movement is different from one caused by a single event or by joints that were spaced too far apart. Repair can mean treating the concrete, addressing what is happening beneath it, or concluding that replacement is the more sensible route.",
      },
      {
        heading: "Common reasons homeowners request it",
        body: "Frequent reasons include a widening crack across a driveway or patio, a surface that is flaking or pitting, a slab section that has dropped relative to its neighbour, standing water where the surface has settled, or an edge that has broken away. Safety is often the trigger, particularly where an uneven joint sits on a walking route or near an entry.",
      },
      {
        heading: "Typical project types",
        body: "Requests commonly involve individual cracks, areas of surface deterioration, uneven or settled sections, damaged edges and corners, and assessments where the homeowner wants an informed view on whether repair or replacement makes more sense. Some jobs are limited to one area, while others cover a whole surface that has aged unevenly.",
      },
      {
        heading: "Important considerations",
        body: "Repairs are rarely invisible: patched concrete generally differs in colour and texture from the surrounding slab, and that difference tends to remain. Where the underlying cause is active, such as soil movement or poor drainage, a surface only repair may not hold. It is also worth being realistic about the age and overall condition of a slab, because repeated patching of a surface near the end of its life can cost more than a single replacement.",
      },
      {
        heading: "What to know before starting",
        body: "Helpful information includes when the damage first appeared, whether it is changing, what the affected area is used for, and what happens there during heavy rain. Photographs are genuinely useful. Ask the provider what they believe is causing the problem, what the repair is expected to achieve, and how the repaired area is likely to look and perform compared with the rest of the slab.",
      },
      {
        heading: "How a project generally runs",
        body: "A repair generally starts with an on site assessment of the damage and its likely cause, followed by a written scope setting out the approach, then preparation of the affected area, the repair work itself, and a curing period before normal use. Where the assessment points toward replacement, the provider should explain why and what that scope would involve.",
      },
      {
        heading: "Why planning matters",
        body: "Diagnosis is the part of concrete repair that determines whether the result lasts. Repairing a symptom while leaving drainage or movement unaddressed often returns the surface to its previous condition. Taking time at the assessment stage, and asking for the reasoning behind the recommended approach, is what separates a repair that holds from one that has to be redone.",
      },
    ],
  },
};
