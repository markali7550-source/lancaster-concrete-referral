import Link from "next/link";
import { Breadcrumbs } from "@/components/marketing/service-sections";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: title }]} />
      <div
        className="border-b"
        style={{
          borderColor: "var(--color-line-soft)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <div className="container-page py-12 md:py-16">
          <p className="eyebrow">Legal</p>
          <h1 className="h1 mt-5 max-w-3xl">{title}</h1>
          <p className="mt-4 text-sm text-[color:var(--color-muted)]">
            Last updated {updated}. Draft language pending counsel review.
          </p>
        </div>
      </div>

      <div className="container-page py-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,44rem)_1fr]">
          <article className="space-y-6 text-[15.5px] leading-relaxed text-[color:var(--color-muted)] [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-12 [&_h2]:text-[1.25rem] [&_h2]:font-semibold [&_h2]:text-[color:var(--color-ink)] [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
            {children}
          </article>
          <aside className="lg:pt-2">
            <div className="card p-6 lg:sticky lg:top-[5.5rem]">
              <p className="eyebrow-plain">Related</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link href="/referral-disclosure">Referral disclosure</Link>
                </li>
                <li>
                  <Link href="/privacy">Privacy policy</Link>
                </li>
                <li>
                  <Link href="/terms">Terms of use</Link>
                </li>
                <li>
                  <Link href="/how-it-works">How the referral works</Link>
                </li>
              </ul>
              <p className="mt-6 border-t pt-5 text-[13px] leading-relaxed text-[color:var(--color-muted)] hairline">
                We are a referral service, not a concrete contractor. Nothing on
                this page creates a contract between you and us for construction
                work.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
