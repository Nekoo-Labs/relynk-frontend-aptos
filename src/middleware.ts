import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const appDomain = process.env.APP_DOMAIN || "app.localhost";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const url = req.nextUrl;

  // ✅ Detect app domain (local + prod)
  const isAppDomain = host.startsWith(appDomain);

  // 🧭 Handle requests from app domain
  if (isAppDomain) {
    // If user tries to visit landing routes on app domain, redirect
    if (url.pathname === "/" || url.pathname.startsWith("/landing")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Don’t rewrite if already inside /dashboard routes
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
      return NextResponse.redirect(`http://app.${host}${url.pathname}`);
    }

    // Otherwise serve as normal
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
