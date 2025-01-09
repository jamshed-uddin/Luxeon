import axios from "axios";
import { Cart } from "./definition";

export const fetchCart = async (url: string): Promise<Cart> => {
  try {
    const res = await axios.get(url, { withCredentials: true });
    console.log("response", res.data);
    return res.data as Cart;
  } catch {
    throw Error("Something went wrong");
  }
};
