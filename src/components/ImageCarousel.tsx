"use client";

import { PhotoUrlObj } from "@/lib/definition";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useState } from "react";

const ImageCarousel = ({ images }: { images: PhotoUrlObj[] }) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  console.log(images);
  return (
    <div className="h-full w-full overflow-hidden relative rounded-lg ">
      {images?.map((photoObj, index) => (
        <Image
          key={index}
          className={`h-full w-full object-cover transition-opacity absolute duration-500 ${
            photoIndex === index ? "opacity-100" : "opacity-0"
          }`}
          src={photoObj.url}
          alt={`Image of a product`}
          height={600}
          width={600}
        />
      ))}
      {images?.length > 1 && (
        <div className="  absolute bottom-2 right-2  flex gap-4">
          <button
            disabled={photoIndex === 0}
            onClick={() => setPhotoIndex((p) => p - 1)}
            className={` text-white mix-blend-difference  py-1 rounded-xl  ${
              photoIndex === 0 ? "opacity-40" : "opacity-100"
            }`}
          >
            <ChevronLeftIcon className="w-6" />
          </button>
          <button
            disabled={photoIndex + 1 === images?.length}
            onClick={() => setPhotoIndex((p) => p + 1)}
            className={` text-white mix-blend-difference  py-1 rounded-xl   ${
              photoIndex + 1 === images?.length ? "opacity-40" : "opacity-100"
            }`}
          >
            <ChevronRightIcon className="w-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
