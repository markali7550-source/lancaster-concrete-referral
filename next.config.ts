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
          // X-Frame-Options is intentionally omitted: it has no allowlist and
          // blocks the sandbox preview iframe. frame-ancestors is the modern
          // equivalent and accepts a list. Tighten to 'self' before launch.
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://*.e2b.app",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
