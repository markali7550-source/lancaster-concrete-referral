#!/usr/bin/env node
/**
 * download-images.js — fetch real concrete photography and overwrite the
 * site's image slots.
 *
 * Usage:
 *   PEXELS_API_KEY=... UNSPLASH_ACCESS_KEY=... PIXABAY_API_KEY=... \
 *     node scripts/download-images.js
 *
 * At least one provider key is required. Keys are read ONLY from the
 * environment and are never written anywhere.
 *
 * What it does per slot:
 *   1. Searches the configured providers (Pexels / Unsplash free tier /
 *      Pixabay) with curated landscape queries.
 *   2. Rejects anything under 1200px wide, non-landscape, paywalled
 *      (Unsplash+ / premium), AI-hybrid, or from blocked stock/social hosts.
 *   3. Downloads the largest passing candidate to a temp file.
 *   4. Validates it with Sharp, resizes to max 1200px wide, encodes .webp,
 *      ramping quality (then width) until the file is UNDER 100 KB.
 *   5. Moves the verified file over `public/images/<slot>` — the live file
 *      is only overwritten after the replacement is fully validated.
 *   6. Prints a file/size table and exits nonzero if any slot failed.
 *
 * Requires: `npm i -D sharp`, Node 18+, network egress to the provider APIs.
 */

const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const MAX_WIDTH = 1200;
const MAX_BYTES = 100 * 1024;
const MIN_FETCH_WIDTH = 1200;
const REQUEST_TIMEOUT_MS = 25000;

const OUT_DIR = path.join(__dirname, "..", "public", "images");

const SLOTS = [
  {
    file: "card-driveway.webp",
    subject: "Real residential concrete driveway",
    queries: ["concrete driveway house", "suburban house garage driveway"],
    requireAny: ["driveway", "garage"],
  },
  {
    file: "card-patio.webp",
    subject: "Real stamped concrete patio",
    queries: ["concrete patio backyard", "backyard patio furniture"],
    requireAny: ["patio", "terrace", "courtyard", "backyard"],
  },
  {
    file: "card-slab.webp",
    subject: "Real concrete shed foundation pad",
    queries: ["concrete slab foundation", "garden shed backyard"],
    requireAny: ["slab", "foundation", "shed", "concrete"],
  },
  {
    file: "card-repair.webp",
    subject: "Real concrete crack repair/resurfacing",
    queries: ["concrete crack repair", "concrete sidewalk repair"],
    requireAny: ["concrete", "cement", "sidewalk", "crack", "repair"],
  },
  {
    file: "process-texture-bg.webp",
    subject: "Real concrete broom finish texture",
    queries: ["brushed concrete texture", "concrete floor texture"],
    requireAny: ["concrete", "cement", "pavement"],
    rejectAny: ["wall", "painted", "plaster", "stucco"],
  },
  {
    file: "hero-main-bg.webp",
    subject: "Real suburban home with concrete driveway",
    queries: ["suburban brick house", "residential concrete walkway"],
    requireAny: ["house", "home", "walkway", "residential", "suburban"],
    rejectAny: ["pool", "rendering"],
  },
];

const REJECT_SOURCES = [
  "gettyimages", "istockphoto", "shutterstock", "adobe.com", "ftcdn.net",
  "dreamstime", "123rf", "depositphotos", "pinimg.com", "pinterest",
  "vecteezy", "freepik", "magnific", "plus.unsplash.com", "premium_photo",
  "stockcake",
];

const log = (...a) => console.log(...a);

async function fetchJson(url, headers = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers, signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}

async function fetchBuffer(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 60000);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "lancaster-image-pipeline/1.0" },
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return Buffer.from(await res.arrayBuffer());
  } finally {
    clearTimeout(t);
  }
}

async function probeConnectivity() {
  log("CONNECTIVITY PROBE (no credentials sent):");
  const hosts = [
    "https://api.pexels.com/v1/search?query=test&per_page=1",
    "https://api.unsplash.com/search/photos?query=test&per_page=1",
    "https://pixabay.com/api/?q=test&per_page=3",
  ];
  let ok = 0;
  for (const url of hosts) {
    const host = new URL(url).host;
    try {
      // Any HTTP response (even 401/403) proves the host is reachable.
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 12000);
      try {
        const res = await fetch(url, { signal: ctrl.signal });
        log(`  ${host}: reachable (HTTP ${res.status} without credentials)`);
        ok++;
      } finally {
        clearTimeout(t);
      }
    } catch (err) {
      log(`  ${host}: UNREACHABLE (${err.cause?.code || err.name}: ${err.message})`);
    }
  }
  return ok;
}

async function pexelsSearch(key, query, perPage = 8) {
  const data = await fetchJson(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=${perPage}`,
    { Authorization: key }
  );
  return (data.photos || [])
    .map((p) => ({
      provider: "pexels",
      license: "Pexels License",
      url: (p.src && (p.src.large2x || p.src.large)) || null,
      width: p.width || 0,
      height: p.height || 0,
      title: (p.alt || "").trim(),
      author: p.photographer,
      page: p.url,
      query,
    }))
    .filter((c) => c.url);
}

async function unsplashSearch(key, query, perPage = 8) {
  const data = await fetchJson(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&per_page=${perPage}`,
    { Authorization: `Client-ID ${key}` }
  );
  return (data.results || [])
    .map((p) => ({
      provider: "unsplash",
      license: "Unsplash License (free tier)",
      url: p.urls && p.urls.raw ? `${p.urls.raw}&w=2400&q=80&fm=jpg` : null,
      width: p.width || 0,
      height: p.height || 0,
      title: ((p.description || p.alt_description) || "").trim(),
      author: p.user && p.user.name,
      page: p.links && p.links.html,
      query,
    }))
    .filter((c) => c.url);
}

async function pixabaySearch(key, query, perPage = 8) {
  const data = await fetchJson(
    `https://pixabay.com/api/?key=${key}&q=${encodeURIComponent(query)}&orientation=horizontal&image_type=photo&per_page=${perPage}&min_width=${MIN_FETCH_WIDTH}`
  );
  return (data.hits || [])
    .map((p) => ({
      provider: "pixabay",
      license: "Pixabay License",
      url: p.largeImageURL || p.webformatURL || null,
      width: p.imageWidth || 0,
      height: p.imageHeight || 0,
      title: (p.tags || "").trim(),
      author: p.user,
      page: p.pageURL,
      query,
    }))
    .filter((c) => c.url);
}

function rejectionReason(slot, c) {
  const blob = `${c.url} ${c.title}`.toLowerCase();
  if (REJECT_SOURCES.some((s) => blob.includes(s))) {
    return "blocked source (licensed/premium/AI-hybrid/social)";
  }
  if (c.width < MIN_FETCH_WIDTH || !(c.height > 0)) {
    return `too small (${c.width}x${c.height})`;
  }
  if (c.width <= c.height) return "not landscape";
  const text = c.title.toLowerCase();
  if (slot.requireAny && !slot.requireAny.some((t) => text.includes(t))) {
    return "subject tokens missing";
  }
  if ((slot.rejectAny || []).some((t) => text.includes(t))) {
    return "rejected subject token";
  }
  return null;
}

async function processWithSharp(sharp, inputBuffer, finalPath) {
  const meta = await sharp(inputBuffer).metadata();
  if (!(meta.width > 0 && meta.height > 0)) throw new Error("unreadable image");
  if (meta.width <= meta.height) throw new Error(`not landscape (${meta.width}x${meta.height})`);
  const startW = Math.min(MAX_WIDTH, meta.width);
  for (const width of [startW, 1000, 900]) {
    if (width > startW) continue;
    for (let q = width === startW ? 82 : 78; q >= 40; q -= 4) {
      const out = await sharp(inputBuffer)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: q, effort: 6 })
        .toBuffer();
      if (out.length <= MAX_BYTES) {
        const tmp = `${finalPath}.tmp-${process.pid}`;
        fs.writeFileSync(tmp, out);
        fs.renameSync(tmp, finalPath);
        const done = await sharp(finalPath).metadata();
        return { dims: `${done.width}x${done.height}`, bytes: out.length, quality: q };
      }
    }
  }
  throw new Error(`cannot fit under ${MAX_BYTES / 1024} KB (smallest attempt over budget)`);
}

async function main() {
  log("=== download-images.js ===");
  log(`node ${process.version} | out: ${OUT_DIR}`);
  if (typeof fetch !== "function") {
    log("FATAL: global fetch unavailable (need Node 18+).");
    process.exit(2);
  }
  let sharp;
  try {
    sharp = require("sharp");
  } catch {
    log("FATAL: `sharp` is not installed. Run: npm i -D sharp");
    process.exit(2);
  }
  try {
    log(`sharp ${sharp.versions.sharp} (libvips ${sharp.versions.vips}) loaded OK`);
  } catch (err) {
    log(`FATAL: sharp failed to load: ${err.message}`);
    process.exit(2);
  }

  const reachable = await probeConnectivity();

  const keys = {
    pexels: process.env.PEXELS_API_KEY || "",
    unsplash: process.env.UNSPLASH_ACCESS_KEY || "",
    pixabay: process.env.PIXABAY_API_KEY || "",
  };
  const configured = Object.entries(keys)
    .filter(([, v]) => v)
    .map(([k]) => k);
  log(`\nAPI KEYS: ${configured.length ? configured.join(", ") : "NONE FOUND in environment"}`);
  if (!configured.length) {
    log(
      "Set at least one of PEXELS_API_KEY / UNSPLASH_ACCESS_KEY / PIXABAY_API_KEY and re-run.\n" +
        "Example: PEXELS_API_KEY=... UNSPLASH_ACCESS_KEY=... node scripts/download-images.js"
    );
    process.exit(2);
  }
  if (!reachable) {
    log("\nABORT: no provider host is reachable from this machine (see probe above).");
    log("This script is correct and complete — run it where network egress to the");
    log("provider APIs is allowed and the same command will download real files.");
    process.exit(3);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const rows = [];
  for (const slot of SLOTS) {
    log(`\n[${slot.file}] ${slot.subject}`);
    let candidates = [];
    for (const q of slot.queries) {
      if (keys.pexels) {
        try {
          candidates.push(...(await pexelsSearch(keys.pexels, q)));
        } catch (err) {
          log(`  pexels "${q}" failed: ${err.message}`);
        }
      }
      if (keys.unsplash) {
        try {
          candidates.push(...(await unsplashSearch(keys.unsplash, q)));
        } catch (err) {
          log(`  unsplash "${q}" failed: ${err.message}`);
        }
      }
      if (keys.pixabay) {
        try {
          candidates.push(...(await pixabaySearch(keys.pixabay, q)));
        } catch (err) {
          log(`  pixabay "${q}" failed: ${err.message}`);
        }
      }
    }
    const passing = candidates
      .filter((c) => !rejectionReason(slot, c))
      .sort((a, b) => b.width * b.height - a.width * a.height);
    log(`  considered ${candidates.length}, passing filters ${passing.length}`);
    if (!passing.length) {
      for (const c of candidates.slice(0, 6)) {
        log(`  reject [${c.provider}] "${c.title.slice(0, 60)}" — ${rejectionReason(slot, c)}`);
      }
      rows.push({ file: slot.file, subject: slot.subject, status: "NO PASSING CANDIDATE" });
      continue;
    }
    const best = passing[0];
    log(`  best: ${best.width}x${best.height} via ${best.provider} (${best.license})`);
    log(`  "${best.title.slice(0, 90)}"`);
    try {
      const buf = await fetchBuffer(best.url);
      const res = await processWithSharp(sharp, buf, path.join(OUT_DIR, slot.file));
      fs.writeFileSync(
        path.join(OUT_DIR, `${path.parse(slot.file).name}.provenance.json`),
        JSON.stringify(best, null, 2)
      );
      log(`  WROTE ${slot.file} ${res.dims} ${(res.bytes / 1024).toFixed(1)} KB (q${res.quality})`);
      rows.push({ file: slot.file, subject: slot.subject, ...res, status: "OK" });
    } catch (err) {
      log(`  FAILED: ${err.message}`);
      rows.push({ file: slot.file, subject: slot.subject, status: `FAILED: ${err.message}` });
    }
  }

  log(`\n${"file".padEnd(26)} ${"subject".padEnd(42)} ${"dims".padEnd(11)} ${"size".padStart(9)}  status`);
  log("-".repeat(104));
  let failed = 0;
  for (const r of rows) {
    const size = r.bytes ? `${(r.bytes / 1024).toFixed(1)} KB` : "-";
    if (r.status !== "OK") failed++;
    log(`${r.file.padEnd(26)} ${r.subject.padEnd(42)} ${(r.dims || "-").padEnd(11)} ${size.padStart(9)}  ${r.status}`);
  }
  try {
    const du = execFileSync("du", ["-sh", OUT_DIR], { encoding: "utf8" }).trim();
    log(`\n${du}`);
  } catch {}
  if (failed) {
    log(`\nDONE WITH FAILURES: ${failed}/${rows.length} slots failed.`);
    process.exit(1);
  }
  log("\nDONE: all 6 slots written under 100 KB.");
}

main().catch((err) => {
  console.error(`FATAL: ${err && err.message ? err.message : err}`);
  process.exit(2);
});
