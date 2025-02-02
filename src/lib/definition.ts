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
  authToken?: string;
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

export type Order = {
  _id: string;
  user: {
    userId: string;
    name: string;
    email: string;
  };
  address: Address;
  status: "processing" | "delivered" | "cancelled";
  totalPrice: number;
  items: OrderItem[];
  paymentDetails: PaymentDetails;
  createdAt?: Date;
  updatedAt?: Date;
};

export type OrderItem = {
  _id: string;
  orderId: string;
  product: Product;
  price: number;
  quantity: number;
  subtotal: number;

  createdAt?: Date;
  updatedAt?: Date;
};

export type PaymentDetails = {
  amount: number;
  createdAt: Date;
  currency: "USD";
  orderId: string;
  paymentMethod: "Card";
  transactionId: string;
  updatedAt: Date;
  user: string;
  _id: string;
};
