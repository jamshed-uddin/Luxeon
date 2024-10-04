"use server";

import { signIn, signOut } from "./auth";

export const doSocialLogin = async (formData: FormData) => {
  const action = formData.get("action")?.toString();

  await signIn(action, { redirectTo: "/" });
};

export const signInWithEmailAndPassword = async (formData: FormData) => {
  try {
    const userCredentials = {
      email: formData.get("email")?.toString(),
      password: formData.get("password")?.toString(),
      redirect: false,
    };

    const response = await signIn("credentials", userCredentials);
    return response;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const userSignOut = async () => {
  await signOut({ redirectTo: "/" });
};
