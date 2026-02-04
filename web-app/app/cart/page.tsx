'use client';

import { useCart } from '@/app/context/CartContext';

export default function CartPage() {
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  /* LEERER WARENKORB */
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="mb-4 text-2xl font-bold">🛒 Warenkorb</h1>
        <p className="text-zinc-500">
          Dein Warenkorb ist leer.
        </p>
      </div>
    );
  }

  /* GESAMTPREIS */
  const total = items.reduce(
    (sum, item) => sum + item.Price * item.quantity,
    0
  );

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-bold">🛒 Warenkorb</h1>

      <div className="space-y-4">
        {items.map(item => (
          <div
            key={item.ProductID}
            className="flex items-center justify-between rounded-xl border p-4"
          >
            {/* PRODUKT INFO */}
            <div>
              <h2 className="font-semibold">
                {item.ProductName}
              </h2>
              <p className="text-sm text-zinc-500">
                CHF {item.Price.toFixed(2)} ×{' '}
                {item.quantity}
              </p>

              {/* +/- BUTTONS */}
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() =>
                    decreaseQuantity(item.ProductID)
                  }
                  className="h-8 w-8 rounded bg-zinc-200 hover:bg-zinc-300"
                >
                  −
                </button>

                <span className="w-6 text-center">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    increaseQuantity(item.ProductID)
                  }
                  className="h-8 w-8 rounded bg-zinc-200 hover:bg-zinc-300"
                >
                  +
                </button>
              </div>
            </div>

            {/* ENTFERNEN */}
            <button
              onClick={() =>
                removeFromCart(item.ProductID)
              }
              className="text-red-600 hover:underline"
            >
              ❌ Entfernen
            </button>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="mt-8 flex items-center justify-between border-t pt-4">
        <span className="text-lg font-semibold">
          Gesamtpreis
        </span>
        <span className="text-xl font-bold text-blue-600">
          CHF {total.toFixed(2)}
        </span>
      </div>

      <button
        onClick={clearCart}
        className="mt-6 rounded-lg bg-red-600 px-6 py-2 text-white hover:bg-red-700"
      >
        🧹 Warenkorb leeren
      </button>
    </div>
  );
}
