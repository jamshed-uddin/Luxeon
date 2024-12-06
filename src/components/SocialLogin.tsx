"use client";

import { doSocialLogin } from "@/actions";

import React from "react";
import { useFormStatus } from "react-dom";

const SocialLoginButton = () => {
  const { pending } = useFormStatus();

  console.log("social login pending", pending);
  return (
    <button
      className="border border-black rounded-xl p-2 disabled:opacity-70 disabled:cursor-wait"
      type="submit"
      name="action"
      value="google"
      disabled={pending}
    >
      Google
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
