import type { Order } from "@/lib/definition";
import { formatDate } from "@/lib/formatDate";
import {
  CalendarDaysIcon,
  MapPinIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React from "react";

const OrderMetadata = ({ order }: { order: Order }) => {
  return (
    <div className="flex flex-col lg:flex-row  gap-4">
      <div className="flex items-center gap-1 lg:text-sm text-xs">
        <MapPinIcon className="w-4 text-blue-600" />
        <div className=" ">
          {[
            order?.address?.addressLine,
            order?.address?.street,
            order?.address?.city &&
              ` ${order?.address?.city}(${order?.address?.zipCode})`,
            order?.address?.country,
          ]
            .filter(Boolean)
            .join(",")}
        </div>
      </div>

      <div className=" flex gap-4 lg:text-sm text-xs ">
        <div className="flex items-center gap-1">
          <UserIcon className="w-4  text-blue-600" />
          {order?.user.name}
        </div>
        <div className="flex items-center gap-1">
          <CalendarDaysIcon className="w-4  text-blue-600" />{" "}
          {formatDate(order?.createdAt as Date)}
        </div>
      </div>
    </div>
  );
};

export default OrderMetadata;
