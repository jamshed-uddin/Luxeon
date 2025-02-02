import React from "react";
import AddProductPage from "./AddProductPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add product | Luxeon - Redefine your space",
  description: "The add product page",
};

const AddProduct = () => {
  return <AddProductPage />;
};

export default AddProduct;
