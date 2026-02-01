import { getCategories } from '@/lib/api';
import CategoriesClient from '../CategoriesClient';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const categories = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Kategorien</h1>
        <p className="text-zinc-600">
          Kategorien direkt bearbeiten
        </p>
      </div>

      {/* HIER wird der Client-Code eingebunden */}
      <CategoriesClient initialCategories={categories} />
    </div>
  );
}
