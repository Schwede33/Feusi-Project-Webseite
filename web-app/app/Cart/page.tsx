'use client';

import { useCart } from '@/app/context/CartContext';

// Define CartItem type if not imported from elsewhere
type CartItem = {
  ProductID: number;
  ProductName: string;
  UnitPrice: number;
  quantity: number;
};

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce(
    (sum, p) => sum + p.UnitPrice * p.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-14">
      <h1 className="text-3xl font-bold mb-8">🛒 Warenkorb</h1>

     <p>Warenkorb ist leer</p>

        {cart.map((item: CartItem) => (
          <div
            key={item.ProductID}
            className="flex justify-between items-center border-b py-4"
          >
            <div>
            <h2 className="font-semibold">{item.ProductName}</h2>
            <p className="text-sm text-zinc-500">
              {item.quantity} × CHF {item.UnitPrice.toFixed(2)}
            </p>
            </div>

            <button
            onClick={() => removeFromCart(item.ProductID)}
            className="text-red-500 hover:underline"
            >
            Entfernen
            </button>
          </div>
        ))}

        {cart.length > 0 && (
        <>
          <p className="mt-6 text-xl font-bold">
            Total: CHF {total.toFixed(2)}
          </p>

          <button
            onClick={clearCart}
            className="mt-4 rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
          >
            Bestellung abschicken
          </button>
        </>
      )}
    </div>
  );
}
