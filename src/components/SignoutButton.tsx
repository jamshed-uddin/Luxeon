"use client";

import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useSession, signOut } from "next-auth/react";
import React, { FormEvent, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

const SignoutButton = ({ className }: { className?: string }) => {
  const [pending, setPending] = useState(false);
  const { update } = useSession();

  const signoutUser = async (e: FormEvent) => {
    e.preventDefault();
    setPending(true);
    signOut({ redirectTo: "/" });
    setPending(false);

    // update();
  };

  return (
    <form
      onSubmit={signoutUser}
      className={`${className} flex items-center gap-2`}
    >
      <button
        type="submit"
        disabled={pending}
        className="flex h-[48px]  items-center justify-center gap-2 text-sm font-medium  hover:text-blue-600 lg:flex-none lg:justify-start cursor-pointer disabled:opacity-70 disabled:cursor-wait"
      >
        <ArrowLeftStartOnRectangleIcon className="w-6" /> Sign out
      </button>
      {pending && <LoadingSpinner size="small" />}
    </form>
  );
};

export default SignoutButton;
