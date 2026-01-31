import { getCategories } from '@/lib/api';
import type { Category } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function Page() {
  let categories: Category[] = [];

  try {
    categories = await getCategories();
  } catch (err) {
    console.error('Failed to fetch categories:', err);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Kategorien
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Übersicht aller Produktkategorien
          </p>
        </div>

        <a
          href="/categories/create"
          className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition"
        >
          ➕ Neue Kategorie
        </a>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div
            key={category.CategoryID}
            className="group rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Icon */}
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-3xl dark:bg-blue-900">
              📦
            </div>

            {/* Name */}
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              {category.CategoryName}
            </h2>

            {/* Description */}
            <p className="mt-3 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {category.Description}
            </p>

            {/* Action */}
            <a
              href={`/categories/${category.CategoryID}`}
              className="mt-6 inline-block text-blue-600 font-medium hover:underline"
            >
              Produkte ansehen →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
