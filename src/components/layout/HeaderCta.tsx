"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Header call-to-action.
 *
 * Hidden on the routes listed below at the publisher's request. Everywhere
 * else it points at /contact, which carries a real form.
 */
const HIDDEN_ON: ReadonlySet<string> = new Set(["/how-it-works", "/privacy"]);

export function HeaderCta() {
  const pathname = usePathname();
  if (HIDDEN_ON.has(pathname)) return null;

  return (
    <Link href="/contact" className="btn btn-primary">
      Request a referral
    </Link>
  );
}
