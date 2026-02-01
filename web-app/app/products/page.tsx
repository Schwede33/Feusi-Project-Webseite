import { getProducts } from '@/lib/api';
import ProductsClient from './ProductsClient';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Produkte</h1>

        <Link
          href="/products/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          ➕ Produkt hinzufügen
        </Link>
      </div>

      <ProductsClient initialProducts={products} />
    </div>
  );
}