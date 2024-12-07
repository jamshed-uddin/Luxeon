import ProductTableAction from "@/components/dashboard/ProductTableAction";
import Table from "@/components/dashboard/Table";
import PriceTag from "@/components/PriceTag";
import { Product } from "@/lib/definition";
import { getProducts } from "@/lib/getProducts";
import Image from "next/image";
import React from "react";

const AllProducts = async () => {
  const products = await getProducts(`http://localhost:4000/api/products`);

  const column = [
    {
      headerName: "Image",
      field: "avatar" as const,

      renderCell: (row: Product) => (
        <Image
          src={row.photoUrl[0].url}
          alt={row?.title}
          className="h-full w-full object-cover rounded-lg"
          width={100}
          height={100}
        />
      ),
    },
    {
      headerName: "Title",
      field: "title" as keyof Product,
      width: 200,
    },
    {
      headerName: "Price",
      field: "action" as const,
      width: 200,
      renderCell: (row) => <PriceTag price={row.price} />,
    },
    {
      headerName: "Category",
      field: "category" as keyof Product,
      width: 200,
    },
    {
      headerName: "Stock",
      field: "stock" as keyof Product,
      width: 200,
    },

    {
      headerName: "Actions",
      field: "action" as const,
      width: 200,
      renderCell: (row) => <ProductTableAction productId={row._id} />,
    },
  ];

  console.log(products.data.at(1));

  return (
    <div>
      <Table data={products.data} column={column} />
    </div>
  );
};

export default AllProducts;
