"use client";

import React, { useState } from "react";

const ProductDescription = ({ description }: { description: string }) => {
  const [showAll, setShowAll] = useState(false);
  const maxLength = 250;
  return (
    <p className="text-lg font-light">
      {showAll || description?.length <= maxLength
        ? description
        : `${description.slice(0, maxLength)}...`}

      {description?.length > maxLength && (
        <button
          className="text-sm font-normal"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Less" : "More"}
        </button>
      )}
    </p>
  );
};

export default ProductDescription;
