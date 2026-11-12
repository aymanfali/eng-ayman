"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center" role="alert">
      <h2 className="text-2xl font-semibold">{t("title")}</h2>
      <p className="max-w-md text-sm text-muted-foreground">
        {t("description")}
      </p>
      <Button onClick={() => reset()}>{t("retry")}</Button>
    </div>
  );
}
