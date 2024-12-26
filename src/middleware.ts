import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const isPublic = pathName === "/login" || pathName === "/signup";
  const token = request.cookies.get("token") || "";
  if (isPublic && token) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }
  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/profile", "/login", "/signup"],
};
