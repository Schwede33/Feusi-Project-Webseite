'use client';

import { useSearchParams } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';

type Product = {
  ProductID: number;
  ProductName: string;
  Price: number;
  CategoryID: number;
  UnitsInStock?: number;
};

export default function ProductGrid({
  products,
}: {
  products: Product[];
}) {
  const { addToCart } = useCart();

  /* =========================
     SEARCH PARAM (HIGHLIGHT)
  ========================= */
  const searchParams = useSearchParams();
  const highlight = searchParams
    .get('highlight')
    ?.toLowerCase()
    .trim();

  if (!products || products.length === 0) {
    return (
      <p className="text-zinc-500">
        Keine Produkte vorhanden.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map(product => {
        const isHighlighted =
          highlight &&
          product.ProductName
            .toLowerCase()
            .includes(highlight);

        return (
          <div
            key={product.ProductID}
            className={`rounded-2xl p-6 shadow-md transition
              ${
                isHighlighted
                  ? 'border-2 border-blue-500 bg-blue-50'
                  : 'bg-white dark:bg-zinc-900'
              }`}
          >
            {/* ICON */}
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-3xl">
              🛒
            </div>

            {/* NAME */}
            <h2 className="text-lg font-semibold">
              {product.ProductName}
            </h2>

            {/* PRICE */}
            <p className="mt-2 text-2xl font-bold text-blue-600">
              CHF {Number(product.Price).toFixed(2)}
            </p>

            {/* STOCK */}
            {product.UnitsInStock !== undefined && (
              <p className="mt-1 text-sm text-zinc-500">
                {product.UnitsInStock} auf Lager
              </p>
            )}

            {/* CART BUTTON */}
            <button
              onClick={() =>
                addToCart({
                  ProductID: product.ProductID,
                  ProductName: product.ProductName,
                  CategoryID: product.CategoryID,
                  Price: product.Price,
                })
              }
              className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
            >
              🛒 In den Warenkorb
            </button>
          </div>
        );
      })}
    </div>
  );
}
