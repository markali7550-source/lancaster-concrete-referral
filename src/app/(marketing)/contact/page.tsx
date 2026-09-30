import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { QuoteForm } from "@/components/lead/QuoteForm";
import { ReferralDisclosureStrip, Section } from "@/components/marketing/sections";
import { publishedServices } from "@/content/services";
import { site } from "@/lib/env";
import { Breadcrumbs } from "@/components/marketing/service-sections";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbNode, buildGraph, webPageNode } from "@/lib/schema/graph";
import { CALL_DISCLOSURE } from "@/lib/seo/disclosure";

const TITLE = `Contact ${site.brand} | Lancaster, SC Concrete Referrals`;
const DESCRIPTION =
  "Call or send a request and we will route it to an independent third-party concrete service provider serving your covered area.";

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
          <h1 className="h1 mx-auto mt-5 max-w-3xl lg:mx-0">Talk to our referral team</h1>
          <p className="lede mx-auto mt-5 max-w-2xl lg:mx-0">
            We can confirm whether we have approved coverage for your area
            before you go any further.
          </p>
        </div>
      </div>
      <ReferralDisclosureStrip />
      <Section>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          <div>
            <p className="lede max-w-prose">
              We are the referral service, not the contractor. Our referral team can tell
              you whether we have approved coverage for your area and what
              happens after you submit a request. Questions about a quote, a
              schedule, or completed work belong with the contractor assigned to
              you.
            </p>
            <dl className="mt-8 space-y-5">
              <div>
                <dt className="eyebrow">Phone</dt>
                <dd className="mt-1">
                  <a href={`tel:${site.phoneE164}`} className="text-xl font-semibold">
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${site.email}`} className="text-lg">{site.email}</a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Coverage today</dt>
                <dd className="mt-1 text-[color:var(--color-muted)]">
                  Lancaster, SC.
                </dd>
              </div>
            </dl>
            <p className="mt-8 max-w-prose text-xs leading-relaxed text-[color:var(--color-muted)]">
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
