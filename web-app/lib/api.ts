// lib/api.ts
export async function fetchFromApi<T>(endpoint: string): Promise<T> {
    const res = await fetch(`http://localhost:3000${endpoint}`);
    if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
    }
    return res.json();
}

// Example specific function for products
export async function getProducts() {
    return fetchFromApi<{ ProductID: number; ProductName: string; Price: number }[]>('/products');
}