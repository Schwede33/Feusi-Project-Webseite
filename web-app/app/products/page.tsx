import { getProducts } from '@/lib/api';

export default async function Page() {
    const products = await getProducts();
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
