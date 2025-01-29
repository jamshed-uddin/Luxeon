"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProductForm from "@/components/dashboard/ProductForm";
import { Product } from "@/lib/definition";
import axios from "axios";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export const metadata: Metadata = {
  title: "Add product | Luxeon - Redefine your space",
  description: "The add product page",
};

const AddProduct = () => {
  const [processing, setProcessing] = useState(false);
  const router = useRouter();
  const [productInfo, setProductInfo] = useState<Product>({
    title: "",
    photoUrl: [],
    description: "",
    price: "",
    stock: "",
    category: "",
    details: [{ title: "", value: "" }],
  });

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setProcessing(true);

      await axios.post("http://localhost:4000/api/products", productInfo);

      router.back();
      setProcessing(false);
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };

  return (
    <div>
      <DashboardHeader>Add product</DashboardHeader>
      <ProductForm
        productData={productInfo}
        setProductData={setProductInfo}
        processing={!processing}
        submitFunc={submitForm}
      />
    </div>
  );
};

export default AddProduct;
