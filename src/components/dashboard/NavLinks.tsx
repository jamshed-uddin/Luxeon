"use client";

import {
  CubeIcon,
  ShoppingBagIcon,
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
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingBagIcon },
];

const NavLinks = ({ toggleMenu }: { toggleMenu: () => void }) => {
  const pathname = usePathname();

  return (
    <div>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            onClick={toggleMenu}
            className={clsx(
              " h-[48px]      text-sm font-medium  hover:text-blue-600  flex  items-center gap-2 ",
              {
                " text-blue-600": pathname === link.href,
              }
            )}
            shallow
          >
            <LinkIcon className="w-6" />
            <p className="">{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;
