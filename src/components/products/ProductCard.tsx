import React from "react";

import { PhotoUrlObj, Product } from "@/lib/definition";
import Image from "next/image";
import PriceTag from "../PriceTag";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { photoUrl, title, price } = product || {};
  return (
    <Link
      href={`/products/${product._id}`}
      className="h-[24rem] w-full  bg-gray-50 p-1  shadow-sm"
    >
      <div className="h-4/5 w-full overflow-hidden ">
        <Image
          width={300}
          height={300}
          className="h-full w-full object-cover  "
          src={(photoUrl.at(0) as PhotoUrlObj).url}
          alt={title}
        />
      </div>
      <div className="mt-4">
        <h2 className="font-medium text-lg">{title}</h2>
        <PriceTag price={price} />
      </div>
    </Link>
  );
};

export default ProductCard;
