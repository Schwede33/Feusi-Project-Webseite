import { getCategories } from '@/lib/api';

// Force this page to be rendered at runtime
export const dynamic = 'force-dynamic';

export default async function Page() {
  let categories = [] as {
    CategoryID: number;
    CategoryName: string;
    Description: string;
  }[];

  try {
    categories = await getCategories();
  } catch (err) {
    console.error('Failed to fetch categories:', err);
  }

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <a href='/categories/create' className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded">
            Create New Category
          </a>
        </div>
      </div>
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Kategorien
        </h1>
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
          Übersicht aller verfügbaren Produktkategorien
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.CategoryID}
            className="group rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-black/40"
          >
            <div className="mb-4 text-3xl">📦</div>

            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              {category.CategoryName}
            </h2>

            <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {category.Description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
