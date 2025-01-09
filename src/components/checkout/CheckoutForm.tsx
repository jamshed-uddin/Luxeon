"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { FormEvent, useState } from "react";
import Button from "../Button";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      if (error?.type === "card_error" || error?.type === "validation_error") {
        console.log(error);
        setError(error.message as string);
      } else {
        setError("An unexpected error occured.");
      }
      setIsLoading(false);
    }

    console.log(paymentIntent);

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
      {error && (
        <div className="text-sm  text-red-500 inline ">{error}hello</div>
      )}
    </form>
  );
};

export default CheckoutForm;
