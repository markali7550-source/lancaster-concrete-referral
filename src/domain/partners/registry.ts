export interface PartnerRecord {
  id: string;
  legalName: string;
  contractActive: boolean;
  approvedZips: string[];
  acceptedServices: string[];
  open: boolean;
  dailyCap: number;
  deliveredToday: number;
  credential: {
    number: string;
    board: string;
    classification: "residential-builder" | "specialty-concrete";
    status: "active" | "expired" | "suspended";
    expiresAt: string;
    verifiedAt: string;
    reviewer: string;
  };
  insurance: { onFile: boolean; expiresAt: string; generalLiability: number };
  suspended: boolean;
  /** Rolling acknowledgment service level, minutes. */
  ackMinutes: number;
  contractedPriority: number;
  backup: boolean;
}

/**
 * Seed registry. Production replaces this with PostgreSQL records that carry
 * credential evidence, lookup source, timestamp, and reviewer identity.
 */
export const partners: PartnerRecord[] = [
  {
    id: "ptr_lancaster_primary",
    legalName: "Example Primary Concrete LLC",
    contractActive: true,
    approvedZips: ["29720", "29721"],
    acceptedServices: [
      "concrete-driveways",
      "concrete-patios",
      "concrete-slabs",
      "concrete-repair",
    ],
    open: true,
    dailyCap: 12,
    deliveredToday: 0,
    credential: {
      number: "SC-RBS-000000",
      board: "SC LLR Residential Builders Commission",
      classification: "residential-builder",
      status: "active",
      expiresAt: "2027-06-30",
      verifiedAt: "2026-09-18",
      reviewer: "compliance.owner",
    },
    insurance: {
      onFile: true,
      expiresAt: "2027-03-31",
      generalLiability: 1_000_000,
    },
    suspended: false,
    ackMinutes: 14,
    contractedPriority: 10,
    backup: false,
  },
  {
    id: "ptr_lancaster_backup",
    legalName: "Example Backup Concrete Co",
    contractActive: true,
    approvedZips: ["29720"],
    acceptedServices: ["concrete-driveways", "concrete-slabs", "concrete-repair"],
    open: true,
    dailyCap: 6,
    deliveredToday: 0,
    credential: {
      number: "SC-SPC-000001",
      board: "SC LLR",
      classification: "specialty-concrete",
      status: "active",
      expiresAt: "2027-01-31",
      verifiedAt: "2026-09-18",
      reviewer: "compliance.owner",
    },
    insurance: {
      onFile: true,
      expiresAt: "2026-12-31",
      generalLiability: 1_000_000,
    },
    suspended: false,
    ackMinutes: 41,
    contractedPriority: 5,
    backup: true,
  },
  {
    id: "ptr_expired_credential",
    legalName: "Example Lapsed Credential LLC",
    contractActive: true,
    approvedZips: ["29720", "29721"],
    acceptedServices: ["concrete-driveways", "concrete-patios"],
    open: true,
    dailyCap: 10,
    deliveredToday: 0,
    credential: {
      number: "SC-RBS-000002",
      board: "SC LLR Residential Builders Commission",
      classification: "residential-builder",
      status: "expired",
      expiresAt: "2026-05-31",
      verifiedAt: "2026-09-18",
      reviewer: "compliance.owner",
    },
    insurance: {
      onFile: true,
      expiresAt: "2027-02-28",
      generalLiability: 1_000_000,
    },
    suspended: false,
    ackMinutes: 9,
    contractedPriority: 9,
    backup: false,
  },
];
