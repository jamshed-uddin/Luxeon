import DashboardHeader from "@/components/dashboard/DashboardHeader";

import OrdersList from "@/components/OrdersList";
import type { Order } from "@/lib/definition";
import { requestClient } from "@/lib/requestClient";

import React from "react";

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
