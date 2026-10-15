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
    // Same switch as src/lib/env/indexing.ts. Until launch, every response tells
    // crawlers not to index it, including previews and staging.
    const indexingOff = process.env.ALLOW_SEARCH_INDEXING !== "true";
    return [
      ...(indexingOff
        ? [
            {
              source: "/(.*)",
              headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
            },
          ]
        : []),
      {
        source: "/:path*\\.webp",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Clickjacking protection. Only this site may frame its own pages.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self'",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          // Features this site does not use are switched off for every visitor.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
