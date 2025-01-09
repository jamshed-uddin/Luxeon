import { ReactElement } from "react";

export type Pagination = {
  page: number;
  limit: number;
  totalPages: number;
  totalProducts: number;
  hasMore: number;
};

export type ProductDetails = {
  title: string;
  value: string;
};

export type PhotoUrlObj = {
  url: string;
  publicId: string;
};

export type Product = {
  _id?: string;
  title: string;
  photoUrl: PhotoUrlObj[];
  description: string;
  price: number | string;
  category: string;
  stock: number | string;
  details: ProductDetails[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type Products = {
  data: Product[];
  pagination: Pagination;
};

export type Address = {
  _id?: string;
  name?: string;
  phoneNumber?: number;
  country?: string;
  city?: string;
  zipCode?: string;
  addressLine?: string;
  street?: string;
  isDefault?: boolean;
};
export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  address: Address[];
  provider: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CartItem = {
  _id: string;
  cartId: string;
  product: Product;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Cart = {
  _id: string;
  user: string;
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ColumnCell<T> = {
  headerName: string;
  field: keyof T | "action" | "avatar";
  width?: number;
  renderCell?: (row: T) => ReactElement;
};
