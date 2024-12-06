"use client";

import { userSignOut } from "@/actions";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import React, { FormEvent, useTransition } from "react";

const SignoutButton = ({ className }: { className?: string }) => {
  const [pending, startTransition] = useTransition();

  const signoutUser = async (e: FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await userSignOut();
    });
  };
  console.log("signout pending", pending);
  return (
    <form onSubmit={signoutUser} className={className}>
      <button
        type="submit"
        disabled={pending}
        className="flex h-[48px]  items-center justify-center gap-2 text-sm font-medium  hover:text-blue-600 lg:flex-none lg:justify-start cursor-pointer disabled:opacity-70 disabled:cursor-wait"
      >
        <ArrowLeftStartOnRectangleIcon className="w-6" /> Sign out
      </button>
    </form>
  );
};

export default SignoutButton;
