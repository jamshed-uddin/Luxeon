import FilterAndSearch from "@/components/FilterAndSearch";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/products/ProductCard";
import CardsSkeleton, { CardSkeleton } from "@/components/Skeletons";
import { Products } from "@/lib/definition";

import React from "react";

const Products = async ({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    page?: string;
    category?: string;
    sort?: string;
    order?: string;
    inStock?: string;
  };
}) => {
  const url = new URLSearchParams(searchParams).toString();

  console.log("params", searchParams);
  console.log("url", url);

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

  const res = await fetch(`http://localhost:4000/api/products?${validParams}`, {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
  if (!res.ok) {
    throw new Error("Something went wrong!");
  }

  const products: Products = await res.json();

  console.log(products);

  return (
    <div className="my-container">
      <FilterAndSearch />

      {products && !products?.data.length ? (
        <div className="mt-4">
          <h2 className="text-center font-medium text-xl">No product found</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4">
          {products?.data?.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      )}
      {products?.pagination?.totalPages > 1 && (
        <div className="w-1/3 lg:ml-auto lg:mx-0 mx-auto flex justify-center lg:justify-end py-5 ">
          <Pagination totalPages={products?.pagination?.totalPages} />
        </div>
      )}
    </div>
  );
};

export default Products;
