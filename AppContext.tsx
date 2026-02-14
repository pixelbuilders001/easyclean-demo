
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Category, View, Order, ServiceItem } from './types';
import { MOCK_ORDERS } from './data';

interface AppContextType {
  currentView: View;
  setView: (view: View) => void;
  selectedCategory: Category | null;
  setSelectedCategory: (cat: Category | null) => void;
  cart: CartItem[];
  addToCart: (item: ServiceItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  deleteOrder: (id: string) => void;
  lastOrder: Order | null;
  setLastOrder: (order: Order) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setView] = useState<View>('HOME');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS as any);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  const addToCart = (item: ServiceItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(0, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const clearCart = () => setCart([]);

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    setLastOrder(order);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  return (
    <AppContext.Provider value={{
      currentView, setView,
      selectedCategory, setSelectedCategory,
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      orders, addOrder, updateOrderStatus, deleteOrder,
      lastOrder, setLastOrder
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
