'use client';

import { createProduct, getCategories } from '@/lib/api';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Category } from '@/lib/types';

export default function Page() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const ProductName = form.productName.value;
    const Price = Number(form.price.value);
    const CategoryID = Number(form.category.value);

    await createProduct({
      ProductName,
      Price,
      CategoryID,
    });

    router.push('/products');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 space-y-4"
    >
      <h1 className="text-2xl font-bold">
        Neues Produkt
      </h1>

      <input
        name="productName"
        placeholder="Produktname"
        className="w-full border p-2 rounded"
        required
      />

      <input
        name="price"
        type="number"
        step="0.01"
        placeholder="Preis (CHF)"
        className="w-full border p-2 rounded"
        required
      />

      {/* ✅ Kategorie Dropdown */}
      <select
        name="category"
        className="w-full border p-2 rounded"
        required
      >
        <option value="">Kategorie auswählen</option>
        {categories.map(cat => (
          <option
            key={cat.CategoryID}
            value={cat.CategoryID}
          >
            {cat.CategoryName}
          </option>
        ))}
      </select>

      <button className="w-full bg-blue-600 text-white py-2 rounded">
        ➕ Produkt erstellen
      </button>
    </form>
  );
}
