import OrderStatus from "@/components/dashboard/OrderStatus";
import InvoicePdfDwnldBtn from "@/components/InvoicePdfDwnldBtn";
import PriceTag from "@/components/PriceTag";
import type { Order, PhotoUrlObj } from "@/lib/definition";
import { requestClient } from "@/lib/requestClient";

import Image from "next/image";
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

  const priceInfo: Record<string, number> = {
    Subtotal: order?.totalPrice,
    Shipping: 0,
    Vat: 0,
    Total: order?.totalPrice,
  };

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-10">
        <h1 className="lg:text-2xl font-medium flex items-center gap-2">
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
        <div className="mt-4 col-span-2 ">
          <h1 className="text-lg font-medium">Items</h1>
          <div className="">
            {order?.items.map((item) => {
              const { photoUrl, title } = item?.product;
              const { quantity, price } = item;

              return (
                <div
                  key={item._id}
                  className="flex  gap-3 border border-gray-200 rounded-xl p-1 mb-2"
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
                </div>
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
        <div>
          <div className="mt-4 border border-gray-200 p-2 rounded-xl">
            <h1 className="text-lg font-medium">Customer details</h1>

            <div className="space-y-1">
              <h2 className="font-medium">{order?.user.name}</h2>
              <h2 className="text-sm">
                <span className="font-light">Email: </span> {order?.user.email}
              </h2>
            </div>
          </div>

          <div className="mt-4 border border-gray-200 p-2 rounded-xl">
            <h1 className="text-lg font-medium">Shipping details</h1>
            <div>
              <h2 className="text-sm">
                <span className="font-light">Address: </span>{" "}
                {[
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
          <div className="mt-4 border border-gray-200 p-2 rounded-xl">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
