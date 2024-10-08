"use client";

import { fetchCart } from "@/lib/cart";
import { Cart } from "@/lib/definition";
import React, { createContext, ReactElement, useContext } from "react";
import useSWR from "swr";

interface CartContextType {
  cart: Cart;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

const CartProvider = ({ children }: { children: ReactElement }) => {
  const cart = useSWR(
    "http://localhost:4000/api/cart/6703c4302e2e4880d0d7dfe2",
    fetchCart
  );
  console.log(cart.data);
  const value = { cart };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const cartContext = useContext(CartContext);

  return cartContext;
};

export default CartProvider;
