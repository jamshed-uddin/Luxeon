"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  { name: "Orders", href: "/profile" },
  {
    name: "Addresses",
    href: "/profile/addresses",
  },
];

const ProfileNav = () => {
  const pathname = usePathname();
  console.log("profile path", pathname);

  return (
    <nav className="mt-4 space-x-4 text-xl">
      {links.map((link) => (
        <Link
          className={clsx(
            "opacity-70 hover:opacity-100 transition-opacity duration-300",
            {
              "border-b-2 border-black opacity-100": pathname === link.href,
            }
          )}
          key={link.name}
          href={link.href}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default ProfileNav;
