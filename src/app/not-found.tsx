import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col justify-center py-20">
      <p className="eyebrow">404</p>
      <h1 className="h1 mt-4">We do not have that page</h1>
      <p className="lede mt-5 max-w-prose">
        Service areas are published one at a time, only after a contractor has
        approved coverage there. If you were looking for a city page, it may not
        be live yet.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary">Go to the homepage</Link>
        <Link href="/locations/lancaster-sc" className="btn btn-secondary">
          Lancaster, SC
        </Link>
      </div>
    </div>
  );
}
