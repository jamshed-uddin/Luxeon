import React, { Suspense } from "react";
import ResetPasswordPage from "./ResetPasswordPage";

const ResetPassword = () => {
  return (
    <Suspense fallback={<div className="min-h-screen"></div>}>
      {" "}
      <ResetPasswordPage />
    </Suspense>
  );
};

export default ResetPassword;
