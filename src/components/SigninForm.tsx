"use client";

import { signInWithEmailAndPassword } from "@/actions";
import { useRouter, useSearchParams } from "next/navigation";

import React, { FormEvent, useState } from "react";
import Button from "./Button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import useDeleteUrlQuery from "@/hooks/useDeleteUrlQuery";
import Link from "next/link";

const inputStyle =
  "border-[1.2px] text-sm   border-gray-600 placeholder:text-gray-600 rounded-lg  focus:outline focus:outline-1 focus:outline-black p-1.5 w-full box-border";

const labelStyle = " font-medium block mb-1";

const SigninForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [error, setError] = useState<string>("");
  const [pending, setPending] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const deleteUrlQuery = useDeleteUrlQuery();

  const handleInputChange = () => {
    setError("");
    deleteUrlQuery("error");
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email) {
      return setError("Email is required");
    } else if (!emailRegex.test(String(email))) {
      return setError("Enter a valid email");
    } else if (!password) {
      return setError("Password is required");
    }
    setPending(true);
    try {
      const res = await signInWithEmailAndPassword(formData);
      console.log("login page res", res);
      if (!res?.success) {
        setPending(false);
        return setError(res?.message);
      }
      router.replace(callbackUrl || "/");
      setPending(false);
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
      setPending(false);
    }
  };

  return (
    <form onSubmit={submitForm} className="space-y-3 ">
      <div>
        <label className={labelStyle} htmlFor="email">
          {" "}
          Email
        </label>
        <input
          type="text"
          name="email"
          className={inputStyle}
          placeholder="Email"
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label className={labelStyle} htmlFor="password">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className={inputStyle}
            placeholder="Password"
            onChange={handleInputChange}
          />
          <span
            onClick={() => setShowPassword((p) => !p)}
            className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2"
          >
            {showPassword ? (
              <EyeIcon className="w-4" />
            ) : (
              <EyeSlashIcon className="w-4" />
            )}
          </span>
        </div>
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
      <div className="pt-3">
        <Button
          type="submit"
          className="border border-black rounded-xl p-2 "
          disabled={pending}
          loading={pending}
        >
          Sign in
        </Button>
      </div>
      <Link
        href={"/forgot-password"}
        className="text-sm text-end block text-blue-600"
      >
        Forgot password?
      </Link>
    </form>
  );
};

export default SigninForm;
