import { getLocation } from "./locations";
import { getService, type ServiceSlug } from "./services";

export interface LocationServiceRecord {
  locationSlug: string;
  serviceSlug: ServiceSlug;
  state: "published" | "gated";
  /** Locally specific copy. City-name substitution alone fails the build gate. */
  localBody: string[];
  localFaqs: { question: string; answer: string }[];
}

const records: readonly LocationServiceRecord[] = [
  {
    locationSlug: "lancaster-sc",
    serviceSlug: "concrete-driveways",
    state: "published",
    localBody: [
      "Driveway enquiries from Lancaster split fairly evenly between replacement of 1970s to 1990s pours in the older neighbourhoods off Chesterfield Avenue and first time pours on rural parcels where a gravel drive has become unworkable.",
      "The two questions participating providers raise most often on Lancaster driveways are truck access and water. Narrow lots in town restrict where a mixer can stage, and the county's clay subsoil holds water long enough that subbase preparation and edge drainage change the price of the job more than the square footage does.",
      "Seasonality matters here too. Requests cluster in late spring and early autumn, which is when provider capacity tightens and acknowledgement times stretch. If your driveway is already failing, an enquiry in the quieter winter weeks usually gets a faster site visit, even though the pour itself may be scheduled for milder weather.",
      "We do not pour concrete. When your request matches an approved participating provider for the Lancaster area, that independent contractor contacts you to inspect the site, confirm scope, and quote the work directly. We stay out of the pricing conversation entirely, and we do not take a position on which finish, thickness, or reinforcement your property needs.",
    ],
    localFaqs: [
      {
        question:
          "Do Lancaster driveway quotes include removing the old slab?",
        answer:
          "Demolition and haul away are usually quoted as separate line items. Ask the assigned contractor to itemise removal so you can compare quotes honestly.",
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
    localBody: [
      "Patio enquiries in Lancaster are dominated by rear yard slabs behind single storey ranch houses built between the 1960s and the 1990s, and by homeowners converting a tired screened porch footprint into an open entertaining surface.",
      "Shade is the variable homeowners underestimate. Mature oaks and pines keep much of a Lancaster back yard damp into the morning, and a smooth trowelled finish there grows algae and turns slippery within a couple of seasons. Participating providers usually steer these patios toward a broom or exposed aggregate finish for grip.",
      "Humidity drives scheduling more than temperature does. A July pour in Lancaster County can skin over faster than the crew can finish it, so participating providers often start at first light or push the date rather than fight the slab. Expect a contractor to talk about curing and moisture protection, not just the pour day itself.",
      "Tying a new patio into an existing porch footing or stoop is the other recurring detail. The old footing and the new slab move independently unless the joint is detailed deliberately, which is why participating providers inspect the existing structure before quoting rather than pricing from a square foot figure over the phone.",
    ],
    localFaqs: [
      {
        question: "What patio finish holds up best in a shaded Lancaster back yard?",
        answer:
          "Textured finishes such as broom or exposed aggregate stay usable in damp shade, where a smooth trowelled surface tends to grow algae and get slippery. The assigned contractor makes the call after seeing the canopy and drainage on your lot.",
      },
      {
        question: "Can a new patio be joined to my existing porch slab?",
        answer:
          "Often yes, but the two slabs move independently, so the joint has to be detailed for it. The contractor will inspect the existing footing before quoting rather than assuming it can simply be butted up against.",
      },
      {
        question: "Is summer a bad time to pour a patio here?",
        answer:
          "It is workable but less forgiving. Lancaster humidity and heat shorten finishing time, so participating providers often schedule early morning pours or move the date. That is a contractor decision, not ours.",
      },
    ],
  },
  {
    locationSlug: "lancaster-sc",
    serviceSlug: "concrete-slabs",
    state: "published",
    localBody: [
      "Slab requests around Lancaster are mostly outbuilding pads: detached workshops, equipment and mower storage, carports, hot tub bases, and pads for replacement HVAC condensers. Rural parcels outside the town limits account for most of the larger ones.",
      "Load is the first question a participating provider asks, because it changes the slab rather than just its price. A pad that will carry a lifted truck, a tractor, or a loaded workshop bench needs thickened edges and different reinforcement from a simple storage floor, and retrofitting that later means breaking out the slab.",
      "On rural Lancaster parcels, siting is the second question. Septic fields, well heads, and their setbacks constrain where a pad can legally and sensibly go, and participating providers will want those locations identified before they quote. Homeowners frequently discover the obvious flat spot is the one place the pad cannot sit.",
      "If the building on top will be heated or used as a workshop, expect the contractor to raise a vapour barrier beneath the slab. Lancaster County clay stays wet, and moisture rising through an unprotected pad ruins stored tools and flooring. Ask whether your structure also needs a permit.",
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
        question: "Do I need a vapour barrier under an outbuilding slab?",
        answer:
          "For a heated or finished space, participating providers generally recommend one because the clay subsoil here holds moisture. For an open carport it is usually unnecessary. The assigned contractor specifies it, not us.",
      },
    ],
  },
  {
    locationSlug: "lancaster-sc",
    serviceSlug: "concrete-repair",
    state: "published",
    localBody: [
      "Repair enquiries from Lancaster arrive in three recognisable shapes: surface spalling and flaking on slabs poured decades ago, joints that have opened and now trap water, and sections that have dropped out of level at an apron, walkway, or garage threshold.",
      "Settlement here is usually a soil story rather than a concrete one. Red clay shrinks in a dry summer and swells with autumn rain, and stormwater running along an edge washes fines out from under the slab until a void forms. Grinding the lip flush without fixing the water resets the clock.",
      "Mature hardwoods cause the opposite problem. Roots from oaks planted close to older in town walkways lift panels from below, and cutting the root to level the slab can destabilise the tree. Participating providers will tell you plainly when that tradeoff is the real decision.",
      "Sometimes repair is not worth it. Once a slab is cracked across multiple panels, has lost surface depth, or sits on a compromised subbase, resurfacing buys a few seasons at a real fraction of replacement cost. Advice to replace rather than patch is usually not an upsell.",
    ],
    localFaqs: [
      {
        question: "Why does one section of my driveway keep sinking after it is fixed?",
        answer:
          "Almost always water. If stormwater is washing fines out from under that section, levelling the surface without redirecting the water means the void reopens. Ask the contractor to explain what is being done about drainage.",
      },
      {
        question: "Can a lifted slab near a tree be levelled without killing the tree?",
        answer:
          "Sometimes, but cutting a structural root to level a panel can destabilise a mature oak. That tradeoff is a site specific judgement the assigned contractor will walk you through.",
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
