"use client";

import { signInWithEmailAndPassword } from "@/actions";
import { useRouter } from "next/navigation";

import React, { FormEvent } from "react";

const SigninForm = () => {
  const router = useRouter();

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    try {
      const res = await signInWithEmailAndPassword(formData);
      console.log(res);

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitForm} className="space-y-3 ">
      <input
        type="text"
        name="email"
        className="border border-black p-2 rounded-xl"
        placeholder="Email"
      />{" "}
      <br />
      <input
        type="password"
        className="border border-black p-2 rounded-xl"
        name="password"
        placeholder="Password"
      />{" "}
      <br />
      <button type="submit" className="border border-black rounded-xl p-2">
        Sign in
      </button>
    </form>
  );
};

export default SigninForm;
