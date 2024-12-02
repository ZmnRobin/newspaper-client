import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  if (pathname === "/profile" && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  if (pathname === "/create-article" && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/edit-article" && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/create-article", "/profile", "/edit-article"],
};
