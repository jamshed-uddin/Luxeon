import SideNav from "@/components/dashboard/SideNav";
import React from "react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="my-container">
      <div className="flex w-full  h-[calc(100vh-4rem)] lg:overflow-hidden flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-64 flex-none">
          <SideNav />
        </div>
        <div className="flex-grow lg:overflow-y-auto hide-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
