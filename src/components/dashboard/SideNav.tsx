import React from "react";
import NavLinks from "./NavLinks";

import SignoutButton from "../SignoutButton";

const SideNav = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <NavLinks />

      <SignoutButton />
    </div>
  );
};

export default SideNav;
