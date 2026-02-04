'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

/* TYPES */
type CartItem = {
  ProductID: number;
  ProductName: string;
  Price: number;
  CategoryID: number;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
};

/* CONTEXT */
const CartContext = createContext<CartContextType | undefined>(
  undefined
);

/* PROVIDER */
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

  /* INCREASE */
  function increaseQuantity(productId: number) {
    setItems(prev =>
      prev.map(i =>
        i.ProductID === productId
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  }

  /* DECREASE */
  function decreaseQuantity(productId: number) {
    setItems(prev =>
      prev
        .map(i =>
          i.ProductID === productId
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter(i => i.quantity > 0)
    );
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

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* HOOK */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      'useCart must be used within CartProvider'
    );
  }
  return context;
}

