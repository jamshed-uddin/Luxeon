"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Tooggler({
  onToggle,
}: {
  onToggle?: (value: boolean | string) => void;
}) {
  const searchParams = useSearchParams();

  const [isChecked, setIsChecked] = useState(
    searchParams.get("inStock")?.toString() === "true" ? true : false
  );

  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={(e) => {
            setIsChecked(!isChecked);
            onToggle?.(e.target.checked);
          }}
        />
        <div
          className={`block w-7 h-4 rounded-full ${
            isChecked ? "bg-black" : "bg-gray-300"
          }`}
        ></div>
        <div
          className={`absolute left-0.5 top-0.5 bg-white w-3 h-3 rounded-full transition-transform duration-300 ease-in-out ${
            isChecked ? "transform translate-x-3" : ""
          }`}
        ></div>
      </div>
    </label>
  );
}
