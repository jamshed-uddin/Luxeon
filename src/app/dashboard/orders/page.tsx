import { auth } from "@/auth";

import OrdersList from "@/components/OrdersList";
import type { Order } from "@/lib/definition";
import { requestClient } from "@/lib/requestClient";

import React from "react";

const Orders = async () => {
  const session = await auth();
  const orders = await requestClient<Order[]>(
    `/orders?userId=${session?.user._id}`,
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

export default Orders;
