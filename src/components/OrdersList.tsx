import { Order } from "@/lib/definition";
import React from "react";
import OrderStatus from "./dashboard/OrderStatus";
import PriceTag from "./PriceTag";
import OrderMetadata from "./dashboard/OrderMetadata";
import Link from "next/link";
interface OrdersListProps {
  orders: Order[];
}
const OrdersList = ({ orders }: OrdersListProps) => {
  return (
    <div className="space-y-2">
      {orders?.map((order) => (
        <Link
          href={`/dashboard/orders/${order._id}`}
          key={order._id}
          className="border border-gray-300 px-2 py-4 rounded-xl space-y-2 block"
        >
          <div className="lg:flex justify-between">
            <h2 className="text-sm lg:text-base font-medium">
              {`Order_${order._id}`} <OrderStatus status={order.status} />
            </h2>
            <PriceTag price={order.totalPrice} className="font-medium" />
          </div>
          <OrderMetadata order={order} />
        </Link>
      ))}
    </div>
  );
};

export default OrdersList;
