'use client';

import { useState } from 'react';
import { createCategory } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function CreateCategoryPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  async function handleSubmit() {
    if (!name.trim()) {
      alert('Name darf nicht leer sein');
      return;
    }

    try {
      await createCategory({
        CategoryName: name,
        Description: description,
      });

      // zurück zur Kategorien-Liste
      router.push('/categories');
      router.refresh();
    } catch (error) {
      alert('Kategorie konnte nicht erstellt werden');
      console.error(error);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-3xl font-bold">➕ Kategorie erstellen</h1>

      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Kategorie Name"
        className="w-full rounded border p-3"
      />

      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Beschreibung"
        className="w-full rounded border p-3"
      />

      <div className="flex gap-4">
        <button
          onClick={handleSubmit}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          💾 Speichern
        </button>

        <button
          onClick={() => router.back()}
          className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
        >
          Abbrechen
        </button>
      </div>
    </div>
  );
}
