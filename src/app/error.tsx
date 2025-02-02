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
  return <ErrorElement reset={reset} />;
}
