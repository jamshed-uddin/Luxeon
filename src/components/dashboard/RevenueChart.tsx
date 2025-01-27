"use client";

import { requestClient } from "@/lib/requestClient";
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend,
} from "recharts";
import useSWR from "swr";
import { RevenueChartSkeleton } from "../Skeletons";
import DashboardHeader from "./DashboardHeader";

export type RevenueChartObject = {
  name: string;
  month: number;
  year: number;
  Revenue: number;
};

export type RevenueChartData = RevenueChartObject[];

const RevenueChart = () => {
  const getChartData = async (url: string) =>
    await requestClient<Promise<RevenueChartData>>(url, {
      method: "get",
    });

  const { data: chartData, isLoading } = useSWR("/dashboard/chartdata", (url) =>
    getChartData(url)
  );

  if (isLoading) {
    return <RevenueChartSkeleton />;
  }

  return (
    <div className="w-full  h-72 mt-5">
      <DashboardHeader>Revenue growth</DashboardHeader>

      <ResponsiveContainer width={"100%"} height={"100%"}>
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            left: 0,
            right: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Revenue" fill="#2563eb" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
