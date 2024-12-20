import { ProductDetailSkeleton } from "@/components/Skeletons";
import React from "react";

const Loading = () => {
  console.log("loading from single product");
  return (
    <div className="my-container">
      <ProductDetailSkeleton />
    </div>
  );
};

export default Loading;
