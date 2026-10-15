import {
  OUT_OF_AREA_POSTAL_CODE,
  serviceAreaOptions,
} from "@/content/locations";
import type { Metadata } from "next";
import Image from "next/image";
import { JsonLd } from "@/components/seo/JsonLd";
import { QuoteForm } from "@/components/lead/QuoteForm";
import { Section } from "@/components/marketing/sections";
import { publishedServices } from "@/content/services";
import { site } from "@/lib/env";
import { Breadcrumbs } from "@/components/marketing/service-sections";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbNode, buildGraph, webPageNode } from "@/lib/schema/graph";
import { CALL_DISCLOSURE } from "@/lib/seo/disclosure";

const TITLE = "Contact Lancaster Concrete Connect | Lancaster, SC";
const DESCRIPTION =
  "Get in touch with Lancaster Concrete for professional residential and commercial concrete services in Lancaster, SC. Request a free quote or call today.";

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
      <div
        className="cta-photo relative isolate overflow-hidden border-b"
        style={{ borderColor: "var(--color-line-soft)" }}
      >
        <Image
          src="/images/contact/contact-hero.webp"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="-z-20 object-cover"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0B1017]/88 via-[#0B1017]/78 to-[#0B1017]/88 lg:bg-gradient-to-r lg:from-[#0B1017]/92 lg:via-[#0B1017]/80 lg:to-[#0B1017]/38"
          aria-hidden="true"
        />
        <div className="container-page py-12 md:py-16">
          <Breadcrumbs
            overlay
            items={[{ name: "Home", path: "/" }, { name: "Contact" }]}
          />
          <p className="eyebrow">Contact</p>
          <h1 className="h1 mt-5 max-w-3xl">
            Contact Our Lancaster, SC Concrete Team
          </h1>
          <p className="lede mt-5 max-w-2xl">
            We can confirm whether we have approved coverage for your area
            before you go any further.
          </p>
        </div>
      </div>
      <Section>
        <h2 className="sr-only">Contact details and service request</h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="text-left">
            <p className="lede max-w-prose">
              Our team can tell you whether we have a local team for your area and what happens after you submit a request. Questions about a quote, a schedule, or completed work belong with the contractor assigned to you.
            </p>
            <dl className="mt-8 space-y-5">
              <div>
                <dt className="eyebrow">
                  Phone
                </dt>
                <dd className="mt-1">
                  <a
                    href={`tel:${site.phoneE164}`}
                    className="-my-2 inline-block py-2 text-xl font-semibold"
                  >
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${site.email}`}
                    className="-my-2 inline-block py-2 text-lg [overflow-wrap:anywhere]"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">
                  Coverage today
                </dt>
                <dd className="mt-1">
                  <span className="-my-2 inline-block py-2 text-lg">
                    Lancaster, SC
                  </span>
                </dd>
              </div>
            </dl>
            <p className="mt-8 max-w-prose text-xs leading-relaxed text-[color:var(--color-muted)]">
              {CALL_DISCLOSURE} We publish no street address because we are an
              online service business, not a contracting premises.
            </p>
          </div>
          <div>
            <QuoteForm
              services={publishedServices.map((s) => ({ slug: s.slug, name: s.name }))}
              serviceAreas={serviceAreaOptions}
                outOfAreaValue={OUT_OF_AREA_POSTAL_CODE}
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
