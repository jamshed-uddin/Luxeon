"use client";

import Button from "@/components/Button";
import { Product } from "@/lib/definition";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChangeEvent,
  DetailedHTMLProps,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
} from "react";

const categories = ["Chairs", "Stools", "Tables", "Sofa", "Lighting"];

const inputStyle =
  "border-[1.2px] text-sm   border-gray-600 placeholder:text-gray-600 rounded-lg  focus:outline focus:outline-1 focus:outline-black p-1.5 w-full ";

const labelStyle = " font-medium block mb-1";

interface ProductFormProps {
  productData: Product;
  setProductData: Dispatch<SetStateAction<Product>>;
  submitFunc: () => void;
  processing: boolean;
}

const ProductForm = ({
  productData,
  setProductData,
  submitFunc,
  processing,
}: ProductFormProps) => {
  console.log(productData);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "price") {
      const priceInCent = Number(value) * 100;

      return setProductData((p) => ({
        ...p,
        [name]: priceInCent ? priceInCent : "",
      }));
    }

    setProductData((p) => ({ ...p, [name]: value }));
  };

  const handlePhotoUrlChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { value } = e.target;

    setProductData((prev) => ({
      ...prev,
      photoUrl: prev.photoUrl.map((image, idx) =>
        idx === index ? { ...image, url: value } : image
      ),
    }));
  };

  const handleDetailChange = (
    e: ChangeEvent<HTMLInputElement>,
    detailIndex: number
  ) => {
    const { name, value } = e.target;

    console.log(name, value);
    setProductData((prev) => ({
      ...prev,
      details: prev.details.map((singleDetail, index) =>
        detailIndex === index
          ? name === "title"
            ? { ...singleDetail, title: value }
            : { ...singleDetail, value: value }
          : singleDetail
      ),
    }));
  };

  const handlePriceInputKeyDown = (
    e: DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  ) => {
    const invalidChars = ["-", "+", "e"];
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  };

  const addMoreDetailHandler = () => {
    setProductData((prev) => ({
      ...prev,
      details: [...prev.details, { title: "", value: "" }],
    }));
  };

  const removeDetailField = (detailIndex: number) => {
    setProductData((prev) => ({
      ...prev,
      details: prev.details.filter(
        (singleDetail, index) => index !== detailIndex
      ),
    }));
  };

  return (
    <div className="">
      <div className="w-full space-y-5">
        {/* product */}
        <div className="p-3 border-[1.3px] border-gray-300 rounded-lg">
          <h2 className="text-lg uppercase mb-2">Product</h2>

          {/* product title */}
          <div className="mb-5">
            <label htmlFor="title" className={`${labelStyle}`}>
              Title
            </label>
            <input
              className={inputStyle}
              type="text"
              name="title"
              value={productData?.title}
              onChange={handleChange}
              placeholder="Title*"
              required
            />
          </div>
          {/* media */}
          <div className="mb-5 ">
            <label htmlFor="photoUrl" className={`${labelStyle}`}>
              Images
            </label>
            {productData?.photoUrl?.map((image, index) => (
              <div key={index} className="mb-5">
                <input
                  className={inputStyle}
                  type="text"
                  name="photoUrl"
                  value={image.url}
                  onChange={(e) => handlePhotoUrlChange(e, index)}
                  placeholder="Photo URL*"
                  required
                />
              </div>
            ))}
          </div>
          {/* product description */}
          <div className="mb-5">
            <label htmlFor="description" className={`${labelStyle}`}>
              Description
            </label>
            <textarea
              className={`${inputStyle}  min-h-32`}
              name="description"
              value={productData?.description}
              onChange={handleChange}
              placeholder="Description*"
              required
            />
          </div>
        </div>

        {/* pricing and stocks */}
        <div className="p-3 border-[1.3px] border-gray-300 rounded-lg">
          <h2 className="text-lg uppercase mb-2">Price & stocks</h2>

          <div className="lg:flex items-center gap-3 w-full">
            <div className="mb-5 w-full">
              <label htmlFor="price" className={`${labelStyle}`}>
                Price
              </label>
              <input
                className={inputStyle}
                type="number"
                name="price"
                value={
                  Number(productData?.price) / 100
                    ? Number(productData?.price) / 100
                    : ""
                }
                onChange={handleChange}
                onKeyDown={handlePriceInputKeyDown}
                placeholder="Price*"
                min={0}
                step="0.01"
                required
              />
            </div>
            <div className="mb-5 w-full">
              <label htmlFor="stock" className={`${labelStyle}`}>
                Stock
              </label>
              <input
                className={inputStyle}
                type="number"
                name="stock"
                value={productData?.stock}
                onChange={handleChange}
                onKeyDown={handlePriceInputKeyDown}
                placeholder="Stock*"
                min={1}
                step="0"
                required
              />
            </div>
            <div className="mb-5 w-full">
              <label htmlFor="category" className={`${labelStyle}`}>
                Category
              </label>
              <select
                className={inputStyle}
                name="category"
                onChange={handleChange}
                value={productData?.category}
                required
              >
                <option value={""}>--Select a category--</option>
                {categories?.map((category) => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* detail inputs */}
        <div className="p-3 border-[1.3px] border-gray-300 rounded-lg">
          <h2 className="text-lg uppercase mb-2">Product details</h2>

          <div>
            {productData?.details?.map((singleDetail, index, allDetails) => (
              <div key={index} className="mb-5 flex items-center gap-2">
                <div className=" lg:flex items-center  gap-3 space-y-1 lg:space-y-0 flex-grow">
                  <input
                    className={`${inputStyle} w-full`}
                    type="text"
                    name="title"
                    value={singleDetail?.title}
                    onChange={(e) => handleDetailChange(e, index)}
                    placeholder={
                      index === 0 ? "Title (e.g. Material)" : "Title"
                    }
                  />

                  <input
                    className={`w-full ${inputStyle}`}
                    type="text"
                    name="value"
                    value={singleDetail?.value}
                    onChange={(e) => handleDetailChange(e, index)}
                    placeholder={index === 0 ? "Value (e.g. Plywood)" : "Value"}
                  />
                </div>

                <button
                  type="button"
                  disabled={allDetails?.length === 1}
                  onClick={() => removeDetailField(index)}
                  className={"curson-pointer disabled:opacity-60"}
                >
                  <XMarkIcon className="w-6" />
                </button>
              </div>
            ))}
            <button
              type="button"
              className="border-[1.3px] border-black rounded-lg py-1.5 px-2"
              onClick={addMoreDetailHandler}
            >
              Add more
            </button>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            type="button"
            className={"my-5 w-full lg:w-[20%] ml-auto"}
            onClick={submitFunc}
            loading={processing}
            disabled={processing}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
