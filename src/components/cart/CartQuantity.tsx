"use client";

import { useCart } from "@/providers/CartProvider";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../LoadingSpinner";
import clsx from "clsx";

interface CartQuantityProps {
  itemQuantity: number;
  cartItemId: string;
}

const CartQuantity = ({ cartItemId, itemQuantity }: CartQuantityProps) => {
  const router = useRouter();
  const { updateCart } = useCart();
  const [quantity, setQuantity] = useState(itemQuantity);
  const [isPending, setIsPending] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    setIsPending(true);

    updateCart({ cartItemId, quantity: newQuantity })
      .then(() => {
        router.refresh();
        setQuantity(newQuantity);
      })
      .catch(() => {
        setQuantity(itemQuantity);
        toast.error("Failed to update quantity");
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

  return (
    <div className="relative">
      <div
        className={clsx(" flex items-center gap-4", {
          "opacity-60": isPending,
        })}
      >
        <button
          disabled={quantity === 1 || isPending}
          onClick={handleDecrement}
          className="disabled:opacity-50"
        >
          <MinusIcon className="w-4 h-4" />
        </button>
        <span className=" text-lg">{quantity}</span>
        <button disabled={isPending} onClick={handleIncrement} className="">
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
      {isPending && (
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <LoadingSpinner size="small" />
        </div>
      )}
    </div>
  );
};

export default CartQuantity;
