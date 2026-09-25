import type { Metadata, Viewport } from "next";
import { UtilityHeader } from "@/components/layout/UtilityHeader";
import { ComplianceFooter } from "@/components/layout/ComplianceFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import { rootGraph } from "@/lib/schema/graph";
import { site } from "@/lib/env";
import { geistSans } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} | Concrete Contractor Referrals in Lancaster, SC`,
    template: `%s`,
  },
  description:
    "Referral service connecting Lancaster, South Carolina homeowners with independent concrete contractors for driveways, patios, slabs, and repair.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1f6b4e",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US" className={geistSans.variable}>
      <body>
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
      </body>
    </html>
  );
}
