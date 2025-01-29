"use client";

import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import {
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

import LoadingSpinner from "../LoadingSpinner";
import { Address, Cart } from "@/lib/definition";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { requestClient } from "@/lib/requestClient";
import useSWR from "swr";
import Button from "../Button";
import ModalClient from "../dashboard/ModalClient";
import usePreventPageUnload from "@/hooks/usePreventPageUnload";
import { AddressCardSkeleton } from "../Skeletons";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

type PaymentSecretType = {
  clientSecret: string;
};

const PaymentElem = ({ cart }: { cart: Cart }) => {
  const { data: session, status } = useSession();
  const [seletedAddress, setSelectedAddress] = useState<Address>();
  const userAddresses = session?.user.address;
  const defaultAddress = session?.user?.address.find(
    (a) => a.isDefault === true
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const proceedtocheckout = Boolean(params.get("proceedtocheckout")) || false;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  usePreventPageUnload(defaultAddress?._id !== seletedAddress?._id);

  useEffect(() => {
    if (status === "loading") return;
    setSelectedAddress(defaultAddress);
  }, [defaultAddress, session?.user.address, status]);

  const order = {
    userName: session?.user.name,
    userEmail: session?.user.email,
    address: seletedAddress,
  };

  console.log("order", order);
  const {
    data: response,
    error: paymentIntentError,
    isLoading,
  } = useSWR(
    status === "loading" || !proceedtocheckout
      ? null
      : "/payments/createPaymentIntent",
    async (url: string) =>
      await requestClient<PaymentSecretType>(url, {
        method: "post",
        data: {
          amount: cart.subtotal,
          data: { cartId: cart?._id, ...order },
        },
      })
  );

  const addressString = (address: Address) => {
    const string = [
      address?.name,
      address?.addressLine,
      address?.street,
      address?.city && ` ${address?.city}(${address?.zipCode})`,
      address?.country,
    ]
      .filter(Boolean)
      .join(", ");
    console.log("address string", address);
    return string;
  };

  console.log(userAddresses);
  return (
    <div>
      {isModalOpen && (
        <ModalClient
          open={isModalOpen}
          close={closeModal}
          internalCloseButton={true}
        >
          <div className=" space-y-2 ">
            {userAddresses?.map((address) => (
              <div
                key={address._id}
                className="flex items-center gap-2 border border-gray-200 rounded-xl cursor-pointer"
                onClick={() => setSelectedAddress(address)}
              >
                <div>
                  <CheckCircleIcon
                    className={`w-5 text-green-600 ${
                      address._id === seletedAddress?._id
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                </div>
                <div>{addressString(address)}</div>
              </div>
            ))}
            <div className="flex justify-end ">
              <button
                onClick={closeModal}
                className="border border-black rounded-2xl px-3 py-1 mt-2"
              >
                Ok
              </button>
            </div>
          </div>
        </ModalClient>
      )}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl ">Shipping address</h2>
          <button
            onClick={openModal}
            className="flex items-center gap-1 text-blue-600 text-sm font-medium"
          >
            Edit <PencilSquareIcon className="w-4 inline" />
          </button>
        </div>
        <div className="w-full ">
          <div className="text-sm/6">
            {status === "loading" ? (
              <AddressCardSkeleton amount={1} />
            ) : (
              <div className=" border border-gray-300 rounded-xl px-2 py-3 ">
                {addressString(seletedAddress as Address)}
              </div>
            )}
          </div>
        </div>
      </div>
      {!proceedtocheckout && (
        <Button
          onClick={() => {
            params.set("proceedtocheckout", "true");
            router.push(`/checkout?${params.toString()}`, { scroll: false });
          }}
        >
          Proceed to pay
        </Button>
      )}
      {proceedtocheckout ? (
        paymentIntentError ? (
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
            <CheckoutForm />
          </Elements>
        )
      ) : null}
    </div>
  );
};

export default PaymentElem;
