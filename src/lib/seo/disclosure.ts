/** Single approved disclosure source. Compliance gate 24 asserts one origin. */
export const FULL_DISCLOSURE = `Lancaster Concrete Connect is a dedicated project coordination service that connects homeowners with trusted, licensed local concrete contractors across Lancaster County, South Carolina. We are not a concrete contractor and do not perform concrete work directly. All estimates and concrete work are performed by the licensed local concrete contractors in our network, and contracts are made directly between homeowners and those contractors. We are not a residential builder, general contractor, engineer, or government agency, and we do not supervise, warrant, or guarantee construction work. Requests may be shared with the trusted local contractors serving your area. Contractor availability, licensing, insurance, pricing, and project eligibility must be confirmed with the assigned contractor. South Carolina requirements vary by project type, scope, and total cost. Verify credentials through SC LLR before hiring.`;

/** Footer disclosure. Required verbatim on every page. */
/**
 * The mandated disclosure split at a sentence boundary for rendering. The words
 * are untouched: this is `FULL_DISCLOSURE` itself, sliced, so the legal text
 * stays verbatim while no single paragraph runs long.
 */
const FULL_DISCLOSURE_SPLIT_AT = "Contractor availability,";
export const FULL_DISCLOSURE_PARAGRAPHS: readonly string[] = [
  FULL_DISCLOSURE.slice(0, FULL_DISCLOSURE.indexOf(FULL_DISCLOSURE_SPLIT_AT)).trim(),
  FULL_DISCLOSURE.slice(FULL_DISCLOSURE.indexOf(FULL_DISCLOSURE_SPLIT_AT)).trim(),
];

/** FULL_DISCLOSURE_PARAGRAPHS for non-legal pages (how-it-works): same text. */
const PUBLIC_FULL_DISCLOSURE = FULL_DISCLOSURE;
export const PUBLIC_DISCLOSURE_PARAGRAPHS: readonly string[] = [
  PUBLIC_FULL_DISCLOSURE.slice(0, PUBLIC_FULL_DISCLOSURE.indexOf(FULL_DISCLOSURE_SPLIT_AT)).trim(),
  PUBLIC_FULL_DISCLOSURE.slice(PUBLIC_FULL_DISCLOSURE.indexOf(FULL_DISCLOSURE_SPLIT_AT)).trim(),
];

export const FOOTER_DISCLOSURE = `Lancaster Concrete Connect is a dedicated project coordination service and is not a concrete contractor. We connect homeowners with trusted local concrete contractors in our network. We do not perform, supervise, or guarantee construction work. Contracts and licensing must be verified directly with the local contractor.`;

/** Shown beside the primary lead-generation form. */
export const SERVICE_DISCLOSURE = `Lancaster Concrete Connect coordinates your project and free estimate. Requests are sent to licensed local concrete specialists in our network, who set their own pricing, perform the concrete work, and enter into contracts directly with you.`;

/** Shown inside the lead form, visually secondary to the fields. */
export const LEAD_FORM_DISCLOSURE = `By submitting this form, you are requesting a free estimate that Lancaster Concrete Connect coordinates with a licensed local concrete specialist in our network, who performs the concrete work. Your project information and contact details may be shared with the specialist assigned to your area for the purpose of responding to your request.`;

/** Verbatim disclosure required on every service page. */
export const SERVICE_PAGE_DISCLOSURE = `We are a project coordination service, not a concrete contractor. We connect homeowners with trusted local concrete contractors in our network. We do not perform, supervise, or guarantee construction work. Contracts and licensing must be verified directly with the local contractor.`;

export const SHORT_DISCLOSURE = `Lancaster Concrete Connect is a dedicated project coordination service, not a concrete contractor. We connect homeowners with licensed local concrete specialists in Lancaster County, South Carolina.`;

export const CALL_DISCLOSURE = `Calls are handled directly by our Lancaster team and may be passed to a licensed local contractor in our network. Call details may be recorded for quality purposes where permitted.`;

export const SERVICE_CONSENT = `I agree that my request may be shared with a licensed local concrete contractor serving my area so they can contact me about this project.`;

export const MARKETING_CONSENT = `Optional: send me occasional project tips and offers. Not required to get a quote.`;

export const SC_LLR_URL = "https://llr.sc.gov/";
