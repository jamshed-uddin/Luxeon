import { CartItem, PhotoUrlObj } from "@/lib/definition";
import React from "react";
import PriceTag from "../PriceTag";
import Image from "next/image";
import CartQuantity from "./CartQuantity";
import { TrashIcon } from "@heroicons/react/24/outline";

interface CartItemCardProps {
  cartItem: CartItem;
}

const CartItemCard = ({ cartItem }: CartItemCardProps) => {
  const { _id, product, quantity } = cartItem;

  return (
    <div className="flex gap-4 rounded-xl shadow-md p-2 w-full">
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
        <div className="flex-grow">
          <h2 className="text-xl font-medium">{product.title}</h2>
          <PriceTag
            price={(product.price as number) * quantity}
            className={"text-lg"}
          />
        </div>

        {/* quantity n remove button */}
        <div className="flex items-center justify-between  flex-grow  w-full lg:w-fit">
          <CartQuantity cartItemId={_id} itemQuantity={quantity} />
          <button>
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
