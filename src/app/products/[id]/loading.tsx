import { ProductDetailSkeleton } from "@/components/Skeletons";
import React from "react";

const Loading = () => {
  return (
    <div className="my-container">
      <ProductDetailSkeleton />
    </div>
  );
};

export default Loading;
