import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, MenuItem } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: MenuItem, restaurantId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
  restaurantId: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children?: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeRestaurantId, setActiveRestaurantId] = useState<string | null>(null);

  const addToCart = (item: MenuItem, restaurantId: string) => {
    // If adding from a different restaurant, clear cart first (simple rule for MVP)
    if (activeRestaurantId && activeRestaurantId !== restaurantId) {
      if (window.confirm('הוספת פריט ממסעדה אחרת תמחק את הסל הנוכחי. להמשיך?')) {
        setCartItems([]);
        setActiveRestaurantId(restaurantId);
      } else {
        return;
      }
    } else {
      setActiveRestaurantId(restaurantId);
    }

    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1, restaurantId }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => {
      const newCart = prev.filter(i => i.id !== itemId);
      if (newCart.length === 0) setActiveRestaurantId(null);
      return newCart;
    });
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === itemId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setActiveRestaurantId(null);
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, itemCount, restaurantId: activeRestaurantId }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};