"use client";

import { createContext, useContext, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

export type ToastVariant = "success" | "error" | "info";

export type Toast = {
  id: number;
  title: string;
  description?: string;
  variant?: ToastVariant;
};

const ToastContext = createContext<{
  push: (toast: Omit<Toast, "id">) => void;
} | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const value = useMemo(
    () => ({
      push: (toast: Omit<Toast, "id">) => {
        const id = Date.now() + Math.round(Math.random() * 1000);
        setToasts((current) => [...current, { ...toast, id }]);

        window.setTimeout(() => {
          setToasts((current) => current.filter((item) => item.id !== id));
        }, 4000);
      },
    }),
    [],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div aria-live="polite" aria-atomic="true" className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex justify-center px-4">
        <div className="flex w-full max-w-md flex-col gap-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              role="status"
              className={cn(
                "pointer-events-auto rounded-xl border border-border bg-background/90 p-3 shadow-lg backdrop-blur-xl",
                toast.variant === "success" && "border-emerald-500/30 bg-emerald-500/10",
                toast.variant === "error" && "border-red-500/30 bg-red-500/10",
              )}
            >
              <p className="text-sm font-medium text-foreground">{toast.title}</p>
              {toast.description ? <p className="mt-1 text-xs text-muted-foreground">{toast.description}</p> : null}
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
}
