import { getProducts } from '@/lib/api';
import ProductGrid from './ProductGrid';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const products = (await getProducts()) ?? [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-14 space-y-10">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Produkte
        </h1>
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
          Entdecke alle verfügbaren Produkte in unserem Webshop
        </p>
      </div>

      {/* Product Grid */}
      <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900 p-6 shadow-sm">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
