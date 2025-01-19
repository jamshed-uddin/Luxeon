import type { Products } from "./definition";
import { requestClient } from "./requestClient";

export const getProducts = async (url: string) => {
  try {
    const response = await requestClient<Products>(url, {
      method: "get",
    });

    return response;

    // const res = await fetch(url, {
    //   headers: {
    //     "Cache-Control": "no-cache",
    //   },
    // });
    // if (!res.ok) {
    //   throw new Error("Something went wrong!");
    // }

    // const products = await res.json();

    // return products as Products;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};
