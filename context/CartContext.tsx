import { createContext, useState } from "react";
import { CartProduct } from "@/types/Interfaces";

interface CartContextType {
  cart: CartProduct[];
  addItem: (item: CartProduct) => void;
  removeItem: (idProduct: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartProduct[]>([]);

  const addItem = (item: CartProduct) => {
    setCart((prev) => [...prev, item]);
  };

  const removeItem = (idProduct: number) => {
    setCart((prev) => prev.filter((p) => p.idProduct !== idProduct));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
