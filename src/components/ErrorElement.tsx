import { ArrowPathIcon } from "@heroicons/react/24/outline";
import React from "react";

const ErrorElement = ({ reset }: { reset: () => void }) => {
  const errorMessage = "Something went wrong!";

  return (
    <div className="flex justify-center my-container">
      <div className=" flex flex-col items-center space-y-3">
        <h2 className="text-2xl font-medium">{errorMessage}</h2>
        <button onClick={() => reset()} className="flex items-center gap-1">
          <ArrowPathIcon className="w-4" />
          <span>Try again</span>
        </button>
      </div>
    </div>
  );
};

export default ErrorElement;
