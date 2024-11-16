import React from "react";
import heroImage from "@/assets/luxeonheroimage.jpg";
import Image from "next/image";
import Button from "../Button";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
const Hero = () => {
  return (
    <div className="relative text-white ">
      <div className="h-screen ">
        <Image
          src={heroImage}
          alt="Hero image"
          height={500}
          width={500}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute inset-0 flex items-center">
        <div className="my-container ">
          <h1 className="text-5xl lg:text-7xl lg:w-1/2">
            Redefine your space with Luxeon's craft
          </h1>
          <Link
            href={"/products"}
            className="text-2xl flex items-end gap-1 w-fit "
          >
            Explorer more <ArrowUpRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
