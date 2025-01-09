import React from "react";

type SpinnerSize = "small" | "medium" | "large";

interface SpinnerProps {
  size?: SpinnerSize;
}

const sizeClasses: Record<SpinnerSize, string> = {
  small: "w-5 h-5 border-2",
  medium: "w-8 h-8 border-2",
  large: "w-12 h-12 border-2",
};

const LoadingSpinner: React.FC<SpinnerProps> = ({ size = "medium" }) => {
  return (
    <div
      className={`block animate-spin rounded-full border-solid border-zinc-700 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1s_linear_infinite] ${sizeClasses[size]}`}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default LoadingSpinner;
