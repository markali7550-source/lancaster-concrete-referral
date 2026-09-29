/**
 * Full-site page test: crawls every published route plus the gated ones that
 * must 404, and asserts the SEO, schema, accessibility and linking rules from
 * the spec (gates 1-7, 13, 14 partial, 23, 24).
 */
const ORIGIN = "http://localhost:3000";
const SITE = "https://example-referral-brand.com";

const PUBLISHED = [
  "/",
  "/services",
  "/services/concrete-driveways",
  "/services/concrete-patios",
  "/services/concrete-slabs",
  "/services/concrete-repair",
  "/locations/lancaster-sc",
  "/locations/lancaster-sc/concrete-driveways",
  "/locations/lancaster-sc/concrete-patios",
  "/locations/lancaster-sc/concrete-slabs",
  "/locations/lancaster-sc/concrete-repair",
  "/how-it-works",
  "/contact",
  "/privacy",
  "/terms",
  "/referral-disclosure",
];

const NOINDEX_OK = ["/locations", "/thank-you"];

const MUST_404 = [
  "/locations/indian-land-sc",
  "/locations/indian-land-sc/concrete-driveways",
  "/locations/elgin-sc",
  "/locations/charlotte-nc",
  "/locations/rock-hill-sc",
  "/locations/fort-mill-sc",
  "/services/foundation-repair",
  "/nonsense-route",
];

const FORBIDDEN_SCHEMA = [
  "GeneralContractor",
  "LocalBusiness",
  "HomeAndConstructionBusiness",
  "aggregateRating",
  '"review"',
  '"address"',
  "priceRange",
];

const results = [];
const problems = [];
const allInternalLinks = new Set();

function record(route, checks) {
  results.push({ route, ...checks });
  for (const [name, value] of Object.entries(checks)) {
    if (value === "FAIL" || (typeof value === "string" && value.startsWith("FAIL"))) {
      problems.push(`${route}: ${name} ${value}`);
    }
  }
}

async function testPage(route, { expectNoindex = false } = {}) {
  const response = await fetch(`${ORIGIN}${route}`);
  const html = await response.text();

  const title = /<title>([^<]*)<\/title>/.exec(html)?.[1] ?? "";
  const canonical = /<link rel="canonical" href="([^"]+)"/.exec(html)?.[1] ?? "";
  const description = /<meta name="description" content="([^"]*)"/.exec(html)?.[1] ?? "";
  const robots = /<meta name="robots" content="([^"]*)"/.exec(html)?.[1] ?? "";
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  const imgsNoAlt = imgs.filter((tag) => !/\balt=/.test(tag));
  const langAttr = /<html[^>]+lang="([^"]+)"/.exec(html)?.[1] ?? "";

  // JSON-LD
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  let schemaOk = blocks.length > 0;
  const types = new Set();
  for (const [, raw] of blocks) {
    try {
      const json = JSON.parse(raw.replaceAll("\\u003c", "<"));
      for (const node of json["@graph"] ?? [json]) {
        const t = node["@type"];
        (Array.isArray(t) ? t : [t]).forEach((x) => x && types.add(x));
      }
    } catch {
      schemaOk = false;
    }
  }
  const forbidden = FORBIDDEN_SCHEMA.filter((term) =>
    blocks.some(([, raw]) => raw.includes(term)),
  );

  // Internal links
  for (const [, href] of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    allInternalLinks.add(href);
  }

  // Disclosure presence (gate 24)
  const hasDisclosure = html.includes("not a concrete contractor");

  const expectedCanonical = `${SITE}${route === "/" ? "" : route}`;

  record(route, {
    status: response.status === 200 ? 200 : `FAIL ${response.status}`,
    title: title.length > 10 && title.length <= 75 ? `${title.length}ch` : `FAIL ${title.length}ch`,
    desc: description.length > 50 && description.length <= 185 ? `${description.length}ch` : `FAIL ${description.length}ch`,
    canonical: canonical === expectedCanonical ? "self" : `FAIL ${canonical || "missing"}`,
    robots: expectNoindex
      ? /noindex/.test(robots) ? "noindex" : "FAIL indexable"
      : /noindex/.test(robots) ? "FAIL noindex" : "index",
    h1: h1s.length === 1 ? "1" : `FAIL ${h1s.length}`,
    lang: langAttr === "en-US" ? "en-US" : `FAIL ${langAttr}`,
    jsonld: schemaOk ? `${types.size} types` : "FAIL parse",
    schemaClean: forbidden.length === 0 ? "clean" : `FAIL ${forbidden.join(",")}`,
    imgAlt: imgsNoAlt.length === 0 ? `${imgs.length} ok` : `FAIL ${imgsNoAlt.length} missing`,
    disclosure: hasDisclosure ? "present" : "FAIL missing",
  });
}

console.log("=== PUBLISHED PAGES ===\n");
for (const route of PUBLISHED) await testPage(route);
for (const route of NOINDEX_OK) await testPage(route, { expectNoindex: true });

const cols = ["status", "title", "desc", "canonical", "robots", "h1", "jsonld", "schemaClean", "imgAlt", "disclosure"];
const width = Math.max(...results.map((r) => r.route.length)) + 2;
console.log("ROUTE".padEnd(width) + cols.map((c) => c.padEnd(13)).join(""));
for (const row of results) {
  console.log(row.route.padEnd(width) + cols.map((c) => String(row[c]).padEnd(13)).join(""));
}

console.log("\n=== GATED / EXCLUDED ROUTES (must be 404) ===\n");
let gateFails = 0;
for (const route of MUST_404) {
  const response = await fetch(`${ORIGIN}${route}`);
  const ok = response.status === 404;
  if (!ok) gateFails += 1;
  console.log(`${ok ? "PASS" : "FAIL"}  ${String(response.status).padEnd(4)} ${route}`);
}

console.log("\n=== INTERNAL LINK CRAWL ===\n");
let linkFails = 0;
const sorted = [...allInternalLinks].sort();
for (const href of sorted) {
  const response = await fetch(`${ORIGIN}${href}`, { redirect: "manual" });
  const ok = response.status === 200 || (response.status >= 300 && response.status < 400);
  if (!ok) {
    linkFails += 1;
    console.log(`FAIL  ${response.status}  ${href}`);
  }
}
console.log(`${sorted.length} unique internal links, ${linkFails} broken`);

console.log("\n=== SITEMAP ===\n");
const sitemapXml = await (await fetch(`${ORIGIN}/sitemap.xml`)).text();
const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const expected = PUBLISHED.map((p) => `${SITE}${p === "/" ? "" : p}`);
const missing = expected.filter((u) => !sitemapUrls.includes(u));
const extra = sitemapUrls.filter((u) => !expected.includes(u));
console.log(`entries: ${sitemapUrls.length}`);
console.log(`missing published URLs: ${missing.length ? missing.join(", ") : "none"}`);
console.log(`unexpected URLs:        ${extra.length ? extra.join(", ") : "none"}`);
const noindexLeak = sitemapUrls.filter((u) => NOINDEX_OK.some((n) => u.endsWith(n)));
console.log(`noindex pages leaked:   ${noindexLeak.length ? noindexLeak.join(", ") : "none"}`);

console.log("\n=== SUMMARY ===\n");
console.log(`page checks failed:   ${problems.length}`);
console.log(`gated routes failed:  ${gateFails}`);
console.log(`broken links:         ${linkFails}`);
console.log(`sitemap problems:     ${missing.length + extra.length + noindexLeak.length}`);
if (problems.length) {
  console.log("\nDetails:");
  for (const problem of problems) console.log(`  - ${problem}`);
}
const total = problems.length + gateFails + linkFails + missing.length + extra.length + noindexLeak.length;
console.log(`\n${total === 0 ? "ALL PAGE TESTS PASSED" : `${total} PROBLEM(S) FOUND`}`);
