import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/env";
import { SEARCH_INDEXING_ENABLED } from "@/lib/env/indexing";

export default function robots(): MetadataRoute.Robots {
  // Before launch, every crawler is told to stay out, and no sitemap is advertised.
  if (!SEARCH_INDEXING_ENABLED) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
