"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  type: "venda" | "locacao" | "servico";
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  vendor: string;
  category: string;
  quantity?: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  type: "cliente" | "vendedor" | "admin";
}

interface StoreState {
  // User
  user: User | null;
  setUser: (user: User | null) => void;
  updateUserType: (type: "cliente" | "vendedor" | "admin") => void;

  // Wishlist
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;

  // Cart
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // User
      user: null,
      setUser: (user) => set({ user }),
      updateUserType: (type) =>
        set((state) => ({
          user: state.user ? { ...state.user, type } : null,
        })),

      // Wishlist
      wishlist: [],
      addToWishlist: (product) =>
        set((state) => ({
          wishlist: state.wishlist.find((item) => item.id === product.id)
            ? state.wishlist
            : [...state.wishlist, product],
        })),
      removeFromWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== productId),
        })),
      isInWishlist: (productId) => {
        const state = get();
        return state.wishlist.some((item) => item.id === productId);
      },

      // Cart
      cart: [],
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
              ),
            };
          }
          return {
            cart: [...state.cart, { ...product, quantity: 1 }],
          };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),
      updateCartQuantity: (productId, quantity) =>
        set((state) => ({
          cart:
            quantity <= 0
              ? state.cart.filter((item) => item.id !== productId)
              : state.cart.map((item) => (item.id === productId ? { ...item, quantity } : item)),
        })),
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        const state = get();
        return state.cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
      },
      getCartItemsCount: () => {
        const state = get();
        return state.cart.reduce((total, item) => total + (item.quantity || 1), 0);
      },
    }),
    {
      name: "fest-store",
    }
  )
);
