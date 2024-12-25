import clsx from "clsx";
import React from "react";
interface LoadingDotsProps {
  size?: "small" | "medium" | "big";
}
const LoadingDots = ({ size = "medium" }: LoadingDotsProps) => {
  const dotSize = clsx(" bg-black rounded-full", {
    "w-2 h-2": size === "small",
    "w-4 h-4": size === "medium",
    "w-6 h-6": size === "big",
  });

  return (
    <span className=" h-full flex items-center justify-center space-x-2">
      <span
        className={`${dotSize} animate-[pulse_0.75s_ease-in-out_infinite]`}
      ></span>
      <span
        className={`${dotSize} animate-[pulse_0.75s_ease-in-out_0.1s_infinite]`}
      ></span>
      <span
        className={`${dotSize} animate-[pulse_0.75s_ease-in-out_0.2s_infinite]`}
      ></span>
    </span>
  );
};

export default LoadingDots;
