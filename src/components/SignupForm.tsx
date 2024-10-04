"use client";

import React, { FormEvent } from "react";

const SignupForm = () => {
  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const userData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("http://localhost:4000/api/users", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return console.log("something went wrong");
      }

      const data = await response.json();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-3 ">
      <input
        type="text"
        name="name"
        className="border border-black p-2 rounded-xl"
        placeholder="Name"
        required
      />{" "}
      <br />
      <input
        type="text"
        name="email"
        className="border border-black p-2 rounded-xl"
        placeholder="Email"
        required
      />{" "}
      <br />
      <input
        type="password"
        className="border border-black p-2 rounded-xl"
        name="password"
        placeholder="Password"
        required
      />{" "}
      <br />
      <button type="submit" className="border border-black rounded-xl p-2">
        Sign up
      </button>
    </form>
  );
};

export default SignupForm;
