import type { Metadata } from "next";
import { LegalPage } from "../LegalLayout";
import { pageMetadata } from "@/lib/seo/metadata";
import { FULL_DISCLOSURE_PARAGRAPHS, SC_LLR_URL } from "@/lib/seo/disclosure";
import { site } from "@/lib/env";

const TITLE = "Service Disclosure";
const PATH = "/service-disclosure";

export const metadata: Metadata = pageMetadata({
  title: `${TITLE} | ${site.brand}`,
  description:
    "How we work with our trusted local concrete contractors in Lancaster, SC, what we do and do not do, and how we are compensated. Read before you request a quote.",
  path: PATH,
});

export default function ServiceDisclosurePage() {
  return (
    <LegalPage title={TITLE} updated="October 15, 2026" currentPath={PATH}>
      {FULL_DISCLOSURE_PARAGRAPHS.map((paragraph) => (
        <p key={paragraph} className="text-[color:var(--color-ink)]">
          {paragraph}
        </p>
      ))}

      <h2>How your request is handled</h2>
      <p>
        Our local team checks each project request against the areas and
        service types that one of our trusted local concrete contractors has
        agreed to cover. When a request fits, we send your details to one local
        concrete specialist, who contacts you to schedule the project. Each
        contractor works under its own license, insurance and contract with you.
      </p>

      <hr className="my-8 border-t border-[var(--color-line-soft)] md:my-12" />
      <h2>What we do not do</h2>
      <ul>
        <li>We do not perform, supervise, inspect, or manage construction work.</li>
        <li>We do not warrant or guarantee any contractor&apos;s work, pricing, or timeline.</li>
        <li>We do not hold a contractor license and do not act as a general contractor.</li>
        <li>We are not a party to the contract you sign with your contractor.</li>
      </ul>

      <hr className="my-8 border-t border-[var(--color-line-soft)] md:my-12" />
      <h2>How we are compensated</h2>
      <p>
        Contractors in our network pay us a commission on revenue they collect
        from completed projects that began through this site. The commission is
        calculated on collected revenue after contractually excluded taxes,
        refunds and chargebacks. Nothing is charged to the homeowner, and no
        commission is based on a call, an inquiry, an estimate or an unpaid
        invoice.
      </p>

      <hr className="my-8 border-t border-[var(--color-line-soft)] md:my-12" />
      <h2>Verification is your right</h2>
      <p>
        Our coverage checks are internal and are not an endorsement of any
        contractor. South Carolina requirements vary by project type, scope, and
        total cost. Verify license and registration status directly through{" "}
        <a href={SC_LLR_URL} rel="noopener noreferrer nofollow" target="_blank">
          SC LLR
        </a>{" "}
        and request current insurance evidence before you hire anyone.
      </p>

      <hr className="my-8 border-t border-[var(--color-line-soft)] md:my-12" />
      <h2>Photography</h2>
      <p>
        Photographs on this site illustrate the kind of work our trusted local
        contractors perform. They do not show jobs completed by Lancaster
        Concrete Connect, and we do not perform concrete work ourselves. Where a
        contractor&apos;s own project photos appear, we confirm ownership and
        permission first.
      </p>
    </LegalPage>
  );
}
