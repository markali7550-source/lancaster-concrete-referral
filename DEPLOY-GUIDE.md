# Deploying Lancaster Concrete Referral + connecting a domain

Complete walkthrough, written for this specific project.
Repository: https://github.com/markali7550-source/lancaster-concrete-referral

Nothing is deployed yet. Do these in order — each part depends on the one before it.

---

## Before you start

You need three things. Two cost money, one is free.

| Thing | Where | Cost |
|---|---|---|
| A domain name | Namecheap / Cloudflare / Porkbun | ~$10–15/year |
| A Vercel account | vercel.com | Free tier is fine |
| A real phone number | Your phone, or a call-tracking provider | Varies |

The phone number matters more than it looks. It is printed on every page and is
the primary way people will contact you. `(803) 555-0123` is a placeholder that
dials nothing.

---

## PART 1 — Buy a domain

1. Go to a registrar. **Cloudflare Registrar** sells at cost with no markup and no
   upsells; **Namecheap** and **Porkbun** are also fine. Avoid GoDaddy's checkout
   unless you enjoy declining add-ons.
2. Search for your name, e.g. `lancasterconcreteconnect.com`.
3. Prefer `.com`. People type `.com` by reflex.
4. Enable **WHOIS privacy** — usually free. Without it your name, address, phone
   and email are published in a public database that spammers scrape.
5. Buy it. You now own it for a year.

**A word of caution specific to your business:** you are a referral service, not a
contractor. Avoid a name that reads like a construction company (e.g.
"LancasterConcreteCo.com"). If a homeowner believes they hired *you* to pour
concrete, that is precisely the confusion the disclosures throughout this site
exist to prevent.

---

## PART 2 — Deploy to Vercel

### 2.1 Create the account

1. Go to **https://vercel.com/signup**
2. Choose **Continue with GitHub**
3. Authorise Vercel. It asks for access to your repositories — you may grant it
   to all repos, or select only `lancaster-concrete-referral`.

### 2.2 Import the project

1. Go to **https://vercel.com/new**
2. Your GitHub repos are listed. Find **`lancaster-concrete-referral`**.
   - Not listed? Click **Adjust GitHub App Permissions** and grant access to it.
3. Click **Import**.

### 2.3 Confirm build settings

Vercel reads `vercel.json` from the repo, so these should already be correct:

| Setting | Value | Source |
|---|---|---|
| Framework Preset | Next.js | `vercel.json` |
| Build Command | `npm run build` | `vercel.json` |
| Install Command | `npm ci` | `vercel.json` |
| Output Directory | *(leave default)* | Next.js standard |
| Region | Washington, D.C. (`iad1`) | `vercel.json` |

Do not override these. `iad1` is the US East region — closest to South Carolina.

### 2.4 Add environment variables — DO NOT SKIP

Still on the import screen, expand **Environment Variables**. Add each of the
following. These are **build-time** values: they are compiled into the HTML, so
they must be set *before* the first build.

**Required — the site will not work correctly without these:**

```
NEXT_PUBLIC_SITE_URL                 https://yourdomain.com
NEXT_PUBLIC_BRAND_NAME               Lancaster Concrete Connect
NEXT_PUBLIC_FALLBACK_PHONE_E164      +18035551234
NEXT_PUBLIC_FALLBACK_PHONE_DISPLAY   (803) 555-1234
NEXT_PUBLIC_CONTACT_EMAIL            hello@yourdomain.com
```

Formatting rules that will silently break things if you get them wrong:

- `NEXT_PUBLIC_SITE_URL` — **no trailing slash**. `https://x.com` not `https://x.com/`.
  Include `https://`. A trailing slash produces double-slashed canonical URLs.
- `NEXT_PUBLIC_FALLBACK_PHONE_E164` — E.164 format: `+1` then ten digits, no
  spaces, dashes or brackets. This is what `tel:` links use.
- `NEXT_PUBLIC_FALLBACK_PHONE_DISPLAY` — what humans read. Format it nicely.

**Recommended — secrets for the webhook endpoints:**

```
CALL_WEBHOOK_SECRET      <long random string>
PARTNER_WEBHOOK_SECRET   <long random string>
LEAD_HASH_SECRET         <long random string>
```

Without these the code falls back to `dev-only-*` defaults, which are published
in the public repository — anyone could forge webhook calls. Generate each with:

```bash
openssl rand -hex 32
```

**Optional — kill switches:**

```
INTAKE_ENABLED     true
ROUTING_ENABLED    true
```

Both default to on. Set `INTAKE_ENABLED=false` to make the quote form return a
"please call instead" message without taking the site down — useful if you need
to stop accepting leads at short notice. These are read at request time, so they
take effect on redeploy without a code change.

### 2.5 Deploy

Click **Deploy**. Takes roughly 1–3 minutes.

You get a URL like `lancaster-concrete-referral.vercel.app`. **Open it and check
it works** before touching DNS. Debugging a broken site and a broken domain at
the same time is miserable.

If the build fails, open the build log and read the first error — later errors
are usually consequences of it.

---

## PART 3 — Connect your domain

### 3.1 Tell Vercel about the domain

1. In your Vercel project: **Settings → Domains**
2. Type your domain, e.g. `yourdomain.com`, click **Add**
3. Choose the redirect behaviour when prompted. **Recommended:** add
   `yourdomain.com` as primary and let Vercel redirect `www` to it. Pick one and
   redirect the other — serving both as canonical splits your SEO.
4. Vercel now displays the DNS records you must create. **Leave this tab open.**

### 3.2 Create the DNS records at your registrar

Open your registrar in another tab and find the DNS management panel:

- **Namecheap:** Domain List → Manage → Advanced DNS
- **Cloudflare:** select domain → DNS → Records
- **Porkbun:** Details → DNS Records
- **GoDaddy:** My Products → DNS

Add exactly what Vercel showed you. Typically:

| Type | Name / Host | Value | TTL |
|---|---|---|---|
| `A` | `@` | `76.76.21.21` | Automatic |
| `CNAME` | `www` | `cname.vercel-dns.com` | Automatic |

Notes that trip people up:

- `@` means the bare domain itself. Some registrars want it blank instead.
- Do **not** type your domain into the Name field. `@` or blank, not `yourdomain.com`.
- Delete any pre-existing "parking" or placeholder `A`/`CNAME` records for `@`
  and `www`. Conflicting records are the most common cause of failure.
- **Cloudflare users:** set the proxy toggle (orange cloud) to **DNS only** (gray).
  Proxying in front of Vercel causes redirect loops and certificate errors.
- Use the values Vercel shows *you* — the IP above is current at time of writing
  but Vercel can change it.

### 3.3 Wait for propagation

Back in Vercel's Domains tab, the status becomes **Valid Configuration** once the
records resolve. Usually 5–30 minutes; occasionally up to 48 hours.

Check progress from a terminal:

```bash
dig yourdomain.com +short        # should return Vercel's IP
dig www.yourdomain.com +short    # should return cname.vercel-dns.com
```

Vercel provisions the HTTPS certificate automatically once DNS validates. You do
not buy or install an SSL certificate.

---

## PART 4 — Point the site at its own domain

**This step is mandatory and easy to forget.** DNS now routes visitors to your
site, but the site still *describes itself* using whatever `NEXT_PUBLIC_SITE_URL`
was at build time. If that is still the placeholder, every canonical tag, every
schema `@id` and every sitemap entry advertises the wrong domain — which tells
Google your content belongs somewhere else.

1. **Settings → Environment Variables**
2. Edit `NEXT_PUBLIC_SITE_URL` to `https://yourdomain.com`
3. Update `NEXT_PUBLIC_CONTACT_EMAIL` too, if it used the placeholder domain
4. Go to **Deployments**, open the latest, click **⋯ → Redeploy**
5. Uncheck **Use existing Build Cache** so the values are genuinely recompiled

### Verify it actually took

```bash
curl -s https://yourdomain.com | grep -o '<link rel="canonical"[^>]*>'
curl -s https://yourdomain.com/sitemap.xml | head -20
```

Every URL must show your real domain. If you see `example-referral-brand.com`,
the redeploy did not pick up the change — confirm the variable is set for the
**Production** environment specifically, then redeploy again.

---

## PART 5 — After launch

1. **Google Search Console** — https://search.google.com/search-console
   Add the property, verify via DNS TXT record, submit `https://yourdomain.com/sitemap.xml`
2. **Tighten the CSP.** `next.config.ts` currently allows framing from
   `https://*.e2b.app` for the sandbox preview. Change `frame-ancestors` to
   `'self'` and redeploy.
3. **Check `/robots.txt`** resolves and references your real sitemap URL.
4. **Test the form end to end** on the live domain with ZIP `29720`, and confirm
   the lead arrives wherever you expect it to.

---

## Still outstanding before this is a real business site

Deployment does not resolve these. From `REMAINING-WORK.md`:

- **Leads are stored in memory.** They are lost on every redeploy and are not
  shared between server instances. Needs Postgres.
- **Nothing is actually delivered to a contractor.** No email, SMS or CRM
  integration exists. A submitted lead reaches storage and stops there.
- **Legal copy is unreviewed.** Privacy, terms and disclosure pages are
  developer-written. The consent language is TCPA-adjacent and needs a lawyer.
- **Partner data is fictional.** `ptr_lancaster_primary` and ZIPs 29720/29721
  are test fixtures, not a real contractor with a signed agreement.

Deploying with these outstanding gives you a working-looking site that collects
real people's phone numbers and does nothing with them. Fine for review; not
fine for traffic.

---

## Troubleshooting

**"Invalid Configuration" in Vercel**
DNS records are wrong or conflicting. Delete every `A` and `CNAME` for `@` and
`www`, re-add only what Vercel specifies.

**Site loads but has no styling**
Build cache issue. Redeploy with the cache checkbox unchecked.

**Canonicals still show the placeholder domain**
The env var was not set for Production, or the redeploy reused the cache.

**Redirect loop / too many redirects**
Cloudflare proxy is on. Switch the record to DNS only (gray cloud).

**Certificate error after DNS resolves**
Give it 15 minutes; Vercel issues it automatically. Persisting beyond an hour
usually means a `CAA` record is blocking Let's Encrypt.

**Form returns 503**
`INTAKE_ENABLED` is set to `false`.
