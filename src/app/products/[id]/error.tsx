"use client";
import ErrorElement from "@/components/ErrorElement";

// Error boundaries must be Client Components

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorElement reset={reset} />;
}
