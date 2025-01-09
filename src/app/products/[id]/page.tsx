import PriceTag from "@/components/PriceTag";
import AddToCartOrBuy from "@/components/products/AddToCartOrBuy";
import ProductDescription from "@/components/products/ProductDescription";
import { getProductData } from "@/lib/getProductData";
import Image from "next/image";
import React from "react";

const ProductDetail = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const { title, photoUrl, price, description, details, stock } =
    await getProductData(params.id);

  return (
    <div className="my-container relative my-8">
      {/* product detail container */}
      <div className="grid grid-cols-1  lg:grid-cols-7 gap-10 ">
        {/*product image  */}
        <div className="max-h-screen lg:min-h-[calc(100vh-6rem)] w-full col-span-1 lg:col-span-4">
          <Image
            height={400}
            width={400}
            src={photoUrl[0].url}
            alt={title}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        {/* product title , price, add to cart btn */}
        <div className="lg:sticky top-14 right-0  lg:col-span-3  space-y-5 lg:space-y-8">
          <h1 className="text-3xl  ">{title}</h1>
          <ProductDescription description={description} />

          <h3 className="text-2XL ">
            <PriceTag price={price} className="text-2xl font-light" />
          </h3>
          {/* stock status */}
          <div className="inline font-light">
            {Number(stock) > 0 ? (
              <div className="flex items-center gap-2">
                <span className="block h-3 w-3 bg-green-400 rounded-full"></span>
                <span>In stock</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="block h-3 w-3 bg-red-400 rounded-full"></span>
                <span>Out of stock</span>
              </div>
            )}
          </div>
          <AddToCartOrBuy id={params.id} inStock={Number(stock) > 0} />
        </div>
        <div className=" w-full lg:col-span-4  text-lg">
          {/* description */}
          <h2 className="text-2xl font-medium mb-4">Product detail</h2>

          {/* more details */}
          <div className="mt-4 ">
            <div className="lg:w-3/4 text-base divide-y-[1.2px] divide-gray-400">
              {details?.map((singleDetail, index) => (
                <div key={index} className="flex py-3">
                  <div className="w-1/2 font-medium">{singleDetail.title}</div>
                  <div>{singleDetail.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
