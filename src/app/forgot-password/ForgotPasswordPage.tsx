"use client";

import Button from "@/components/Button";
import { requestClient } from "@/lib/requestClient";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";

const inputStyle =
  "border-[1.2px] text-sm   border-gray-600 placeholder:text-gray-600 rounded-lg  focus:outline focus:outline-1 focus:outline-black p-1.5 w-full box-border";

const labelStyle = " font-medium block mb-1";
const ForgotPasswordPage = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email) {
      return setError("Email is required");
    } else if (!emailRegex.test(String(email))) {
      return setError("Enter a valid email");
    }
    try {
      setLoading(true);
      //api call
      await requestClient("/users/resetPasswordEmailRequest", {
        method: "post",
        body: JSON.stringify({ email }),
      });
    } catch {
      setError("Something went wrong");
    } finally {
      setEmail("");
      setLoading(false);
    }
  };

  return (
    <div className="lg:w-1/4 mx-auto   px-3 lg:px-0 ">
      <h1 className="text-2xl font-medium text-center">Forgot password?</h1>
      {emailSent ? (
        <div className="mt-5 text-lg space-y-2 text-center ">
          <p className="opacity-70">
            Check your inbox for an email with instructions
          </p>

          <p className="opacity-70">
            If you don&apos;t receive an email from us, please check your spam
            folder
          </p>

          <p className="text-base ">
            Didn&apos;t receive email?
            <span
              className="cursor-pointer text-blue-600"
              onClick={() => setEmailSent(false)}
            >
              {" "}
              Resend
            </span>
            .
          </p>
          <Link
            href={"/signin"}
            className="text-base text-blue-600 flex items-center gap-2 justify-center"
          >
            <ArrowLeftIcon className="w-5" /> Back to login
          </Link>
        </div>
      ) : (
        <>
          <p className="mb-5 text-center opacity-70">
            No worries, We will send you instructions
          </p>

          <div className="">
            <label className={labelStyle} htmlFor="email">
              Email
            </label>
            <input
              type="text"
              name="email"
              className={inputStyle}
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setError("");
                setEmail(e.target.value);
              }}
              disabled={loading}
            />
          </div>
          {error && <span className="text-sm text-red-500">{error}</span>}

          <div className="mt-4">
            <Button onClick={handleSubmit} disabled={loading} loading={loading}>
              Send instructions
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
