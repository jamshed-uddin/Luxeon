"use client";

import Button from "@/components/Button";
import axios, { isAxiosError } from "axios";
import React, { useState } from "react";

const inputStyle =
  "border-[1.2px] text-sm   border-gray-600 placeholder:text-gray-600 rounded-lg  focus:outline focus:outline-1 focus:outline-black p-1.5 w-full box-border";

const labelStyle = " font-medium block mb-1";
const ForgotPassword = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

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
      const res = await axios.post(
        "http://localhost:4000/api/users/resetPasswordEmailReqest",
        {
          email,
        }
      );

      console.log(res);
    } catch (error) {
      console.log(error);
      if (isAxiosError(error)) {
        setError(error?.response?.data.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setEmail("");
      setLoading(false);
    }
  };

  return (
    <div className="lg:w-1/4 mx-auto   px-3 lg:px-0">
      <div className="">
        <label className={labelStyle} htmlFor="email">
          Enter your email
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
      <br />
      <Button onClick={handleSubmit} disabled={loading} loading={loading}>
        Continue
      </Button>
    </div>
  );
};

export default ForgotPassword;
