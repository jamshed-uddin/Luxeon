import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const ProductTableAction = ({ productId }: { productId: string }) => {
  return (
    <div className="flex items-center gap-8">
      <Link href={`/products/${productId}`}>
        <EyeIcon className="w-4" />
      </Link>
      <Link href={`/dashboard/edit-product/${productId}`}>
        <PencilIcon className="w-4" />
      </Link>
      <button>
        <TrashIcon className="w-4" />
      </button>
    </div>
  );
};

export default ProductTableAction;
