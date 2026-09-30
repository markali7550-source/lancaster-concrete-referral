# Full site review — 15 pages

Audited against the running production build. Every finding below was measured, not
assumed.

> **Status update — commit `b5cf580`, deployed.** Six items were approved and are now
> fixed: consent-banner overlap, hero CTA button wrapping, missing favicon/app icons,
> missing `og:image`, the `/contact` heading skip, and the narrow `/services` card.
> The two "Contractor" H1s were reviewed and **deliberately kept as-is**.
> Everything still open below is either a Vercel-dashboard task (Deployment Protection,
> `NEXT_PUBLIC_SITE_URL`, apex alias, token revocation) or a content decision
> (`/locations` thin page, `/services` and `/how-it-works` word counts).

---

## Page inventory (measured)

| Page | Title | Desc | H1 | H2 | Words | Images |
|---|---|---|---|---|---|---|
| `/` | 64 | 171 | 1 | 9 | 1,485 | 9 |
| `/services` | 63 | 178 | 1 | 6 | 700 | 9 |
| `/services/concrete-driveways` | 58 | 154 | 1 | 13 | 2,515 | 9 |
| `/services/concrete-patios` | 55 | 151 | 1 | 13 | 2,349 | 9 |
| `/services/concrete-slabs` | 54 | 150 | 1 | 13 | 2,313 | 9 |
| `/services/concrete-repair` | 55 | 150 | 1 | 13 | 2,324 | 9 |
| `/locations` | 13 | 68 | 1 | **0** | **185** | 4 |
| `/locations/lancaster-sc` | 56 | 154 | 1 | 8 | 1,147 | 9 |
| `/locations/lancaster-sc/concrete-driveways` | 54 | 154 | 1 | 10 | 1,734 | 8 |
| `/how-it-works` | 60 | 150 | 1 | 4 | 635 | 5 |
| `/contact` | 69 | 126 | 1 | **0** | 390 | 4 |
| `/privacy` | 43 | 127 | 1 | 6 | 437 | 4 |
| `/terms` | 41 | 130 | 1 | 5 | 341 | 4 |
| `/referral-disclosure` | 48 | 97 | 1 | 4 | 484 | 4 |
| `/thank-you` (noindex) | 16 | 149 | 1 | 0 | 288 | 4 |

Healthy: exactly one H1 everywhere, unique titles and descriptions, all within limits,
no heading-level skips except `/contact`.

---

## 1 — Blockers: the site is not publicly reachable

### 1.1 Vercel Deployment Protection is still on
Every URL 302-redirects to a Vercel SSO login.

```
/  /services  /services/concrete-patios  /locations/lancaster-sc  /how-it-works  /contact   → 302
/home-hero.webp and every other asset                                                       → 302
```

Google cannot crawl it, and no one can open it without a Vercel account.
**Change:** turn Deployment Protection off in Vercel → Settings → Deployment Protection.
This is a dashboard toggle, not a code change — I cannot do it from here.

### 1.2 Every canonical, sitemap URL and schema `@id` points at a domain you do not own
`NEXT_PUBLIC_SITE_URL` is unset, so the build falls back to the placeholder:

```
canonical              https://example-referral-brand.com
sitemap.xml (16 URLs)  https://example-referral-brand.com/...
robots.txt sitemap     https://example-referral-brand.com/sitemap.xml
```

If this is indexed as-is, every page tells Google the real page lives on someone else's
domain. **Change:** set five Production env vars and redeploy without cache:

```
NEXT_PUBLIC_SITE_URL=https://<your-real-domain>
NEXT_PUBLIC_BRAND_NAME=Lancaster Concrete Connect
NEXT_PUBLIC_FALLBACK_PHONE_E164=+18035550123
NEXT_PUBLIC_FALLBACK_PHONE_DISPLAY=(803) 555-0123
NEXT_PUBLIC_CONTACT_EMAIL=hello@example-referral-brand.com
```

(Phone and email keep your intentional test values.)

### 1.3 The apex alias is unassigned
`lancaster-concrete-referral.vercel.app` → 404. Only the long project URL works.
**Change:** assign the short alias (or your real domain) in Vercel → Domains.

---

## 2 — High: visible defects for real visitors

### 2.1 The consent banner covers hero content on mobile
Measured at 390 px: fixed element, full width, **192 px tall, flush to the bottom edge**.
It sits on top of the hero's trust list ("Free for homeowners", "One independent
provider, not five"). Screenshot: `review-consent-mobile.png`.

**Change:** add bottom padding to the page equal to the banner height while it is
visible, so nothing is ever obscured — or make it a slim single-line bar on mobile.

### 2.2 Hero CTA buttons wrap to two lines at 390–430 px
The button pair switches to two columns at 380 px, which leaves each button only
169–186 px wide:

| Width | Button width | Result |
|---|---|---|
| 320 px | 280 px | single line, fine |
| 360 px | 320 px | single line, fine |
| **390 px** | **169 px** | "(803) 555-0123" wraps onto two lines |
| **430 px** | **186 px** | still wrapping |

That covers the most common phone sizes. **Change:** raise the two-column breakpoint so
buttons stay full-width until there is genuinely room (roughly 480 px).

### 2.3 No favicon or app icon
`/favicon.ico`, `/icon.png`, `/apple-icon.png` all 404, and there is no icon file in
`src/app`. Browser tabs and bookmarks show a blank default.
**Change:** generate an icon from the existing logo mark and add `icon.png` +
`apple-icon.png`.

### 2.4 No social preview image
`og:title`, `og:description`, `og:url`, `og:type` and the Twitter tags are present, but
there is **no `og:image`**. Every link shared to Facebook, LinkedIn, WhatsApp or iMessage
renders as a bare text link.
**Change:** add an `opengraph-image` (1200×630) so shares show a proper card.

### 2.5 `/contact` skips a heading level
Heading sequence is `h1 → h3`, with no `h2`. Minor accessibility and SEO issue.
**Change:** promote the form heading to `h2`.

---

## 3 — Medium: content and copy

### 3.1 `/locations` is a near-empty page
185 words, **no H2**, a 13-character title, and exactly **one link**. It is in the sitemap
as an indexable page but offers almost nothing.
**Change:** either give it a real intro plus a coverage explanation, or `noindex` it and
treat it as pure navigation. My recommendation is the former.

### 3.2 Two H1s still say "Contractor"
```
/locations/lancaster-sc      Concrete Contractor Referrals in Lancaster, SC
/locations/.../driveways     Get Matched With Concrete Driveways Contractors in Lancaster, SC
```
Your standing rule is that the site must never read as the contractor. "Referrals" does
soften it, but the second one especially reads like a contractor listing.
**Change:** reword to "Independent Concrete Service Providers in Lancaster, SC" and
"Get Matched With an Independent Concrete Driveway Provider in Lancaster, SC".
*(Both are H1s, so this changes indexed titles — your call.)*

### 3.3 `/services` and `/how-it-works` are thin next to their siblings
700 and 635 words against 2,300–2,500 on each service page. They are top-nav pages and
likely landing pages.
**Change:** extend each with two or three substantive sections, matching the depth the
service pages now have.

### 3.4 One narrow block remains
The "What we decline outright" card on `/services` is still capped at `max-w-3xl`, so it
shows the same right-hand gap you had me fix five times elsewhere.
**Change:** remove the cap for consistency.

### 3.5 Very long line lengths on large screens
After the full-width changes you asked for, FAQ answers and accordion answers run to
~160 characters on a 1536 px monitor. You explicitly rejected a cap, so **no change
proposed** — flagged only so it is a conscious decision.

---

## 4 — Infrastructure and security

### 4.1 Three GitHub tokens were exposed in this workspace and are not confirmed revoked
Including the one still used for pushes. Anyone holding them can write to the repo.
**Change:** revoke all three at github.com/settings/tokens and issue one fresh
fine-grained token.

### 4.2 Placeholder webhook secrets
`dev-only-*` defaults are still in place, plus `LEAD_HASH_SECRET`.
**Change:** regenerate with `openssl rand -hex 32` before any real lead traffic.

### 4.3 Next.js version is safe — no action
15.5.7 is a patched release for the React2Shell RCE (CVE-2025-66478). Nothing to do.

### 4.4 Image sharpness trade-off
Enforcing the 100 KB ceiling left hero sources at 860–1280 px, so large heroes render at
roughly 1.4× rather than 2× on high-DPI screens. **No change proposed** unless you want
specific heroes raised to ~150 KB.

---

## Recommended order

1. **You:** turn off Deployment Protection, set the five env vars, assign the domain (§1)
2. **Me:** consent-banner overlap + CTA button wrapping (§2.1, §2.2) — visible bugs
3. **Me:** favicon + og:image (§2.3, §2.4) — cheap, high polish
4. **Me:** `/contact` heading, `/services` narrow card (§2.5, §3.4) — one-liners
5. **You to decide:** "Contractor" H1 rewording (§3.2)
6. **Me:** `/locations`, `/services`, `/how-it-works` content depth (§3.1, §3.3)
7. **You:** revoke tokens, rotate secrets (§4.1, §4.2)

## Explicitly unchanged

Gallery · hero images · test phone `(803) 555-0123` · test email
`hello@example-referral-brand.com` · CTA band position · sticky bar stays removed ·
header CTA on all 12 pages · mobile centring rules · full-width sections.
