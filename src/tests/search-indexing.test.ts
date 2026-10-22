import { afterEach, describe, expect, it, vi } from "vitest";

/**
 * Indexing is off unless ALLOW_SEARCH_INDEXING is exactly "true". The flag is
 * read at module load, so each case resets modules and re-imports.
 */
async function load(value: string | undefined) {
  vi.resetModules();
  if (value === undefined) vi.stubEnv("ALLOW_SEARCH_INDEXING", "");
  else vi.stubEnv("ALLOW_SEARCH_INDEXING", value);
  // Empty string is treated as unset by the flag comparison.
  const indexing = await import("@/lib/env/indexing");
  const robots = (await import("@/app/robots")).default;
  const sitemap = (await import("@/app/sitemap")).default;
  const seo = await import("@/lib/seo/metadata");
  return { indexing, robots, sitemap, seo };
}

describe("search indexing is disabled by default", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it.each([undefined, "false", "1", "TRUE", "yes"])(
    "ALLOW_SEARCH_INDEXING=%s keeps indexing off",
    async (value) => {
      const { indexing, robots, sitemap, seo } = await load(value);
      expect(indexing.SEARCH_INDEXING_ENABLED).toBe(false);
      expect(seo.DEFAULT_NOINDEX).toBe(true);
      expect(robots()).toEqual({ rules: [{ userAgent: "*", disallow: "/" }] });
      expect(robots()).not.toHaveProperty("sitemap");
      expect(sitemap()).toEqual([]);
      expect(seo.pageMetadata({ title: "t", description: "d", path: "/" }).robots).toMatchObject({
        index: false,
      });
    },
  );

  it("ALLOW_SEARCH_INDEXING=true enables indexing, robots, and sitemap", async () => {
    const { indexing, robots, sitemap, seo } = await load("true");
    expect(indexing.SEARCH_INDEXING_ENABLED).toBe(true);
    expect(seo.DEFAULT_NOINDEX).toBe(false);
    expect(robots()).toHaveProperty("sitemap");
    expect(robots().rules).toEqual([{ userAgent: "*", allow: "/", disallow: ["/api/"] }]);
    expect(sitemap().length).toBeGreaterThan(0);
  });
});
