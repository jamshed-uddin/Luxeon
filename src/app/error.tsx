"use client";

import ErrorElement from "@/components/ErrorElement";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log(error);
  return (
    <div>
      <h2>{error?.message}</h2>
      <ErrorElement reset={reset} />
    </div>
  );
}
