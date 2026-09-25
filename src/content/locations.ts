import type { PublicationState, ServiceSlug } from "./services";

export type GeoState =
  | "draft"
  | "identity_verified"
  | "demand_verified"
  | "partner_verified"
  | "content_approved"
  | "published"
  | "gated"
  | "blocked";

export interface LocationRecord {
  slug: string;
  city: string;
  region: "SC";
  county: string;
  state: GeoState;
  /** Explicitly approved ZIPs. Coverage is never inferred from a radius. */
  zips: string[];
  coordinates: { lat: number; lng: number };
  localEvidence: string[];
  intro: string;
  adjacent: string[];
}

/** Phase 2 backlog. Must produce zero Phase 1 output of any kind. */
export const excludedGeographies = [
  "charlotte",
  "rock-hill",
  "fort-mill",
] as const;

export const locations: readonly LocationRecord[] = [
  {
    slug: "lancaster-sc",
    city: "Lancaster",
    region: "SC",
    county: "Lancaster County",
    state: "published",
    zips: ["29720", "29721"],
    coordinates: { lat: 34.737, lng: -80.771 },
    localEvidence: [
      "Lancaster County sits on the Carolina Slate Belt, so sub-base prep and drainage handling vary noticeably between in-town lots and rural parcels off Highway 9.",
      "Older in-town properties near Main Street frequently have narrow drive access, which affects truck staging and pour sequencing.",
      "Red clay subsoil common through the county holds water, so partners are asked about drainage handling before a driveway or slab quote is confirmed.",
    ],
    intro:
      "Lancaster is our core market and the regional centre for this referral service. Enquiries from Lancaster ZIP codes 29720 and 29721 are matched against partners who have explicitly approved that coverage.",
    adjacent: [],
  },
  {
    slug: "indian-land-sc",
    city: "Indian Land",
    region: "SC",
    county: "Lancaster County",
    state: "gated",
    zips: [],
    coordinates: { lat: 0, lng: 0 },
    localEvidence: [],
    intro: "",
    adjacent: [],
  },
  {
    slug: "elgin-sc",
    city: "Elgin",
    region: "SC",
    county: "",
    state: "blocked",
    zips: [],
    coordinates: { lat: 0, lng: 0 },
    localEvidence: [],
    intro: "",
    adjacent: [],
  },
] as const;

export const publishedLocations = locations.filter(
  (l) => l.state === "published",
);

export function getLocation(slug: string): LocationRecord | undefined {
  return publishedLocations.find((l) => l.slug === slug);
}

export const approvedZips: ReadonlySet<string> = new Set(
  publishedLocations.flatMap((l) => l.zips),
);

export interface GatedRouteRecord {
  path: string;
  state: Extract<PublicationState, "gated" | "blocked">;
  requirement: string;
}

/** Planning records only. These never enter production output. */
export const gatedRouteInventory: readonly GatedRouteRecord[] = [
  {
    path: "/locations/indian-land-sc",
    state: "gated",
    requirement:
      "Fresh demand data, verified city record, unique copy, partner coverage.",
  },
  {
    path: "/locations/elgin-sc",
    state: "blocked",
    requirement:
      "Exact county, ZIPs, coordinates, intent, coverage, unique content, QA.",
  },
];

export type { ServiceSlug };
