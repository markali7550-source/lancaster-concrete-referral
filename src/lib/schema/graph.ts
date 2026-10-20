import { absoluteUrl, site } from "@/lib/env";

type Node = Record<string, unknown>;

const ORG_ID = () => `${absoluteUrl("/")}/#organization`;
const SITE_ID = () => `${absoluteUrl("/")}/#website`;
const LOCAL_ID = () => `${absoluteUrl("/")}/#localbusiness`;

const BUSINESS_DESCRIPTION =
  "Lancaster Concrete Connect is a project coordination service for South Carolina homeowners. We connect you with trusted local concrete contractors, who perform the work. We are not a contractor.";

/**
 * Root publisher is an OnlineBusiness. The LocalBusiness node below describes
 * the same brand for local search and points back to it. Neither node is a
 * GeneralContractor or HomeAndConstructionBusiness, and neither carries an
 * address, because no verified address is supplied in src/config/site.ts.
 */
/** PostalAddress with locality, region and country. Street and ZIP code are
 *  added only when the config supplies them; empty values are omitted, so a
 *  missing street never produces an invalid or blank field. */
function postalAddress(): Node {
  return {
    "@type": "PostalAddress",
    ...(site.streetAddress ? { streetAddress: site.streetAddress } : {}),
    addressLocality: site.serviceArea.city,
    addressRegion: site.serviceArea.region,
    ...(site.postalCode ? { postalCode: site.postalCode } : {}),
    addressCountry: site.serviceArea.country,
  };
}

export function rootGraph(): Node[] {
  return [
    {
      "@type": ["Organization", "OnlineBusiness"],
      "@id": ORG_ID(),
      name: site.brand,
      url: absoluteUrl("/"),
      telephone: site.phoneE164,
      email: site.email,
      description: BUSINESS_DESCRIPTION,
    },
    {
      "@type": "LocalBusiness",
      "@id": LOCAL_ID(),
      name: site.brand,
      url: absoluteUrl("/"),
      telephone: site.phoneE164,
      email: site.email,
      description: BUSINESS_DESCRIPTION,
      address: postalAddress(),
      areaServed: {
        "@type": "City",
        name: `${site.serviceArea.city}, ${site.serviceArea.region}`,
      },
      parentOrganization: { "@id": ORG_ID() },
    },
    {
      "@type": "WebSite",
      "@id": SITE_ID(),
      url: absoluteUrl("/"),
      name: site.brand,
      publisher: { "@id": ORG_ID() },
      inLanguage: "en-US",
    },
  ];
}

export function webPageNode(path: string, name: string, description: string): Node {
  return {
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { "@id": SITE_ID() },
    about: { "@id": ORG_ID() },
  };
}

export function breadcrumbNode(
  path: string,
  items: { name: string; path: string }[],
): Node {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceNode(input: {
  path: string;
  name: string;
  description: string;
  serviceType?: string;
  /** Entries such as "Lancaster, SC" (City) or "Lancaster County, SC"
   *  (AdministrativeArea). */
  areaServed: string[];
}): Node {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(input.path)}#service`,
    name: input.name,
    description: input.description,
    serviceType: input.serviceType ?? input.name,
    /* The publisher arranges the request; it does not perform the work, so it
       is the broker, never the provider (schema.org Service.broker). */
    broker: { "@id": ORG_ID() },
    areaServed: input.areaServed.map((area) => ({
      "@type": area.includes("County") ? "AdministrativeArea" : "City",
      name: area,
    })),
  };
}

export function faqNode(
  path: string,
  faqs: { question: string; answer: string }[],
): Node | null {
  if (faqs.length === 0) return null;
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** Page-level graph.
 *
 * Deliberately does NOT spread `rootGraph()`: the root layout already renders
 * the Organization and WebSite nodes once on every page, so including them
 * here emitted both a second time on the 13 routes that build a page graph.
 * Page nodes reference those entities by `@id` (ORG_ID / SITE_ID), which
 * resolves across separate JSON-LD blocks on the same page. */
export function buildGraph(nodes: (Node | null)[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter((n): n is Node => n !== null),
  };
}
