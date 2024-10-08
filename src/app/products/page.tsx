import FilterAndSearch from "@/components/FilterAndSearch";
import ProductCard from "@/components/products/ProductCard";

import React from "react";

const Products = async ({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    page?: string;
  };
}) => {
  const url = new URLSearchParams(searchParams);

  const res = await fetch("http://localhost:4000/api/products");
  if (!res.ok) {
    return (
      <div>
        <h2>Something went wrong</h2>
      </div>
    );
  }

  const products = await res.json();

  if (!products) {
    return <div>loading...</div>;
  }

  return (
    <div className="my-container">
      <FilterAndSearch />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-2">
        {products?.data?.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default Products;
