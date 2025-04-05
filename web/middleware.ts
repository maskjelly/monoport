import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export function middleware(request: NextRequest) {
  const authSessionToken =
    request.cookies.get("authjs.session-token") || // this is for Development Environment
    request.cookies.get("__Secure-authjs.session-token") // this is for Prod Environment

  const url = request.nextUrl;

  const protectedRoutes = ["/dashboard"];

  if (!authSessionToken && protectedRoutes.some((route) => url.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/api/auth/signin", url));
  }
  return NextResponse.next();
}
