"use client";

import ProductForm from "@/components/dashboard/ProductForm";
import { Product } from "@/lib/definition";
import { getProductData } from "@/lib/getProductData";
import React, { useEffect, useState, use } from "react";

const EditProduct = (props: { params: Promise<{ id: string }> }) => {
  const params = use(props.params);
  const [productData, setProductData] = useState<Product>({
    title: "",
    photoUrl: [{ url: "", publicId: "" }],
    description: "",
    price: "",
    stock: "",
    category: "",
    details: [{ title: "", value: "" }],
  });
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const product = await getProductData(params.id);
        setProductData(product);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };

    fetchProductData();
  }, [params.id]);

  const submitUpdate = async () => {
    try {
      setProcessing(true);

      //  the update operation
      setProcessing(false);
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };

  return (
    <div>
      <ProductForm
        productData={productData}
        setProductData={setProductData}
        processing={processing}
        submitFunc={submitUpdate}
      />
    </div>
  );
};

export default EditProduct;
