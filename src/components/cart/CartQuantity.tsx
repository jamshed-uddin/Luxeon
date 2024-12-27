"use client";

import { useCart } from "@/providers/CartProvider";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface CartQuantityProps {
  itemQuantity: number;
  cartItemId: string;
}

const CartQuantity = ({ cartItemId, itemQuantity }: CartQuantityProps) => {
  const { updateCart } = useCart();
  const [quantity, setQuantity] = useState(itemQuantity);
  const [isPending, setIsPending] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    setIsPending(true);
    setQuantity(newQuantity);
    updateCart({ cartItemId, quantity: newQuantity })
      .catch(() => {
        toast("Failed to update quantity");
      })
      .finally(() => setIsPending(false));
  };

  const handleIncrement = () => {
    handleQuantityChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      handleQuantityChange(quantity - 1);
    }
  };

  console.log(quantity);

  return (
    <div className=" flex items-center gap-4">
      <button
        disabled={quantity === 1 || isPending}
        onClick={handleDecrement}
        className=""
      >
        <MinusIcon className="w-4 h-4" />
      </button>
      <span className=" text-lg">{quantity}</span>
      <button disabled={isPending} onClick={handleIncrement} className="">
        <PlusIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default CartQuantity;
