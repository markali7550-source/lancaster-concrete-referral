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
  /**
   * Single source of truth for this location's photography. The hero on
   * /locations/[city] and the card on the /locations index both read this
   * field, so the two can never drift apart.
   * Unpublished records carry "" like `intro`; they are never rendered.
   */
  heroImage: string;
  heroImageAlt: string;
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
      "Lancaster County sits on the Carolina Slate Belt, so subbase prep and drainage handling vary noticeably between in town lots and rural parcels off Highway 9.",
      "Older in town properties near Main Street frequently have narrow drive access, which affects truck staging and pour sequencing.",
      "Red clay subsoil common through the county holds water, so participating providers are asked about drainage handling before a driveway or slab quote is confirmed.",
    ],
    intro:
      "Looking for concrete services in Lancaster, SC? We help connect homeowners with independent concrete service providers who may be available for projects in the area. Lancaster is the core market for this referral service, and inquiries are matched against participating providers who have explicitly approved that coverage in writing.",
    heroImage: "/lancaster-hero.webp",
    heroImageAlt:
      "Residential street in Lancaster, South Carolina with concrete driveways in natural daylight",
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
    heroImage: "",
    heroImageAlt: "",
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
    heroImage: "",
    heroImageAlt: "",
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

/**
 * Sentinel submitted when a visitor selects "My area is not listed".
 * It is a structurally valid postal code that is never an approved ZIP,
 * so the routing engine returns no coverage without any special casing.
 */
export const OUT_OF_AREA_POSTAL_CODE = "00000";

export interface ServiceAreaOption {
  /** Wire value: still a postal code, so the lead contract is unchanged. */
  value: string;
  label: string;
}

/** Selectable locations for the quote form. Derived from published records only. */
export const serviceAreaOptions: readonly ServiceAreaOption[] = [
  ...publishedLocations
    .filter((l) => l.zips.length > 0)
    .map((l) => ({
      // One entry per served place. The wire value stays a postal code the
      // participating provider registry already approves, so routing is unchanged.
      value: l.zips[0] as string,
      label: `${l.city}, ${l.region}`,
    })),
  { value: OUT_OF_AREA_POSTAL_CODE, label: "My area is not listed" },
];

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
      "Fresh demand data, verified city record, unique copy, participating provider coverage.",
  },
  {
    path: "/locations/elgin-sc",
    state: "blocked",
    requirement:
      "Exact county, ZIPs, coordinates, intent, coverage, unique content, QA.",
  },
];

export type { ServiceSlug };
