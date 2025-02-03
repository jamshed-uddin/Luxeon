import type { Cart } from "./definition";
import { requestClient } from "./requestClient";

export const fetchCart = async (url: string): Promise<Cart> => {
  try {
    const cart = requestClient<Cart>(url, { method: "get" });
    return cart;
  } catch (error) {
    throw error;
    // throw Error("Something went wrong");
  }
};
