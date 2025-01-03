import clsx from "clsx";
import React, { ReactElement, ReactNode } from "react";

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
        "disabled:opacity-60 relative h-10 w-full text-lg overflow-hidden text-nowrap",

        {
          "border border-black px-6 py-3  rounded-3xl": variant === "bordered",
        },
        className
      )}
      {...props}
    >
      <span
        className={clsx(
          "absolute inset-0 flex  items-center justify-center transition-transform duration-500",
          {
            "translate-y-0": !loading,
            "-translate-y-14": loading,
          }
        )}
      >
        {children}
      </span>
      <span
        className={clsx(
          "flex items-center justify-center space-x-2 absolute inset-0 transition-transform duration-500",
          {
            "translate-y-0": loading,
            "translate-y-14": !loading,
          }
        )}
      >
        <span className=" w-2 h-2 bg-black rounded-full animate-[pulse_0.75s_ease-in-out_infinite]"></span>
        <span className=" w-2 h-2 bg-black rounded-full animate-[pulse_0.75s_ease-in-out_0.1s_infinite]"></span>
        <span className=" w-2 h-2 bg-black rounded-full animate-[pulse_0.75s_ease-in-out_0.2s_infinite]"></span>
      </span>
    </button>
  );
};

export default Button;
