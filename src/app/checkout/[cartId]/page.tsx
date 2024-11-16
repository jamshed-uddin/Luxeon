import React from "react";

const Checkout = async (props: { params: Promise<{ cartId: string }> }) => {
  const params = await props.params;
  return (
    <div>
      <h2>cart ID {params.cartId}</h2>
    </div>
  );
};

export default Checkout;
