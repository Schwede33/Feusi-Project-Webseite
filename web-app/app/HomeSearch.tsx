'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Category, Product } from '@/lib/types';

type Props = {
  categories: Category[];
  products: Product[];
};

export default function HomeSearch({ categories, products }: Props) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const q = query.toLowerCase();

  const matchedCategories = categories.filter(c =>
    c.CategoryName.toLowerCase().includes(q)
  );

  const matchedProducts = products.filter(p =>
    p.ProductName.toLowerCase().includes(q)
  );

  return (
    <section className="rounded-3xl bg-white p-8 shadow-xl space-y-6">
      {/* 🔍 SUCHFELD */}
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="🔍 Suche nach Kategorien oder Produkten"
        className="w-full rounded-xl border px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* ❌ KEINE TREFFER */}
      {query && matchedCategories.length === 0 && matchedProducts.length === 0 && (
        <p className="text-zinc-500 text-center">
          Keine Ergebnisse gefunden
        </p>
      )}

{/* ERGEBNISSE NUR WENN GESUCHT WIRD */}
{query.length > 0 && (
  <>
    {/* ❌ KEINE TREFFER */}
    {matchedCategories.length === 0 && matchedProducts.length === 0 && (
      <p className="text-zinc-500 text-center">
        Keine Ergebnisse gefunden
      </p>
    )}

    {/* 📦 KATEGORIEN */}
    {matchedCategories.length > 0 && (
      <div>
        <h3 className="mb-4 text-lg font-semibold">Kategorien</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          {matchedCategories.map(category => (
            <div
              key={category.CategoryID}
              onClick={() =>
  router.push(`/categories?highlight=${encodeURIComponent(query)}`)
}

              className="cursor-pointer rounded-2xl border p-6 hover:shadow-lg transition"
            >
              <div className="text-3xl mb-2">📦</div>
              <h4 className="text-xl font-bold">
                {category.CategoryName}
              </h4>
              <p className="text-zinc-600 mt-1">
                {category.Description}
              </p>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* 🛒 PRODUKTE */}
    {matchedProducts.length > 0 && (
      <div>
        <h3 className="mb-4 text-lg font-semibold">Produkte</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          {matchedProducts.map(product => (
            <div
              key={product.ProductID}
              onClick={() =>
  router.push(`/products?highlight=${encodeURIComponent(query)}`)
}
              className="cursor-pointer rounded-2xl border p-6 hover:shadow-lg transition"
            >
              <div className="text-3xl mb-2">🛒</div>
              <h4 className="text-xl font-bold">
                {product.ProductName}
              </h4>
              <p className="text-blue-600 font-semibold mt-1">
                CHF {Number(product.Price).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    )}
    </>
)}
    </section>
  );
}
