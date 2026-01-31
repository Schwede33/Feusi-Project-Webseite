'use client';

import { useState } from 'react';
import type { Category } from '@/lib/types';
import { updateCategory, deleteCategory } from '@/lib/api';

type Props = {
  initialCategories?: Category[];
};

export default function CategoriesClient({ initialCategories = [] }: Props) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

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
      setLoading(true);

      const updated = await updateCategory(categoryId, {
        CategoryName: name,
        Description: description,
      });window.location.reload();

      setCategories(prev =>
        prev.map(cat =>
          cat.CategoryID === categoryId ? updated : cat
        )
      );

      cancelEdit();
    } catch (error) {
      alert('Kategorie konnte nicht gespeichert werden');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(categoryId: number) {
    if (!confirm('Willst du diese Kategorie wirklich löschen?')) return;

    try {
      await deleteCategory(categoryId);
      setCategories(prev =>
        prev.filter(c => c.CategoryID !== categoryId)
      );
    } catch {
      alert('Kategorie konnte nicht gelöscht werden (evtl. Produkte vorhanden)');
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.length === 0 && (
        <p className="text-zinc-500">Keine Kategorien vorhanden.</p>
      )}

      {categories.map(category => (
        <div
          key={String(category.CategoryID ?? `${category.CategoryName}-${Math.random()}`)}
          className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-md transition hover:shadow-lg"
        >
          {editingId === category.CategoryID ? (
            /* ===== EDIT MODE ===== */
            <>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full rounded border p-2 mb-2"
                placeholder="Kategorie Name"
              />

              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full rounded border p-2 mb-4"
                placeholder="Beschreibung"
              />

              <div className="flex gap-2">
                <button
                  onClick={() => saveEdit(category.CategoryID)}
                  disabled={loading}
                  className="flex-1 rounded bg-blue-600 text-white py-2 hover:bg-blue-700"
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
            /* ===== VIEW MODE ===== */
            <>
              <div className="mb-4 text-3xl">📦</div>

              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                {category.CategoryName}
              </h2>

              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                {category.Description}
              </p>

              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => startEdit(category)}
                  className="text-blue-600 font-medium hover:underline"
                >
                  ✏️ Bearbeiten
                </button>

                <button
                  onClick={() => handleDelete(category.CategoryID)}
                  className="text-red-600 font-medium hover:underline"
                >
                  🗑️ Löschen
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
