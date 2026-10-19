import type { Metadata } from "next";
import { LegalPage } from "../LegalLayout";
import { pageMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/env";

export const metadata: Metadata = pageMetadata({
  title: `Terms of Use | ${site.brand}`,
  description:
    "Terms governing use of the Lancaster Concrete Connect website, including the limits of our role and the absence of any warranty on contractor work.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use" updated="October 15, 2026" currentPath="/terms">
      <h2>Service scope</h2>
      <p>
        {site.brand} is a project coordination service that connects homeowners
        with trusted, licensed local concrete contractors in Lancaster County,
        South Carolina. We provide project coordination and free estimate
        routing. We are not a concrete contractor, builder, engineer,
        or government agency, and we are not a party to any agreement you enter
        into with a contractor.
      </p>

      <hr className="my-8 border-t border-[var(--color-line-soft)] md:my-12" />
      <h2>Contracts for concrete work</h2>
      <p>
        The contractual agreement for concrete work is made directly between you
        and the licensed local contractor. Pricing, scope, schedule, workmanship,
        and payment terms are set in that agreement, not by {site.brand}. The
        construction contract, and any liability arising from the construction
        work, remain between you and the licensed local contractor.
      </p>

      <hr className="my-8 border-t border-[var(--color-line-soft)] md:my-12" />
      <h2>No warranty</h2>
      <p>
        We make no warranty, express or implied, regarding any contractor&apos;s
        licensing status, insurance, availability, pricing, workmanship, or
        timeline. Information on the Lancaster Concrete Connect website is general and is not professional,
        legal, or engineering advice.
      </p>

      <hr className="my-8 border-t border-[var(--color-line-soft)] md:my-12" />
      <h2>Your responsibilities</h2>
      <ul>
        <li>Provide accurate project and contact information.</li>
        <li>Verify contractor credentials and insurance before hiring.</li>
        <li>Negotiate and sign your contract directly with the contractor.</li>
      </ul>

      <hr className="my-8 border-t border-[var(--color-line-soft)] md:my-12" />
      <h2>Availability</h2>
      <p>
        Coverage is limited to published, approved areas. We may decline or stop
        arranging a request at any time, including where no eligible contractor is
        available.
      </p>

      <hr className="my-8 border-t border-[var(--color-line-soft)] md:my-12" />
      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
