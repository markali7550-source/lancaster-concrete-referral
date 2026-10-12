import type { MetadataRoute } from "next";
import { site } from "@/lib/env";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.brand} | Concrete Quotes in Lancaster, SC`,
    short_name: site.brand,
    description:
      "Local concrete service for Lancaster, South Carolina homeowners, with work done by independent local crews.",
    start_url: "/",
    display: "browser",
    background_color: "#f6f4f1",
    theme_color: "#0b6b45",
    icons: [
      { src: "/icon.webp", sizes: "512x512", type: "image/webp" },
      { src: "/apple-icon.webp", sizes: "180x180", type: "image/webp" },
    ],
  };
}
