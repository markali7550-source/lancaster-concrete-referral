import type { MetadataRoute } from "next";
import { site } from "@/lib/env";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.brand} | Concrete Referrals in Lancaster, SC`,
    short_name: site.brand,
    description:
      "Referral service connecting Lancaster, South Carolina homeowners with independent concrete service providers.",
    start_url: "/",
    display: "browser",
    background_color: "#f2f5f3",
    theme_color: "#1f6b4e",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
