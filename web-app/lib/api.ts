// lib/api.ts
import type { Product, Category, Customer, Order } from './types';

/**
 * Externe REST API
 * (NICHT Next.js api/)
 */
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

/* =========================
   GENERIC HELPERS
========================= */
export async function fetchFromApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`);

  if (!res.ok) {
    const text = await res.text();
    console.error('GET ERROR:', res.status, text);
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

export async function postToApi<T>(
  endpoint: string,
  data: unknown
): Promise<T> {
  console.log('POST TO API:', endpoint, data);
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('POST ERROR:', res.status, text);
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

/* =========================
   PRODUCTS
========================= */
export async function getProducts(): Promise<Product[]> {
  return fetchFromApi('/products');
}

export async function getProductsByCategoryId(
  categoryId: number
): Promise<Product[]> {
  const products = await fetchFromApi<Product[]>('/products');
  return products.filter(p => p.CategoryID === categoryId);
}

/* =========================
   CATEGORIES
========================= */
export async function getCategories(): Promise<Category[]> {
  return fetchFromApi('/categories');
}

export async function getCategoryById(
  categoryId: number
): Promise<Category | undefined> {
  const result = await fetchFromApi<Category[]>(
    `/categories/${categoryId}`
  );
  return result[0];
}

export async function createCategory(
  category: Pick<Category, 'CategoryName' | 'Description'>
): Promise<Category> {
  return postToApi('/categories', category);
}
export async function updateCategory(
  categoryId: number,
  data: Pick<Category, 'CategoryName' | 'Description'>
): Promise<Category> {
  const res = await fetch(
    `${API_BASE}/categories/${categoryId}`,
    {
      method: 'PATCH', // oder PUT – je nach REST-API
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error('UPDATE CATEGORY ERROR', text);
    throw new Error('Failed to update category');
  }

  return res.json();
}

export async function deleteCategory(categoryId: number): Promise<void> {
  const res = await fetch(
    `${API_BASE}/categories/${categoryId}`,
    {
      method: 'DELETE',
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error('DELETE CATEGORY ERROR', text);
    throw new Error('Failed to delete category');
  }
}

/* =========================
   CUSTOMERS
========================= */
export async function getCustomers(): Promise<Customer[]> {
  return fetchFromApi('/customers');
}

export async function getCustomerById(
  customerId: number
): Promise<Customer | undefined> {
  const result = await fetchFromApi<Customer[]>(
    `/customers/${customerId}`
  );
  return result[0];
}

export async function createCustomer(
  customer: Pick<Customer, 'CustomerName' | 'ContactName' | 'Address'>
): Promise<Customer> {
  return postToApi('/customers', customer);
}

/* =========================
   ORDERS
========================= */
export async function getOrders(): Promise<Order[]> {
  return fetchFromApi('/orders');
}

export async function getOrderById(
  orderId: number
): Promise<Order | undefined> {
  const result = await fetchFromApi<Order[]>(
    `/orders/${orderId}`
  );
  return result[0];
}

export async function createOrder(
  order: Pick<Order, 'CustomerID' | 'EmployeeID' | 'OrderDate' | 'ShipperID'>
): Promise<Order> {
  return postToApi('/orders', order);
}
