import type { Metadata, Viewport } from "next";
import { UtilityHeader } from "@/components/layout/UtilityHeader";
import { ComplianceFooter } from "@/components/layout/ComplianceFooter";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { AttributionBootstrap } from "@/components/consent/AttributionBootstrap";
import { rootGraph } from "@/lib/schema/graph";
import { site } from "@/lib/env";
import { geistSans } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} | Concrete Contractor Quotes in Lancaster, SC`,
    template: `%s`,
  },
  description:
    "Local concrete service for Lancaster, South Carolina homeowners: driveways, patios, slabs, and repair, done by independent local concrete specialists.",
  icons: { icon: "/favicon.webp", apple: "/apple-icon.webp" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  /* Matches the header glass at rest in each scheme, so the browser chrome on
     mobile continues the bar instead of cutting a colored strip above it. */
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f4f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1117" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US" className={geistSans.variable}>
      <body className="pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-0">
        <JsonLd data={{ "@context": "https://schema.org", "@graph": rootGraph() }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-[12px] focus:bg-[color:var(--color-surface)] focus:px-4 focus:py-3"
        >
          Skip to content
        </a>
        <UtilityHeader />
        <main id="main">{children}</main>
        <ComplianceFooter />
        <MobileCallBar />
        <AttributionBootstrap />
        <ConsentBanner />
      </body>
    </html>
  );
}
