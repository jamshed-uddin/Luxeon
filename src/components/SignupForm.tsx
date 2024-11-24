"use client";

import React, { FormEvent, useState } from "react";
import Button from "./Button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithEmailAndPassword } from "@/actions";

const inputStyle =
  "border-[1.2px] text-sm   border-gray-600 placeholder:text-gray-600 rounded-lg  focus:outline focus:outline-1 focus:outline-black p-1.5 w-full box-border";

const labelStyle = " font-medium block mb-1";

const SignupForm = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [pending, setPending] = useState<boolean>(false);

  console.log(callbackUrl);

  const handleInputChange = () => {
    setError("");
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const userData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const confirmPassword = formData.get("confirmPassword");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!userData.name) {
      return setError("Name is required");
    } else if (!userData.email) {
      return setError("Email is required");
    } else if (!emailRegex.test(String(userData.email))) {
      return setError("Enter a valid email");
    } else if (!userData.password) {
      return setError("Password is required");
    } else if (userData.password !== confirmPassword) {
      return setError("Passwords do not match");
    } else if (String(userData.password).length < 6) {
      return setError("Password length must be 6 or higher");
    }

    const userCredentials = new FormData();
    userCredentials.append("email", userData.email);
    userCredentials.append("password", userData.password);

    try {
      setPending(true);
      await axios.post("http://localhost:4000/api/users", userData);
      await signInWithEmailAndPassword(userCredentials);
      router.replace(callbackUrl || "/");
      setPending(false);
    } catch (error) {
      setPending(false);
      setError("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-3 ">
      <div>
        <label className={labelStyle} htmlFor="name">
          Name
        </label>
        <input
          type="text"
          name="name"
          className={inputStyle}
          placeholder="Name"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className={labelStyle} htmlFor="email">
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
      <div className="pt-3">
        <Button
          disabled={pending}
          loading={pending}
          type="submit"
          className="border border-black rounded-xl p-2"
        >
          Sign up
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
