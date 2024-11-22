import SignupForm from "@/components/SignupForm";
import Link from "next/link";
import React from "react";
const SignUp = () => {
  return (
    <div className="lg:w-1/4 mx-auto space-y-4">
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
