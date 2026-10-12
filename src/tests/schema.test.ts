import { describe, expect, it } from "vitest";
import { buildGraph, rootGraph, serviceNode, webPageNode } from "@/lib/schema/graph";

describe("JSON-LD graph", () => {
  const graph = buildGraph([
    webPageNode("/services/concrete-driveways", "Driveways", "Description"),
    serviceNode({
      path: "/services/concrete-driveways",
      name: "Concrete Driveways",
      description: "Description",
      areaServed: ["Lancaster"],
    }),
  ]);

  it("parses as strict JSON", () => {
    expect(() => JSON.parse(JSON.stringify(graph))).not.toThrow();
  });

  it("never types the publisher as a contractor", () => {
    const serialised = JSON.stringify(graph);
    expect(serialised).not.toContain("GeneralContractor");
    expect(serialised).not.toContain("HomeAndConstructionBusiness");
  });

  it("keeps LocalBusiness address to locality, region and country when no street is set", () => {
    const local = rootGraph().find((n) => n["@type"] === "LocalBusiness") as Record<string, unknown>;
    expect(local.address).toEqual({
      "@type": "PostalAddress",
      addressLocality: "Lancaster",
      addressRegion: "SC",
      addressCountry: "US",
    });
  });

  it("describes the brand as a LocalBusiness serving Lancaster, SC", () => {
    const local = rootGraph().find((n) => n["@type"] === "LocalBusiness");
    expect(local).toBeDefined();
    expect(local?.areaServed).toEqual({ "@type": "City", name: "Lancaster, SC" });
  });

  it("publishes no address, rating, or review on the brand", () => {
    const serialised = JSON.stringify(graph);
    for (const forbidden of ["aggregateRating", "review", "streetAddress", "priceRange"]) {
      expect(serialised).not.toContain(forbidden);
    }
  });

  it("never presents the publisher as the service provider", () => {
    const service = (graph["@graph"] as Record<string, unknown>[]).find((n) => n["@type"] === "Service");
    expect(service).toBeDefined();
    expect(service).not.toHaveProperty("provider");
    expect(service).toHaveProperty("broker");
  });

  it("uses absolute @id values on the production host", () => {
    const nodes = graph["@graph"] as { "@id"?: string }[];
    for (const node of nodes) {
      if (node["@id"]) expect(node["@id"]).toMatch(/^https?:\/\//);
    }
  });
});
