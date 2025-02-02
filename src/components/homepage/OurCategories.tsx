import clsx from "clsx";
import Link from "next/link";
import React from "react";
import SectionTitle from "../SectionTitle";
export const categories = [
  { label: "Sofa", value: "sofa" },
  { label: "Chair", value: "chair" },
  { label: "Table", value: "table" },
  { label: "Shelf", value: "shelf" },
  { label: "Desk", value: "desk" },
  { label: "Stool", value: "stool" },
  { label: "Lighting", value: "lighting" },
];
const OurCategories = () => {
  return (
    <div className="my-container ">
      <SectionTitle>Our categories</SectionTitle>
      <div className="mt-7">
        <div className="flex flex-wrap  link-container text-4xl  lg:text-6xl font-medium">
          {categories.map((category) => (
            <Link
              href={`/products?category=${category.value}`}
              key={category.value}
              className={clsx(" link transition-opacity duration-700 pr-4")}
            >
              {category.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurCategories;
