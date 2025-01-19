"use client";

import ErrorElement from "@/components/ErrorElement";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorElement reset={reset} />;
}
