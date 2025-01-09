"use client";

import { fetchCart } from "@/lib/cart";
import { Cart } from "@/lib/definition";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { createContext, useContext } from "react";
import useSWR, { SWRResponse } from "swr";

interface CartContextType {
  cart: SWRResponse<Cart>;
  addToCart: ({
    productId,
    quantity,
    userId,
  }: {
    productId: string;
    quantity: number;
    userId: string;
  }) => Promise<Cart>;
  updateCart: ({
    cartItemId,
    quantity,
  }: {
    cartItemId: string;
    quantity: number;
  }) => Promise<void>;
}

export const CartContext = createContext<CartContextType | null>(null);

const CartProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const { data, status } = useSession();

  const key =
    status === "loading"
      ? null
      : status === "authenticated"
      ? `cart-${data?.user?._id}`
      : "cart-guest";

  const cart = useSWR(
    key
      ? data?.user
        ? `http://localhost:4000/api/cart?userId=${data?.user._id}`
        : `http://localhost:4000/api/cart`
      : null,
    fetchCart
  );

  console.log(cart.data);

  const addToCart = async ({
    productId,
    quantity,
    userId,
  }: {
    productId: string;
    quantity: number;
    userId: string;
  }): Promise<Cart> => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/cart",
        {
          productId,
          quantity,
          userId,
        },
        { withCredentials: true }
      );
      cart.mutate();
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const updateCart = async ({
    cartItemId,
    quantity,
  }: {
    cartItemId: string;
    quantity: number;
  }) => {
    try {
      await axios.patch(`http://localhost:4000/api/cart/${cartItemId}`, {
        quantity,
      });
      cart.mutate();
    } catch (error) {
      throw error;
    }
  };

  const value = { cart, addToCart, updateCart };
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
