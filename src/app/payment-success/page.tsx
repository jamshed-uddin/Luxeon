import { ArrowRightIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Payment success | Luxeon - Redefine your space",
  description: "The payment success page",
};

const PaymentSuccess = () => {
  return (
    <div className="my-container">
      <div className="flex flex-col items-center">
        <CheckCircleIcon className="w-16 text-green-500 checkmark-animation" />
        <h2 className="text-2xl font-medium  ">Payment successful</h2>
        <Link href={"/profile"} className="text-blue-600">
          See orders <ArrowRightIcon className="w-4 inline" />
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
