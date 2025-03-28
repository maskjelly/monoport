import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log("Middleware running for:", pathname);

  // Define protected routes
  const protectedRoutes = ["/dashboard", "/admin"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Check for NextAuth session token in cookies
    const sessionToken = request.cookies.get("authjs.session-token")?.value;

    // If no session token exists, redirect to sign-in
    if (!sessionToken) {
      const signinUrl = new URL("/api/auth/signin", request.url);
      signinUrl.searchParams.set("redirect", pathname); // Redirect back after sign-in
      return NextResponse.redirect(signinUrl);
    }
  }

  // If session exists or route isn’t protected, proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};