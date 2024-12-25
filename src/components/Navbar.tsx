import Link from "next/link";
import React from "react";
import { auth } from "@/auth";

import { UserIcon } from "@heroicons/react/24/outline";
import CartIcon from "./CartIcon";
const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="flex justify-between items-center py-2 my-container fixed top-0 left-0 right-0 z-20 mix-blend-difference text-white">
      <div>
        <Link href={"/"} className="text-3xl font-semibold">
          Luxeon
        </Link>
      </div>
      <div>
        <ul className="flex items-center gap-4 text-lg ">
          <li>
            <Link href={"/products"}>Products</Link>
          </li>
          <li>
            <CartIcon />
          </li>
          <li>
            <Link
              href={
                session?.user
                  ? session.user.role === "admin"
                    ? "/dashboard"
                    : "/profile"
                  : "/signin"
              }
            >
              <UserIcon className="w-5 h-5" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
