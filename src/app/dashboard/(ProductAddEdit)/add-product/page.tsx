"use client";

import ProductForm from "@/components/dashboard/ProductForm";
import { Product } from "@/lib/definition";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

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
