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

export type Product = {
  _id: string;
  title: string;
  photoUrl: string[];
  description?: string;
  price: number;
  category: string;
  inStock: number;
  details?: ProductDetails[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type Products = {
  data: Product[];
  pagination: Pagination;
};

export type Address = {
  name?: string;
  phoneNumber?: number;
  country?: string;
  city?: string;
  zipCode?: string;
  addressLine?: string;
};
export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  address?: Address[];
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
