import { NextResponse, type NextRequest } from "next/server";

/**
 * §3.5 removed-route policy: 301 only where a close replacement exists,
 * 410 for confirmed permanent removal without one.
 */
const PERMANENT_REDIRECTS: Record<string, string> = {
  "/concrete-driveways": "/services/concrete-driveways",
  "/concrete-patios": "/services/concrete-patios",
  "/lancaster": "/locations/lancaster-sc",
};

const GONE = new Set<string>([]);

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const replacement = PERMANENT_REDIRECTS[path];
  if (replacement) {
    return NextResponse.redirect(new URL(replacement, request.url), 301);
  }

  if (GONE.has(path)) {
    return new NextResponse("Gone", { status: 410 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:jpg|png|svg|webp|avif)$).*)"],
};
