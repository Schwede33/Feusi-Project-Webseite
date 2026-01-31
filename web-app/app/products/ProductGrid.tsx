'use client';

import { useCart } from '@/app/context/CartContext';
import type { Product } from '@/lib/types';

export default function ProductGrid({ products }: { products: Product[] }) {
  const { addToCart } = useCart();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <div
          key={product.ProductID}
          className="rounded-2xl bg-white p-6 shadow-md hover:-translate-y-1 transition"
        >
          {/* Icon */}
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-3xl">
            📦
          </div>

          {/* Name */}
          <h2 className="text-lg font-semibold">
            {product.ProductName}
          </h2>

          {/* Price */}
          <p className="mt-2 text-2xl font-bold text-blue-600">
            CHF {product.Price.toFixed(2)}
          </p>

          {/* Add to Cart */}
          <button
            onClick={() => addToCart(product)}
            className="relative z-10 mt-4 w-full cursor-pointer rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
          >
            🛒 In den Warenkorb
          </button>
        </div>
      ))}
    </div>
  );
}
