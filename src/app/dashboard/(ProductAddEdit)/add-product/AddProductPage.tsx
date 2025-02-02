"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProductForm from "@/components/dashboard/ProductForm";
import { Product } from "@/lib/definition";
import { requestClient } from "@/lib/requestClient";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const AddProductPage = () => {
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
      await requestClient("/products", { method: "post", data: productInfo });

      router.back();
      setProcessing(false);
    } catch {
      setProcessing(false);
    }
  };

  return (
    <div>
      <DashboardHeader>Add product</DashboardHeader>
      <ProductForm
        productData={productInfo}
        setProductData={setProductInfo}
        processing={processing}
        submitFunc={submitForm}
      />
    </div>
  );
};

export default AddProductPage;
