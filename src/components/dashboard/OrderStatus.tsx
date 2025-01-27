"use client";

import clsx from "clsx";
import { useSession } from "next-auth/react";
import React from "react";

const OrderStatus = ({
  status,
}: {
  status: "processing" | "delivered" | "cancelled";
}) => {
  const { data } = useSession();
  return (
    <>
      <select
        name="status"
        id="status"
        className={clsx(
          "border rounded-lg text-xs py-0.5 px-1 focus:outline-0",
          {
            "border-yellow-300 bg-yellow-50": status === "processing",
            "border-green-300 bg-green-100": status === "delivered",
            "border-red-300 bg-red-100": status === "cancelled",
          }
        )}
      >
        {["processing", "delivered", "cancelled"].map((op) => (
          <option
            disabled={
              (op === "delivered" || op === "cancelled") &&
              data?.user.role === "admin"
            }
            key={op}
            value={op}
            className="bg-white"
          >{`${op.charAt(0).toUpperCase()}${op.slice(1)}`}</option>
        ))}
      </select>
      {/* <span
        className={clsx("border rounded-lg text-xs py-0.5 px-1", {
          "border-yellow-300 bg-yellow-50": status === "processing",
          "border-green-300 bg-green-100": status === "delivered",
          "border-red-300 bg-red-100": status === "cancelled",
        })}
      >
        {`${status.charAt(0).toUpperCase()}${status.slice(1)}`}
      </span> */}
    </>
  );
};

export default OrderStatus;
