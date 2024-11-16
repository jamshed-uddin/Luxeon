import CardsSkeleton from "@/components/Skeletons";
import React from "react";

const Loading = () => {
  return (
    <div className="my-container">
      <CardsSkeleton />
    </div>
  );
};

export default Loading;
