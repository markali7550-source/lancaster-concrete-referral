import Image from "next/image";
import { site } from "@/lib/env";

/**
 * Brand logo. Two files are shipped because the supplied wordmark is dark ink:
 * `logo.webp` for light pages, `logo-dark.webp` for dark pages. CSS picks one.
 */
export function Logo({ height = 36 }: { height?: number }) {
  const width = Math.round((height * 1808) / 556);
  const alt = `${site.brand}, concrete referral platform`;
  return (
    <>
      <Image
        src="/logo.webp"
        alt={alt}
        width={width}
        height={height}
        priority
        className="logo-light h-auto w-auto"
        style={{ height, width: "auto" }}
      />
      <Image
        src="/logo-dark.webp"
        alt=""
        aria-hidden="true"
        width={width}
        height={height}
        priority
        className="logo-dark h-auto w-auto"
        style={{ height, width: "auto" }}
      />
    </>
  );
}
