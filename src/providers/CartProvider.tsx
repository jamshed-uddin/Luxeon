"use client";

import { fetchCart } from "@/lib/cart";
import { Cart } from "@/lib/definition";
import axios from "axios";
import React, { createContext, useContext } from "react";
import useSWR, { SWRResponse } from "swr";

interface CartContextType {
  cart: SWRResponse<Cart>;
  addToCart: ({
    productId,
    quantity,
  }: {
    productId: string;
    quantity: number;
  }) => Promise<Cart>;
}

export const CartContext = createContext<CartContextType | null>(null);

const CartProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const cart = useSWR(
    "http://localhost:4000/api/cart/6703c4302e2e4880d0d7dfe2",
    fetchCart
  );

  const addToCart = async ({
    productId,
    quantity,
  }: {
    productId: string;
    quantity: number;
  }): Promise<Cart> => {
    try {
      const response = await axios.post("http://localhost:4000/api/cart", {
        productId,
        quantity,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const value = { cart, addToCart };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("Context has not been set yet");
  }

  return cartContext;
};

export default CartProvider;
