"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProductForm from "@/components/dashboard/ProductForm";
import { Product } from "@/lib/definition";
import { getProductData } from "@/lib/getProductData";
import axios from "axios";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, use, FormEvent } from "react";

const EditProduct = (props: { params: Promise<{ id: string }> }) => {
  const params = use(props.params);
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

      //  the update operation
      const { data } = await axios.patch(
        `http://localhost:4000/api/products/${params.id}`,
        productData
      );
      router.back();

      // router.push("/dashboard/products");
      console.log(data);
    } catch (error) {
      console.log(error);
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

export default EditProduct;
