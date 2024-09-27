import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Redirect to a different page (like '/dashboard') if the user is authenticated and tries to visit sign-in or home (root)
  if (token && url.pathname === "/sign-in") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If the user is already authenticated and on the home page, allow them to stay on the home page
  if (token && url.pathname === "/") {
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Middleware configuration to apply it on specific routes
export const config = {
  matcher: ["/sign-in", "/"],
};
