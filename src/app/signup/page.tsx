import SignupForm from "@/components/SignupForm";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Sign up | Luxeon - Redefine your space",
  description: "The sign up page",
};

const SignUp = () => {
  return (
    <div className="lg:w-1/4 mx-auto space-y-4   px-3 lg:px-0">
      <SignupForm />

      <div>
        <h2>
          Already have an account?{" "}
          <Link href={"/signin"} className="underline text-blue-600">
            Sign in
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default SignUp;
