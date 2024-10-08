import Button from "@/components/Button";
import CartItemCard from "@/components/cart/CartItemCard";
import PriceTag from "@/components/PriceTag";
import { fetchCart } from "@/lib/cart";
import Link from "next/link";
import React from "react";

const Cart = async () => {
  const { _id, items, totalItems, subtotal } = await fetchCart(
    "http://localhost:4000/api/cart/6703c4302e2e4880d0d7dfe2"
  );

  return (
    <div className="my-container">
      <h2 className="text-3xl font-medium">Your cart</h2>

      <div className="flex flex-col lg:flex-row gap-4 mt-8">
        {/* cart items */}
        <div className="w-full lg:w-[65%]">
          {items.map((item) => (
            <CartItemCard key={item._id} cartItem={item} />
          ))}
        </div>

        {/* subtotal  */}
        <div className="w-full lg:w-[35%] ">
          <div className="flex text-xl font-light justify-between mb-2">
            <h1>Subtotal</h1>
            <PriceTag price={subtotal} />
          </div>
          <div className="flex text-xl  justify-between">
            <h1>Total</h1>
            <PriceTag price={subtotal} />
          </div>
          <div className="w-full  mt-8">
            <Link
              href={`/checkout?cart=${_id}`}
              className="block w-full text-center text-xl border border-black px-6 py-3  rounded-3xl "
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
