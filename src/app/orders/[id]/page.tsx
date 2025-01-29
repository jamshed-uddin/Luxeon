import OrderDetailComp from "@/components/OrderDetailComp";
import type { Order } from "@/lib/definition";
import { requestClient } from "@/lib/requestClient";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Order | Luxeon - Redefine your space",
  description: "The order details page",
};

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
