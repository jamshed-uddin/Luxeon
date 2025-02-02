"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProductForm from "@/components/dashboard/ProductForm";
import { Product } from "@/lib/definition";
import { getProductData } from "@/lib/getProductData";
import { requestClient } from "@/lib/requestClient";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, FormEvent } from "react";

const EditProductPage = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [productData, setProductData] = useState<Product>({
    title: "",
    photoUrl: [],
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

  const submitUpdate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setProcessing(true);
      await requestClient(`/products/${params.id}`, {
        method: "patch",
        data: productData,
      });

      router.back();
    } catch {
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div>
      <DashboardHeader>Edit product</DashboardHeader>
      <ProductForm
        productData={productData}
        setProductData={setProductData}
        processing={processing}
        submitFunc={submitUpdate}
      />
    </div>
  );
};

export default EditProductPage;
