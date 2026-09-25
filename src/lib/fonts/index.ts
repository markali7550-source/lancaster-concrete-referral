import { Geist } from "next/font/google";

/** Self-hosted, subset, limited weights (spec 1.2). */
export const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist-sans",
});
