"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

interface CartQuantityProps {
  itemQuantity: number;
  cartId: string;
}

const CartQuantity = ({ cartId, itemQuantity }: CartQuantityProps) => {
  const [quantity, setQuantity] = useState(itemQuantity || 0);
  console.log(cartId);

  return (
    <div className=" flex items-center gap-4">
      <button
        disabled={quantity === 1}
        className=""
        onClick={() => setQuantity((p) => p - 1)}
      >
        <MinusIcon className="w-4 h-4" />
      </button>
      <span className=" text-lg">{quantity}</span>
      <button className="" onClick={() => setQuantity((p) => p + 1)}>
        <PlusIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default CartQuantity;
