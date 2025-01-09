import clsx from "clsx";
import React, { ReactElement, ReactNode } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface ButtonProps {
  children: ReactNode | ReactElement;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "bordered" | "borderless";
}
const Button = ({
  children,
  className,
  loading,
  variant = "bordered",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        " relative  w-full text-lg overflow-hidden text-nowrap",

        {
          "border border-black px-6 py-2  rounded-3xl": variant === "bordered",
        },
        className
      )}
      {...props}
    >
      <span
        className={clsx("py-1", {
          "opacity-60": loading,
        })}
      >
        {children}
      </span>
      {loading && (
        <span
          className={clsx(
            "absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
          )}
        >
          <LoadingSpinner size="small" />
        </span>
      )}
    </button>
  );
};

export default Button;
