"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "./auth";

export const doSocialLogin = async (
  redirectUrl: string,
  formData: FormData
) => {
  const action = formData.get("action")?.toString();

  await signIn(action, { redirectTo: redirectUrl || "/" });
};

export const signInWithEmailAndPassword = async (formData: FormData) => {
  try {
    const userCredentials = {
      email: formData.get("email")?.toString(),
      password: formData.get("password")?.toString(),
      redirect: false,
    };

    await signIn("credentials", userCredentials);

    return {
      success: true,
      message: "Signin successful",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            message: "Something went wrong",
            error: error,
          };

        case "CallbackRouteError":
          return {
            success: false,
            message:
              error?.cause?.err?.response?.data?.message ||
              "Something went wrong",
          };

        default:
          return {
            success: false,
            message: "Something went wrong",
            error: error,
          };
      }
    }

    throw error;
  }
};

export const userSignOut = async () => {
  await signOut({ redirectTo: "/" });
};
