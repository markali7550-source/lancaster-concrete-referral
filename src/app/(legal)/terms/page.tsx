import type { Metadata } from "next";
import { LegalPage } from "../LegalLayout";
import { pageMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/env";

export const metadata: Metadata = pageMetadata({
  title: `Terms of Use | ${site.brand}`,
  description:
    "Terms governing use of this referral website, including the limits of our role and the absence of any warranty on contractor work.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use" updated="24 September 2026" currentPath="/terms">
      <h2>Referral service only</h2>
      <p>
        {site.brand} provides introductions to independent contractors. We are
        not a contractor, builder, engineer, or government agency, and we are
        not a party to any agreement you enter into with a contractor.
      </p>

      <h2>No warranty</h2>
      <p>
        We make no warranty, express or implied, regarding any contractor&apos;s
        licensing status, insurance, availability, pricing, workmanship, or
        timeline. Information on this site is general and is not professional,
        legal, or engineering advice.
      </p>

      <h2>Your responsibilities</h2>
      <ul>
        <li>Provide accurate project and contact information.</li>
        <li>Verify contractor credentials and insurance before hiring.</li>
        <li>Negotiate and sign your contract directly with the contractor.</li>
      </ul>

      <h2>Availability</h2>
      <p>
        Coverage is limited to published, approved areas. We may decline or stop
        routing a request at any time, including where no eligible contractor is
        available.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
