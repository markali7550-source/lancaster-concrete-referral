import { siteConfig } from "@/config/site";
import { publishedLocations } from "@/content/locations";
import { services } from "@/content/services";

/**
 * Immediate owner notification for every valid quote-form submission.
 *
 * Delivery uses Resend's REST API through `fetch`, so no SDK is needed.
 * Without RESEND_API_KEY the formatted lead is logged to the server console
 * instead. The function never throws: a notification failure must not turn a
 * successful customer submission into an error response.
 */

export type LeadOutcome = "routed" | "no_coverage";

export interface LeadEmailInput {
  leadId: string;
  submittedAt: Date;
  outcome: LeadOutcome;
  serviceSlug: string;
  postalCode: string;
  fullName: string;
  contactPreference: "call" | "text" | "email";
  phone?: string;
  email?: string;
  note?: string;
  marketingConsent: boolean;
  consentVersion: string;
  sourcePath: string;
}

export interface LeadEmail {
  subject: string;
  text: string;
  html: string;
}

export type NotificationResult = "sent" | "logged" | "failed";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const SEND_TIMEOUT_MS = 8000;

export function serviceNameFor(slug: string): string {
  return services.find((s) => s.slug === slug)?.name ?? slug;
}

/** City for an approved ZIP, or null when the ZIP is not in a published area. */
export function cityForZip(postalCode: string): string | null {
  return (
    publishedLocations.find((l) => l.zips.includes(postalCode))?.city ?? null
  );
}

export function notificationRecipient(): string {
  return process.env.LEAD_NOTIFICATION_EMAIL || siteConfig.leadNotificationEmail;
}

function notificationSender(): string {
  return (
    process.env.LEAD_EMAIL_FROM || "Lead alerts <onboarding@resend.dev>"
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatTimestamp(date: Date): string {
  const local = date.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    dateStyle: "medium",
    timeStyle: "short",
  });
  return `${local} Pacific (${date.toISOString()})`;
}

/** Ordered rows shared by the plain-text and HTML bodies. */
function leadRows(input: LeadEmailInput): Array<[string, string]> {
  const city = cityForZip(input.postalCode);
  const routing =
    input.outcome === "routed"
      ? "Assigned to a participating provider"
      : "NO PROVIDER ASSIGNED. Not in a listed area or no eligible provider. Not stored.";
  const phone = input.phone?.trim() ? input.phone.trim() : "Not provided";
  const email = input.email?.trim() ? input.email.trim() : "Not provided";

  return [
    ["Routing", routing],
    ["Lead ID", input.leadId],
    ["Submitted", formatTimestamp(input.submittedAt)],
    ["Full name", input.fullName],
    ["Phone", phone],
    ["Email", email],
    ["Preferred contact", input.contactPreference],
    ["Service requested", serviceNameFor(input.serviceSlug)],
    ["Project details", input.note?.trim() ? input.note.trim() : "(none given)"],
    ["Postal code", input.postalCode],
    ["City", city ?? "Not in a listed area"],
    ["Service consent", `Given (${input.consentVersion})`],
    ["Marketing consent", input.marketingConsent ? "Yes" : "No"],
    ["Source page", input.sourcePath],
  ];
}

export function buildLeadEmail(input: LeadEmailInput): LeadEmail {
  const city = cityForZip(input.postalCode);
  const subject = `New Concrete Lead: ${serviceNameFor(input.serviceSlug)} - ${
    city ? `${city} ${input.postalCode}` : input.postalCode
  }`;

  const rows = leadRows(input);
  const text = [
    "New concrete lead",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
  ].join("\n");

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;vertical-align:top;color:#555;white-space:nowrap"><strong>${escapeHtml(label)}</strong></td><td style="padding:6px 0;vertical-align:top">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#111"><h2 style="margin:0 0 12px">New concrete lead</h2><table role="presentation" cellspacing="0" cellpadding="0">${htmlRows}</table></body></html>`;

  return { subject, text, html };
}

/**
 * Sends the owner notification. Resolves to "sent" (Resend accepted it),
 * "logged" (no API key, so the lead was written to the server log), or
 * "failed" (Resend rejected it or was unreachable; the lead is logged too).
 */
export async function sendLeadNotification(
  input: LeadEmailInput,
): Promise<NotificationResult> {
  const email = buildLeadEmail(input);
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn(
      "[lead-email] RESEND_API_KEY is not set. Lead logged here instead of emailed.",
    );
    console.log(`[lead-email] ${email.subject}\n${email.text}`);
    return "logged";
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: notificationSender(),
        to: [notificationRecipient()],
        subject: email.subject,
        text: email.text,
        html: email.html,
        // Replying in the mail client goes straight to the customer.
        ...(input.email?.trim() ? { reply_to: input.email.trim() } : {}),
      }),
      signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error(
        `[lead-email] Resend returned HTTP ${response.status}. Lead ${input.leadId} logged below.`,
      );
      console.log(`[lead-email] ${email.subject}\n${email.text}`);
      return "failed";
    }
    return "sent";
  } catch (error) {
    const name = error instanceof Error ? error.name : "UnknownError";
    console.error(
      `[lead-email] Delivery failed (${name}). Lead ${input.leadId} logged below.`,
    );
    console.log(`[lead-email] ${email.subject}\n${email.text}`);
    return "failed";
  }
}
