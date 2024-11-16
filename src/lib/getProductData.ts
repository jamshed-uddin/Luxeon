import { Product } from "./definition";

export const getProductData = async (id: string): Promise<Product> => {
  try {
    const res = await fetch(`http://localhost:4000/api/products/${id}`);

    if (!res.ok) {
      throw new Error("Something went wrong!");
    }

    const product = await res.json();
    return product as Product;
  } catch (error) {
    throw error;
  }
};
