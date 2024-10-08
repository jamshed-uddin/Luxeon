import React from "react";

interface PriceTagProps {
  price: number;
  className?: string;
}

const PriceTag = ({ price, className }: PriceTagProps) => {
  const format = () => {
    return (price / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  if (isNaN(price)) {
    return null;
  }

  return <span className={className}>{format()}</span>;
};

export default PriceTag;
