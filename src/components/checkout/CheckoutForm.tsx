"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { FormEvent, useState } from "react";
import Button from "../Button";
import { useRouter } from "next/navigation";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      if (error?.type === "card_error" || error?.type === "validation_error") {
        setError(error.message as string);
      } else {
        setError("An unexpected error occured.");
      }
      setIsLoading(false);
    }

    router.push("/payment-success");
    setIsLoading(false);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="">
        <h2 className="text-xl mb-4">Payment details</h2>

        <PaymentElement />
        <Button
          type="submit"
          disabled={isLoading || !stripe || !elements}
          loading={isLoading}
          className="mt-5"
        >
          Pay
        </Button>
      </div>
      {error && <div className="text-sm  text-red-500 inline ">{error}</div>}
    </form>
  );
};

export default CheckoutForm;
