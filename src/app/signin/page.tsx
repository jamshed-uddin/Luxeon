import SigninForm from "@/components/SigninForm";
import SocialLogin from "@/components/SocialLogin";
import Link from "next/link";
import React from "react";

const Signin = async ({
  searchParams,
}: {
  searchParams?: Promise<{ callbackUrl: string }>;
}) => {
  const params = await searchParams;

  console.log(params?.callbackUrl);

  return (
    <div className="lg:w-1/4 mx-auto  space-y-4 ">
      <SigninForm />

      <div className="text-center">Or, continue with</div>
      <SocialLogin callbackUrl={params?.callbackUrl || "/"} />

      <div>
        <h2>
          Don&apos;t have an account?{" "}
          <Link
            href={`/signup?callbackUrl=${params?.callbackUrl}`}
            className="underline text-blue-600"
          >
            Sign up
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default Signin;
