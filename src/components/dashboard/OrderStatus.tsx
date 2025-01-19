import clsx from "clsx";
import React from "react";

const OrderStatus = ({
  status,
}: {
  status: "processing" | "delivered" | "cancelled";
}) => {
  return (
    <span
      className={clsx("border rounded-lg text-xs py-0.5 px-1", {
        "border-yellow-300 bg-yellow-50": status === "processing",
        "border-green-300 bg-green-100": status === "delivered",
        "border-red-300 bg-red-100": status === "cancelled",
      })}
    >
      {`${status.charAt(0).toUpperCase()}${status.slice(1)}`}
    </span>
  );
};

export default OrderStatus;
