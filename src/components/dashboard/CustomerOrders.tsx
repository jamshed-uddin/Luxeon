import { Order } from "@/lib/definition";
import { requestClient } from "@/lib/requestClient";
import React from "react";
import OrdersList from "../OrdersList";

const CustomerOrders = async () => {
  const orders = await requestClient<Order[]>(`/orders`, {
    method: "get",
  });

  return (
    <div>
      <OrdersList orders={orders} />
    </div>
  );
};

export default CustomerOrders;
