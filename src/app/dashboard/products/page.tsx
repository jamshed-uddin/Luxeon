import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProductTableAction from "@/components/dashboard/ProductTableAction";
import Table from "@/components/dashboard/Table";
import PriceTag from "@/components/PriceTag";
import { Product } from "@/lib/definition";
import { getProducts } from "@/lib/getProducts";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "Products | Luxeon - Redefine your space",
  description: "The dashboard products page",
};

const AllProducts = async () => {
  const products = await getProducts(`/products`);

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
      width: 150,
      renderCell: (row: Product) => <PriceTag price={row.price as number} />,
    },
    {
      headerName: "Category",
      field: "category" as keyof Product,
      width: 200,
    },
    {
      headerName: "Stock",
      field: "stock" as keyof Product,
      width: 100,
    },

    {
      headerName: "Actions",
      field: "action" as const,
      width: 200,
      renderCell: (row: Product) => (
        <ProductTableAction productId={row._id as string} />
      ),
    },
  ];

  return (
    <div>
      <DashboardHeader>Products</DashboardHeader>
      <Table data={products.data} column={column} />
    </div>
  );
};

export default AllProducts;
