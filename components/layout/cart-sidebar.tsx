"use client";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/components/providers/cart-provider";
import { useState, useEffect } from "react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { state, dispatch } = useCart();
  const [show, setShow] = useState(isOpen);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
      const timeout = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
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
            <ShoppingCart className="h-5 w-5 mr-2" />
            Carrinho ({state.items.length})
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                Carrinho vazio
              </h3>
              <p className="text-gray-500 mb-4">
                Adicione produtos para começar suas compras
              </p>
              <Button
                onClick={onClose}
                className="bg-fest-primary hover:bg-fest-dark text-white"
              >
                Continuar Comprando
              </Button>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {state.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 p-3 border rounded-lg"
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-fest-black2 truncate">
                      {item.name}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {item.type === "locacao"
                          ? "Locação"
                          : item.type === "venda"
                          ? "Venda"
                          : "Serviço"}
                      </Badge>
                      {item.startDate && item.endDate && (
                        <span className="text-xs text-gray-500">
                          {new Date(item.startDate).toLocaleDateString("pt-BR")}{" "}
                          - {new Date(item.endDate).toLocaleDateString("pt-BR")}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-fest-primary">
                        R$ {item.price.toFixed(2)}
                      </span>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(0, item.quantity - 1)
                            )
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-700"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold text-fest-primary">
                R$ {state.total.toFixed(2)}
              </span>
            </div>

            <div className="space-y-2">
              <Button
                className="w-full bg-fest-primary hover:bg-fest-dark text-white"
                asChild
              >
                <Link href="/checkout" onClick={onClose}>
                  Finalizar Compra
                </Link>
              </Button>
              <Button variant="outline" className="w-full" onClick={onClose}>
                Continuar Comprando
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
