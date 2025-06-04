"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SearchOverlay } from "./search-overlay";
import { CartSidebar } from "./cart-sidebar";
import { WishlistSidebar } from "./wishlist-sidebar";
import { useCart } from "@/components/providers/cart-provider";
import { useWishlist } from "@/components/providers/wishlist-provider";
import { useAuth } from "@/components/providers/auth-provider";
import { cn } from "@/lib/utils";
import React from "react";

function NavbarBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [animate, setAnimate] = React.useState(false);
  const prevChildren = React.useRef(children);

  React.useEffect(() => {
    if (prevChildren.current !== children) {
      setAnimate(false);
      void document.body.offsetWidth;
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 400);
      prevChildren.current = children;
      return () => clearTimeout(timeout);
    }
    prevChildren.current = children;
  }, [children]);

  return (
    <Badge className={cn(className, animate && "animate-bounce-once")}>
      {children}
    </Badge>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const { state: cartState } = useCart();
  const { state: wishlistState } = useWishlist();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? "bg-fest-black2 shadow-sm " : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <img src="/logo2.png" alt="Logo" className="h-12 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className={`${
                  isScrolled ? "text-white " : "text-gray-700"
                } hover:text-fest-primary font-medium transition-colors`}
              >
                Início
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`${
                      isScrolled ? "text-white " : "text-gray-700"
                    } hover:text-fest-primary font-medium`}
                  >
                    Categorias
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg">
                  <DropdownMenuItem>
                    <Link href="/categoria/venda">Venda</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/categoria/locacao">Locação</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/categoria/servicos">Serviços</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link
                href="/blog"
                className={`${
                  isScrolled ? "text-white " : "text-gray-700"
                } hover:text-fest-primary font-medium transition-colors`}
              >
                Blog
              </Link>
              <Link
                href="/contato"
                className={`${
                  isScrolled ? "text-white " : "text-gray-700"
                } hover:text-fest-primary font-medium transition-colors`}
              >
                Contato
              </Link>
              <Link
                href="/loja"
                className={`${
                  isScrolled ? "text-white " : "text-gray-700"
                } hover:text-fest-primary font-medium transition-colors`}
              >
                Loja
              </Link>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className={`${
                  isScrolled ? "text-white " : "text-gray-700"
                } hover:text-fest-primary hover:bg-gray-100`}
              >
                <Search className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className={`relative ${
                  isScrolled ? "text-white " : "text-gray-700"
                } hover:text-fest-primary hover:bg-gray-100`}
                onClick={() => setIsWishlistOpen(true)}
              >
                <Heart className="h-5 w-5" />
                <NavbarBadge
                  className={`absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-fest-primary text-white transition-all duration-200 ${
                    wishlistState.items.length === 0
                      ? "opacity-0 scale-0"
                      : "opacity-100 scale-100"
                  }`}
                >
                  {wishlistState.items.length}
                </NavbarBadge>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className={`relative ${
                  isScrolled ? "text-white " : "text-gray-700"
                } hover:text-fest-primary hover:bg-gray-100`}
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                <NavbarBadge
                  className={`absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-fest-primary text-white transition-all duration-200 ${
                    cartState.items.length === 0
                      ? "opacity-0 scale-0"
                      : "opacity-100 scale-100"
                  }`}
                >
                  {cartState.items.length}
                </NavbarBadge>
              </Button>

              {/* User Authentication */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`${
                        isScrolled ? "text-white " : "text-gray-700"
                      } hover:text-fest-primary hover:bg-gray-100`}
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-white border border-gray-200 shadow-lg"
                  >
                    <DropdownMenuItem>
                      <Link href="/cliente/dashboard">Minha Conta</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/cliente/pedidos">Meus Pedidos</Link>
                    </DropdownMenuItem>
                    {user.type === "vendedor" && (
                      <DropdownMenuItem>
                        <Link href="/vendedor/dashboard">Área do Vendedor</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={logout}>Sair</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`${
                      isScrolled ? "text-white " : "text-gray-700"
                    } hover:text-fest-primary hover:bg-gray-100`}
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className={`md:hidden ${
                  isScrolled ? "text-white " : "text-gray-700"
                } hover:text-fest-primary hover:bg-gray-100`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div
              className={`md:hidden transition-all duration-300 ${
                isScrolled ? "bg-fest-black2 shadow-sm " : "bg-white"
              } border-t border-gray-100`}
            >
              <div className="px-4 py-4 space-y-4">
                <Link
                  href="/"
                  className={`block py-2 ${
                    isScrolled ? "text-white " : "text-gray-700"
                  } hover:text-fest-primary font-medium`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Início
                </Link>
                <Link
                  href="/categoria/venda"
                  className={`block py-2 ${
                    isScrolled ? "text-white " : "text-gray-700"
                  } hover:text-fest-primary font-medium`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Venda
                </Link>
                <Link
                  href="/categoria/locacao"
                  className={`block py-2 ${
                    isScrolled ? "text-white " : "text-gray-700"
                  } hover:text-fest-primary font-medium`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Locação
                </Link>
                <Link
                  href="/categoria/servicos"
                  className={`block py-2 ${
                    isScrolled ? "text-white " : "text-gray-700"
                  } hover:text-fest-primary font-medium`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Serviços
                </Link>
                <Link
                  href="/blog"
                  className={`block py-2 ${
                    isScrolled ? "text-white " : "text-gray-700"
                  } hover:text-fest-primary font-medium`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/contato"
                  className={`block py-2 ${
                    isScrolled ? "text-white " : "text-gray-700"
                  } hover:text-fest-primary font-medium`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contato
                </Link>
                <Link
                  href="/loja"
                  className={`block py-2 ${
                    isScrolled ? "text-white " : "text-gray-700"
                  } hover:text-fest-primary font-medium`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Loja
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Overlays and Sidebars */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistSidebar
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />
    </>
  );
}
