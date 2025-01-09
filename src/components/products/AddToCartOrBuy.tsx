"use client";

import React, { useState } from "react";
import Button from "../Button";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/providers/CartProvider";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const AddToCartOrBuy = ({ id, inStock }: { id: string; inStock: boolean }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      const res = await addToCart({
        productId: id,
        quantity,
        userId: session?.data?.user._id as string,
      });
      console.log(res);

      toast.success("Product added to cart");
    } catch (error) {
      toast.error((error as Error).message || "Failed to add product to cart");
    } finally {
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
        <Button
          disabled={loading || !inStock}
          loading={loading}
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default AddToCartOrBuy;
