"use client";

import SideNav from "@/components/dashboard/SideNav";
import { Bars3Icon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const DashboardWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className="my-container relative ">
      <div className="flex w-full  h-[calc(100vh-4rem)] lg:overflow-hidden flex-col lg:flex-row lg:gap-4">
        <div className=" lg:w-64 flex-none  lg:bg-gradient-to-r lg:from-white  lg:to-zinc-100 ">
          <SideNav openMenu={openMenu} toggleMenu={toggleMenu} />
        </div>
        <div className="flex-grow lg:overflow-y-auto hide-scrollbar h-full">
          <button
            onClick={toggleMenu}
            className="flex items-center gap-1 lg:hidden"
          >
            <Bars3Icon className="w-4 inline" /> Menu
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardWrapper;
