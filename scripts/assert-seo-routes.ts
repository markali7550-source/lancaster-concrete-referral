import { publishedServices } from "../src/content/services";
import { publishedLocations } from "../src/content/locations";
import { publishedLocationServices } from "../src/content/location-services";

const failures: string[] = [];

// Every combo must have two published parents.
for (const record of publishedLocationServices) {
  if (!publishedLocations.some((l) => l.slug === record.locationSlug)) {
    failures.push(`combo ${record.locationSlug}/${record.serviceSlug}: location not published`);
  }
  if (!publishedServices.some((s) => s.slug === record.serviceSlug)) {
    failures.push(`combo ${record.locationSlug}/${record.serviceSlug}: service not published`);
  }
  // Uniqueness gate: local body must not be a bare city substitution.
  const words = record.localBody.join(" ").split(/\s+/).length;
  if (words < 120) {
    failures.push(`combo ${record.locationSlug}/${record.serviceSlug}: local body too thin (${words} words)`);
  }
  if (record.localFaqs.length < 3) {
    failures.push(`combo ${record.locationSlug}/${record.serviceSlug}: needs at least 3 distinct local FAQs`);
  }
}

// Published locations need evidence and explicit ZIPs.
for (const location of publishedLocations) {
  if (location.zips.length === 0) failures.push(`${location.slug}: no approved ZIPs`);
  if (location.localEvidence.length < 2) failures.push(`${location.slug}: insufficient local evidence`);
  if (!location.county) failures.push(`${location.slug}: missing county identity`);
}

if (failures.length > 0) {
  console.error("Route manifest failures:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log(
  `OK: ${publishedServices.length} services, ${publishedLocations.length} locations, ${publishedLocationServices.length} combos.`,
);
