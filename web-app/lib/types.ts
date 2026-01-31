// lib/types.ts

/* =====================
   CATEGORIES
===================== */
export interface Category {
  CategoryID: number;
  CategoryName: string;
  Description: string;
}

/* =====================
   PRODUCTS
===================== */
export interface Product {
  ProductID: number;
  ProductName: string;
  CategoryID: number;
  Price: number;     // ⚠️ W3Schools DB → UnitPrice, nicht Price
  UnitsInStock?: number;
}

/* =====================
   CUSTOMERS
===================== */
export interface Customer {
  CustomerID: number;
  CustomerName: string;
  ContactName: string;
  Address: string;
  City: string;
  PostalCode: string;
  Country: string;
}

/* =====================
   ORDERS
===================== */
export interface Order {
  OrderID: number;
  CustomerID: number;
  EmployeeID: number;
  OrderDate: string;
  ShipperID: number;
}
