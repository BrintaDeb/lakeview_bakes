"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Product, ProductVariant } from "@/types";

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    product: Product,
    variant?: ProductVariant,
    quantity?: number,
    customOptions?: { size?: string; eggless?: boolean; messageOnCake?: string }
  ) => void;
  addCustomItem: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  subtotal: number;
  deliveryFee: number;
  total: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem("lakeview_cart");
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem("lakeview_cart", JSON.stringify(cart));
      } catch (e) {
        console.error("Failed to save cart to localStorage", e);
      }
    }
  }, [cart, isMounted]);

  const addToCart = (
    product: Product,
    variant?: ProductVariant,
    quantity: number = 1,
    customOptions?: { size?: string; eggless?: boolean; messageOnCake?: string }
  ) => {
    const selectedVariant = variant || product.variants[0] || {
      id: `${product.id}-default`,
      title: customOptions?.size ? `${customOptions.size} / ${customOptions.eggless ? "Eggless" : "Regular"}` : "Standard",
      price: product.price_min || 1200,
      available: true,
    };

    const itemId = `${product.id}-${selectedVariant.id}-${customOptions?.eggless ? "eggless" : "regular"}-${customOptions?.messageOnCake || ""}`;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === itemId);
      if (existing) {
        return prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        const newItem: CartItem = {
          id: itemId,
          productId: product.id,
          variantId: selectedVariant.id,
          title: product.title,
          variantTitle: selectedVariant.title,
          price: selectedVariant.price,
          quantity,
          image: product.image,
          size: customOptions?.size || "1 kg",
          eggless: customOptions?.eggless ?? true,
          messageOnCake: customOptions?.messageOnCake || "",
        };
        return [...prevCart, newItem];
      }
    });

    setIsCartOpen(true);
  };

  const addCustomItem = (item: CartItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (existing) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prevCart, item];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 1500 || subtotal === 0 ? 0 : 99;
  const total = subtotal + deliveryFee;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        addCustomItem,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        subtotal,
        deliveryFee,
        total,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
