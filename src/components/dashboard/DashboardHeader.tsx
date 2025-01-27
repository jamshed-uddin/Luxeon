import clsx from "clsx";
import React, { ReactNode } from "react";

const DashboardHeader = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={clsx("text-xl font-medium  mb-2", className)}>{children}</h2>
  );
};

export default DashboardHeader;
