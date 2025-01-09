"use client";

import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";
import { Cart } from "@/lib/definition";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

const PaymentElem = ({ cart }: { cart: Cart }) => {
  const { data, status } = useSession();
  const userAddress = data?.user?.address.find((a) => a.isDefault === true);
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentError, setPaymentIntentError] = useState("");

  //   const updatedCartItem = cart.items.map(
  //     (item) => (item.product.stock as number) > 0
  //   );
  //   const cartWithAvailableItems = {
  //     ...cart,
  //     items: updatedCartItem,
  //     subtotal: updatedCartItem.reduce(
  //       (total:number, item: CartItem) => total + item.product.price * item.quantity,
  //       0
  //     ),

  //   };

  const order = {
    userName: data?.user.name,
    userEmail: data?.user.email,
    address: data?.user.address.find((a) => a.isDefault === true),
  };

  useEffect(() => {
    if (!cart || status === "loading") return;
    console.log("re rendered");
    const loadSecret = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:4000/api/payments/createPaymentIntent",
          {
            amount: cart.subtotal,
            data: { cartId: cart?._id, ...order },
          }
        );

        setClientSecret(data.clientSecret);
      } catch {
        setPaymentIntentError("Something went wrong");
      }
    };

    loadSecret();
  }, [status]);

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
      ) : clientSecret ? (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
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
      ) : (
        <div className="flex justify-center">
          <LoadingSpinner size="small" />
        </div>
      )}
    </div>
  );
};

export default PaymentElem;
