import { absoluteUrl, site } from "@/lib/env";

type Node = Record<string, unknown>;

const ORG_ID = () => `${absoluteUrl("/")}/#organization`;
const SITE_ID = () => `${absoluteUrl("/")}/#website`;

/**
 * Root publisher is an OnlineBusiness. Never LocalBusiness,
 * HomeAndConstructionBusiness, or GeneralContractor (spec 6.1).
 */
export function rootGraph(): Node[] {
  return [
    {
      "@type": ["Organization", "OnlineBusiness"],
      "@id": ORG_ID(),
      name: site.brand,
      url: absoluteUrl("/"),
      telephone: site.phoneE164,
      email: site.email,
      description:
        "Online referral service that connects South Carolina homeowners with independent concrete contractors. Not a contractor.",
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
  areaServed: string[];
}): Node {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(input.path)}#service`,
    name: input.name,
    description: input.description,
    serviceType: input.name,
    provider: { "@id": ORG_ID() },
    areaServed: input.areaServed.map((city) => ({
      "@type": "City",
      name: `${city}, SC`,
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
