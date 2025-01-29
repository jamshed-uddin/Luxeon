import { getProducts } from "@/lib/getProducts";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import ProductsList from "../products/ProductsList";
import SectionTitle from "../SectionTitle";

const OurProducts = async () => {
  const products = await getProducts(`/products?limit=6`);
  console.log("product from our", products);

  return (
    <div className="my-container ">
      <div className="flex justify-between ">
        <SectionTitle>Our products</SectionTitle>
        <Link href={"/products"}>
          More <ArrowUpRightIcon className="w-4 inline" />
        </Link>
      </div>

      <div className="mt-7">
        <ProductsList products={products?.data} />
      </div>
    </div>
  );
};

export default OurProducts;
