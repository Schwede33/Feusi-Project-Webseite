import { getProducts } from '@/lib/api';

// Force this page to be rendered at runtime
export const dynamic = 'force-dynamic';

export default async function Page() {
  let products = [] as { ProductID: number; ProductName: string; Price: number }[];
  try {
    products = await getProducts();
  } catch (err) {
    console.error('Failed to fetch products:', err);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.ProductID} className="border rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-semibold">{product.ProductName}</h2>
          <p className="text-gray-500">Price: ${product.Price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}
