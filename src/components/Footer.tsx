import React from "react";
import { categories } from "./homepage/OurCategories";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="mt-24 mb-2 lg:relative mx-3 lg:mx-0">
      <div className="lg:absolute lg:top-0 lg:left-0">
        <h1 className="text-5xl lg:text-[8.3rem] font-semibold">Luxeon</h1>
      </div>
      <div className=" lg:w-3/4 ml-auto mt-4 lg:border-l border-black lg:pl-4 lg:pt-36 mb-3">
        <div className="flex flex-wrap  justify-between  text-sm">
          <ul className="flex flex-col">
            <Link href={"/products"}>Products</Link>
            <Link href={"/cart"}>Cart</Link>
            <Link href={"/profile"}>Account</Link>
          </ul>

          <div>
            <h3 className="font-medium">Categories</h3>
            <ul>
              {categories.map((category, idx) => (
                <Link
                  key={idx}
                  href={`/products?category=${category.value}`}
                  className="block"
                >
                  {category.label}
                </Link>
              ))}
            </ul>
          </div>
          <ul>
            <li>+98324123</li>
            <li>
              237 Maplewood Drive, Apt 4B Brooklyn, <br /> NY 11215, USA
            </li>
          </ul>
        </div>
      </div>

      <h4 className="font-light text-xs text-end">
        © 2025 Luxeon. All rights reserved.
      </h4>
    </div>
  );
};

export default Footer;
