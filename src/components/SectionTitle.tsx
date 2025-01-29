import React, { ReactNode } from "react";

const SectionTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <h1 className={`text-2xl font-medium ${className}`}>{children}</h1>;
};

export default SectionTitle;
