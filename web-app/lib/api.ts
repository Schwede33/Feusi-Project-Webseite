// lib/api.ts
import {Product, Category ,Customer, Order} from './types';

export async function fetchFromApi<T>(endpoint: string): Promise<T> {
  const apiBase = process.env.API_URL || 'http://localhost:3000';
  const res = await fetch(`${apiBase}${endpoint}`, 
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

export async function postToApi<T>(endpoint: string, data: any): Promise<T> {
  const apiBase = process.env.API_URL || 'http://localhost:3000';
  const res = await fetch(`${apiBase}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

// Example specific function for products
export async function getProducts() {
  return fetchFromApi<Product[]>('/products');
}

export async function getProductsByCategoryId(categoryId: number) {
  let products = await fetchFromApi<Product[]>('/products');
  return products.filter(product => product.CategoryID === categoryId);
}

// Example specific function for categories
export async function getCategories() {
  return fetchFromApi<Category[]>('/categories');
}

export async function getCategoryById(categoryId: number) {
  let categoryResul = await fetchFromApi<Category[]>(`/categories/${categoryId}`);
  return categoryResul[0];
}

export async function createCategory(category: { CategoryName: string; Description: string }) {
  return postToApi<Category>('/categories', category);
}

// Example specific function for customers
export async function getCustomers() {
  return fetchFromApi<Customer[]>('/customers');
}

export async function getCustomerById(customerId: number) {
  let customerResul = await fetchFromApi<Customer[]>(`/customers/${customerId}`);
  return customerResul[0];
}

export async function createCustomer(customer: { FirstName: string; LastName: string; Email: string }) {
  return postToApi<Customer>('/customers', customer);
}
// Example specific function for orders
export async function getOrders() {
  return fetchFromApi<Order[]>('/orders');
}

export async function getOrderById(orderId: number) {
  let orderResul = await fetchFromApi<Order[]>(`/orders/${orderId}`);
  return orderResul[0];
}

export async function createOrder(order: { CustomerID: number; OrderDate: string; TotalAmount: number }) {
  return postToApi<Order>('/orders', order);
}