import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const appDomain = process.env.APP_DOMAIN || "app.localhost:3000";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const url = req.nextUrl;

  // Skip middleware for static assets and Next.js internals
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    url.pathname.includes(".") // Skip files with extensions
  ) {
    return NextResponse.next();
  }

  // ✅ Detect app domain (local + prod)
  const isAppDomain = host.includes(appDomain);

  // 🧭 Handle requests from app domain
  if (isAppDomain) {
    // If user tries to visit landing routes on app domain, redirect
    if (url.pathname === "/" || url.pathname.startsWith("/landing")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Don't rewrite if already inside /dashboard routes
    if (!url.pathname.startsWith("/dashboard")) {
      return NextResponse.rewrite(
        new URL(`/dashboard${url.pathname}`, req.url)
      );
    }

    // Already in correct route
    return NextResponse.next();
  }

  // 🧭 Handle requests from main domain
  else {
    // If user tries to access /dashboard on main domain → redirect to app domain
    if (url.pathname.startsWith("/dashboard")) {
      const protocol = req.nextUrl.protocol;
      const port = host.includes(":") ? `:${host.split(":")[1]}` : "";
      return NextResponse.redirect(
        `${protocol}//app.${host.split(":")[0]}${port}${url.pathname}`
      );
    }

    // Otherwise serve as normal
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)",
  ],
};
