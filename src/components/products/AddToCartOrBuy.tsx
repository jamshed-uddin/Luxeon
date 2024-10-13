"use client";

import React, { useState } from "react";
import Button from "../Button";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/providers/CartProvider";

const AddToCartOrBuy = ({ id }: { id: string }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      const res = await addToCart({ productId: id, quantity });
      console.log(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-7">
      <div className="flex">
        <h2 className="flex-grow text-xl font-light">Quantity</h2>
        <div className=" flex items-center gap-4">
          <button
            disabled={quantity === 1}
            className="flex-grow"
            onClick={() => setQuantity((p) => p - 1)}
          >
            <MinusIcon className="w-5 h-5" />
          </button>
          <span className="flex-grow text-xl">{quantity}</span>
          <button
            className="flex-grow"
            onClick={() => setQuantity((p) => p + 1)}
          >
            {" "}
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="space-y-3">
        <Button disabled={loading} loading={loading} onClick={handleAddToCart}>
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default AddToCartOrBuy;
