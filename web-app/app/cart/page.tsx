'use client';

import { useCart } from '@/app/context/CartContext';

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCart();
const totalPrice = items.reduce(
  (sum, item) => sum + item.Price * item.quantity,
  0
);
  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold mb-4">🛒 Warenkorb</h1>
        <p className="text-zinc-500">
          Dein Warenkorb ist leer.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">🛒 Warenkorb</h1>

      <div className="space-y-4">
        {items.map(item => (
          <div
            key={item.ProductID}
            className="flex items-center justify-between rounded-xl bg-white p-4 shadow"
          >
            <div>
              <h2 className="font-semibold">
                {item.ProductName}
              </h2>
              <p className="text-sm text-zinc-500">
                CHF {Number(item.Price).toFixed(2)} ×{' '}
                {item.quantity}
              </p>
            </div>

            {/* REMOVE BUTTON */}
            <button
              onClick={() => removeFromCart(item.ProductID)}
              className="text-red-600 hover:underline"
            >
              ❌ Entfernen
            </button>
          </div>
        ))}
      </div>
<div className="mt-6 flex justify-between items-center border-t pt-4">
  <span className="text-lg font-semibold">
    Gesamtpreis
  </span>
  <span className="text-2xl font-bold text-blue-600">
    CHF {totalPrice.toFixed(2)}
  </span>
</div>
      {/* CLEAR CART */}
      <button
        onClick={clearCart}
        className="mt-8 rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-700"
      >
        🧹 Warenkorb leeren
      </button>
    </div>
  );
}

