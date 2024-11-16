"use client";

import { DocumentCurrencyDollarIcon } from "@heroicons/react/24/outline";
import {
  CubeIcon,
  CurrencyDollarIcon,
  HomeIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Products",
    href: "/dashboard/products",
    icon: CubeIcon,
  },
  { name: "Add product", href: "/dashboard/add-product", icon: PlusIcon },
  { name: "Orders", href: "/dashboard/orders", icon: PlusIcon },
  {
    name: "Transactions",
    href: "/dashboard/transaction",
    icon: DocumentCurrencyDollarIcon,
  },
];

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <div>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2    text-sm font-medium  hover:text-blue-600 lg:flex-none lg:justify-start ",
              {
                " text-blue-600": pathname === link.href,
              }
            )}
            shallow
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;
