"use client";

import React, { useState } from "react";
import Button from "../Button";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const AddToCartOrBuy = ({ id }: { id: string }) => {
  const [quantity, setQuantity] = useState(1);
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
        <Button>Add to cart</Button>
      </div>
    </div>
  );
};

export default AddToCartOrBuy;
