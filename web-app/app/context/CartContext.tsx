'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

/* =========================
   TYPES
========================= */
export type CartItem = {
  ProductID: number;
  ProductName: string;
  Price: number;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  cartCount: number;
};

/* =========================
   CONTEXT
========================= */
const CartContext = createContext<CartContextType | undefined>(
  undefined
);

/* =========================
   PROVIDER
========================= */
export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);

  /* ADD */
  function addToCart(
    product: Omit<CartItem, 'quantity'>
  ) {
    setItems(prev => {
      const existing = prev.find(
        i => i.ProductID === product.ProductID
      );

      if (existing) {
        return prev.map(i =>
          i.ProductID === product.ProductID
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  }

  /* REMOVE */
  function removeFromCart(productId: number) {
    setItems(prev =>
      prev.filter(i => i.ProductID !== productId)
    );
  }

  /* CLEAR */
  function clearCart() {
    setItems([]);
  }

  /* COUNT */
  const cartCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* =========================
   HOOK
========================= */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error(
      'useCart must be used within CartProvider'
    );
  }
  return ctx;
}
