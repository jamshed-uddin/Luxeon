"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

import LoadingSpinner from "../LoadingSpinner";
import { Cart } from "@/lib/definition";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { requestClient } from "@/lib/requestClient";
import useSWR from "swr";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

type PaymentSecretType = {
  clientSecret: string;
};

const PaymentElem = ({ cart }: { cart: Cart }) => {
  const { data: userData, status } = useSession();
  const userAddress = userData?.user?.address.find((a) => a.isDefault === true);
  const router = useRouter();

  const order = {
    userName: userData?.user.name,
    userEmail: userData?.user.email,
    address: userData?.user.address.find((a) => a.isDefault === true),
  };
  const {
    data: response,
    error: paymentIntentError,
    isLoading,
  } = useSWR(
    status === "loading" ? null : "/payments/createPaymentIntent",
    async (url: string) =>
      await requestClient<PaymentSecretType>(url, {
        method: "post",
        data: {
          amount: cart.subtotal,
          data: { cartId: cart?._id, ...order },
        },
      })
  );
  console.log(response?.clientSecret);
  return (
    <div>
      {paymentIntentError ? (
        <div className="flex flex-col items-center justify-center">
          <ExclamationTriangleIcon className="w-5 text-red-500 " />
          <div>{paymentIntentError}</div>
          <button onClick={() => router.refresh()} className="text-sm ">
            Retry <ArrowPathIcon className="w-3 inline" />
          </button>
        </div>
      ) : isLoading || status === "loading" ? (
        <div className="flex justify-center">
          <LoadingSpinner size="small" />
        </div>
      ) : (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: response?.clientSecret,
            appearance: {
              theme: "stripe",
            },

            loader: "always",
          }}
        >
          <div className="mb-4">
            <h2 className="text-xl mb-4">Shipping address</h2>
            <div className="w-full ">
              <div className="group relative flex cursor-pointer rounded-lg bg-white/5 py-4 px-3  shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10 ">
                <div className="flex w-full items-center justify-between">
                  <div className="text-sm/6">
                    <div className=" ">
                      {[
                        userAddress?.addressLine,
                        userAddress?.street,
                        userAddress?.city &&
                          ` ${userAddress?.city}(${userAddress?.zipCode})`,
                        userAddress?.country,
                      ]
                        .filter(Boolean)
                        .join(",")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default PaymentElem;
