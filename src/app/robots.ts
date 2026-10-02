import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  return {
    // TODO(launch): restore `allow: "/"` with `disallow: ["/api/"]` and keep
    // the sitemap once the real domain is live.
    rules: [{ userAgent: "*", disallow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
