"use client";

import React from "react";
import { Toaster } from "react-hot-toast";

const ToasterClient = () => {
  return (
    <Toaster
      toastOptions={{
        duration: 4000,
        style: {
          padding: "0.2rem  0.5rem",
        },
      }}
    />
  );
};

export default ToasterClient;
