"use client";

import { useCart } from "@/providers/CartProvider";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const CartIcon = () => {
  const { cart } = useCart();

  return (
    <Link href={"/cart"} className="relative">
      <ShoppingCartIcon className="w-5 h-5" />
      {cart.data?.totalItems && (
        <span className="block absolute -top-2 -right-2 bg-black text-white px-1 rounded-full  text-xs">
          {cart.data?.totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
