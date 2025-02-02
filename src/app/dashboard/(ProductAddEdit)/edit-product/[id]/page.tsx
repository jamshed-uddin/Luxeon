import React from "react";
import EditProductPage from "./EditProductPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit product | Luxeon - Redefine your space",
  description: "The edit product page",
};

const EditProduct = () => {
  return <EditProductPage />;
};

export default EditProduct;
