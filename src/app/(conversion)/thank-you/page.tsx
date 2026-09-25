import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/env";

export const metadata: Metadata = pageMetadata({
  title: "Request received",
  description: "Your concrete project request has been received.",
  path: "/thank-you",
  noindex: true,
});

const NEXT_STEPS = [
  "We check your ZIP code and project type against partners with approved coverage.",
  "One eligible independent contractor is assigned and receives your request.",
  "That contractor contacts you directly to arrange a site visit and quote.",
  "If they do not acknowledge within our contracted window, the request is reassigned once to an approved backup.",
];

export default function ThankYouPage() {
  return (
    <div className="container-page py-16 md:py-24">
      <div className="max-w-2xl">
        <p className="eyebrow">Request received</p>
        <h1 className="h1 mt-4">
          Thanks — your request is in the routing queue
        </h1>
        <p className="lede mt-5">
          You will be contacted by one independent contractor, not by a call
          centre and not by us pretending to be the crew. Here is exactly what
          happens next.
        </p>
        <ol className="mt-8 space-y-4">
          {NEXT_STEPS.map((step, index) => (
            <li key={step} className="card flex gap-4 p-6">
              <span
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full font-semibold"
                style={{
                  backgroundColor: "var(--color-accent-soft)",
                  color: "var(--color-accent)",
                }}
              >
                {index + 1}
              </span>
              <span className="text-[color:var(--color-muted)]">{step}</span>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={`tel:${site.phoneE164}`} className="btn btn-primary">
            Call {site.phoneDisplay}
          </a>
          <Link href="/how-it-works" className="btn btn-secondary">
            How the referral works
          </Link>
        </div>
        <p className="mt-8 text-sm text-[color:var(--color-muted)]">
          Reminder: we are a referral service, not a concrete contractor.
          Pricing, scheduling, and the contract itself are between you and the
          contractor assigned to your area.
        </p>
      </div>
    </div>
  );
}
