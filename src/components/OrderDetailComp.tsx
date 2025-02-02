import { Order, PhotoUrlObj } from "@/lib/definition";
import React from "react";
import OrderStatus from "./dashboard/OrderStatus";
import InvoicePdfDwnldBtn from "./InvoicePdfDwnldBtn";
import Link from "next/link";
import Image from "next/image";
import PriceTag from "./PriceTag";
import { formatDate } from "@/lib/formatDate";

interface OrderDetailCompProps {
  order: Order;
}

const OrderDetailComp = ({ order }: OrderDetailCompProps) => {
  const priceInfo: Record<string, number> = {
    Subtotal: order?.totalPrice,
    Shipping: 0,
    Vat: 0,
    Total: order?.totalPrice,
  };

  return (
    <div className="mb-3 my-container">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-5  gap-2 lg:gap-0">
        <h1 className="text-sm lg:text-2xl font-medium flex items-center gap-2">
          <span>{`Order_${order?._id}`} </span>
          <OrderStatus status={order?.status} />
        </h1>

        <InvoicePdfDwnldBtn
          fileName={`Luxeon-invoice-${order?._id}`}
          order={order}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-3">
        {/* order items */}
        <div className=" col-span-2 ">
          <h1 className="text-lg font-medium mb-3 ">Items</h1>
          <div className="">
            {order?.items.map((item) => {
              const { photoUrl, title } = item?.product;
              const { quantity, price } = item;

              return (
                <Link
                  href={`/products/${item?.product?._id}`}
                  key={item._id}
                  className="flex gap-3 border border-gray-200 rounded-xl p-1 mb-2"
                >
                  <div className="size-20">
                    <Image
                      src={(photoUrl.at(0) as PhotoUrlObj).url}
                      alt={title}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div>
                    <h2>{title}</h2>
                    <div className="text-base  font-normal">{quantity}x</div>
                    <PriceTag
                      price={price as number}
                      className={"text-lg font-[400]  mt-auto"}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="flex justify-end">
            <div className="space-y-1 ">
              {Object.keys(priceInfo).map((infoKey) => (
                <h2 key={infoKey} className=" flex justify-between gap-3">
                  <span className={`${infoKey === "Total" && "font-medium"}`}>
                    {infoKey}:
                  </span>{" "}
                  <span>
                    <PriceTag price={priceInfo[infoKey]} />
                  </span>
                </h2>
              ))}
            </div>
          </div>
        </div>

        {/* order meta data */}
        <div className="space-y-3 mt-2">
          <div className=" border border-gray-200 p-2 rounded-xl">
            <h1 className="text-lg font-medium">Customer details</h1>

            <div className="space-y-1">
              <h2 className="font-medium  text-sm">{order?.user.name}</h2>
              <h2 className="text-sm">
                <span className="font-light">Email: </span> {order?.user.email}
              </h2>
            </div>
          </div>

          <div className=" border border-gray-200 p-2 rounded-xl">
            <h1 className="text-lg font-medium">Shipping details</h1>
            <div>
              <h2 className="text-sm">
                <span className="font-light">Address: </span>{" "}
                {[
                  order?.address?.name,
                  order?.address?.addressLine,
                  order?.address?.street,
                  order?.address?.city &&
                    ` ${order?.address?.city}(${order?.address?.zipCode})`,
                  order?.address?.country,
                ]
                  .filter(Boolean)
                  .join(",")}
              </h2>
            </div>
          </div>
          <div className=" border border-gray-200 p-2 rounded-xl">
            <h1 className="text-lg font-medium">Payment details</h1>
            <div className="text-sm space-y-1">
              <h2>
                <span className="font-light">Transaction ID: </span>{" "}
                {order?.paymentDetails.transactionId}
              </h2>
              <h2>
                <span className="font-light">Payment method: </span>{" "}
                {order?.paymentDetails.paymentMethod}
              </h2>
              <h2>
                <span className="font-light">Date: </span>{" "}
                {formatDate(order?.createdAt as Date)}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailComp;
