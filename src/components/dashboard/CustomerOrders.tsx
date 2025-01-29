import { Order } from "@/lib/definition";
import { requestClient } from "@/lib/requestClient";
import React from "react";
import OrdersList from "../OrdersList";
import { auth } from "@/auth";

const CustomerOrders = async () => {
  const session = await auth();
  const orders = await requestClient<Order[]>(
    `/orders/usersOrders?userId=${session?.user._id}`,
    {
      method: "get",
    }
  );

  return (
    <div>
      <OrdersList orders={orders} />
    </div>
  );
};

export default CustomerOrders;
