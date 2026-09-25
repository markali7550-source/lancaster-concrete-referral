import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const EXCLUDED = ["charlotte", "rock hill", "rock-hill", "fort mill", "fort-mill"];
const ROOTS = ["src", "public"];
const ALLOWLIST = ["src/content/locations.ts", "scripts/assert-no-excluded-geos.ts"];

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const failures: string[] = [];
for (const root of ROOTS) {
  for (const file of walk(root)) {
    if (ALLOWLIST.some((allowed) => file.endsWith(allowed))) continue;
    if (!/\.(ts|tsx|css|json|md)$/.test(file)) continue;
    const content = readFileSync(file, "utf8").toLowerCase();
    for (const term of EXCLUDED) {
      if (content.includes(term)) failures.push(`${file}: "${term}"`);
    }
  }
}

if (failures.length > 0) {
  console.error("Excluded geography references found:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log("OK: no excluded Phase 2 geography output.");
