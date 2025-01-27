import OrderDetailComp from "@/components/OrderDetailComp";
import type { Order } from "@/lib/definition";
import { requestClient } from "@/lib/requestClient";
import React from "react";

const OrderDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  console.log(id);

  const order = await requestClient<Order>(`/orders/${id}`, {
    method: "get",
  });

  return <OrderDetailComp order={order} />;
};

export default OrderDetails;
