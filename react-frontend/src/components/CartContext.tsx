import React, { createContext, useContext, useState } from 'react';

interface CartContextData {
  cartItems: any[];
  setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
  totalPrice: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}

const CartContext = createContext<CartContextData | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, totalPrice, setTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};