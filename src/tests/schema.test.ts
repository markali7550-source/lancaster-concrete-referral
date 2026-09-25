import { describe, expect, it } from "vitest";
import { buildGraph, serviceNode, webPageNode } from "@/lib/schema/graph";

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

  it("never types the publisher as a contractor or local business", () => {
    const serialised = JSON.stringify(graph);
    expect(serialised).not.toContain("GeneralContractor");
    expect(serialised).not.toContain("LocalBusiness");
    expect(serialised).not.toContain("HomeAndConstructionBusiness");
  });

  it("publishes no address, rating, or review on the referral brand", () => {
    const serialised = JSON.stringify(graph);
    for (const forbidden of ["aggregateRating", "review", "address", "priceRange"]) {
      expect(serialised).not.toContain(forbidden);
    }
  });

  it("uses absolute @id values on the production host", () => {
    const nodes = graph["@graph"] as { "@id"?: string }[];
    for (const node of nodes) {
      if (node["@id"]) expect(node["@id"]).toMatch(/^https?:\/\//);
    }
  });
});
