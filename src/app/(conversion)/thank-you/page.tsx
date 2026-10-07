import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/env";

export const metadata: Metadata = pageMetadata({
  title: "Request Received | Next Steps for Your Concrete Referral",
  description:
    "Your referral request has been received. A participating service provider serving your covered area may contact you directly to arrange a site visit.",
  path: "/thank-you",
  noindex: true,
});

const NEXT_STEPS = [
  "We check your location and project type against participating providers with approved coverage.",
  "One independent third party service provider is assigned and receives your request.",
  "That provider contacts you directly to arrange a site visit and quote.",
  "If they do not acknowledge within our contracted window, the request is reassigned once to an approved backup.",
];

export default function ThankYouPage() {
  return (
    <div className="container-page py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
        {/* The form's own success card is the receipt: it already says
            "Request received", names the routing queue and shows the reference
            number. Arriving here by pressing "What happens next" and reading a
            second receipt made the two screens read as one sentence said
            twice. This page answers the question the button asks. */}
        <p className="eyebrow">
          What happens next
        </p>
        <h1 className="h1 mt-4">
          How your request reaches a contractor
        </h1>
        <p className="lede mt-5">
          You will be contacted by one independent service provider, not by a call
          center and not by us pretending to be the crew.
        </p>
        {/* Rows are start-aligned. justify-center here only bit the one step
            whose text fits on a single line, centring that row and pushing its
            number 42px right of the other three. */}
        <ol className="mt-8 space-y-4">
          {NEXT_STEPS.map((step, index) => (
            <li key={step} className="card flex gap-4 p-6 text-left">
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
        <div className="mx-auto mt-8 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center lg:mx-0 lg:justify-start">
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
