import { getLocation } from "./locations";
import { getService, type ServiceSlug } from "./services";

export interface LocationServiceRecord {
  locationSlug: string;
  serviceSlug: ServiceSlug;
  state: "published" | "gated";
  /**
   * Locally specific copy. City-name substitution alone fails the build gate.
   * Each entry renders as a titled block so the section scans.
   */
  localBody: { heading: string; body: string }[];
  /**
   * Combo-page hero and city-card photo, from one field so the card always
   * matches the page it opens. Interim: currently the service hero, until a
   * distinct local photograph per pair replaces it.
   */
  localImage: string;
  localImageAlt: string;
  localFaqs: { question: string; answer: string }[];
}

const records: readonly LocationServiceRecord[] = [
  {
    locationSlug: "lancaster-sc",
    serviceSlug: "concrete-driveways",
    state: "published",
    localImage: "/images/services/concrete-driveways/concrete-driveways-hero.webp",
    localImageAlt:
      "Concrete driveway running up to the garage of a single story brick ranch house, with saw cut control joints across its width",
    localBody: [
      {
        heading: "Two kinds of job",
        body:
          "Driveway requests usually fall into one of two jobs. One is replacing an aging slab that has cracked, settled, or lost its surface. The other is a first concrete pour where a gravel drive has become unworkable. The two price differently, because only one of them carries demolition and haul away.",
      },
      {
        heading: "Access and water come first",
        body:
          "Square footage affects the price, and access and drainage can move it just as much. Where a mixer can stage decides whether concrete is chuted straight into the forms or has to be barrowed or pumped, and clay subsoil that holds water puts more weight on subbase preparation and edge drainage.",
      },
      {
        heading: "When to ask for a visit",
        body:
          "Weather shapes the schedule more than the calendar does. Temperature, humidity, and rain all affect site preparation, placement, and curing, so a contractor may move a pour rather than fight the conditions. If a driveway is already failing, it is worth asking for an assessment early rather than waiting for the season you would prefer to pour in.",
      },
      {
        heading: "Who actually does the work",
        body:
          "We do not pour concrete. When your request matches an approved participating provider for the Lancaster area, that independent contractor contacts you to inspect the site, confirm scope, and quote the work directly. We stay out of the pricing conversation entirely, and we do not take a position on which finish, thickness, or reinforcement your property needs.",
      },
    ],
    localFaqs: [
      {
        question:
          "Do Lancaster driveway quotes include removing the old slab?",
        answer:
          "Demolition and haul away are usually quoted as separate line items. Ask the assigned contractor to itemize removal so you can compare quotes honestly.",
      },
      {
        question: "Which Lancaster areas can you match right now?",
        answer:
          "Lancaster, South Carolina is the approved coverage area at launch. Requests from outside it return an honest no coverage response rather than being routed to a contractor who does not serve the area.",
      },
      {
        question: "Can you guarantee a price before anyone visits?",
        answer:
          "No. We are a referral service, not the contractor. Pricing, scheduling, and project eligibility are set by the independent contractor after a site visit.",
      },
    ],
  },
  {
    locationSlug: "lancaster-sc",
    serviceSlug: "concrete-patios",
    state: "published",
    localImage: "/images/services/concrete-patios/concrete-patios-hero.webp",
    localImageAlt:
      "Stamped concrete backyard patio in a random stone pattern with a curved edge, set against a mown lawn and a split rail fence",
    localBody: [
      {
        heading: "What the work usually is",
        body:
          "Patio work is usually either a new slab in a rear yard or a replacement of a surface that has cracked, settled, or drains the wrong way. An old porch or stoop footprint opened up into an uncovered seating area is a common variation, and it pulls the existing structure into the scope.",
      },
      {
        heading: "Shade decides the finish",
        body:
          "Shade changes which finish makes sense. A patio under mature trees stays damp well into the morning, and a smooth troweled surface in that position grows algae and gets slippery. A broom finish or exposed aggregate keeps grip where a smooth trowel will not, and it is worth settling before the slab is ordered rather than after.",
      },
      {
        heading: "Humidity and scheduling",
        body:
          "Heat and humidity drive scheduling more than temperature alone. In hot, humid conditions a slab can skin over faster than it can be finished, so pours are often started early in the day or moved rather than fought. Expect a contractor to talk about curing and moisture protection, not only the pour day itself.",
      },
      {
        heading: "Tying into existing concrete",
        body:
          "Tying a new patio into an existing porch footing or stoop is the other detail worth raising early. The old footing and the new slab move independently unless the joint is detailed deliberately, which is why the existing structure needs looking at before anyone quotes, rather than pricing it from a square foot figure over the phone.",
      },
    ],
    localFaqs: [
      {
        question: "What patio finish holds up best in a shaded Lancaster back yard?",
        answer:
          "Textured finishes such as broom or exposed aggregate stay usable in damp shade, where a smooth troweled surface tends to grow algae and get slippery. The assigned contractor makes the call after seeing the canopy and drainage on your lot.",
      },
      {
        question: "Can a new patio be joined to my existing porch slab?",
        answer:
          "Often yes, but the two slabs move independently, so the joint has to be detailed for it. The contractor will inspect the existing footing before quoting rather than assuming it can simply be butted up against.",
      },
      {
        question: "Is summer a bad time to pour a patio here?",
        answer:
          "It is workable but less forgiving. Humidity and heat shorten finishing time, so a pour here may be scheduled for early morning or moved to a better week. That is a contractor decision, not ours.",
      },
    ],
  },
  {
    locationSlug: "lancaster-sc",
    serviceSlug: "concrete-slabs",
    state: "published",
    localImage: "/images/services/concrete-slabs/concrete-slabs-hero.webp",
    localImageAlt:
      "Finished concrete shed pad in a back yard, sitting proud of the ground with form marks down its side and backfilled soil around the edge",
    localBody: [
      {
        heading: "What pads are usually for",
        body:
          "Residential pads are commonly poured for outbuildings: detached workshops, equipment and mower storage, carports, hot tub bases, and pads for replacement HVAC condensers. Each of those carries a different load, and the load decides the slab rather than the footprint does.",
      },
      {
        heading: "Load comes before price",
        body:
          "Load is the first thing to settle, because it changes the slab rather than just its price. A pad that will carry a lifted truck, a tractor, or a loaded workshop bench needs thickened edges and different reinforcement from a simple storage floor, and retrofitting that later means breaking out the slab.",
      },
      {
        heading: "Siting on rural parcels",
        body:
          "On rural Lancaster parcels, siting is the second question. Septic fields, well heads, and their setbacks constrain where a pad can legally and sensibly go, and those locations need identifying before anyone quotes. The obvious flat spot is often the one place the pad cannot sit.",
      },
      {
        heading: "Heated buildings need more",
        body:
          "If the building on top will be heated or used as a workshop, expect the contractor to raise a vapor barrier beneath the slab. Lancaster County clay stays wet, and moisture rising through an unprotected pad ruins stored tools and flooring. Ask whether your structure also needs a permit.",
      },
    ],
    localFaqs: [
      {
        question: "Does my shed or workshop pad need to be thicker than a standard slab?",
        answer:
          "It depends entirely on what will sit on it. Vehicles, tractors, and heavy benches typically call for thickened edges and additional reinforcement. Tell the contractor the intended use at the site visit, because changing it afterwards means removing the slab.",
      },
      {
        question: "Will a septic field limit where my pad can go?",
        answer:
          "It can, and so can a well head and its setback. Identify both before the site visit so the contractor can position the pad legally rather than redesigning it after the fact.",
      },
      {
        question: "Do I need a vapor barrier under an outbuilding slab?",
        answer:
          "A vapor barrier is standard practice under a heated or finished space, because clay subsoil holds moisture that would otherwise rise through the slab. Under an open carport it is normally unnecessary. The assigned contractor specifies it, not us.",
      },
    ],
  },
  {
    locationSlug: "lancaster-sc",
    serviceSlug: "concrete-repair",
    state: "published",
    localImage: "/images/services/concrete-repair/concrete-repair-hero.webp",
    localImageAlt:
      "Residential concrete walkway where one slab has been lifted and tilted by tree roots, leaving a raised lip against the next panel",
    localBody: [
      {
        heading: "Three shapes it takes",
        body:
          "Repair work usually takes one of three shapes: surface spalling and flaking on an older slab, joints that have opened and now trap water, and sections that have dropped out of level at an apron, walkway, or garage threshold. Which one you have decides whether the fix is cosmetic or structural.",
      },
      {
        heading: "Settlement is a soil story",
        body:
          "Settlement here is usually a soil story rather than a concrete one. Red clay shrinks in a dry summer and swells with fall rain, and stormwater running along an edge washes fines out from under the slab until a void forms. Grinding the lip flush without fixing the water resets the clock.",
      },
      {
        heading: "Tree roots and lifted panels",
        body:
          "Mature hardwoods cause the opposite problem. Roots from oaks planted close to older in town walkways lift panels from below, and cutting the root to level the slab can destabilize the tree. A contractor worth hiring will tell you plainly when that tradeoff is the real decision.",
      },
      {
        heading: "When replacement wins",
        body:
          "Sometimes repair is not worth it. Once a slab is cracked across multiple panels, has lost surface depth, or sits on a compromised subbase, resurfacing buys a few seasons at a real fraction of replacement cost. Advice to replace rather than patch is usually not an upsell.",
      },
    ],
    localFaqs: [
      {
        question: "Why does one section of my driveway keep sinking after it is fixed?",
        answer:
          "Usually water. If stormwater is washing fines out from under that section, leveling the surface without redirecting the water means the void reopens. Ask the contractor to explain what is being done about drainage.",
      },
      {
        question: "Can a lifted slab near a tree be leveled without killing the tree?",
        answer:
          "Sometimes, but cutting a structural root to level a panel can destabilize a mature oak. That tradeoff is a site specific judgment the assigned contractor will walk you through.",
      },
      {
        question: "When is resurfacing a waste of money?",
        answer:
          "When the cracking runs across several panels, the surface has lost real depth, or the subbase has failed. In those cases resurfacing buys a few seasons for a large share of the replacement price, and a straight contractor will say so.",
      },
    ],
  },
];

/** Explicit allowlist consumed by generateStaticParams. Never a Cartesian product. */
export const publishedLocationServices = records.filter((record) => {
  if (record.state !== "published") return false;
  return Boolean(getLocation(record.locationSlug) && getService(record.serviceSlug));
});

export function getLocationService(
  locationSlug: string,
  serviceSlug: string,
): LocationServiceRecord | undefined {
  return publishedLocationServices.find(
    (r) => r.locationSlug === locationSlug && r.serviceSlug === serviceSlug,
  );
}

export function publishedServicesForLocation(locationSlug: string) {
  return publishedLocationServices
    .filter((r) => r.locationSlug === locationSlug)
    .map((r) => getService(r.serviceSlug)!)
    .filter(Boolean);
}
