import { CartItemSkeleton } from "@/components/Skeletons";
import React from "react";

const Loading = () => {
  return (
    <div className="my-container">
      <div className="lg:w-[60%]">
        <CartItemSkeleton />
      </div>
    </div>
  );
};

export default Loading;
