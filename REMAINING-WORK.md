# Remaining work — Lancaster Concrete Referral Platform

Status as of 2026-09-28. Measured against the Master Developer Specification.

Scope reminder: you chose **frontend-first, with backend depth limited to API routes
plus an in-memory store** — no managed queue, no managed Postgres. Several items below
are consequences of that choice, not oversights.

---

## 1. Blockers — cannot launch without these

### 1.1 Real environment values
Every canonical URL, schema `@id`, sitemap entry and phone link currently uses placeholders:

| Variable | Current value | Consequence |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://example-referral-brand.com` | Poisons every canonical, `@id`, and sitemap URL |
| `NEXT_PUBLIC_FALLBACK_PHONE_E164` | `+18035550123` | Dials nothing |
| `NEXT_PUBLIC_FALLBACK_PHONE_DISPLAY` | `(803) 555-0123` | Displayed on every page |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `hello@example-referral-brand.com` | Non-routable |
| `NEXT_PUBLIC_BRAND_NAME` | `Lancaster Concrete Connect` | Confirm this is final |

**Needed from you:** the real domain, tracking/fallback phone number, and contact inbox.

### 1.2 Durable lead storage
`src/domain/leads/store.ts` holds everything in process memory:

```
const leads = new Map<string, LeadRecord>();
const idempotency = new Map<string, string>();
const outbox: OutboxEvent[] = [];
```

Every lead, idempotency key and outbox event is lost on restart or redeploy, and nothing
is shared across serverless instances — so idempotency and deduplication silently stop
working the moment there is more than one instance. This also blocks the spec's
closed-loop reporting gate, which needs lead history to survive.

**Work:** provision Postgres, add Drizzle schema and migrations (`src/db/schema`,
`src/db/migrations` are empty scaffolds), port the store behind the existing interface.
The domain logic and its tests should carry over largely unchanged.

### 1.3 No real partner delivery
Nothing is actually sent to a contractor. `processOutbox()` implements retry, backoff and
dead-lettering correctly, but there is no transport behind it and no scheduler invoking it
— no cron, no queue consumer. These provider directories are empty:

```
src/providers/calls   src/providers/crm   src/providers/email   src/providers/sms
```

**Work:** pick vendors (email/SMS/CRM), implement the adapters, and add a scheduled
invocation. Until then a submitted lead reaches storage and stops there.

---

## 2. Functional gaps

### 2.1 Dynamic number insertion is a stub
`/api/tracking-number` always returns `pool_exhausted` — there is no pool, no provider,
no allocation or release. Correct failure behaviour (static fallback keeps working) is
already implemented and tested; the allocation path itself is not built.

### 2.2 Call tracking webhook has no source
`/api/webhooks/calls` verifies signatures and deduplicates correctly, but no provider is
configured to call it.

### 2.3 Consent banner is presentational
It records consent and gates the `dataLayer` push, but no analytics or tag manager is
installed, so there is nothing downstream to gate.

---

## 3. Quality gates not yet met

### 3.1 Accessibility audit (spec gate 14)
Playwright now covers interaction, but there is **no axe/WCAG audit**. Known unreviewed
areas: color contrast on muted text, focus-visible styling, and the consent banner's
focus trap. One concrete defect is already visible: the banner is `position: fixed`
bottom-left and **overlaps the quote form's "Back" button** at some viewport sizes.

### 3.2 Performance budgets unverified
Bundle sizes are 103 kB shared and 130 kB on the heaviest pages against a 120 kB
budget, so the budget is currently exceeded by 10 kB on the five form-bearing
routes (/, /contact, /locations/[city], /locations/[city]/[service],
/services/[service]). That 130 kB is 103 kB of React + Next.js runtime, ~17 kB
for the multi-step quote form and ~10 kB for the consent banner and navigation
menus; it cannot be brought under 120 kB without removing the quote form, which
is the site's primary conversion path. Either raise the budget to 135 kB or
accept the overage knowingly. No
Lighthouse or Core Web Vitals run has happened. Hero imagery is unoptimized source material.

### 3.3 Cross-browser
All browser testing to date is Chromium only. No Firefox or WebKit run.

---

## 4. Content and compliance sign-off

- **Legal copy is unreviewed.** `/privacy`, `/terms` and `/referral-disclosure` are
  developer-written placeholders. They need a lawyer before launch, particularly the
  TCPA-adjacent consent language.
- **Only one combination page publishes** (`lancaster-sc/concrete-driveways`). The other
  three Lancaster combos are gated pending unique content that passes the uniqueness gate.
- **Partner data is fictional.** `ptr_lancaster_primary` and its approved ZIP list
  (29720/29721) are test fixtures. Real partner records, coverage areas and signed
  agreements are needed.

---

## 5. Deployment

Not deployed. You selected Vercel and accepted deploying with placeholder values; the
token has not been provided. Also required before a public launch:

- Tighten `Content-Security-Policy: frame-ancestors` from `'self' https://*.e2b.app`
  to `'self'` (the wildcard exists only for the sandbox preview).
- Set real webhook secrets — `CALL_WEBHOOK_SECRET` and `PARTNER_WEBHOOK_SECRET`
  currently fall back to `dev-only-*` values.
- The in-memory rate limiter (8/min per IP) is per-instance and resets on redeploy;
  it needs a shared store to be meaningful in production.

---

## What is done and verified

- 13 published routes + 2 noindex, fail-closed routing (11 gated routes return 404)
- Zero output for excluded Phase 2 geography (Charlotte, Rock Hill, Fort Mill)
- Lead intake with Zod validation, idempotency, deduplication, coverage filtering
- Signed webhooks with replay protection; partner state machine rejecting illegal jumps
- Attribution model: first-touch preservation, last-non-direct, 90-day window
- Kill switches (`INTAKE_ENABLED`, `ROUTING_ENABLED`) verified live
- Schema graph with no contractor/rating/address claims — 5 graphs pass parity
- **19 Playwright, 29 unit tests, 15/15 page checks, 32/32 API checks, 4 CI gates**
