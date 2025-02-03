"use client";

import Button from "@/components/Button";
import { requestClient } from "@/lib/requestClient";
import {
  ArrowLeftIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { FormEvent, useState } from "react";

const inputStyle =
  "border-[1.2px] text-sm   border-gray-600 placeholder:text-gray-600 rounded-lg  focus:outline focus:outline-1 focus:outline-black p-1.5 w-full box-border";

const labelStyle = " font-medium block mb-1";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const resetToken = params.get("reset") || "";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [isReset, setIsReset] = useState(false);

  const handleInputChange = () => {};
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!password) {
      return setError("Password is required");
    } else if (!confirmPassword) {
      return setError("COnfirm password is required");
    } else if (password !== confirmPassword) {
      return setError("Passwords do not match");
    } else if (String(password).length < 6) {
      return setError("Password length must be 6 or higher");
    }

    try {
      setLoading(true);
      //api calls
      await requestClient("/users/resetPassword", {
        method: "put",
        body: JSON.stringify({
          passwordResetToken: resetToken,
          newPassword: password,
        }),
      });

      setIsReset(true);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:w-1/4 mx-auto   px-3 lg:px-0">
      {isReset ? (
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-medium">Password reset</h1>
          <p className="opacity-70">Password reset successful.</p>
          <Link
            href={"/signin"}
            className="text-base text-blue-600 flex items-center gap-2 justify-center"
          >
            <ArrowLeftIcon className="w-5" /> Back to login
          </Link>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-medium text-center">
            Create new password
          </h1>
          <p className="mb-5 text-center opacity-70">
            Password length must be 6 or higher
          </p>

          <form className="space-y-2" onSubmit={handleSubmit}>
            <div>
              <label className={labelStyle} htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.password ? "text" : "password"}
                  name="password"
                  className={inputStyle}
                  placeholder="Password"
                  onChange={handleInputChange}
                />
                <span
                  onClick={() =>
                    setShowPassword((p) => ({ ...p, password: !p.password }))
                  }
                  className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2"
                >
                  {showPassword.password ? (
                    <EyeIcon className="w-4" />
                  ) : (
                    <EyeSlashIcon className="w-4" />
                  )}
                </span>
              </div>
            </div>
            <div>
              <label className={labelStyle} htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className={inputStyle}
                  placeholder="Confirm password"
                  onChange={handleInputChange}
                />
                <span
                  onClick={() =>
                    setShowPassword((p) => ({
                      ...p,
                      confirmPassword: !p.confirmPassword,
                    }))
                  }
                  className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2"
                >
                  {showPassword.confirmPassword ? (
                    <EyeIcon className="w-4" />
                  ) : (
                    <EyeSlashIcon className="w-4" />
                  )}
                </span>
              </div>
            </div>
            {error && <span className="text-sm text-red-500">{error}</span>}

            <div className="pt-5">
              <Button type="submit" disabled={loading} loading={loading}>
                Send instructions
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ResetPasswordPage;
