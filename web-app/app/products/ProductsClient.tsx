'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Product, Category } from '@/lib/types';
import {
  updateProduct,
  deleteProduct,
  getCategories,
} from '@/lib/api';
import { useCart } from '@/app/context/CartContext';

type Props = {
  initialProducts: Product[];
};

export default function ProductsClient({
  initialProducts,
}: Props) {
  /* =========================
     STATE
  ========================= */
  const [products, setProducts] = useState<Product[]>(
    initialProducts ?? []
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number>(0);

  const { addToCart } = useCart();

  /* =========================
     HIGHLIGHT + SCROLL
  ========================= */
  const searchParams = useSearchParams();
  const highlight = searchParams
    .get('highlight')
    ?.toLowerCase()
    .trim();

  const highlightedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (highlightedRef.current) {
      highlightedRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [highlight]);

  /* =========================
     LOAD CATEGORIES
  ========================= */
  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  /* =========================
     EDIT
  ========================= */
  function startEdit(product: Product) {
    setEditingId(product.ProductID);
    setName(product.ProductName);
    setPrice(product.Price);
    setCategoryId(product.CategoryID);
  }

  function cancelEdit() {
    setEditingId(null);
    setName('');
    setPrice(0);
    setCategoryId(0);
  }

  async function saveEdit(productId: number) {
    try {
      await updateProduct(productId, {
        ProductName: name,
        Price: price,
        CategoryID: categoryId,
      });

      // ✅ UI sofort aktualisieren
      setProducts(prev =>
        prev.map(p =>
          p.ProductID === productId
            ? {
                ...p,
                ProductName: name,
                Price: price,
                CategoryID: categoryId,
              }
            : p
        )
      );

      cancelEdit();
    } catch (error) {
      alert('Produkt konnte nicht gespeichert werden');
      console.error(error);
    }
  }

  /* =========================
     DELETE
  ========================= */
  async function handleDelete(productId: number) {
    if (!confirm('Produkt wirklich löschen?')) return;

    try {
      await deleteProduct(productId);
      setProducts(prev =>
        prev.filter(p => p.ProductID !== productId)
      );
    } catch (error) {
      alert('Produkt konnte nicht gelöscht werden');
      console.error(error);
    }
  }

  /* =========================
     RENDER
  ========================= */
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
            ref={isHighlighted ? highlightedRef : null}
            className={`rounded-2xl p-6 shadow-md transition
              ${
                isHighlighted
                  ? 'border-2 border-blue-500 bg-blue-50'
                  : 'bg-white dark:bg-zinc-900'
              }`}
          >
            <div className="mb-3 text-3xl">🛒</div>

            {editingId === product.ProductID ? (
              <>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full mb-2 rounded border p-2"
                  placeholder="Produktname"
                />

                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={e =>
                    setPrice(Number(e.target.value))
                  }
                  className="w-full mb-2 rounded border p-2"
                  placeholder="Preis (CHF)"
                />

                <select
                  value={categoryId}
                  onChange={e =>
                    setCategoryId(Number(e.target.value))
                  }
                  className="w-full mb-4 rounded border p-2"
                >
                  <option value={0}>
                    Kategorie auswählen
                  </option>
                  {categories.map(cat => (
                    <option
                      key={cat.CategoryID}
                      value={cat.CategoryID}
                    >
                      {cat.CategoryName}
                    </option>
                  ))}
                </select>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      saveEdit(product.ProductID)
                    }
                    className="flex-1 rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
                  >
                    💾 Speichern
                  </button>

                  <button
                    onClick={cancelEdit}
                    className="flex-1 rounded bg-gray-200 py-2 hover:bg-gray-300"
                  >
                    Abbrechen
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold">
                  {product.ProductName}
                </h2>

                <p className="mt-2 text-2xl font-bold text-blue-600">
                  CHF {product.Price.toFixed(2)}
                </p>

                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => startEdit(product)}
                    className="text-blue-600 hover:underline"
                  >
                    ✏️ Bearbeiten
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(product.ProductID)
                    }
                    className="text-red-600 hover:underline"
                  >
                    🗑️ Löschen
                  </button>
                </div>

                <button
                  onClick={() =>
                    addToCart({
                      ProductID: product.ProductID,
                      ProductName: product.ProductName,
                      CategoryID: product.CategoryID,
                      Price: product.Price,
                    })
                  }
                  className="mt-4 w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
                >
                  🛒 In den Warenkorb
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
