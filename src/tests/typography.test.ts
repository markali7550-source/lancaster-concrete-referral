import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Typography guard (locked by explicit client instruction).
 *
 * The site's one and only typeface is Geist Sans, self hosted. These tests
 * exist so that any future change which swaps the font, adds a second primary
 * font, or quietly breaks font loading fails CI instead of shipping.
 *
 * Read the files as text rather than importing them: `next/font/local` is a
 * build time macro and cannot be evaluated inside vitest.
 */

const root = resolve(__dirname, "../..");
const read = (p: string) => readFileSync(resolve(root, p), "utf8");

const fontModule = read("src/lib/fonts/index.ts");
const globalsCss = read("src/app/globals.css");
const rootLayout = read("src/app/layout.tsx");

describe("typography: Geist Sans is the locked site font", () => {
  it("self hosts the Geist Sans variable woff2 and nothing else", () => {
    expect(fontModule).toContain('src: "./GeistSans-Variable-latin.woff2"');
    expect(existsSync(resolve(root, "src/lib/fonts/GeistSans-Variable-latin.woff2"))).toBe(true);
  });

  it("exposes Geist Sans through the --font-geist-sans CSS variable", () => {
    expect(fontModule).toContain('variable: "--font-geist-sans"');
    expect(rootLayout).toContain("geistSans.variable");
  });

  it("keeps the full 400 to 800 weight range the design hierarchy relies on", () => {
    expect(fontModule).toContain('weight: "400 800"');
  });

  it("keeps font loading behaviour intact (preloaded, swap, no layout shift)", () => {
    expect(fontModule).toContain("display: \"swap\"");
    expect(fontModule).toContain("preload: true");
    // Metric matched fallback. This is NOT a replacement typeface: it only
    // supplies size-adjust / ascent-override metrics so text does not move
    // when Geist swaps in. Removing it reintroduces font driven CLS.
    expect(fontModule).toContain("adjustFontFallback");
  });

  it("routes every CSS font token back to Geist Sans", () => {
    for (const token of ["--font-sans", "--font-mono", "--font-serif"]) {
      const line = globalsCss
        .split("\n")
        .find((l) => l.trim().startsWith(`${token}:`));
      expect(line, `${token} must be declared`).toBeDefined();
      expect(line).toContain("var(--font-geist-sans)");
    }
    expect(globalsCss).toContain("font-family: var(--font-sans)");
  });

  it("declares no competing primary font anywhere in the app source", () => {
    const banned = /\b(Inter|Roboto|Poppins|Montserrat|Lato|Open\s+Sans|Helvetica|Nunito|Raleway|Source\s+Sans)\b/;
    const files = [fontModule, globalsCss, rootLayout];
    for (const contents of files) {
      expect(contents).not.toMatch(banned);
    }
  });

  it("loads exactly one font family via next/font", () => {
    const matches = fontModule.match(/localFont\(|Google_Font|next\/font\/google/g) ?? [];
    expect(matches).toHaveLength(1);
    expect(fontModule).not.toContain("next/font/google");
  });
});
