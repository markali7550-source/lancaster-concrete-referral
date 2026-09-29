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
      "Driveway enquiries from Lancaster split fairly evenly between replacement of 1970s-to-1990s pours in the older neighbourhoods off Chesterfield Avenue and first-time pours on rural parcels where a gravel drive has become unworkable.",
      "The two questions partners raise most often on Lancaster driveways are truck access and water. Narrow in-town lots restrict where a mixer can stage, and the county's clay subsoil holds water long enough that sub-base preparation and edge drainage change the price of the job more than the square footage does.",
      "Seasonality matters here too. Requests cluster in late spring and early autumn, which is when partner capacity tightens and acknowledgement times stretch. If your driveway is already failing, an enquiry in the quieter winter weeks usually gets a faster site visit, even though the pour itself may be scheduled for milder weather.",
      "We do not pour concrete. When your request matches an approved partner for 29720 or 29721, that independent contractor contacts you to inspect the site, confirm scope, and quote the work directly. We stay out of the pricing conversation entirely, and we do not take a position on which finish, thickness, or reinforcement your property needs.",
    ],
    localFaqs: [
      {
        question:
          "Do Lancaster driveway quotes include removing the old slab?",
        answer:
          "Demolition and haul-away are usually quoted as separate line items. Ask the assigned contractor to itemise removal so you can compare quotes honestly.",
      },
      {
        question: "Which Lancaster areas can you match right now?",
        answer:
          "29720 and 29721 are the approved coverage areas at launch. Requests from other areas return an honest no-coverage response rather than being routed to a contractor who does not serve the area.",
      },
      {
        question: "Can you guarantee a price before anyone visits?",
        answer:
          "No. We are a referral service, not the contractor. Pricing, scheduling, and project eligibility are set by the independent contractor after a site visit.",
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
