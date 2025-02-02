import { Metadata } from "next";
import React from "react";
import DashboardWrapper from "./DashboardWrapper";

export const metadata: Metadata = {
  title: "Dashboard | Luxeon - Redefine your space",
  description: "The dashboard overview page",
};

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <DashboardWrapper>{children}</DashboardWrapper>;
};

export default DashboardLayout;
