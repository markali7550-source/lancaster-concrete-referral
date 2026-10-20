import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo/metadata";
import { PHOTO_COPY_WASH, PHOTO_SCRIM } from "@/components/marketing/sections";
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
    body: "Our team reviews your location and project type.",
  },
  {
    title: "Local specialist contacts you",
    body: "Our local team is reviewing your project details and will be in touch shortly.",
  },
  {
    title: "Site visit and quote",
    body: "A matched local contractor contacts you directly to schedule a free on site consultation and provide a clear estimate.",
  },
];

export default function ThankYouPage() {
  return (
    <div className="container-page py-16 md:py-24">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="cta-photo relative isolate overflow-hidden rounded-[var(--radius-card)] px-6 py-10 text-center md:px-10 md:py-12 lg:text-left">
          <Image
            src="/images/thank-you/thank-you.webp"
            alt="Thank you written in colorful chalk on a concrete sidewalk"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="-z-20 object-cover"
          />
          <div className={`absolute inset-0 -z-10 ${PHOTO_SCRIM} ${PHOTO_COPY_WASH}`} aria-hidden="true" />
          <div className="relative">
          <p className="eyebrow">Request received</p>
          <h1 className="h1 mt-4">Thank you! Your request has been received.</h1>
          <p className="lede mt-5">
            Our team coordinates your request and connects you with a licensed local contractor, who will reach out directly.
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
            If we cannot reach you promptly, our team follows up. Your contractor contracts with you directly for the work.
          </p>
        </div>
      </div>
    </div>
  );
}
