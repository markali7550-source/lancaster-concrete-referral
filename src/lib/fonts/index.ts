import localFont from "next/font/local";

/**
 * Geist Sans, self hosted (spec 1.2).
 *
 * One variable woff2 subset to latin, so a single 25 KB request covers every
 * weight the site uses (400 to 800) instead of one file per weight. Nothing is
 * fetched from Google Fonts or any third party CDN at build time or runtime.
 *
 * `adjustFontFallback` generates a metric matched Arial fallback, so the swap
 * from fallback to Geist does not move text and the page scores no layout
 * shift from font loading.
 */
export const geistSans = localFont({
  src: "./GeistSans-Variable-latin.woff2",
  weight: "400 800",
  style: "normal",
  display: "swap",
  preload: true,
  adjustFontFallback: "Arial",
  variable: "--font-geist-sans",
});
