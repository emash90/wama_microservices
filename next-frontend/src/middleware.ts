import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;
  console.log("auth token", token)

  const protectedRoutes = ["/tenants", "/houses", "/payments", "/reports", "/"];

  if (!token && protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/authentication/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/tenants/:path*", "/houses/:path*", "/payments/:path*", "/reports/:path*", "/"],
};
