import { auth } from "@/auth";
import CartItemCard from "@/components/cart/CartItemCard";
import CartItemPriceDetail from "@/components/cart/CartItemPriceDetail";
import PaymentElem from "@/components/checkout/PaymentElem";
import { fetchCart } from "@/lib/cart";
import React from "react";

const Checkout = async () => {
  const session = await auth();

  const cart = await fetchCart(
    `http://localhost:4000/api/cart?userId=${session?.user._id}`
  );

  return (
    <div className="my-container pb-10">
      <div className="flex flex-col lg:flex-row  lg:gap-10">
        <div className="lg:w-[60%] w-full space-y-5">
          {/* items */}
          <div className="w-full ">
            {cart?.items.map((item) => (
              <CartItemCard
                key={item._id}
                cartItem={item}
                placedIn="checkout"
              />
            ))}
          </div>
          {/* price details */}
          <div>
            <CartItemPriceDetail subtotal={cart?.subtotal} />
          </div>
        </div>
        <div className="lg:w-[40%] w-full ">
          <PaymentElem cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
