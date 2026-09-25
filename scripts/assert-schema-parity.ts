import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { publishedLocationServices } from "../src/content/location-services";
import { publishedLocations } from "../src/content/locations";
import { publishedServices } from "../src/content/services";

/**
 * Gate 23 — the JSON-LD graph must not contain contractor entity types or
 * unsupported claims, and FAQ schema must correspond to visible content.
 */
const FORBIDDEN_TYPES = ["GeneralContractor", "LocalBusiness", "HomeAndConstructionBusiness"];
const FORBIDDEN_FIELDS = ["aggregateRating", "review", "priceRange", "address", "license"];

function loadEnvFile(file: string): void {
  try {
    const content = readFileSync(resolve(process.cwd(), file), "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const index = trimmed.indexOf("=");
      const key = trimmed.slice(0, index).trim();
      if (!process.env[key]) process.env[key] = trimmed.slice(index + 1).trim();
    }
  } catch {
    /* CI supplies real values through the environment */
  }
}

async function main() {
  loadEnvFile(".env.local");
  loadEnvFile(".env.example");
  const { buildGraph, faqNode, serviceNode, webPageNode, breadcrumbNode } = await import(
    "../src/lib/schema/graph"
  );

  const failures: string[] = [];

  const graphs: { id: string; graph: unknown; faqCount: number }[] = [];

  for (const service of publishedServices) {
    const path = `/services/${service.slug}`;
    graphs.push({
      id: path,
      faqCount: service.considerations.length,
      graph: buildGraph([
        serviceNode({ path, name: service.name, description: service.summary, areaServed: ["Lancaster"] }),
        webPageNode(path, service.name, service.summary),
        breadcrumbNode(path, [{ name: "Home", path: "/" }, { name: service.name, path }]),
        faqNode(path, service.considerations),
      ]),
    });
  }

  for (const record of publishedLocationServices) {
    const location = publishedLocations.find((l) => l.slug === record.locationSlug)!;
    const service = publishedServices.find((s) => s.slug === record.serviceSlug)!;
    const path = `/locations/${record.locationSlug}/${record.serviceSlug}`;
    graphs.push({
      id: path,
      faqCount: record.localFaqs.length,
      graph: buildGraph([
        serviceNode({ path, name: service.name, description: service.summary, areaServed: [location.city] }),
        webPageNode(path, service.name, service.summary),
        faqNode(path, record.localFaqs),
      ]),
    });
  }

  for (const { id, graph, faqCount } of graphs) {
    let serialised: string;
    try {
      serialised = JSON.stringify(graph);
      JSON.parse(serialised);
    } catch (error) {
      failures.push(`${id}: graph is not valid JSON (${String(error)})`);
      continue;
    }

    for (const type of FORBIDDEN_TYPES) {
      if (serialised.includes(type)) failures.push(`${id}: forbidden entity type ${type}`);
    }
    for (const field of FORBIDDEN_FIELDS) {
      if (serialised.includes(`"${field}"`)) failures.push(`${id}: unsupported claim field ${field}`);
    }

    const nodes = (graph as { "@graph": { "@id"?: string; "@type"?: unknown }[] })["@graph"];
    for (const node of nodes) {
      if (node["@id"] && !/^https:\/\//.test(node["@id"])) {
        failures.push(`${id}: non-absolute @id ${node["@id"]}`);
      }
    }

    const hasFaqNode = serialised.includes('"FAQPage"');
    if (hasFaqNode && faqCount === 0) failures.push(`${id}: FAQ schema without visible FAQ`);
    if (!hasFaqNode && faqCount > 0) failures.push(`${id}: visible FAQ without FAQ schema`);
  }

  if (failures.length > 0) {
    console.error("Schema parity failures:");
    for (const failure of failures) console.error(`  - ${failure}`);
    process.exit(1);
  }
  console.log(`OK: ${graphs.length} page graph(s) pass schema parity.`);
}

void main();
