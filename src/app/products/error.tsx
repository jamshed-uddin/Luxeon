"use client";

import ErrorElement from "@/components/ErrorElement";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorElement error={error} reset={reset} />;
}
