import React from "react";

const Checkout = ({ params }: { params: { cartId: string } }) => {
  return (
    <div>
      <h2>cart ID {params.cartId}</h2>
    </div>
  );
};

export default Checkout;
