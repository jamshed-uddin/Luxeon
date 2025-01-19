"use client";

import { CartItem, PhotoUrlObj } from "@/lib/definition";
import React, { useState } from "react";
import PriceTag from "../PriceTag";
import Image from "next/image";
import CartQuantity from "./CartQuantity";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/providers/CartProvider";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LoadingSpinner from "../LoadingSpinner";

interface CartItemCardProps {
  cartItem: CartItem;
  placedIn: "cart" | "checkout";
}

const CartItemCard = ({ cartItem, placedIn }: CartItemCardProps) => {
  const { _id, product, quantity } = cartItem;
  const [isPending, setIsPending] = useState(false);
  const { updateCart } = useCart();
  const router = useRouter();
  const removeCartItemHandler = async () => {
    try {
      setIsPending(true);
      await updateCart({ cartItemId: cartItem._id, quantity: 0 });
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className={`flex gap-4 rounded-xl shadow-md p-2 w-full `}>
      <div className="h-24 w-24 rounded-xl overflow-hidden">
        <Image
          src={(product.photoUrl.at(0) as PhotoUrlObj).url}
          alt={product.title}
          width={100}
          height={100}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <div className="space-y-2 flex flex-col lg:flex-row items-start justify-between flex-grow">
        {/* title n price */}
        <div className="flex-grow flex flex-col h-full">
          <h2 className="text-xl font-medium">{product.title} </h2>
          {/* quantity to show in checkout page */}
          {placedIn === "checkout" && (
            <div className="text-base  font-normal">{quantity}x</div>
          )}

          <div className="flex flex-col text-xs">
            {(cartItem.product.stock as number) <= 0 && (
              <div className="flex items-center gap-1">
                <span className="block h-2.5 w-2.5 bg-red-400 rounded-full"></span>
                <span>Out of stock</span>
              </div>
            )}
            {(cartItem.product.stock as number) <
              (cartItem.quantity as number) &&
              (cartItem.product.stock as number) !== 0 && (
                <div className="flex items-center gap-1">
                  <span className="block h-2.5 w-2.5 bg-red-400 rounded-full"></span>
                  <span>Quantity is greater than stock</span>
                </div>
              )}
          </div>

          <PriceTag
            price={product.price as number}
            className={"text-lg font-[400]  mt-auto"}
          />
        </div>

        {/* quantity n remove button */}
        {placedIn === "cart" && (
          <div className="flex items-center justify-between lg:justify-end gap-16 flex-grow  w-full lg:w-fit">
            <CartQuantity cartItemId={_id} itemQuantity={quantity} />
            <div className="relative">
              <button
                disabled={isPending}
                onClick={removeCartItemHandler}
                className="disabled:opacity-50"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
              {isPending && (
                <div className="absolute inset-0">
                  <LoadingSpinner size="small" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItemCard;
