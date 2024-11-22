"use client";

import { userSignOut } from "@/actions";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import React, { FormEvent } from "react";

const SignoutButton = () => {
  const signoutUser = async (e: FormEvent) => {
    e.preventDefault();
    await userSignOut();
  };

  return (
    <form onSubmit={signoutUser}>
      <button
        type="submit"
        className="flex h-[48px]  items-center justify-center gap-2 text-sm font-medium  hover:text-blue-600 lg:flex-none lg:justify-start cursor-pointer"
      >
        <ArrowLeftStartOnRectangleIcon className="w-6" /> Sign out
      </button>
    </form>
  );
};

export default SignoutButton;
