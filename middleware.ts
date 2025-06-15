import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "um-segredo-forte-aqui";

export async function middleware(request: NextRequest) {
  // Tenta pegar o token JWT do cookie do NextAuth
  const token =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  let userRole = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(JWT_SECRET)
      );
      userRole = payload.role || null;
    } catch (e) {
      // Token inválido/expirado
    }
  }

  // Exemplo: bloqueia acesso à /autenticar para qualquer usuário autenticado
  if (userRole && request.nextUrl.pathname.startsWith("/autenticar")) {
    // Redireciona para dashboard específico por role
    if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    if (userRole === "VENDEDOR") {
      return NextResponse.redirect(new URL("/vendedor/dashboard", request.url));
    }
    // Default: CLIENTE
    return NextResponse.redirect(new URL("/cliente/dashboard", request.url));
  }

  // Exemplo: proteger rotas de dashboard por role
  if (
    request.nextUrl.pathname.startsWith("/admin/dashboard") &&
    userRole !== "ADMIN"
  ) {
    return NextResponse.redirect(new URL("/autenticar", request.url));
  }
  if (
    request.nextUrl.pathname.startsWith("/vendedor/dashboard") &&
    userRole !== "VENDEDOR"
  ) {
    return NextResponse.redirect(new URL("/autenticar", request.url));
  }
  if (
    request.nextUrl.pathname.startsWith("/cliente/dashboard") &&
    userRole !== "CLIENTE"
  ) {
    return NextResponse.redirect(new URL("/autenticar", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/autenticar/:path*",
    "/admin/dashboard/:path*",
    "/vendedor/dashboard/:path*",
    "/cliente/dashboard/:path*",
  ],
};
