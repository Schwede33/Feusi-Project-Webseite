'use client';

import { useCart } from '@/app/context/CartContext';

export default function CartPage() {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-2xl font-bold mb-4">
          🛒 Warenkorb
        </h1>
        <p className="text-zinc-500">
          Dein Warenkorb ist leer.
        </p>
      </div>
    );
  }

  const total = items.reduce(
    (sum, item) => sum + item.Price * item.quantity,
    0
  );

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-bold mb-8">
        🛒 Warenkorb
      </h1>

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
                CHF {item.Price.toFixed(2)} ×{' '}
                {item.quantity}
              </p>
            </div>

            <div className="font-bold">
              CHF{' '}
              {(item.Price * item.quantity).toFixed(
                2
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between border-t pt-6 text-lg font-bold">
        <span>Total</span>
        <span>CHF {total.toFixed(2)}</span>
      </div>
    </div>
  );
}
