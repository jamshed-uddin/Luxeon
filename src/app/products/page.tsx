import FilterAndSearch from "@/components/FilterAndSearch";
import Pagination from "@/components/Pagination";

import ProductsList from "@/components/products/ProductsList";

import { getProducts } from "@/lib/getProducts";
import { Metadata } from "next";

import React from "react";

export const metadata: Metadata = {
  title: "Products | Luxeon - Redefine your space",
  description:
    "We create timeless, handcrafted furniture that brings sophistication and character to your home. Each piece is designed with passion,precision, and an eye for detail because your space deserves nothingless than perfection.",
  openGraph: {
    images: [{ url: "../../assets/luxeonheroimage.jpg" }],
  },
};

const Products = async (props: {
  searchParams?: Promise<{
    q?: string;
    page?: string;
    category?: string;
    sort?: string;
    order?: string;
    inStock?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const validQueries = ["q", "page", "category", "sort", "order", "inStock"];

  const validQueryParams = (
    searchParams: Record<string, string> = {},
    validQueries: string[]
  ): string => {
    const queries: Record<string, string> = {};

    validQueries.forEach((key) => {
      if (key in searchParams) {
        queries[key] = searchParams[key];
      }
    });

    return new URLSearchParams(queries).toString();
  };

  const validParams = validQueryParams(searchParams, validQueries);

  const products = await getProducts(`/products?${validParams}`);

  return (
    <div className="my-container">
      <FilterAndSearch />

      {products && !products?.data.length ? (
        <div className="mt-4">
          <h2 className="text-center font-medium text-xl">No product found</h2>
        </div>
      ) : (
        <ProductsList products={products?.data} />
      )}
      {products?.pagination?.totalPages > 1 && (
        <div className="w-1/3 lg:ml-auto lg:mx-0 mx-auto flex justify-center lg:justify-end py-10 ">
          <Pagination totalPages={products?.pagination?.totalPages} />
        </div>
      )}
    </div>
  );
};

export default Products;
