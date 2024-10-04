import SigninForm from "@/components/SigninForm";
import SocialLogin from "@/components/SocialLogin";
import Link from "next/link";
import React from "react";

const Signin = async () => {
  return (
    <div className="w-full flex flex-col items-center space-y-4">
      <SigninForm />

      <div>Or, continue with</div>
      <SocialLogin />

      <div>
        <h2>
          Don't have an account?{" "}
          <Link href={"/signup"} className="underline text-blue-600">
            Sign up
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default Signin;
