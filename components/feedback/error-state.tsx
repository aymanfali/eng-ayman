import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ErrorStateProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onRetry?: () => void;
  className?: string;
  icon?: ReactNode;
};

export function ErrorState({
  title,
  description,
  actionLabel,
  onRetry,
  className,
  icon,
}: ErrorStateProps) {
  const t = useTranslations("Feedback");
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center",
        className,
      )}
    >
      {icon ? <div>{icon}</div> : null}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground">{title ?? t("errorTitle")}</h2>
        <p className="text-sm text-muted-foreground">{description ?? t("errorDescription")}</p>
      </div>
      {onRetry ? (
        <Button variant="secondary" onClick={onRetry}>
          {actionLabel ?? t("retry")}
        </Button>
      ) : null}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  className,
}: {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-muted/20 p-8 text-center",
        className,
      )}
      role="status"
    >
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {actionLabel && onAction ? (
        <Button variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
