'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Category } from '@/lib/types';
import { updateCategory, deleteCategory } from '@/lib/api';

type Props = {
  initialCategories: Category[];
};

export default function CategoriesClient({
  initialCategories,
}: Props) {
  /* =========================
     STATE
  ========================= */
  const [categories, setCategories] = useState<Category[]>(
    initialCategories ?? []
  );
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

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
     EDIT
  ========================= */
  function startEdit(category: Category) {
    setEditingId(category.CategoryID);
    setName(category.CategoryName);
    setDescription(category.Description);
  }

  function cancelEdit() {
    setEditingId(null);
    setName('');
    setDescription('');
  }

  async function saveEdit(categoryId: number) {
    try {
      await updateCategory(categoryId, {
        CategoryName: name,
        Description: description,
      });

      // ✅ UI sofort aktualisieren
      setCategories(prev =>
        prev.map(cat =>
          cat.CategoryID === categoryId
            ? {
                ...cat,
                CategoryName: name,
                Description: description,
              }
            : cat
        )
      );

      cancelEdit();
    } catch (error) {
      alert('Kategorie konnte nicht gespeichert werden');
      console.error(error);
    }
  }

  /* =========================
     DELETE
  ========================= */
  async function handleDelete(categoryId: number) {
    if (!confirm('Kategorie wirklich löschen?')) return;

    try {
      await deleteCategory(categoryId);
      setCategories(prev =>
        prev.filter(cat => cat.CategoryID !== categoryId)
      );
    } catch (error) {
      alert(
        'Kategorie konnte nicht gelöscht werden (evtl. noch Produkte vorhanden)'
      );
      console.error(error);
    }
  }

  /* =========================
     RENDER
  ========================= */
  if (!categories || categories.length === 0) {
    return (
      <p className="text-zinc-500">
        Keine Kategorien vorhanden.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map(category => {
        const isHighlighted =
          highlight &&
          category.CategoryName
            .toLowerCase()
            .includes(highlight);

        return (
          <div
            key={category.CategoryID}
            ref={isHighlighted ? highlightedRef : null}
            className={`rounded-2xl p-6 shadow-md transition
              ${
                isHighlighted
                  ? 'border-2 border-blue-500 bg-blue-50'
                  : 'bg-white dark:bg-zinc-900'
              }`}
          >
            <div className="mb-3 text-3xl">📦</div>

            {editingId === category.CategoryID ? (
              <>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full mb-2 rounded border p-2"
                  placeholder="Kategorie Name"
                />

                <textarea
                  value={description}
                  onChange={e =>
                    setDescription(e.target.value)
                  }
                  className="w-full mb-4 rounded border p-2"
                  placeholder="Beschreibung"
                />

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      saveEdit(category.CategoryID)
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
                <h2 className="text-lg font-bold">
                  {category.CategoryName}
                </h2>

                <p className="mt-2 text-zinc-600">
                  {category.Description}
                </p>

                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => startEdit(category)}
                    className="text-blue-600 hover:underline"
                  >
                    ✏️ Bearbeiten
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(category.CategoryID)
                    }
                    className="text-red-600 hover:underline"
                  >
                    🗑️ Löschen
                  </button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
