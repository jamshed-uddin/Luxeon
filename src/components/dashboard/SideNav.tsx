import React from "react";
import NavLinks from "./NavLinks";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";

const SideNav = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <NavLinks />

      <h3 className="flex h-[48px]  items-center justify-center gap-2 text-sm font-medium  hover:text-blue-600 lg:flex-none lg:justify-start cursor-pointer">
        <ArrowLeftStartOnRectangleIcon className="w-6" /> Sign out
      </h3>
    </div>
  );
};

export default SideNav;
