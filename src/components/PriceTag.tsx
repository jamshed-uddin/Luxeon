import React from "react";

interface PriceTagProps {
  price: number | string;
  className?: string;
}

const PriceTag = ({ price, className }: PriceTagProps) => {
  const format = () => {
    return (Number(price) / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  if (isNaN(Number(price))) {
    return null;
  }

  return (
    <span className={className} data-testid="price-tag">
      {format()}
    </span>
  );
};

export default PriceTag;
