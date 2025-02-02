import { Order } from "@/lib/definition";
import React from "react";
import OrderStatus from "./dashboard/OrderStatus";
import PriceTag from "./PriceTag";
import OrderMetadata from "./dashboard/OrderMetadata";
import Link from "next/link";
import { ArrowRightIcon, CubeIcon } from "@heroicons/react/24/outline";
interface OrdersListProps {
  orders: Order[];
}
const OrdersList = ({ orders }: OrdersListProps) => {
  if (orders.length <= 0) {
    return (
      <div className="flex flex-col items-center  text-center">
        <div className="relative w-fit">
          <CubeIcon className="w-14" />
          <span className="font-medium absolute  top-0 right-0 bg-white py-0.5 px-1 shadow-md rounded-full">
            0
          </span>
        </div>
        <div className="text-center">
          <h3 className="lg:text-2xl font-medium text-xl ">
            No order placed yet
          </h3>
          <Link href={"/products"} className=" text-blue-600 ">
            Continue shopping
            <ArrowRightIcon className="w-4 inline " />
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-2">
      {orders?.map((order) => (
        <Link
          href={`/orders/${order._id}`}
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
