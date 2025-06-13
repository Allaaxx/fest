import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // NextAuth usa dois possíveis nomes de cookie para session-token
  const isAuthenticated = Boolean(
    request.cookies.get("next-auth.session-token") ||
    request.cookies.get("__Secure-next-auth.session-token")
  );

  // Se tentar acessar /autenticar e já estiver autenticado, redireciona para o dashboard
  if (
    isAuthenticated &&
    request.nextUrl.pathname.startsWith("/autenticar")
  ) {
    return NextResponse.redirect(new URL("/cliente/dashboard", request.url));
  }

  // Permite o acesso normalmente para outras rotas
  return NextResponse.next();
}

export const config = {
  matcher: ["/autenticar/:path*"],
};
