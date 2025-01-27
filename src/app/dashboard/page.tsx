import { auth } from "@/auth";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import RevenueChart from "@/components/dashboard/RevenueChart";
import TopMetricsWidgets from "@/components/dashboard/TopMetricsWidgets";

import React from "react";

const Dashboard = async () => {
  const session = await auth();
  console.log(session);

  return (
    <div>
      <div className="mb-4">
        <DashboardHeader>Hello, {session?.user.name}</DashboardHeader>
      </div>
      <TopMetricsWidgets />
      <RevenueChart />
    </div>
  );
};

export default Dashboard;
