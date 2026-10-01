import type { Metadata } from "next";
import Image from "next/image";
import { JsonLd } from "@/components/seo/JsonLd";
import { QuoteForm } from "@/components/lead/QuoteForm";
import { ReferralDisclosureStrip, Section } from "@/components/marketing/sections";
import { publishedServices } from "@/content/services";
import { site } from "@/lib/env";
import { Breadcrumbs } from "@/components/marketing/service-sections";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbNode, buildGraph, webPageNode } from "@/lib/schema/graph";
import { CALL_DISCLOSURE } from "@/lib/seo/disclosure";

const TITLE = "Contact Us | Concrete Referrals in Lancaster, SC";
const DESCRIPTION =
  "Call or send a request and we will route it to an independent third party concrete service provider serving your covered area.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/contact",
});

export default function ContactPage() {
  const graph = buildGraph([
    webPageNode("/contact", TITLE, DESCRIPTION),
    breadcrumbNode("/contact", [
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ]),
  ]);

  return (
    <>
      <JsonLd data={graph} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Contact" }]} />
      <div
        className="border-b"
        style={{
          borderColor: "var(--color-line-soft)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <div className="container-page py-12 text-center md:py-16 lg:text-left">
          <p className="eyebrow before:hidden lg:before:block">Contact</p>
          <h1 className="h1 mx-auto mt-5 max-w-3xl lg:mx-0">
            Contact Our Lancaster, SC Concrete Referral Team
          </h1>
          <p className="lede mx-auto mt-5 max-w-2xl lg:mx-0">
            We can confirm whether we have approved coverage for your area
            before you go any further.
          </p>
        </div>
      </div>
      <ReferralDisclosureStrip />
      <Section>
        <h2 className="sr-only">Contact details and referral request</h2>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="text-center lg:text-left">
            <p className="lede mx-auto max-w-prose lg:mx-0">
              We are the referral service, not the contractor. Our referral team can tell
              you whether we have approved coverage for your area and what
              happens after you submit a request. Questions about a quote, a
              schedule, or completed work belong with the contractor assigned to
              you.
            </p>
            <dl className="mt-8 space-y-5">
              <div>
                <dt className="eyebrow justify-center before:hidden lg:justify-start lg:before:block">
                  Phone
                </dt>
                <dd className="mt-1">
                  <a href={`tel:${site.phoneE164}`} className="text-xl font-semibold">
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow justify-center before:hidden lg:justify-start lg:before:block">
                  Email
                </dt>
                <dd className="mt-1">
                  <a href={`mailto:${site.email}`} className="text-lg">{site.email}</a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow justify-center before:hidden lg:justify-start lg:before:block">
                  Coverage today
                </dt>
                <dd className="mt-1 text-[color:var(--color-muted)]">
                  Lancaster, SC.
                </dd>
              </div>
            </dl>
            <Image
              src="/contact-front-walkway.webp"
              alt="Concrete front walkway and entry steps leading to the porch of a brick home in late afternoon light"
              width={900}
              height={491}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="mt-8 h-48 w-full rounded-[16px] object-cover md:h-56"
            />
            <p className="mx-auto mt-8 max-w-prose text-xs leading-relaxed text-[color:var(--color-muted)] lg:mx-0">
              {CALL_DISCLOSURE} We publish no street address because we are an
              online referral business, not a contracting premises.
            </p>
          </div>
          <div>
            <QuoteForm
              services={publishedServices.map((s) => ({ slug: s.slug, name: s.name }))}
              consentVersion={site.consentVersion}
              fallbackDisplay={site.phoneDisplay}
              fallbackE164={site.phoneE164}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
