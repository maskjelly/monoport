// import { useSession } from "next-auth/react";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export default function middleware(request: NextRequest) {
//   const { data: session, status } = useSession();
//   const pathname = request.nextUrl.pathname;
//   console.log("Middleware running for:", pathname);

//   // Define protected routes
//   const protectedRoutes = ["/dashboard", "/admin" , "/public"];
//   const isProtectedRoute = protectedRoutes.some((route) =>
//     pathname.startsWith(route)
//   );

//   if (isProtectedRoute || status) {
//     // Check for NextAuth session token in cookies
//     const sessionToken =
//       request.cookies.get("authjs.session-token") ||
//       request.cookies.get("next-auth.session-token") ||
//       request.cookies.get("__Secure-next-auth.session-token");

//     // If no session token exists, redirect to sign-in
//     if (!sessionToken || !status) {
//       const signinUrl = new URL("/api/auth/signin", request.url);
//       signinUrl.searchParams.set("redirect", pathname); // Redirect back after sign-in
//       return NextResponse.redirect(signinUrl);
//     }
//   }

//   // If session exists or route isn’t protected, proceed
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/admin/:path*" , "/public/:path*"],
// };


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log("Middleware running for:", pathname);

  // Define protected routes
  const protectedRoutes = ["/dashboard", "/admin", "/public"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Get session token from cookies with secret
    const session = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in .env
    });

    // If no session exists, redirect to sign-in
    if (!session) {
      const signinUrl = new URL("/api/auth/signin", request.url);
      signinUrl.searchParams.set("redirect", pathname); // Redirect back after sign-in
      return NextResponse.redirect(signinUrl);
    }
  }

  // If session exists or route isn’t protected, proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/public/:path*"],
};
