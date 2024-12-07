import SigninForm from "@/components/SigninForm";
import SocialLogin from "@/components/SocialLogin";
import Link from "next/link";
import React from "react";

const Signin = async ({
  searchParams,
}: {
  searchParams?: Promise<{ callbackUrl: string; error: string }>;
}) => {
  const params = await searchParams;
  let signupUrl = "/signup";

  if (params?.callbackUrl) {
    signupUrl = `/signup?callbackUrl=${params?.callbackUrl}`;
  }

  console.log(params?.callbackUrl);

  return (
    <div className="lg:w-1/4 mx-auto  space-y-4 px-3 lg:px-0">
      <SigninForm />

      <div className="text-center">Or, continue with</div>
      <SocialLogin callbackUrl={params?.callbackUrl || "/"} />
      {params?.error && (
        <span className="text-sm text-red-500">
          {params?.error ? "Something went wrong in google signin!" : ""}
        </span>
      )}

      <div>
        <h2>
          Don&apos;t have an account?{" "}
          <Link href={signupUrl} className="underline text-blue-600">
            Sign up
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default Signin;
