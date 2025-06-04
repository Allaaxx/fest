"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWishlist } from "@/components/providers/wishlist-provider";
import { useCart } from "@/components/providers/cart-provider";
import { useState, useEffect } from "react";

interface WishlistSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WishlistSidebar({ isOpen, onClose }: WishlistSidebarProps) {
  const { state, removeFromWishlist } = useWishlist();
  const { dispatch } = useCart();
  const [show, setShow] = useState(isOpen);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Pequeno delay para garantir que o translate-x-0 seja aplicado após o render
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
      const timeout = setTimeout(() => setShouldRender(false), 300); // igual ao duration-300
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const addToCart = (item: any) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        type: item.type,
        image: item.image,
      },
    });
    removeFromWishlist(item.id);
  };

  if (!shouldRender) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ease-in-out ${
          show ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl flex flex-col transition-transform duration-300 ease-in-out ${
          show ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-fest-black2 flex items-center">
            <Heart className="h-5 w-5 mr-2" />
            Wishlist ({state.items.length})
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <Heart className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                Wishlist vazia
              </h3>
              <p className="text-gray-500 mb-4">
                Adicione produtos aos seus favoritos
              </p>
              <Button
                onClick={onClose}
                className="bg-fest-primary hover:bg-fest-dark text-white"
              >
                Explorar Produtos
              </Button>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {state.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 p-3 border rounded-lg"
                >
                  <Link href={`/produto/${item.id}`} onClick={onClose}>
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-lg object-cover"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link href={`/produto/${item.id}`} onClick={onClose}>
                      <h4 className="font-medium text-fest-black2 truncate hover:text-fest-primary">
                        {item.name}
                      </h4>
                    </Link>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {item.type === "locacao"
                          ? "Locação"
                          : item.type === "venda"
                          ? "Venda"
                          : "Serviço"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-fest-primary">
                        R$ {item.price.toFixed(2)}
                      </span>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addToCart(item)}
                        >
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Adicionar
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-700"
                          onClick={() => removeFromWishlist(item.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
