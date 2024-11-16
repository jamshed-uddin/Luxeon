import { Products } from "./definition";

export const getProducts = async (url: string) => {
  try {
    const res = await fetch(url, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    if (!res.ok) {
      throw new Error("Something went wrong!");
    }

    const products = await res.json();

    return products as Products;
  } catch (error) {
    throw error;
  }
};
