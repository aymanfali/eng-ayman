"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ModeToggle } from "../mode-toggle";
import Image from "next/image";
import LanguageSwitcher from "./language-switcher";

const navItems = [
  { label: "home", target: "top", icon: "home" },
  { label: "projects", target: "work", icon: "projects" },
  { label: "services", target: "services", icon: "services" },
  { label: "contact", target: "contact", icon: "contact" },
] as const;

function NavIcon({ name }: { name: (typeof navItems)[number]["icon"] }) {
  const paths = {
    home: (
      <>
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v11h14V9" />
        <path d="M9 20v-7h6v7" />
      </>
    ),
    projects: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
    services: (
      <>
        <path d="M12 3v18" />
        <path d="M3 12h18" />
        <circle cx="12" cy="12" r="9" />
      </>
    ),
    contact: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5"
    >
      {paths[name]}
    </svg>
  );
}

export default function Navbar() {
  const [activeTarget, setActiveTarget] = useState("top");
  const t = useTranslations("Navigation");

  useEffect(() => {
    const syncActiveTarget = () => {
      setActiveTarget(window.location.hash.slice(1) || "top");
    };

    syncActiveTarget();
    window.addEventListener("hashchange", syncActiveTarget);
    return () => window.removeEventListener("hashchange", syncActiveTarget);
  }, []);

  return (
    <header className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:sticky md:top-0 md:bottom-auto md:px-6 md:pb-0 md:pt-5">
      <div className="mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <a
          href="#top"
          aria-label={t("homeLabel")}
          className="group hidden shrink-0 items-center gap-3 md:flex"
        >
          {/* <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm transition-transform duration-200 group-hover:scale-105">
            AF
          </span> */}

          <Image src="/ayman.svg" alt={t("homeLabel")} width={32} height={32} />

          <span className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-foreground">
              {t("fullName")}
            </span>
            <span className="text-xs text-muted-foreground">
              {t("softwareEngineer")}
            </span>
          </span>
        </a>

        {/* Navigation dock */}
        <nav
          aria-label={t("mainLabel")}
          className="mx-auto w-full max-w-md rounded-2xl border border-border/70 bg-background/90 p-2 shadow-[0_-8px_32px_rgba(14,17,22,0.12)] backdrop-blur-2xl supports-backdrop-filter:bg-background/75 md:mx-0 md:w-auto md:max-w-none md:rounded-full md:border-primary/15 md:p-1.5 md:shadow-[0_8px_32px_rgba(14,17,22,0.08)]"
        >
          <ul className="flex items-center justify-around gap-1 md:justify-center md:gap-1">
            {navItems.map((item) => {
              const isActive = activeTarget === item.target;

              return (
                <li key={item.target} className="min-w-0 flex-1 md:flex-none">
                  <a
                    href={`#${item.target}`}
                    aria-current={isActive ? "location" : undefined}
                    className={[
                      "nav-item group relative flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-xs font-medium transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none md:min-h-11 md:flex-row md:gap-2 md:rounded-full md:px-5 md:py-2.5 md:text-sm",
                      isActive
                        ? "bg-primary/12 text-primary md:bg-primary/10"
                        : "text-muted-foreground hover:bg-primary/8 hover:text-primary active:scale-95",
                    ].join(" ")}
                  >
                    <NavIcon name={item.icon} />
                    <span>{t(item.label)}</span>

                    {/* Active indicator */}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-1 h-1 w-1 rounded-full bg-primary md:hidden"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden md:flex shrink-0 gap-3 mx-auto w-full max-w-md rounded-2xl border border-border/70 bg-background/90 shadow-[0_-8px_32px_rgba(14,17,22,0.12)] backdrop-blur-2xl supports-backdrop-filter:bg-background/75 md:mx-0 md:w-auto md:max-w-none md:border-primary/15 md:p-2 md:shadow-[0_8px_32px_rgba(14,17,22,0.08)]">
          {/* Theme toggle */}
          <div className="hidden shrink-0 md:block">
            <ModeToggle />
          </div>

          {/* Language toggle */}
          <div className="hidden shrink-0 md:block">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Theme toggle on mobile */}
        <div className="md:hidden absolute right-3 top-0 -translate-y-[calc(100%+0.75rem)] md:static md:translate-y-0">
          <div className="rounded-xl border border-border/70 bg-background/90 p-1 shadow-sm backdrop-blur-xl md:border-0 md:bg-transparent md:p-0 md:shadow-none">
            <div className="md:hidden">
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
