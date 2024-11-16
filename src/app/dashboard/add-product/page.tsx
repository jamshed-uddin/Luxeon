"use client";

import ProductForm from "@/components/dashboard/ProductForm";
import { Product } from "@/lib/definition";
import axios from "axios";
import React, { useState } from "react";

const AddProduct = () => {
  const [processing, setProcessing] = useState(false);
  const [productInfo, setProductInfo] = useState<Product>({
    title: "",
    photoUrl: [{ url: "", publicId: "" }],
    description: "",
    price: "",
    stock: "",
    category: "",
    details: [{ title: "", value: "" }],
  });

  const submitForm = async () => {
    try {
      setProcessing(true);

      const res = await axios.post(
        "http://localhost:4000/api/products",
        productInfo
      );

      console.log(res.data);

      // POST operation

      setProcessing(false);
    } catch (error) {
      setProcessing(false);
    }
  };

  console.log(productInfo);

  return (
    <div>
      <ProductForm
        productData={productInfo}
        setProductData={setProductInfo}
        processing={processing}
        submitFunc={submitForm}
      />
    </div>
  );
};

export default AddProduct;
