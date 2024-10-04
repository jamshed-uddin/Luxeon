import Link from "next/link";
import React from "react";
import { auth } from "@/auth";

import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="flex justify-between items-center py-2 my-container ">
      <div>
        <Link href={"/"} className="text-3xl font-semibold">
          Luxeon
        </Link>
      </div>
      <div>
        <ul className="flex items-center gap-4 text-lg">
          <li>
            <Link href={"/products"}>Products</Link>
          </li>
          <li>
            <ShoppingCartIcon className="w-5 h-5" />
          </li>
          <li>
            <Link href={session?.user ? "/dashboard" : "/signin"}>
              <UserIcon className="w-5 h-5" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;