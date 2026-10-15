import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/env";

export const metadata: Metadata = pageMetadata({
  title: "Request Received | Next Steps for Your Concrete Project",
  description:
    "Your request has been received. A local project manager from our team will contact you directly to arrange your free on-site consultation.",
  path: "/thank-you",
  noindex: true,
});

const STEPS = [
  {
    title: "Request reviewed",
    body: "Our project managers review your location and project type so we can plan your visit.",
  },
  {
    title: "Local specialist contacts you",
    body: "Our local team is reviewing your project details and will be in touch shortly.",
  },
  {
    title: "Site visit and quote",
    body: "Your project manager visits the site, confirms the scope, and gives you a transparent, written estimate with no hidden fees.",
  },
];

export default function ThankYouPage() {
  return (
    <div className="container-page py-16 md:py-24">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="text-center lg:text-left">
          <p className="eyebrow">Request received</p>
          <h1 className="h1 mt-4">Thank you! Your request has been received.</h1>
          <p className="lede mt-5">
            One of our local project managers will contact you directly. You work with our team from your free on-site consultation through the final cleanup.
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
            If we cannot reach you promptly, another member of our team follows up. Our own concrete crew does the work, and you deal directly with us from start to finish.
          </p>
        </div>
      </div>
    </div>
  );
}
