import type { Metadata } from "next";
import { LegalPage } from "../LegalLayout";
import { pageMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/env";

export const metadata: Metadata = pageMetadata({
  title: `Privacy Policy | ${site.brand}`,
  description:
    "What we collect, why we share your request with a trusted local concrete contractor, how consent is recorded, and how to exercise your choices. Contact us with questions.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="October 15, 2026" currentPath="/privacy">
      <h2>What we collect</h2>
      <ul>
        <li>Project details you submit: project type, location, name, contact method, and any note.</li>
        <li>Consent records: the consent text version you accepted, the timestamp, and the page you accepted it on.</li>
        <li>Attribution data: traffic source, campaign parameters, landing page, and an opaque session identifier.</li>
        <li>Call events where phone tracking is active: time, duration, and call result.</li>
      </ul>

      <h2>Why we collect it</h2>
      <p>
        Customer project information is collected strictly to coordinate your
        free estimate with a trusted local Lancaster County concrete contractor.
        It is never sold to unrelated third-party marketers.
      </p>

      <h2>Why we share it</h2>
      <p>
        Your request is shared with the licensed local contractor assigned to
        your area so that they can contact you about your project. That
        contractor is a separate business and handles your information under its
        own policy. We never sell your project or contact details, and we do not
        share them with unrelated third parties for their marketing.
      </p>

      <h2>Consent</h2>
      <p>
        Service consent is required so a contractor may contact you about the
        request you submitted. Marketing consent is separate, optional, and
        never required to receive a quote. You can withdraw marketing consent at
        any time by replying to any marketing message or contacting{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Security</h2>
      <ul>
        <li>Contact values are stored with access controls and hashed for duplicate detection.</li>
        <li>Raw contact fields are not written to application logs.</li>
        <li>Integration tokens and secrets remain server side only.</li>
      </ul>

      <h2>Retention</h2>
      <p>
        Retention is set by data class: lead and consent records, attribution
        records, and financial records each carry their own schedule. The final
        schedule is subject to legal and accounting review.
      </p>

      <h2>Call recording</h2>
      <p>
        Call recording is disabled. It will not be enabled until notice,
        consent, access, retention, and cross state handling have been approved.
      </p>
    </LegalPage>
  );
}
