import type { Products } from "./definition";
import { requestClient } from "./requestClient";

export const getProducts = async (url: string) => {
  try {
    const response = await requestClient<Products>(url, {
      method: "get",
    });

    return response;
  } catch {
    throw new Error("Something went wrong");
  }
};
