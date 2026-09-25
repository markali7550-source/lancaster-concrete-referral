import { createHmac } from "node:crypto";

const ORIGIN = "http://localhost:3000";
let pass = 0;
let fail = 0;

function check(name, condition, detail = "") {
  if (condition) {
    pass += 1;
    console.log(`PASS  ${name}`);
  } else {
    fail += 1;
    console.log(`FAIL  ${name}  ${detail}`);
  }
}

// The dev store is in-memory but persists for the life of the server, so each
// run needs its own contact identity or run 2 trips the 30-day dedupe window.
const RUN = Date.now().toString().slice(-6);
const runPhone = `803555${RUN.slice(-4)}`;

const lead = (overrides = {}) => ({
  serviceSlug: "concrete-driveways",
  postalCode: "29720",
  fullName: "Test Person",
  contactPreference: "call",
  phone: runPhone,
  serviceConsent: true,
  marketingConsent: false,
  consentVersion: "referral-consent-2026-09-24",
  sourcePath: "/",
  attribution: { visitorId: "v1", sessionId: "s1", utmSource: "google", gclid: "abc" },
  ...overrides,
});

let ipCounter = 0;
function freshIp() {
  ipCounter += 1;
  return `10.9.${Math.floor(ipCounter / 250)}.${ipCounter % 250}`;
}

async function postLead(body, key, ip = freshIp()) {
  const response = await fetch(`${ORIGIN}/api/leads`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "idempotency-key": key,
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
  let json = null;
  try {
    json = await response.json();
  } catch {
    /* no body */
  }
  return { status: response.status, json, headers: response.headers };
}

console.log("=== POST /api/leads ===\n");

const k1 = `key-${Date.now()}-a`;
const accepted = await postLead(lead(), k1);
check("valid lead returns 202 with lead id", accepted.status === 202 && Boolean(accepted.json?.leadId), JSON.stringify(accepted.json));
check("response is no-store", accepted.headers.get("cache-control")?.includes("no-store") === true);

const replay = await postLead(lead(), k1);
check(
  "same idempotency key returns the original lead, no duplicate",
  replay.status === 202 && replay.json?.leadId === accepted.json?.leadId && replay.json?.replay === true,
  JSON.stringify(replay.json),
);

const dupe = await postLead(lead(), `key-${Date.now()}-b`);
check(
  "same contact within dedupe window is flagged duplicate",
  dupe.status === 202 && dupe.json?.duplicate === true,
  JSON.stringify(dupe.json),
);

const noKey = await fetch(`${ORIGIN}/api/leads`, {
  method: "POST",
  headers: { "content-type": "application/json", "x-forwarded-for": freshIp() },
  body: JSON.stringify(lead()),
});
check("missing idempotency key rejected", noKey.status === 400);

const badZip = await postLead(lead({ postalCode: "2972" }), `key-${Date.now()}-c`);
check("4-digit ZIP fails validation", badZip.status === 400, JSON.stringify(badZip.json));

const noConsent = await postLead(lead({ serviceConsent: false }), `key-${Date.now()}-d`);
check("missing service consent rejected", noConsent.status === 400);

const noCoverage = await postLead(
  lead({ postalCode: "28211", phone: `${runPhone.slice(0, 6)}9999`.slice(0, 10) }),
  `key-${Date.now()}-e`,
);
check(
  "unapproved ZIP returns deterministic 422 no_coverage",
  noCoverage.status === 422 && noCoverage.json?.result === "no_coverage",
  JSON.stringify(noCoverage.json),
);

const outOfScopeService = await postLead(
  lead({ serviceSlug: "foundation-repair" }),
  `key-${Date.now()}-f`,
);
check("unknown service slug rejected", outOfScopeService.status === 400);

const badJson = await fetch(`${ORIGIN}/api/leads`, {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "idempotency-key": "key-badjson-000",
    "x-forwarded-for": freshIp(),
  },
  body: "{not json",
});
check("malformed JSON rejected", badJson.status === 400);

const huge = await postLead(lead({ projectNotes: "x".repeat(20000) }), `key-${Date.now()}-h`);
check("oversized payload rejected 413", huge.status === 413, String(huge.status));

const burstIp = `10.99.${RUN.slice(-4, -2)}.${RUN.slice(-2)}`;
let sawLimit = false;
let limitedAfter = 0;
for (let i = 0; i < 12; i += 1) {
  const r = await postLead(lead({ phone: `80355510${String(i).padStart(2, "0")}` }), `burst-key-${i}-${Date.now()}`, burstIp);
  if (r.status === 429) {
    sawLimit = true;
    limitedAfter = i;
    break;
  }
}
check(`rate limiter trips on burst from one IP (at request ${limitedAfter + 1})`, sawLimit);

const getLeads = await fetch(`${ORIGIN}/api/leads`);
check("GET /api/leads is 405", getLeads.status === 405);

const errorBody = await postLead(lead({ fullName: "" }), `key-${Date.now()}-g`);
const leaks = JSON.stringify(errorBody.json ?? {}).includes(runPhone);
check("validation errors never echo submitted values", !leaks);

console.log("\n=== POST /api/tracking-number ===\n");

const dniDenied = await fetch(`${ORIGIN}/api/tracking-number`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ consent: false }),
});
const dniDeniedJson = await dniDenied.json();
check(
  "consent denied returns allocated:false and preserves fallback",
  dniDenied.status === 200 && dniDeniedJson.allocated === false && dniDeniedJson.reason === "consent_denied",
  JSON.stringify(dniDeniedJson),
);

const dniGranted = await fetch(`${ORIGIN}/api/tracking-number`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ consent: true }),
});
const dniGrantedJson = await dniGranted.json();
check(
  "empty pool degrades safely rather than erroring",
  dniGranted.status === 200 && dniGrantedJson.allocated === false && dniGrantedJson.reason === "pool_exhausted",
  JSON.stringify(dniGrantedJson),
);
check("allocation response is no-store", dniGranted.headers.get("cache-control")?.includes("no-store") === true);

const dniGet = await fetch(`${ORIGIN}/api/tracking-number`);
check("GET /api/tracking-number is 405 (state-creating must be POST)", dniGet.status === 405);

console.log("\n=== Webhooks ===\n");

function sign(body, secret, offsetSeconds = 0) {
  const ts = Math.floor(Date.now() / 1000) + offsetSeconds;
  const sig = createHmac("sha256", secret).update(`${ts}.${body}`).digest("hex");
  return { ts: String(ts), header: `t=${ts},v1=${sig}` };
}

const callBody = JSON.stringify({
  providerEventId: `evt_${Date.now()}`,
  type: "call_completed",
  callSid: "CA0001",
  durationSeconds: 92,
  occurredAt: new Date().toISOString(),
});
const callSig = sign(callBody, "dev-only-call-secret");

const callOk = await fetch(`${ORIGIN}/api/webhooks/calls`, {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "x-provider-signature": callSig.header,
    "x-provider-timestamp": callSig.ts,
  },
  body: callBody,
});
check("signed call webhook accepted", callOk.status === 200);

const callReplay = await fetch(`${ORIGIN}/api/webhooks/calls`, {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "x-provider-signature": callSig.header,
    "x-provider-timestamp": callSig.ts,
  },
  body: callBody,
});
const callReplayJson = await callReplay.json();
check("replayed call event is idempotent", callReplay.status === 200 && callReplayJson.duplicate === true);

const callForged = await fetch(`${ORIGIN}/api/webhooks/calls`, {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "x-provider-signature": "t=1,v1=deadbeef",
    "x-provider-timestamp": callSig.ts,
  },
  body: callBody,
});
check("forged call signature rejected 401", callForged.status === 401);

const staleSig = sign(callBody, "dev-only-call-secret", -600);
const callStale = await fetch(`${ORIGIN}/api/webhooks/calls`, {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "x-provider-signature": staleSig.header,
    "x-provider-timestamp": staleSig.ts,
  },
  body: callBody,
});
check("stale timestamp rejected (replay protection)", callStale.status === 401);

const unsigned = await fetch(`${ORIGIN}/api/webhooks/calls`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: callBody,
});
check("unsigned call webhook rejected", unsigned.status === 401);

const partnerBody = JSON.stringify({
  providerEventId: `pevt_${Date.now()}`,
  partnerId: "ptr_lancaster_primary",
  leadId: accepted.json?.leadId ?? "lead_x",
  fromState: "routed",
  toState: "accepted",
  occurredAt: new Date().toISOString(),
});
const partnerSig = sign(partnerBody, "dev-only-partner-secret");
const partnerOk = await fetch(`${ORIGIN}/api/webhooks/partners`, {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "x-partner-signature": partnerSig.header,
    "x-partner-timestamp": partnerSig.ts,
  },
  body: partnerBody,
});
check("valid partner state transition accepted", partnerOk.status === 200);

const badTransitionBody = JSON.stringify({
  providerEventId: `pevt_bad_${Date.now()}`,
  partnerId: "ptr_lancaster_primary",
  leadId: "lead_x",
  fromState: "routed",
  toState: "paid",
  occurredAt: new Date().toISOString(),
});
const badSig = sign(badTransitionBody, "dev-only-partner-secret");
const badTransition = await fetch(`${ORIGIN}/api/webhooks/partners`, {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "x-partner-signature": badSig.header,
    "x-partner-timestamp": badSig.ts,
  },
  body: badTransitionBody,
});
check("illegal state jump routed->paid rejected 409", badTransition.status === 409);

console.log("\n=== Headers and redirects ===\n");

const home = await fetch(`${ORIGIN}/`);
check("no X-Frame-Options blocking the preview", home.headers.get("x-frame-options") === null);
check("frame-ancestors CSP present", (home.headers.get("content-security-policy") ?? "").includes("frame-ancestors"));
check("nosniff set", home.headers.get("x-content-type-options") === "nosniff");
check("referrer policy set", Boolean(home.headers.get("referrer-policy")));

const redirect = await fetch(`${ORIGIN}/lancaster`, { redirect: "manual" });
check(
  "legacy /lancaster 301s to the published location",
  redirect.status === 301 && (redirect.headers.get("location") ?? "").endsWith("/locations/lancaster-sc"),
);

const robots = await (await fetch(`${ORIGIN}/robots.txt`)).text();
check("robots references the sitemap", robots.includes("Sitemap:"));
check("robots does not hide gated routes", !robots.includes("indian-land"));

console.log(`\n=== SUMMARY ===\n\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exitCode = 1;
