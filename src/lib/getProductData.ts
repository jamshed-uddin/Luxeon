import { cache } from "react";
import { Product } from "./definition";
import { requestClient } from "./requestClient";

export const getProductData = cache(async (id: string): Promise<Product> => {
  try {
    const product = await requestClient<Product>(`/products/${id}`);

    return product;
  } catch (error) {
    throw error;
  }
});
