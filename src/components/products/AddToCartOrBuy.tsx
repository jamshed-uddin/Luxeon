"use client";

import React, { useState } from "react";
import Button from "../Button";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

const AddToCartOrBuy = ({ id }: { id: string }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:4000/api/cart", {
      method: "POST",
      body: JSON.stringify({ productId: id, quantity }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      setLoading(false);

      console.log(response);
    }
    const data = await response.json();
    console.log(data);
    setLoading(false);
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
