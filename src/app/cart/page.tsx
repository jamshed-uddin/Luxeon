import { auth } from "@/auth";
import CartItemCard from "@/components/cart/CartItemCard";
import CartItemPriceDetail from "@/components/cart/CartItemPriceDetail";
import { ArrowRightIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

import Link from "next/link";
import React from "react";
import { cookies } from "next/headers";
import { requestClient } from "@/lib/requestClient";
import type { Cart } from "@/lib/definition";

const Cart = async () => {
  const session = await auth();
  const url = session?.user ? `/cart?userId=${session?.user._id}` : "/cart";

  const cartId = (await cookies()).get("cartId");

  const cart = await requestClient<Cart>(url, {
    method: "get",
    headers: { Cookie: `cartId=${cartId?.value}` },
  });

  return (
    <div className="my-container">
      <h2 className="text-3xl font-medium">Cart</h2>

      {cart?.items?.length === 0 || !cart?.items ? (
        <div className="flex flex-col justify-center items-center h-[50vh]">
          <div className="relative w-fit">
            <ShoppingCartIcon className="w-14" />
            <span className="font-medium absolute  top-0 right-0 bg-white py-0.5 px-1 shadow-md rounded-full">
              0
            </span>
          </div>
          <div className="text-center">
            <h3 className="lg:text-2xl font-medium text-xl ">
              Your cart is empty
            </h3>
            <Link href={"/products"} className=" text-blue-600 ">
              Continue shopping
              <ArrowRightIcon className="w-4 inline " />
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-4 mt-4 lg:mt-8 ">
          {/* cart items */}
          <div className="w-full lg:w-[65%]">
            {cart?.items?.map((item) => (
              <CartItemCard key={item._id} cartItem={item} placedIn="cart" />
            ))}
          </div>

          {/* subtotal  */}
          <div className="w-full lg:w-[35%] ">
            <CartItemPriceDetail subtotal={cart?.subtotal} />
            <div className="w-full  mt-8">
              <Link
                href={`/checkout`}
                className="block w-full text-center text-xl border border-black px-6 py-2  rounded-3xl "
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
