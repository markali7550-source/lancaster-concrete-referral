import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/env";

export const metadata: Metadata = pageMetadata({
  title: "Request Received | Next Steps for Your Concrete Project",
  description:
    "Your request has been received. A local team serving your area may contact you directly to arrange a site visit.",
  path: "/thank-you",
  noindex: true,
});

const STEPS = [
  {
    title: "Request reviewed",
    body: "We check your location and project type against participating providers with approved coverage.",
  },
  {
    title: "Local specialist contacts you",
    body: "Our local team is reviewing your project details and will be in touch shortly.",
  },
  {
    title: "Site visit and quote",
    body: "The contractor matched to your area arranges a site visit and gives you a quote. Pricing and the contract are between you and that contractor.",
  },
];

export default function ThankYouPage() {
  return (
    <div className="container-page py-16 md:py-24">
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="text-center lg:text-left">
          <p className="eyebrow">Request received</p>
          <h1 className="h1 mt-4">Thank you! Your request has been received.</h1>
          <p className="lede mt-5">
            One independent local service provider will contact you directly. We are not a
            call center, and we do not act as the provider.
          </p>
          <div className="mx-auto mt-8 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center lg:mx-0 lg:justify-start">
            <a href={`tel:${site.phoneE164}`} className="btn btn-primary">
              Call {site.phoneDisplay}
            </a>
            <Link href="/how-it-works" className="btn btn-secondary">
              How it works
            </Link>
          </div>
        </div>

        <div>
          <p className="eyebrow">Next steps</p>
          <ol className="mt-5 space-y-4">
            {STEPS.map((step, index) => (
              <li key={step.title} className="card flex gap-4 p-6 text-left">
                <span
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full font-semibold"
                  style={{
                    backgroundColor: "var(--color-accent-soft)",
                    color: "var(--color-accent)",
                  }}
                >
                  {index + 1}
                </span>
                <span>
                  <span className="block font-semibold">{step.title}</span>
                  <span className="mt-1 block text-[color:var(--color-muted)]">{step.body}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-[color:var(--color-muted)]">
            If the provider does not acknowledge within our contracted window, the request is
            reassigned once to an approved backup. The team that does the work is independent
            and contracts with you directly.
          </p>
        </div>
      </div>
    </div>
  );
}
