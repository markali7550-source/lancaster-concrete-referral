# Full Audit: Lancaster Concrete Connect

Audit baseline: branch `arena/ca9fd23a-lancaster-concrete-referral` at commit `80efadd`.
Status updates from the backend hardening pass are noted in each item.

## Verification results at baseline

| Check | Result |
|---|---|
| `npm run verify` (typecheck, tests, four content and route asserts, build) | Passes |
| Unit tests | 39 of 39 pass across 5 files |
| ESLint | No warnings or errors |
| TypeScript typecheck | Passes |
| Production dependency audit (`npm audit --omit=dev`) | 3 issues: `next` (moderate), `postcss` (high), `source-map-js` (high) |
| Full dependency audit (includes dev tooling) | 46 issues: 3 critical (`vitest`, `tar`, `tinypool`), 30 high, 12 moderate, 1 low |
| Playwright e2e specs | 5 specs exist, not run during this audit |

## Launch blockers

1. **Lead storage is in memory.** `src/domain/leads/store.ts` keeps leads and the outbox in `Map`s. Leads are lost on restart or serverless cold start. The README lists the Postgres replacement as open. *Not addressed in this pass.*
2. **Lead delivery is not wired up.** `src/domain/leads/worker.ts` exists, but only the tests import `processOutbox`. No code sends lead events to a destination, and no dead-letter queue runs. *Not addressed.*
3. **Webhook endpoints are missing.** `/api/webhooks/calls` and `/api/webhooks/partners` are not implemented, and nothing verifies webhook signatures. *Not addressed.*
4. **Placeholder contact details.** `src/config/site.ts` uses `(803) 555-0123` and `contact@lancasterconcreteconnect.com`. The address `hello@example-referral-brand.com` seen on the live contact page is not in the repository, so the deployed environment variables likely override it. Check the values in Vercel. *Not addressed. Requires owner-supplied real details.*
5. **Legal copy pending counsel review.** The compliance copy in `src/lib/seo/disclosure.ts` is marked as pending review. *Not addressed.*

## High-priority issues

6. **Hash secret fallback.** `store.ts` fell back to a public hardcoded value when `LEAD_HASH_SECRET` was unset. **Fixed in this pass.** In production, an unset secret now throws a descriptive error when a contact is hashed. Development and tests still use the fallback. The check runs per call, not at module load, so `next build` (which runs with `NODE_ENV=production`) does not fail.
7. **Spoofable rate-limit key.** The lead route keyed its rate limiter on the first `x-forwarded-for` value, which clients can set. **Fixed in this pass.** The key now comes from `x-vercel-forwarded-for` or `x-real-ip`, which the Vercel edge sets, and each value must parse as an IP address. Requests without either header share one `unknown` bucket. The limiter is still in memory and per instance, so it is a basic guard, not a distributed limit.
8. **Content Security Policy.** The policy set only `frame-ancestors 'self' https://*.e2b.app`. **Fixed in this pass.** The sandbox-only domain is removed. `frame-ancestors 'self'` is set, along with `X-Frame-Options: SAMEORIGIN`, `Strict-Transport-Security`, and a `Permissions-Policy` that disables camera, microphone, geolocation, and payment. No script or style CSP was added, because a strict one would need nonce work and could break hydration and inline styles. Adding a full CSP should be a separate change with browser testing.
9. **Dependency vulnerabilities.** `next` is at 15.5.27. The advisory affects the 9.3.4-canary to 16.3.0-preview range, and the fix is `next@16.4.1`, a major upgrade. `postcss` and `source-map-js` are fixed through the same upgrade or direct updates. `vitest` (critical) and the Vercel CLI tooling affect development only. *Not addressed. Needs a planned major upgrade and e2e run.*

## Medium-priority issues

10. **JavaScript budget.** The README records 130 kB on the five quote-form pages against a 120 kB budget. *Not addressed.*
11. **Accessibility testing.** No axe or Lighthouse checks are in the dependencies. The e2e specs exist but were not run in this audit. *Not addressed.*
12. **Hero image format.** The README asks for AVIF before launch. `next.config.ts` already allows AVIF output. *Not addressed.*
13. **Documentation drift.** `DEPLOY-GUIDE.md` lists a fallback phone of `(803) 555-1234`, while `.env.example` and `site.ts` use `555-0123`. The README gate status is also out of date. For example, it says e2e suites are not written, but five specs exist. *Not addressed.*

## Images and content

- The 62 WebP images in `public/` are each under 150 KB. The sealing hero is the owner's 612×344 photo, which will look soft at full width.
- `docs/IMAGE-LICENSES.md` has rows marked "Source not documented" or "Pending". These need a license record before launch.
- FAQ text: en dashes in numeric ranges were replaced with "to", and hyphens between words in question and answer text were replaced with spaces. Hrefs and IDs are unchanged.

## Scope of the hardening pass

- Visual design, CSS, Tailwind classes, layout, colors, and fonts were not changed.
- Changed files: `src/domain/leads/store.ts`, `src/app/api/leads/route.ts`, `next.config.ts`, and this document.
