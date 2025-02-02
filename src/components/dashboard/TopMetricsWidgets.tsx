"use client";

import { requestClient } from "@/lib/requestClient";
import clsx from "clsx";
import React, { useState } from "react";
import useSWR from "swr";
import PriceTag from "../PriceTag";
import { DashboardCardsSkeleton } from "../Skeletons";

type DashboardMetrics = {
  salesAndOrders: {
    thisMonth: {
      totalSalesThisMonth: number;
      totalOrderThisMonth: number;
    };
    thisYear: {
      totalSalesThisYear: number;
      totalOrderThisYear: number;
    };
  };
  productsData: {
    totalProduct: number;
    lowOnStock: number;
  };
};

const TopMetricsWidgets = () => {
  const [tab, setTab] = useState("This month");
  const getMetrics = async (url: string) =>
    await requestClient<Promise<DashboardMetrics>>(url, {
      method: "get",
    });

  const {
    data: metrics,
    isLoading,
    error,
  } = useSWR("/dashboard/topMetrics", (url) => getMetrics(url));

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <DashboardCardsSkeleton />
      </div>
    );
  }

  if (error) {
    throw new Error("Something went wrong.");
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        {["This month", "This year"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={clsx("border border-black rounded-xl px-2 font-medium", {
              "border-blue-600 text-blue-600": tab === t,
            })}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {Object.entries(
          tab === "This month"
            ? (metrics?.salesAndOrders?.thisMonth as Record<string, number>)
            : (metrics?.salesAndOrders?.thisYear as Record<string, number>)
        )?.map(([key, value]: [string, number]) => (
          <div key={key} className="h-28  shadow-md rounded-xl p-4">
            <h2 className="text-2xl font-medium">
              {(key === "totalRevenue" && "Total revenue") ||
                (key === "totalOrder" && "Total order")}
            </h2>
            <div>
              <h3 className="text-xl font-medium text-blue-600">
                {" "}
                {key === "totalRevenue" ? <PriceTag price={value} /> : value}
              </h3>
            </div>
          </div>
        ))}

        <div className="h-28  shadow-md rounded-xl p-4">
          <h2 className="text-2xl font-medium">Total products</h2>
          <div>
            <h3 className="text-xl font-medium text-blue-600">
              {metrics?.productsData.totalProduct}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMetricsWidgets;
