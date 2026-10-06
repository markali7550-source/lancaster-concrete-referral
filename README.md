# Lancaster Concrete Referral Platform — Phase 1 build

Next.js App Router + TypeScript + Tailwind v4. Static public site, working lead
API with in-memory canonical store (the agreed scope: UI-first, real API, no
managed Postgres/queue yet).

```bash
cp .env.example .env.local   # already done
npm run dev                  # http://localhost:3000
npm run build                # SSG output + route manifest
npm test                     # vitest: routing, validation, commission, schema
npm run assert:routes        # route/content-uniqueness gate
npm run assert:geos          # excluded Phase 2 geography scan
```

## What is published

| Route | State |
|---|---|
| `/` | published |
| `/services` + 4 service hubs | published |
| `/locations` | **noindex**, omitted from sitemap (one city only) |
| `/locations/lancaster-sc` | published |
| `/locations/lancaster-sc/concrete-driveways` | published (passed uniqueness gate) |
| `/locations/lancaster-sc/{patios,slabs,repair}` | **gated → 404** |
| `/locations/indian-land-sc`, `/locations/elgin-sc` | **gated/blocked → 404** |
| Charlotte / Rock Hill / Fort Mill | zero output, CI-enforced |
| `/how-it-works`, `/contact`, `/privacy`, `/terms`, `/referral-disclosure` | published |
| `/thank-you` | published, noindex nofollow |

`dynamicParams = false` everywhere; static params come from explicit allowlists
in `src/content/*`. No Cartesian product is ever generated.

## Verified behaviour (dev-server smoke test)

- `/locations/lancaster-sc/concrete-patios` → 404, `/locations/indian-land-sc` → 404
- `POST /api/leads` approved ZIP → `202 {leadId, state:"routed"}`
- Same `Idempotency-Key` → original lead ID, `replay:true`, no second delivery
- ZIP 28211 → `422 {result:"no_coverage"}`, nothing routed
- `GET /api/tracking-number` → `405` (allocation is state-creating, POST only)
- First Load JS: 103 kB shared; 113 kB on content pages; 130 kB on the five
  pages that render the quote form (budget 120 kB — see note below)

## Gate checklist status

| # | Gate | Status |
|---|---|---|
| 1–3 | Route allowlist, excluded geos, geo gates | ✅ enforced by `scripts/assert-*.ts` |
| 4–5 | Self-canonicals, sitemap purity | ✅ `pageMetadata()` + `sitemap.ts` |
| 6 | Internal links, no orphan conversion page | ✅ combo links both parents |
| 7 | Content uniqueness | ✅ build gate fails thin combos (<120 words, <3 local FAQs) |
| 11 | JS budget | ⚠️ 130 kB on form pages vs 120 kB budget |
| 12 | Hero media | ✅ priority, explicit dims, responsive sizes — swap in AVIF before launch |
| 13 | Responsive 320px+, 390×844 first viewport | ✅ `min-h-[calc(100dvh-3.5rem)]`, stacked actions |
| 14 | Accessibility | ⚠️ semantics/focus/skip-link done; axe + Playwright suites not written |
| 15 | Form states | ✅ default/error/submitting/success/api_failure/no_coverage, values preserved |
| 16–17 | Lead persistence, idempotency | ✅ (in-memory store, same transaction boundary as the Postgres design) |
| 18 | Routing controls | ✅ 7 hard gates + scoring; expired-credential partner is provably blocked |
| 19 | Delivery resilience | ⚠️ outbox rows written; queue worker/DLQ not implemented |
| 20–21 | Call fallback, DNI integrity | ✅ fallback in static HTML, atomic swap, `no-store`, empty pool degrades safely |
| 22 | Webhook security | ❌ `/api/webhooks/*` not implemented |
| 23 | Schema validity | ✅ OnlineBusiness root; tests assert no LocalBusiness/GeneralContractor/rating/address |
| 24 | Compliance copy | ✅ single source in `src/lib/seo/disclosure.ts` — **pending counsel review** |
| 25 | Closed-loop proof | ❌ needs the durable stack |

## Known gaps before this can take traffic

1. Replace `src/domain/leads/store.ts` with Drizzle + Postgres (same interface).
2. Queue worker, retries, DLQ, partner acknowledgement webhook.
3. `/api/webhooks/calls` and `/api/webhooks/partners` with signature verification.
4. Playwright + axe suites; Lighthouse CI wiring.
5. Real brand identity, phone, and counsel-approved legal copy (`.env` values are
   placeholders and the env validator will reject anything malformed).
6. Number pool for DNI is intentionally empty — every call path currently uses the
   verified fallback number.
