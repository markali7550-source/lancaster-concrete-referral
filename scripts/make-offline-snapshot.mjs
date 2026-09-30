/**
 * Builds a fully self-contained, navigable offline copy of the site.
 * CSS, fonts, and images are inlined as data URIs and internal links are
 * rewritten to sibling .html files, so the whole thing browses with zero
 * network access (the workspace viewer sandboxes iframes without network).
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const ORIGIN = "http://localhost:3000";
const ROOT = process.cwd();
const OUT_DIR = join(ROOT, "../preview");

/** Every published route, mapped to its offline filename. */
const ROUTES = [
  ["/", "index.html"],
  ["/services", "services.html"],
  ["/services/concrete-driveways", "services-concrete-driveways.html"],
  ["/services/concrete-patios", "services-concrete-patios.html"],
  ["/services/concrete-slabs", "services-concrete-slabs.html"],
  ["/services/concrete-repair", "services-concrete-repair.html"],
  ["/locations", "locations.html"],
  ["/locations/lancaster-sc", "locations-lancaster-sc.html"],
  [
    "/locations/lancaster-sc/concrete-driveways",
    "locations-lancaster-sc-concrete-driveways.html",
  ],
  ["/how-it-works", "how-it-works.html"],
  ["/contact", "contact.html"],
  ["/privacy", "privacy.html"],
  ["/terms", "terms.html"],
  ["/referral-disclosure", "referral-disclosure.html"],
  ["/thank-you", "thank-you.html"],
];

const ROUTE_MAP = new Map(ROUTES);

const MIME = {
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};

const assetCache = new Map();

function extOf(path) {
  const match = /\.[a-z0-9]+$/i.exec(path);
  return match ? match[0].toLowerCase() : "";
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.text();
}

async function assetToDataUri(assetPath) {
  if (assetCache.has(assetPath)) return assetCache.get(assetPath);
  const clean = assetPath.split("?")[0];
  const candidates = [
    join(ROOT, "public", clean),
    join(ROOT, ".next", clean.replace(/^\/_next\//, "")),
    join(ROOT, ".next/static", clean.replace(/^\/_next\/static\//, "")),
  ];
  let result = null;
  for (const candidate of candidates) {
    try {
      const buffer = await readFile(candidate);
      result = `data:${MIME[extOf(clean)] ?? "application/octet-stream"};base64,${buffer.toString("base64")}`;
      break;
    } catch {
      /* next candidate */
    }
  }
  if (!result) {
    try {
      const response = await fetch(`${ORIGIN}${assetPath}`);
      if (response.ok) {
        const buffer = Buffer.from(await response.arrayBuffer());
        const mime =
          response.headers.get("content-type") ??
          MIME[extOf(clean)] ??
          "application/octet-stream";
        result = `data:${mime};base64,${buffer.toString("base64")}`;
      }
    } catch {
      /* unreachable asset */
    }
  }
  assetCache.set(assetPath, result);
  return result;
}

async function inlineCss(css) {
  let output = css;
  for (const [full, rawPath] of [...css.matchAll(/url\(([^)]+)\)/g)]) {
    const path = rawPath.replace(/["']/g, "").trim();
    if (!path.startsWith("/")) continue;
    const dataUri = await assetToDataUri(path);
    if (dataUri) output = output.replace(full, `url(${dataUri})`);
  }
  return output;
}

function rewriteLinks(html) {
  return html.replace(/href="(\/[^"#]*)(#[^"]*)?"/g, (match, path, hash) => {
    const normalised = path.length > 1 ? path.replace(/\/$/, "") : "/";
    const target = ROUTE_MAP.get(normalised);
    if (!target) return match; // sitemap.xml, robots.txt, gated routes: leave alone
    return `href="${target}${hash ?? ""}"`;
  });
}

async function snapshot(route, fileName) {
  let html = await fetchText(`${ORIGIN}${route}`);

  // 1. Inline stylesheets (and the fonts they reference).
  for (const [tag] of html.matchAll(/<link[^>]+rel="stylesheet"[^>]*>/g)) {
    const href = /href="([^"]+)"/.exec(tag)?.[1];
    if (!href) continue;
    html = html.replace(tag, `<style>${await inlineCss(await fetchText(`${ORIGIN}${href}`))}</style>`);
  }

  // 2. Strip scripts and preloads — this is a static visual copy.
  html = html.replace(/<script[\s\S]*?<\/script>/g, "");
  html = html.replace(/<link[^>]+rel="preload"[^>]*>/gi, "");

  // 3. Remove responsive srcset in BOTH casings (React emits `srcSet`),
  //    otherwise the browser prefers the network URL over the inlined src.
  html = html.replace(/\ssrcset="[^"]*"/gi, "");

  // 4. Inline every image source.
  const sources = new Map();
  for (const [, src] of html.matchAll(/src="(\/[^"]+)"/g)) {
    if (sources.has(src)) continue;
    const decoded = src.startsWith("/_next/image")
      ? decodeURIComponent(/url=([^&]+)/.exec(src)?.[1] ?? "")
      : src;
    const dataUri = await assetToDataUri(decoded || src);
    if (dataUri) sources.set(src, dataUri);
  }
  for (const [src, dataUri] of sources) {
    html = html.split(`src="${src}"`).join(`src="${dataUri}"`);
  }

  // 5. Images below the fold are lazy — force them to paint in the viewer.
  html = html.replace(/\sloading="lazy"/g, "");

  // 6. Make internal navigation work between the snapshot files.
  html = rewriteLinks(html);

  await writeFile(join(OUT_DIR, fileName), html, "utf8");

  const leftovers = (html.match(/src="\/(?!\/)/g) ?? []).length;
  const srcsets = (html.match(/srcset=/gi) ?? []).length;
  const images = (html.match(/src="data:image/g) ?? []).length;
  console.log(
    `${fileName.padEnd(46)} ${(Buffer.byteLength(html) / 1024 / 1024).toFixed(2)} MB  images:${images}  unresolved:${leftovers}  srcset:${srcsets}`,
  );
}

await mkdir(OUT_DIR, { recursive: true });
for (const [route, fileName] of ROUTES) {
  await snapshot(route, fileName);
}
console.log(`\nOffline copy written to ${OUT_DIR}`);
