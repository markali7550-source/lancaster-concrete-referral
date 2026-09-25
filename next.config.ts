import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["*.e2b.app"],
  trailingSlash: false,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  // Next.js route matching is case-insensitive and trailingSlash:false already
  // collapses slash variants, so no hand-written case redirects are needed.
  // Removed-route 301/410 handling lives in middleware when a route retires.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
