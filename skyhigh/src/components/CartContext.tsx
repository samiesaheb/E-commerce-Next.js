'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { CartItem } from '@/types/cart';

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
  cartCount: number;
  increaseQuantity: (item: CartItem) => void;
  decreaseQuantity: (item: CartItem) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = 'skyhigh-cart';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // ✅ Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_KEY);
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // ✅ Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.slug === item.slug);
      if (existing) {
        return prev.map(i =>
          i.slug === item.slug ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (item: CartItem) => {
    setCartItems(prev => prev.filter(i => i.slug !== item.slug));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const increaseQuantity = (item: CartItem) => {
    setCartItems(prev =>
      prev.map(i =>
        i.slug === item.slug ? { ...i, quantity: (i.quantity || 1) + 1 } : i
      )
    );
  };

  const decreaseQuantity = (item: CartItem) => {
    setCartItems(prev =>
      prev
        .map(i =>
          i.slug === item.slug
            ? { ...i, quantity: (i.quantity || 1) - 1 }
            : i
        )
        .filter(i => (i.quantity || 1) > 0)
    );
  };

  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
