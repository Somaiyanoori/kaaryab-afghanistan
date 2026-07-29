"use client";

import { useEffect } from "react";
import ErrorState from "../components/states/ErrorState.jsx";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorState
      fullPage
      title="Something Went Wrong"
      description="An unexpected error occurred. Please try again or go back home."
      onRetry={reset}
      retryLabel="Try Again"
      actionLabel="Go Home"
      actionHref="/"
    />
  );
}
