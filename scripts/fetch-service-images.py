#!/usr/bin/env python3
"""Fetch + optimize service photography for the Lancaster Concrete referral site.

Two modes (one pipeline, two entry points):

  1. FETCH    (--fetch)    Query Pexels / Unsplash / Pixabay for each image slot,
                           download the best free-licensed landscape candidate
                           per slot into a staging directory with a provenance
                           sidecar. NEEDS NETWORK + API KEYS (env, never args).
  2. OPTIMIZE (--optimize) Resize staged originals to max 1200px wide, encode
                           .webp under 100 KB via a quality ramp, write final
                           files + a size report. Runs offline (ImageMagick or PIL).

  python3 scripts/fetch-service-images.py --all            # fetch then optimize
  python3 scripts/fetch-service-images.py --fetch          # fetch only
  python3 scripts/fetch-service-images.py --optimize-only ./staging
  python3 scripts/fetch-service-images.py --optimize-only ./staging --out ./public/images

Keys are read ONLY from the environment: PEXELS_API_KEY, UNSPLASH_ACCESS_KEY,
PIXABAY_API_KEY. At least one is required for --fetch. Nothing is ever written
to disk except images + provenance JSON.

Slot rules (from the site's image policy):
  - Real photography only. No AI-generated imagery, no 3D renders.
  - Free-licensed sources only: Pexels License, Unsplash License (free tier --
    plus.unsplash.com / Unsplash+ results are rejected), Pixabay License.
  - Landscape orientation, >= 1200px wide at fetch time. Anything smaller is
    rejected: card images render ~550px CSS wide and heroes up to 1440px, so a
    500px source would ship soft.
  - Every kept image MUST be inspected by a human at full size before wiring.
    This script ranks candidates; it does not approve them.

Requires for --optimize: ImageMagick (`convert`) and/or Python PIL.
Requires for --fetch: `requests` (pip install requests).
"""

from __future__ import annotations

import argparse
import json
import os
import shutil
import subprocess
import sys
import urllib.request
from dataclasses import dataclass, field
from pathlib import Path

MAX_WIDTH = 1200
MAX_BYTES = 100 * 1024
TARGET_MIN_BYTES = 35 * 1024
MIN_FETCH_WIDTH = 1200

# ---------------------------------------------------------------- slots

@dataclass(frozen=True)
class Slot:
    filename: str
    service: str
    queries: list[str]
    # Extra must-have / must-not-have tokens matched against title+alt text.
    require_any: list[str] = field(default_factory=list)
    reject_any: list[str] = field(default_factory=list)


SLOTS: list[Slot] = [
    Slot(
        "card-driveway.webp",
        "Concrete Driveways",
        ["concrete driveway house", "suburban house garage driveway",
         "residential concrete driveway"],
        require_any=["driveway", "garage"],
    ),
    Slot(
        "card-patio.webp",
        "Concrete Patios",
        ["concrete patio backyard", "backyard patio furniture",
         "stamped concrete patio"],
        require_any=["patio", "terrace", "courtyard", "backyard"],
    ),
    Slot(
        "card-slab.webp",
        "Concrete Slabs",
        ["concrete slab foundation", "garden shed backyard",
         "concrete foundation construction"],
        require_any=["slab", "foundation", "shed", "concrete"],
    ),
    Slot(
        "card-repair.webp",
        "Concrete Repair",
        ["concrete sidewalk repair", "concrete crack repair",
         "concrete resurfacing trowel"],
        require_any=["concrete", "cement", "sidewalk", "crack", "repair"],
    ),
    Slot(
        "process-texture-bg.webp",
        "Process band background (decorative)",
        ["brushed concrete texture", "broom finished concrete",
         "concrete floor texture"],
        require_any=["concrete", "cement", "pavement"],
        reject_any=["wall", "painted", "plaster", "stucco"],
    ),
    Slot(
        "hero-main-bg.webp",
        "Homepage hero (service-neutral)",
        ["suburban brick house", "residential concrete walkway",
         "suburban home exterior"],
        require_any=["house", "home", "walkway", "residential", "suburban"],
        reject_any=["pool", "rendering", "3d"],
    ),
]

REJECT_SOURCES = (
    "gettyimages", "istockphoto", " shutterstock", "shutterstock_",
    "adobe.com", "ftcdn.net", "dreamstime", "123rf", "depositphotos",
    "pinimg.com", "pinterest", "vecteezy", "freepik", "magnific",
    "plus.unsplash.com", "premium_photo", "stockcake",
)

# ---------------------------------------------------------------- fetch

def _get_json(url: str, headers: dict[str, str] | None = None) -> dict:
    req = urllib.request.Request(url, headers=headers or {})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode("utf-8"))


def _download(url: str, dest: Path) -> None:
    req = urllib.request.Request(url, headers={"User-Agent": "lancaster-image-pipeline/1.0"})
    with urllib.request.urlopen(req, timeout=60) as resp, open(dest, "wb") as fh:
        shutil.copyfileobj(resp, fh)


def pexels_search(api_key: str, query: str, per_page: int = 8) -> list[dict]:
    from urllib.parse import quote_plus
    data = _get_json(
        f"https://api.pexels.com/v1/search?query={quote_plus(query)}"
        f"&orientation=landscape&per_page={per_page}",
        {"Authorization": api_key},
    )
    out = []
    for p in data.get("photos", []):
        src = p.get("src", {}).get("large2x") or p.get("src", {}).get("large")
        if not src:
            continue
        out.append({
            "provider": "pexels", "license": "Pexels License",
            "url": src, "width": p.get("width", 0), "height": p.get("height", 0),
            "title": (p.get("alt") or "").strip(),
            "author": p.get("photographer"), "page": p.get("url"),
        })
    return out


def unsplash_search(access_key: str, query: str, per_page: int = 8) -> list[dict]:
    from urllib.parse import quote_plus
    data = _get_json(
        f"https://api.unsplash.com/search/photos?query={quote_plus(query)}"
        f"&orientation=landscape&per_page={per_page}",
        {"Authorization": f"Client-ID {access_key}"},
    )
    out = []
    for p in data.get("results", []):
        raw = (p.get("urls") or {}).get("raw")
        if not raw or "plus.unsplash.com" in raw:
            continue
        desc = p.get("description") or p.get("alt_description") or ""
        user = p.get("user") or {}
        out.append({
            "provider": "unsplash", "license": "Unsplash License (free tier)",
            "url": f"{raw}&w=2400&q=80&fm=jpg",
            "width": p.get("width", 0), "height": p.get("height", 0),
            "title": desc.strip(),
            "author": user.get("name"),
            "page": (p.get("links") or {}).get("html"),
        })
    return out


def pixabay_search(api_key: str, query: str, per_page: int = 8) -> list[dict]:
    from urllib.parse import quote_plus
    data = _get_json(
        f"https://pixabay.com/api/?key={api_key}&q={quote_plus(query)}"
        f"&orientation=horizontal&image_type=photo&per_page={per_page}"
        f"&min_width={MIN_FETCH_WIDTH}",
    )
    out = []
    for p in data.get("hits", []):
        url = p.get("largeImageURL") or p.get("webformatURL")
        if not url:
            continue
        out.append({
            "provider": "pixabay", "license": "Pixabay License",
            "url": url, "width": p.get("imageWidth", 0),
            "height": p.get("imageHeight", 0),
            "title": (p.get("tags") or "").strip(),
            "author": p.get("user"), "page": p.get("pageURL"),
        })
    return out


def candidate_ok(slot: Slot, cand: dict) -> str | None:
    """Return None if acceptable, else the rejection reason."""
    blob = f"{cand['url']} {cand['title']}".lower()
    if any(s in blob for s in REJECT_SOURCES):
        return "blocked source (licensed / premium / AI-hybrid / social)"
    if cand["width"] < MIN_FETCH_WIDTH or cand["height"] <= 0:
        return f"too small ({cand['width']}x{cand['height']})"
    if cand["width"] <= cand["height"]:
        return "not landscape"
    text = f"{cand['title']}".lower()
    if slot.require_any and not any(t in text for t in slot.require_any):
        return "subject tokens missing"
    if any(t in text for t in slot.reject_any):
        return "rejected subject token"
    return None


def fetch_all(staging: Path) -> list[dict]:
    pexels_key = os.environ.get("PEXELS_API_KEY", "")
    unsplash_key = os.environ.get("UNSPLASH_ACCESS_KEY", "")
    pixabay_key = os.environ.get("PIXABAY_API_KEY", "")
    if not (pexels_key or unsplash_key or pixabay_key):
        sys.exit("error: set at least one of PEXELS_API_KEY / UNSPLASH_ACCESS_KEY / PIXABAY_API_KEY")
    staging.mkdir(parents=True, exist_ok=True)
    report: list[dict] = []
    for slot in SLOTS:
        cands: list[dict] = []
        for q in slot.queries:
            if pexels_key:
                try:
                    cands += pexels_search(pexels_key, q)
                except Exception as exc:  # noqa: BLE001 - keep other providers
                    print(f"  [{slot.filename}] pexels '{q}' failed: {exc}")
            if unsplash_key:
                try:
                    cands += unsplash_search(unsplash_key, q)
                except Exception as exc:  # noqa: BLE001
                    print(f"  [{slot.filename}] unsplash '{q}' failed: {exc}")
            if pixabay_key:
                try:
                    cands += pixabay_search(pixabay_key, q)
                except Exception as exc:  # noqa: BLE001
                    print(f"  [{slot.filename}] pixabay '{q}' failed: {exc}")
        ranked = sorted(
            (c for c in cands if candidate_ok(slot, c) is None),
            key=lambda c: c["width"] * c["height"], reverse=True,
        )
        rejected = [(c["provider"], c["title"][:60], candidate_ok(slot, c))
                    for c in cands if candidate_ok(slot, c) is not None]
        entry: dict = {"slot": slot.filename, "service": slot.service,
                       "considered": len(cands), "rejected": rejected}
        if ranked:
            best = ranked[0]
            ext = ".jpg"
            dest = staging / f"{Path(slot.filename).stem}.orig{ext}"
            _download(best["url"], dest)
            (staging / f"{Path(slot.filename).stem}.provenance.json").write_text(
                json.dumps(best, indent=2))
            entry.update({"status": "staged", "file": dest.name,
                          "dims": f"{best['width']}x{best['height']}",
                          "provider": best["provider"], "license": best["license"],
                          "author": best["author"], "page": best["page"]})
            print(f"  [{slot.filename}] STAGED {best['width']}x{best['height']} "
                  f"via {best['provider']}: {best['title'][:70]}")
        else:
            entry.update({"status": "NO CANDIDATE - manual sourcing needed"})
            print(f"  [{slot.filename}] NO CANDIDATE ({len(cands)} considered, "
                  f"{len(rejected)} rejected)")
        report.append(entry)
    (staging / "fetch-report.json").write_text(json.dumps(report, indent=2))
    return report

# ---------------------------------------------------------------- optimize

def _has(cmd: str) -> bool:
    return shutil.which(cmd) is not None


def optimize_one(src: Path, dest: Path) -> dict:
    """Resize to MAX_WIDTH, encode webp under MAX_BYTES. Returns result row."""
    if _has("convert") or _has("magick"):
        conv = "magick" if _has("magick") else "convert"
        # Probe dims
        probe = subprocess.run(
            [conv, str(src), "-format", "%w %h", "info:"],
            capture_output=True, text=True, check=True)
        w, h = (int(x) for x in probe.stdout.split())
        scale = min(1.0, MAX_WIDTH / w)
        out_w, out_h = int(w * scale), int(h * scale)
        quality = 82
        # Stage 1: ramp quality down. Stage 2: shrink width if still over.
        for width in (out_w, 1000, 900):
            if width > out_w:
                continue
            sh = round(h * width / w)
            q = quality if width == out_w else 78
            while q >= 40:
                subprocess.run(
                    [conv, str(src), "-resize", f"{width}x{sh}",
                     "-strip", "-quality", str(q), str(dest)], check=True)
                size = dest.stat().st_size
                if size <= MAX_BYTES:
                    quality = q
                    out_w, out_h = width, sh
                    break
                q -= 4
            else:
                continue
            break
        final = subprocess.run(
            [conv, str(dest), "-format", "%w %h", "info:"],
            capture_output=True, text=True, check=True).stdout.strip()
        return {"file": dest.name, "dims": final,
                "bytes": dest.stat().st_size, "quality": quality}
    # PIL fallback
    from PIL import Image  # noqa: PLC0415
    img = Image.open(src).convert("RGB")
    if img.width > MAX_WIDTH:
        img = img.resize((MAX_WIDTH, round(img.height * MAX_WIDTH / img.width)),
                         Image.LANCZOS)
    quality = 82
    for width in (img.width, 1000, 900):
        frame = img if width == img.width else img.resize(
            (width, round(img.height * width / img.width)), Image.LANCZOS)
        q = quality if width == img.width else 78
        while q >= 40:
            frame.save(dest, "WEBP", quality=q, method=6)
            if dest.stat().st_size <= MAX_BYTES:
                quality = q
                img = frame
                break
            q -= 4
        else:
            continue
        break
    return {"file": dest.name, "dims": f"{img.width}x{img.height}",
            "bytes": dest.stat().st_size, "quality": quality}


def optimize_all(staging: Path, out: Path) -> list[dict]:
    if not (_has("convert") or _has("magick")):
        try:
            import PIL  # noqa: F401
        except ImportError:
            sys.exit("error: need ImageMagick (`convert`) or Python PIL for --optimize")
    out.mkdir(parents=True, exist_ok=True)
    rows: list[dict] = []
    for slot in SLOTS:
        srcs = sorted(staging.glob(f"{Path(slot.filename).stem}.orig.*"))
        # Also accept a manually-placed <stem>.<jpg|png|webp> without .orig.
        if not srcs:
            srcs = sorted(p for p in staging.glob(f"{Path(slot.filename).stem}.*")
                          if p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}
                          and ".provenance." not in p.name)
        if not srcs:
            rows.append({"slot": slot.filename, "service": slot.service,
                         "status": "MISSING - no staged original"})
            continue
        try:
            res = optimize_one(srcs[0], out / slot.filename)
            status = "OK" if res["bytes"] <= MAX_BYTES else "OVER BUDGET"
            rows.append({"slot": slot.filename, "service": slot.service,
                         "dims": res["dims"], "bytes": res["bytes"],
                         "quality": res["quality"], "status": status})
        except Exception as exc:  # noqa: BLE001 - report, don't crash
            rows.append({"slot": slot.filename, "service": slot.service,
                         "status": f"FAILED: {exc}"})
    return rows


def print_table(rows: list[dict]) -> None:
    print(f"\n{'file':28} {'service':38} {'dims':12} {'size':>9}  status")
    print("-" * 100)
    for r in rows:
        size = f"{r['bytes'] / 1024:.1f} KB" if "bytes" in r else "-"
        print(f"{r['slot']:28} {r['service']:38} {r.get('dims', '-'):12} "
              f"{size:>9}  {r['status']}")
    over = [r for r in rows if r.get("bytes", 0) > MAX_BYTES]
    if over:
        print(f"\nFAIL: {len(over)} file(s) exceed 100 KB.")
        sys.exit(1)

# ---------------------------------------------------------------- main

def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--all", action="store_true", help="fetch then optimize")
    ap.add_argument("--fetch", action="store_true", help="fetch only")
    ap.add_argument("--optimize-only", metavar="STAGING",
                    help="optimize staged originals in STAGING")
    ap.add_argument("--stage", default="./image-staging",
                    help="staging dir for --fetch/--all (default ./image-staging)")
    ap.add_argument("--out", default="./public/images",
                    help="output dir for optimized webp (default ./public/images)")
    args = ap.parse_args()

    if args.all or args.fetch:
        print("FETCH: querying providers...")
        fetch_all(Path(args.stage))
    if args.all or args.optimize_only:
        staging = Path(args.optimize_only or args.stage)
        print(f"OPTIMIZE: {staging} -> {args.out} "
              f"(max {MAX_WIDTH}px, max {MAX_BYTES // 1024} KB)...")
        rows = optimize_all(staging, Path(args.out))
        print_table(rows)
    if not (args.all or args.fetch or args.optimize_only):
        ap.print_help()
        sys.exit(2)


if __name__ == "__main__":
    main()
