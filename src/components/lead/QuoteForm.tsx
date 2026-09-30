"use client";

import { useId, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { LEAD_FORM_DISCLOSURE, SERVICE_CONSENT } from "@/lib/seo/disclosure";
import { track } from "@/lib/analytics/events";
import { attributionForLead } from "@/domain/attribution/client";
import { serviceAreaOptions } from "@/content/locations";

export interface QuoteFormServiceOption {
  slug: string;
  name: string;
}

interface QuoteFormProps {
  services: QuoteFormServiceOption[];
  defaultServiceSlug?: string;
  consentVersion: string;
  fallbackDisplay: string;
  fallbackE164: string;
}

type Status =
  | "idle"
  | "submitting"
  | "success"
  | "api_failure"
  | "no_coverage";

type Errors = Record<string, string>;

/** The form collects name, email, phone and details. The server contract still
 *  carries a preference, so it is pinned rather than asked for. */
const contactOptions = [{ value: "email", label: "Email" }] as const;

function newIdempotencyKey(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `key-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function QuoteForm({
  services,
  defaultServiceSlug,
  consentVersion,
  fallbackDisplay,
  fallbackE164,
}: QuoteFormProps) {
  const baseId = useId();
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [leadId, setLeadId] = useState<string | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const idempotencyKey = useRef<string>(newIdempotencyKey());

  // Values are held in state so they survive every recoverable error.
  const [values, setValues] = useState({
    serviceSlug: defaultServiceSlug ?? services[0]?.slug ?? "",
    postalCode: "",
    fullName: "",
    contactPreference: "email" as (typeof contactOptions)[number]["value"],
    phone: "",
    email: "",
    note: "",
    serviceConsent: false,
  });

  const started = useRef(false);

  const STEP_ONE_FIELDS = ["serviceSlug", "postalCode"] as const;

  function clearError(key: string) {
    setErrors((previous) => {
      if (!(key in previous)) return previous;
      const next = { ...previous };
      delete next[key];
      return next;
    });
  }

  function set<K extends keyof typeof values>(
    key: K,
    value: (typeof values)[K],
  ) {
    if (!started.current) {
      started.current = true;
      track("quote_start", { form_instance: baseId });
    }
    setValues((previous) => ({ ...previous, [key]: value }));
    // Correcting a field clears its message immediately, and retires a stale
    // submit-failure banner so it cannot outlive the input that caused it.
    clearError(key);
    setStatus((previous) => (previous === "api_failure" ? "idle" : previous));
  }

  function focusSummary() {
    requestAnimationFrame(() => summaryRef.current?.focus());
  }

  function validateStepOne(): Errors {
    const next: Errors = {};
    if (!values.serviceSlug) next.serviceSlug = "Choose a project type.";
    if (!values.postalCode) next.postalCode = "Choose your location.";
    return next;
  }

  function validateStepTwo(): Errors {
    const next: Errors = {};
    if (values.fullName.trim().length < 2)
      next.fullName = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Enter a valid email address.";
    }
    // Must mirror the server rule exactly: 10 digits, or 11 starting with 1.
    const digits = values.phone.replace(/\D/g, "");
    if (!(digits.length === 10 || (digits.length === 11 && digits.startsWith("1")))) {
      next.phone = "Enter a 10 digit US phone number, with or without the leading 1.";
    }
    if (!values.serviceConsent)
      next.serviceConsent = "Consent is required so a contractor can contact you.";
    return next;
  }

  function onContinue() {
    const found = validateStepOne();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      track("quote_validation_error", {
        step: 1,
        fields: Object.keys(found).join(","),
      });
      focusSummary();
      return;
    }
    track("quote_step_complete", { step: 1 });
    setStep(2);
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (status === "submitting") return;
    const found = { ...validateStepOne(), ...validateStepTwo() };
    setErrors(found);
    if (Object.keys(found).length > 0) {
      track("quote_validation_error", {
        step: 2,
        fields: Object.keys(found).join(","),
      });
      // Send the user to the step that owns the problem, otherwise the
      // summary links point at inputs that are not currently rendered.
      if (STEP_ONE_FIELDS.some((field) => field in found)) setStep(1);
      focusSummary();
      return;
    }

    setStatus("submitting");
    track("lead_submit_attempt", { request_id: idempotencyKey.current.slice(0, 8) });
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": idempotencyKey.current,
        },
        body: JSON.stringify({
          serviceSlug: values.serviceSlug,
          postalCode: values.postalCode,
          fullName: values.fullName,
          contactPreference: values.contactPreference,
          phone: values.phone || undefined,
          email: values.email || undefined,
          note: values.note || undefined,
          serviceConsent: true,
          // No marketing opt-in is offered on the form.
          marketingConsent: false,
          consentVersion,
          sourcePath:
            typeof window === "undefined" ? "/" : window.location.pathname,
          attribution: attributionForLead(),
        }),
      });

      if (response.status === 202) {
        const data = (await response.json()) as { leadId: string };
        setLeadId(data.leadId);
        setStatus("success");
        track("lead_accepted", { lead_id: data.leadId });
        return;
      }
      if (response.status === 422) {
        setStatus("no_coverage");
        track("lead_no_coverage", { zip_provided: true });
        return;
      }
      if (response.status === 503) {
        setStatus("api_failure");
        track("lead_submit_failure", { error_class: "intake_disabled", retryable: false });
        return;
      }
      if (response.status === 400) {
        const data = (await response.json()) as {
          fields?: { field: string; message: string }[];
        };
        const serverErrors: Errors = {};
        for (const item of data.fields ?? []) {
          serverErrors[item.field] = item.message;
        }
        setErrors(serverErrors);
        setStatus("idle");
        if (STEP_ONE_FIELDS.some((field) => field in serverErrors)) setStep(1);
        focusSummary();
        return;
      }
      setStatus("api_failure");
      track("lead_submit_failure", { error_class: "http_error", retryable: true });
    } catch {
      setStatus("api_failure");
      track("lead_submit_failure", { error_class: "network", retryable: true });
    }
  }

  const errorEntries = Object.entries(errors);

  if (status === "success") {
    return (
      <div id="quote-form" className="card scroll-mt-32 p-6 md:p-8" role="status">
        <p className="eyebrow">Request received</p>
        <h3 className="mt-2 text-2xl font-semibold">
          Your request is with our routing team
        </h3>
        <p className="mt-3 text-[color:var(--color-muted)]">
          An independent contractor serving your area will contact you
          directly. We are not the contractor and do not set pricing or
          schedules.
        </p>
        <p className="mt-4 text-sm text-[color:var(--color-muted)]">
          Reference:{" "}
          <span className="font-mono text-[color:var(--color-ink)]">
            {leadId}
          </span>
        </p>
        <a href="/thank-you" className="btn btn-primary mt-6 w-full sm:w-auto">
          What happens next
          <Icon name="arrow" />
        </a>
      </div>
    );
  }

  if (status === "no_coverage") {
    return (
      <div id="quote-form" className="card scroll-mt-32 p-6 md:p-8" role="status">
        <p className="eyebrow">No approved contractor yet</p>
        <h3 className="mt-2 text-2xl font-semibold">
          We do not cover that area today
        </h3>
        <p className="mt-3 text-[color:var(--color-muted)]">
          Nothing was sent to a contractor. We only route requests to partners
          who have explicitly approved your area, so we would rather tell you
          plainly than pass your details to someone who cannot help.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={`tel:${fallbackE164}`}
            className="btn btn-primary w-full sm:w-auto"
          >
            <Icon name="phone" />
            Call {fallbackDisplay}
          </a>
          <button
            type="button"
            className="btn btn-secondary w-full sm:w-auto"
            onClick={() => {
              idempotencyKey.current = newIdempotencyKey();
              setStatus("idle");
              setStep(1);
            }}
          >
            Change location
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="card scroll-mt-32 p-5 md:p-6"
      onSubmit={onSubmit}
      noValidate
      id="quote-form"
    >
      <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-left">
        <div>
          <p className="eyebrow">Step {step} of 2</p>
          <h3 className="mt-1 text-xl font-semibold md:text-2xl">
            {step === 1 ? "Your project and location" : "How to reach you"}
          </h3>
        </div>
        <div className="flex gap-1.5" aria-hidden="true">
          <span
            className="h-1.5 w-10 rounded-full"
            style={{ backgroundColor: "var(--color-accent)" }}
          />
          <span
            className="h-1.5 w-10 rounded-full"
            style={{
              backgroundColor:
                step === 2 ? "var(--color-accent)" : "var(--color-line)",
            }}
          />
        </div>
      </div>

      <div
        ref={summaryRef}
        tabIndex={-1}
        role={errorEntries.length > 0 ? "alert" : undefined}
        className={
          errorEntries.length > 0
            ? "mt-5 rounded-[12px] border p-4"
            : "sr-only"
        }
        style={
          errorEntries.length > 0
            ? {
                borderColor: "var(--color-danger)",
                color: "var(--color-danger)",
              }
            : undefined
        }
      >
        {errorEntries.length > 0 ? (
          <>
            <p className="font-semibold">
              Fix {errorEntries.length}{" "}
              {errorEntries.length === 1 ? "item" : "items"} to continue
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
              {errorEntries.map(([field, message]) => (
                <li key={field}>
                  <a href={`#${baseId}-${field}`} className="underline">
                    {message}
                  </a>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>

      {step === 1 ? (
        <div className="mt-4 space-y-3.5">
          <fieldset>
            <legend className="text-sm font-semibold">Project type</legend>
            <div className="mt-1.5 grid grid-cols-1 gap-2 min-[380px]:grid-cols-2">
              {services.map((service) => {
                const checked = values.serviceSlug === service.slug;
                return (
                  <label
                    key={service.slug}
                    className="flex min-h-12 cursor-pointer items-center gap-3 rounded-[12px] border p-3 text-sm font-medium"
                    style={{
                      borderColor: checked
                        ? "var(--color-accent)"
                        : "var(--color-line)",
                      backgroundColor: checked
                        ? "var(--color-accent-soft)"
                        : "transparent",
                    }}
                  >
                    <input
                      type="radio"
                      name="serviceSlug"
                      value={service.slug}
                      checked={checked}
                      onChange={() => set("serviceSlug", service.slug)}
                      className="h-4 w-4"
                      id={
                        service.slug === services[0]?.slug
                          ? `${baseId}-serviceSlug`
                          : undefined
                      }
                    />
                    {service.name}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div>
            <label
              htmlFor={`${baseId}-postalCode`}
              className="text-sm font-semibold"
            >
              Location
            </label>
            <select
              id={`${baseId}-postalCode`}
              name="postalCode"
              className="field mt-1.5"
              value={values.postalCode}
              aria-invalid={Boolean(errors.postalCode)}
              aria-describedby={
                errors.postalCode ? `${baseId}-postalCode-error` : undefined
              }
              onChange={(event) => set("postalCode", event.target.value)}
            >
              <option value="">Select your location</option>
              {serviceAreaOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.postalCode ? (
              <p
                id={`${baseId}-postalCode-error`}
                className="mt-1.5 text-sm"
                style={{ color: "var(--color-danger)" }}
              >
                {errors.postalCode}
              </p>
            ) : null}
          </div>

          <button
            type="button"
            className="btn btn-primary w-full"
            onClick={onContinue}
          >
            Continue
            <Icon name="arrow" />
          </button>
        </div>
      ) : (
        <div className="mt-4 space-y-3.5">
          <div>
            <label
              htmlFor={`${baseId}-fullName`}
              className="text-sm font-semibold"
            >
              Full name
            </label>
            <input
              id={`${baseId}-fullName`}
              name="fullName"
              autoComplete="name"
              className="field mt-1.5"
              value={values.fullName}
              aria-invalid={Boolean(errors.fullName)}
              onChange={(event) => set("fullName", event.target.value)}
            />
            {errors.fullName ? (
              <p className="mt-1.5 text-sm" style={{ color: "var(--color-danger)" }}>
                {errors.fullName}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor={`${baseId}-email`} className="text-sm font-semibold">
              Email
            </label>
            <input
              id={`${baseId}-email`}
              name="email"
              type="email"
              autoComplete="email"
              className="field mt-1.5"
              value={values.email}
              aria-invalid={Boolean(errors.email)}
              onChange={(event) => set("email", event.target.value)}
            />
            {errors.email ? (
              <p
                className="mt-1.5 text-sm"
                style={{ color: "var(--color-danger)" }}
              >
                {errors.email}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor={`${baseId}-phone`} className="text-sm font-semibold">
              Phone
            </label>
            <input
              id={`${baseId}-phone`}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className="field mt-1.5"
              value={values.phone}
              aria-invalid={Boolean(errors.phone)}
              onChange={(event) => set("phone", event.target.value)}
            />
            {errors.phone ? (
              <p
                className="mt-1.5 text-sm"
                style={{ color: "var(--color-danger)" }}
              >
                {errors.phone}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor={`${baseId}-note`} className="text-sm font-semibold">
              Project details{" "}
              <span className="font-normal text-[color:var(--color-muted)]">
                (optional)
              </span>
            </label>
            <textarea
              id={`${baseId}-note`}
              name="note"
              rows={2}
              className="field mt-1.5"
              value={values.note}
              onChange={(event) => set("note", event.target.value)}
            />
          </div>

          <div id="consent-section" className="space-y-2">
            <label
              className="flex gap-3 text-sm"
              htmlFor={`${baseId}-serviceConsent`}
            >
              <input
                id={`${baseId}-serviceConsent`}
                name="serviceConsent"
                type="checkbox"
                className="mt-0.5 h-5 w-5 shrink-0"
                checked={values.serviceConsent}
                aria-invalid={Boolean(errors.serviceConsent)}
                onChange={(event) =>
                  set("serviceConsent", event.target.checked)
                }
              />
              <span>{SERVICE_CONSENT}</span>
            </label>
            {errors.serviceConsent ? (
              <p className="text-sm" style={{ color: "var(--color-danger)" }}>
                {errors.serviceConsent}
              </p>
            ) : null}
          </div>

          {status === "api_failure" ? (
            <p
              role="alert"
              className="rounded-[12px] border p-3 text-sm"
              style={{
                borderColor: "var(--color-danger)",
                color: "var(--color-danger)",
              }}
            >
              We could not submit your request. Your details are still here.
              Try again, or call {fallbackDisplay}.
            </p>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row-reverse">
            <button
              type="submit"
              className="btn btn-primary w-full sm:flex-1"
              disabled={status === "submitting"}
              aria-busy={status === "submitting"}
            >
              {status === "submitting" ? "Sending…" : "Request a referral"}
            </button>
            <button
              type="button"
              className="btn btn-secondary w-full sm:w-auto"
              onClick={() => setStep(1)}
              disabled={status === "submitting"}
            >
              Back
            </button>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs leading-relaxed text-[color:var(--color-muted)]">
        {LEAD_FORM_DISCLOSURE}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-[color:var(--color-muted)]">
        Submitting this form does not create a contract, a price, or a booking.
        We are a referral service, not a concrete contractor.
      </p>
    </form>
  );
}
