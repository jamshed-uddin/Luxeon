"use client";

import { fetchCart } from "@/lib/cart";
import { Cart } from "@/lib/definition";
import { requestClient } from "@/lib/requestClient";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect } from "react";
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

  useEffect(() => {
    if (!data) return;
    requestClient(`/cart/merge`, {
      method: "post",
      body: JSON.stringify({ userId: data?.user?._id }),
    });
  }, [data]);

  const key =
    status === "loading"
      ? null
      : status === "authenticated"
      ? `cart-${data?.user?._id}`
      : "cart-guest";

  const cart = useSWR(
    key ? (data?.user ? `/cart?userId=${data?.user._id}` : `/cart`) : null,
    fetchCart
  );

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
      const data = await requestClient<Cart>("/cart", {
        method: "post",
        body: JSON.stringify({
          productId,
          quantity,
          userId,
        }),
      });
      cart.mutate();
      return data;
    } catch {
      throw new Error("Failed to add to cart.");
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
      await requestClient(`/cart/${cartItemId}`, {
        method: "patch",
        body: JSON.stringify({ quantity }),
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
