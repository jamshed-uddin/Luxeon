import axios from "axios";
import { Cart } from "./definition";

export const fetchCart = async (url: string): Promise<Cart> => {
  const res = await axios.get(url);
  return res.data as Cart;
};
