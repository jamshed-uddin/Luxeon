import DashboardHeader from "@/components/dashboard/DashboardHeader";

import OrdersList from "@/components/OrdersList";
import type { Order } from "@/lib/definition";
import { requestClient } from "@/lib/requestClient";
import { Metadata } from "next";

import React from "react";
export const metadata: Metadata = {
  title: "Orders | Luxeon - Redefine your space",
  description: "The dashboard orders page",
};

const Orders = async () => {
  const orders = await requestClient<Order[]>(`/orders`, {
    method: "get",
  });

  return (
    <div>
      <DashboardHeader>Orders</DashboardHeader>
      <OrdersList orders={orders} />
    </div>
  );
};

export default Orders;
