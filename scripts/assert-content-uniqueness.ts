import { publishedLocationServices } from "../src/content/location-services";
import { publishedLocations } from "../src/content/locations";
import { publishedServices } from "../src/content/services";

/** Gate 7 — at least 40 percent distinct body copy, no city-name substitution. */
const MIN_DISTINCT_RATIO = 0.4;

function tokens(text: string): string[] {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
}

function distinctRatio(subject: string, corpus: string[]): number {
  const subjectTokens = new Set(tokens(subject));
  const corpusTokens = new Set(corpus.flatMap(tokens));
  let unique = 0;
  for (const token of subjectTokens) if (!corpusTokens.has(token)) unique += 1;
  return subjectTokens.size === 0 ? 0 : unique / subjectTokens.size;
}

const failures: string[] = [];
const serviceCorpus = publishedServices.map((service) =>
  [service.summary, service.heroSummary, ...service.covered.map((c) => c.body)].join(" "),
);

for (const record of publishedLocationServices) {
  const body = record.localBody.map((block) => block.body).join(" ");
  const location = publishedLocations.find((l) => l.slug === record.locationSlug);
  const id = `${record.locationSlug}/${record.serviceSlug}`;

  const ratio = distinctRatio(body, serviceCorpus);
  if (ratio < MIN_DISTINCT_RATIO) {
    failures.push(`${id}: only ${(ratio * 100).toFixed(1)}% distinct vs service hubs (need ${MIN_DISTINCT_RATIO * 100}%)`);
  }

  // City-name substitution check: strip the city and compare against siblings.
  if (location) {
    const stripped = body.replaceAll(location.city, "CITY");
    for (const other of publishedLocationServices) {
      if (other === record || other.serviceSlug !== record.serviceSlug) continue;
      const otherLocation = publishedLocations.find((l) => l.slug === other.locationSlug);
      const otherStripped = otherLocation
        ? other.localBody.map((block) => block.body).join(" ").replaceAll(otherLocation.city, "CITY")
        : other.localBody.map((block) => block.body).join(" ");
      if (stripped === otherStripped) {
        failures.push(`${id}: identical to ${other.locationSlug}/${other.serviceSlug} after city substitution`);
      }
    }
  }

  const faqQuestions = new Set(record.localFaqs.map((f) => f.question));
  if (faqQuestions.size < record.localFaqs.length) {
    failures.push(`${id}: duplicate FAQ questions`);
  }
}

if (failures.length > 0) {
  console.error("Content uniqueness failures:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log(`OK: ${publishedLocationServices.length} combination page(s) pass the uniqueness gate.`);
