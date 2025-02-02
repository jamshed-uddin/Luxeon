import { Metadata } from "next";

import React from "react";
import ForgotPasswordPage from "./ForgotPasswordPage";

export const metadata: Metadata = {
  title: "Forgot password | Luxeon - Redefine your space",
  description: "The forgot password page",
};

const ForgotPassword = () => {
  return <ForgotPasswordPage />;
};

export default ForgotPassword;
