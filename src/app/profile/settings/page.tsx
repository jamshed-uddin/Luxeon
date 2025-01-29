import DeleteAccount from "@/components/DeleteAccount";
import PasswordChange from "@/components/PasswordChange";
import UserAddresses from "@/components/UserAddresses";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Settings | Luxeon - Redefine your space",
  description: "The cart page",
};

const Settings = () => {
  return (
    <div className="space-y-8 mb-10 ">
      <UserAddresses />
      <PasswordChange />
      <DeleteAccount />
    </div>
  );
};

export default Settings;
