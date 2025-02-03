"use client";

import { requestClient } from "@/lib/requestClient";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import React, { FormEvent, useState } from "react";
import Button from "./Button";
import toast from "react-hot-toast";
import SectionTitle from "./SectionTitle";

const passwordInputs = [
  {
    name: "currentPassword",
    label: "Current Password",
    placeholder: "Enter your current password",
    isRequired: true,
  },
  {
    name: "newPassword",
    label: "New Password",
    placeholder: "Enter your new password",
    isRequired: true,
  },
  {
    name: "confirmNewPassword",
    label: "Confirm New Password",
    placeholder: "Confirm your new password",
    isRequired: true,
  },
];

const inputStyle =
  "border-[1.2px] text-sm   border-gray-600 placeholder:text-gray-600 rounded-lg  focus:outline focus:outline-1 focus:outline-black p-1.5 w-full box-border";

const labelStyle = " font-medium block mb-1";

const PasswordChange = () => {
  const { data } = useSession();
  const [password, setPassword] = useState<Record<string, string>>({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const [error, setError] = useState("");

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setError("");
    setPassword((p) => ({
      ...p,
      [name]: value,
    }));
  };

  const changePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (
      !password.currentPassword ||
      !password.newPassword ||
      !password.confirmNewPassword
    ) {
      setError("Password fields cannot be empty");
    } else if (password.newPassword !== password.confirmNewPassword) {
      return setError("Passwords do not match");
    } else if (String(password.newPassword).length < 6) {
      return setError("Password length must be 6 or higher");
    }
    setLoading(true);
    try {
      await requestClient("/users/changePassword", {
        method: "put",
        body: JSON.stringify({
          userEmail: data?.user.email,
          currentPassword: password.currentPassword,
          newPassword: password.newPassword,
        }),
      });
      setPassword({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      toast.success("Password changed.");
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (data?.user.provider === "google") {
    return null;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4">
      <SectionTitle className="text-xl font-medium mb-4">
        Change Password
      </SectionTitle>
      <form action="" className="col-span-3 mt-4" onSubmit={changePassword}>
        <div className="space-y-3">
          {passwordInputs.map((input) => (
            <div key={input.name} className="space-y-1">
              <label className={labelStyle} htmlFor="password">
                {input.label}
              </label>
              <div className="relative">
                <input
                  type={showPassword[input.name] ? "text" : "password"}
                  name={input.name}
                  className={inputStyle}
                  placeholder={input.placeholder}
                  value={password[input.name]}
                  onChange={handleInputChange}
                  required={input.isRequired}
                />
                <span
                  onClick={() =>
                    setShowPassword((p) => ({
                      ...p,
                      [input.name]: !p[input.name],
                    }))
                  }
                  className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2"
                >
                  {showPassword[input.name] ? (
                    <EyeIcon className="w-4" />
                  ) : (
                    <EyeSlashIcon className="w-4" />
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
        {error && <span className="text-red-500 text-sm ">{error}</span>}
        <div className="my-4 flex justify-end">
          <div>
            <Button disabled={loading} loading={loading}>
              Change password
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PasswordChange;
