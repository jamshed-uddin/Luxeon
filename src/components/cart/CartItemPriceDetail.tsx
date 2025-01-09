import React from "react";
import PriceTag from "../PriceTag";

interface CartItemPriceDetailProps {
  subtotal: number;
}

const CartItemPriceDetail = ({ subtotal }: CartItemPriceDetailProps) => {
  return (
    <>
      <div className="flex text-xl font-light justify-between mb-2">
        <h1>Subtotal</h1>
        <PriceTag price={subtotal} />
      </div>
      <div className="flex text-xl  justify-between">
        <h1>Total</h1>
        <PriceTag price={subtotal} />
      </div>
    </>
  );
};

export default CartItemPriceDetail;
