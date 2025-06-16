"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { BodyScrollFixer } from "@/components/body-scroll-fixer";
import { AuthProvider } from "@/components/providers/auth-provider";
import { WishlistProvider } from "@/components/providers/wishlist-provider";
import { CartProvider } from "@/components/providers/cart-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "sonner";
import React from "react";

function SessionLogger() {
  const { data: session, status } = useSession();
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("[CLIENT LAYOUT] status:", status, "session:", session);
  }, [status, session]);
  return null;
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <SessionLogger />
      <BodyScrollFixer />
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <Navbar />
            {children}
            <Footer />
            <Toaster position="bottom-center" richColors />
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
