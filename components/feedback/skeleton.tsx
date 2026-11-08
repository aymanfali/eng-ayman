import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

function BaseSkeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      role="status"
      className={cn(
        "animate-pulse rounded-md bg-muted/70 dark:bg-muted/20 motion-reduce:animate-none",
        className,
      )}
      {...props}
    />
  );
}

export function PageSkeleton() {
  return (
    <div aria-busy="true" className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10" role="status">
      <BaseSkeleton className="h-8 w-40" />
      <BaseSkeleton className="h-16 w-full max-w-2xl" />
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <BaseSkeleton key={index} className="h-28 rounded-2xl" />
        ))}
      </div>
      <div className="space-y-4">
        <BaseSkeleton className="h-7 w-56" />
        <BaseSkeleton className="h-24 w-full" />
        <BaseSkeleton className="h-24 w-full" />
      </div>
    </div>
  );
}

export function DashboardStatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-busy="true" role="status">
      {Array.from({ length: 4 }).map((_, index) => (
        <BaseSkeleton key={index} className="h-28 rounded-2xl" />
      ))}
    </div>
  );
}

export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" aria-busy="true" role="status">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="space-y-3 rounded-2xl border border-border p-4">
          <BaseSkeleton className="h-4 w-24" />
          <BaseSkeleton className="h-6 w-2/3" />
          <BaseSkeleton className="h-20 w-full" />
        </div>
      ))}
    </div>
  );
}

export function ListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-3" aria-busy="true" role="status">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center gap-3 rounded-2xl border border-border p-3">
          <BaseSkeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <BaseSkeleton className="h-4 w-1/3" />
            <BaseSkeleton className="h-3 w-2/3" />
          </div>
          <BaseSkeleton className="h-8 w-16" />
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border" aria-busy="true" role="status">
      <div className="grid grid-cols-4 gap-4 border-b border-border p-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <BaseSkeleton key={index} className="h-4 w-full" />
        ))}
      </div>
      <div className="space-y-3 p-4">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, innerIndex) => (
              <BaseSkeleton key={`${index}-${innerIndex}`} className="h-4 w-full" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="rounded-2xl border border-border p-6" aria-busy="true" role="status">
      <div className="flex items-center gap-4">
        <BaseSkeleton className="h-16 w-16 rounded-full" />
        <div className="flex-1 space-y-2">
          <BaseSkeleton className="h-5 w-32" />
          <BaseSkeleton className="h-4 w-48" />
        </div>
      </div>
      <div className="mt-6 space-y-3">
        <BaseSkeleton className="h-4 w-full" />
        <BaseSkeleton className="h-4 w-5/6" />
        <BaseSkeleton className="h-4 w-4/6" />
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-4 rounded-2xl border border-border p-6" aria-busy="true" role="status">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="space-y-2">
          <BaseSkeleton className="h-4 w-24" />
          <BaseSkeleton className="h-10 w-full" />
        </div>
      ))}
      <BaseSkeleton className="h-10 w-32" />
    </div>
  );
}

export function NavigationSkeleton() {
  return (
    <div className="flex items-center gap-2" aria-busy="true" role="status">
      {Array.from({ length: 4 }).map((_, index) => (
        <BaseSkeleton key={index} className="h-10 w-20 rounded-full" />
      ))}
    </div>
  );
}

export function MediaSkeleton({ className }: { className?: string }) {
  return <BaseSkeleton className={cn("h-64 w-full rounded-2xl", className)} />;
}
