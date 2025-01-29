import { auth } from "@/auth";
import CartItemCard from "@/components/cart/CartItemCard";
import CartItemPriceDetail from "@/components/cart/CartItemPriceDetail";
import PaymentElem from "@/components/checkout/PaymentElem";
import { fetchCart } from "@/lib/cart";
import { CartItem } from "@/lib/definition";
import { ArrowRightIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Checkout | Luxeon - Redefine your space",
  description: "The cart page",
};

const Checkout = async () => {
  const session = await auth();
  const cart = await fetchCart(`/cart?userId=${session?.user._id}`);

  const stockedItems = cart?.items?.filter(
    (item) => (item.product.stock as number) >= (item.quantity as number)
  );
  const subTotal = stockedItems?.reduce(
    (acc: number, item: CartItem) =>
      (acc + Number(item.product.price)) * (item.quantity as number),
    0
  );
  const totalItems = stockedItems?.reduce(
    (acc: number, item: CartItem) => acc + item.quantity,
    0
  );

  const cartWithStockedProducts = {
    ...cart,
    items: stockedItems,
    subTotal,
    totalItems,
  };

  return (
    <div className="my-container pb-10">
      {cartWithStockedProducts?.items?.length === 0 ||
      !cartWithStockedProducts.items ? (
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
        <div className="flex flex-col lg:flex-row  lg:gap-10">
          <div className="lg:w-[60%] w-full space-y-5">
            {/* items */}
            <div className="w-full ">
              {cartWithStockedProducts?.items?.map((item) => (
                <CartItemCard
                  key={item._id}
                  cartItem={item}
                  placedIn="checkout"
                />
              ))}
            </div>
            {/* price details */}
            <div>
              <CartItemPriceDetail
                subtotal={cartWithStockedProducts?.subtotal}
              />
            </div>
          </div>
          <div className="lg:w-[40%] w-full ">
            <PaymentElem cart={cartWithStockedProducts} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
