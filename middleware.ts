import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {
  const token = req.nextauth.token as any;
  const role = token?.role;
  const path = req.nextUrl.pathname;

  // if (path.startsWith("/admin/dashboard") && role !== "ADMIN") {
  //   return NextResponse.redirect(new URL("/autenticar", req.url));
  // }
  // if (path.startsWith("/vendedor/dashboard") && role !== "VENDEDOR") {
  //   return NextResponse.redirect(new URL("/autenticar", req.url));
  // }
  // if (path.startsWith("/cliente/dashboard") && role !== "CLIENTE") {
  //   return NextResponse.redirect(new URL("/autenticar", req.url));
  // }
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/vendedor/dashboard/:path*",
    "/cliente/dashboard/:path*",
  ],
};
