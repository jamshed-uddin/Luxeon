import clsx from "clsx";
import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
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
        "relative h-14 w-full text-xl overflow-hidden ",
        className,
        {
          "border border-black px-6 py-3  rounded-3xl": variant === "bordered",
        }
      )}
      {...props}
    >
      <span
        className={clsx(
          "absolute inset-0 flex items-center justify-center transition-transform duration-500",
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
        <span className=" w-3 h-3 bg-black rounded-full animate-[pulse_0.75s_ease-in-out_infinite]"></span>
        <span className=" w-3 h-3 bg-black rounded-full animate-[pulse_0.75s_ease-in-out_0.1s_infinite]"></span>
        <span className=" w-3 h-3 bg-black rounded-full animate-[pulse_0.75s_ease-in-out_0.2s_infinite]"></span>
      </span>
    </button>
  );
};

export default Button;
