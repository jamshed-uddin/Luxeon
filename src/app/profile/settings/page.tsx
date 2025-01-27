import DeleteAccount from "@/components/DeleteAccount";
import PasswordChange from "@/components/PasswordChange";
import UserAddresses from "@/components/UserAddresses";
import React from "react";

const Addresses = () => {
  return (
    <div className="space-y-8 mb-10 ">
      <UserAddresses />
      <PasswordChange />
      <DeleteAccount />
    </div>
  );
};

export default Addresses;
