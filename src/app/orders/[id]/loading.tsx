import { CartItemSkeleton } from "@/components/Skeletons";
import React from "react";

const Loading = () => {
  return (
    <div className="my-container">
      <CartItemSkeleton />
    </div>
  );
};

export default Loading;
