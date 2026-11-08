"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center" role="alert">
      <h2 className="text-2xl font-semibold">Something went wrong</h2>
      <p className="max-w-md text-sm text-muted-foreground">
        An unexpected error occurred. You can retry this request or reload the page.
      </p>
      <Button onClick={() => reset()}>Try again</Button>
      <p className="text-xs text-muted-foreground">{error.message}</p>
    </div>
  );
}
