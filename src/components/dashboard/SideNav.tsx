"use client";

import React from "react";
import NavLinks from "./NavLinks";

import SignoutButton from "../SignoutButton";
import clsx from "clsx";
import { XMarkIcon } from "@heroicons/react/24/outline";

const SideNav = ({
  openMenu,
  toggleMenu,
}: {
  openMenu: boolean;
  toggleMenu: () => void;
}) => {
  return (
    <div
      className={clsx(
        "flex flex-col  h-[90%] lg:h-full   bg-zinc-100 lg:bg-inherit lg:static fixed top-16 left-0 bottom-0 z-10 pl-4 lg:pl-0 w-3/4 lg:w-full transition-transform duration-300",
        {
          "translate-x-0": openMenu,
          "-translate-x-80 lg:translate-x-0": !openMenu,
        }
      )}
    >
      <div className="flex justify-end shrink lg:hidden">
        <button onClick={toggleMenu} className="p-2">
          <XMarkIcon className="w-5" />
        </button>
      </div>
      <NavLinks toggleMenu={toggleMenu} />
      <div className="mt-auto">
        <SignoutButton />
      </div>
    </div>
  );
};

export default SideNav;
