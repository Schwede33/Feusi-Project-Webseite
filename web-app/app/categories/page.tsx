import { getCategories } from '@/lib/api';
import CategoriesClient from './CategoriesClient';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const categories = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Kategorien</h1>
          <p className="text-zinc-600">Kategorien verwalten</p>
        </div>

        {/* ADD CATEGORY BUTTON */}
        <Link
          href="/categories/create"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition"
        >
          ➕ Kategorie hinzufügen
        </Link>
      </div>

      {/* Categories Grid */}
      <CategoriesClient initialCategories={categories} />
    </div>
  );
}
