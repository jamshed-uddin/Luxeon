"use client";

import { doSocialLogin } from "@/actions";

import React from "react";
import { useFormStatus } from "react-dom";
import googleLogo from "@/assets/google.svg";
import Image from "next/image";

const SocialLoginButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className="disabled:opacity-70 disabled:cursor-wait  border border-black rounded-xl p-2 flex items-center gap-2"
      type="submit"
      name="action"
      value="google"
      disabled={pending}
    >
      <span className="w-6 h-6 block">
        <Image
          src={googleLogo}
          alt="Google logo"
          height={24}
          width={24}
          className="w-full h-full object-cover"
        />
      </span>{" "}
      <span>Google</span>
    </button>
  );
};

const SocialLogin = ({ callbackUrl }: { callbackUrl: string }) => {
  const socialLoginAction = doSocialLogin.bind(null, callbackUrl);

  return (
    <div className="flex justify-center">
      <form action={socialLoginAction} className="space-x-3">
        <SocialLoginButton />
      </form>
    </div>
  );
};

export default SocialLogin;
