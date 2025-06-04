import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/components/providers/cart-provider";
import { WishlistProvider } from "@/components/providers/wishlist-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Toaster } from "sonner";
import { BodyScrollFixer } from "@/components/body-scroll-fixer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fest",
  description:
    "Plataforma completa para venda, locação e serviços para eventos",
  icons: {
    icon: "/logo2.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <BodyScrollFixer />
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <Navbar />
              {children}
              <Footer />
              <Toaster position="top-right" richColors />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
