import SideNav from "@/components/dashboard/SideNav";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard | Luxeon - Redefine your space",
  description: "The dashboard overview page",
};

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="my-container">
      <div className="flex w-full  h-[calc(100vh-4rem)] lg:overflow-hidden flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-64 flex-none  lg:bg-gradient-to-r lg:from-white  lg:to-zinc-100">
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
