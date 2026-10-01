import type { Metadata } from "next";
import { LegalPage } from "../LegalLayout";
import { pageMetadata } from "@/lib/seo/metadata";
import { FULL_DISCLOSURE_PARAGRAPHS, SC_LLR_URL } from "@/lib/seo/disclosure";
import { site } from "@/lib/env";

export const metadata: Metadata = pageMetadata({
  title: `Referral Disclosure | ${site.brand}`,
  description:
    "Full disclosure of our role as a referral service, how we are compensated, and what we do not do.",
  path: "/referral-disclosure",
});

export default function ReferralDisclosurePage() {
  return (
    <LegalPage title="Referral disclosure" updated="24 September 2026" currentPath="/referral-disclosure">
      {FULL_DISCLOSURE_PARAGRAPHS.map((paragraph) => (
        <p key={paragraph} className="text-[color:var(--color-ink)]">
          {paragraph}
        </p>
      ))}

      <h2>Our role</h2>
      <p>
        {site.brand} operates an online referral service. We collect project
        enquiries from homeowners and route them to independent contractors who
        hold an active agreement with us and who have approved coverage for the
        relevant area and project type.
      </p>

      <h2>What we do not do</h2>
      <ul>
        <li>We do not perform, supervise, inspect, or manage construction work.</li>
        <li>We do not warrant or guarantee any contractor&apos;s work, pricing, or timeline.</li>
        <li>We do not hold a contractor licence and do not act as a general contractor.</li>
        <li>We are not a party to the contract you sign with a contractor.</li>
      </ul>

      <h2>How we are paid</h2>
      <p>
        Contractors pay us a percentage commission on revenue they actually
        collect from completed work that originated from our referral.
        Commission is calculated on collected revenue after contractually
        excluded taxes, refunds, and chargebacks. Nothing is charged to the
        homeowner, and commission is never calculated from a call, an enquiry,
        an estimate, or an unpaid invoice.
      </p>

      <h2>Verification is your right</h2>
      <p>
        Our partner checks are internal routing controls, not an endorsement.
        South Carolina requirements vary by project type, scope, and total cost.
        Verify licence and registration status directly through{" "}
        <a href={SC_LLR_URL} rel="noopener noreferrer nofollow" target="_blank">
          SC LLR
        </a>{" "}
        and request current insurance evidence before you hire anyone.
      </p>
    </LegalPage>
  );
}
