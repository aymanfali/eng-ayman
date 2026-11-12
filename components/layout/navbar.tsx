"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
<<<<<<< HEAD
import { Link } from "@/i18n/navigation";
=======
>>>>>>> c1ad91142f221d30726395e5fce7e8d3b7b71398
import { ModeToggle } from "../mode-toggle";
import Image from "next/image";
import LanguageSwitcher from "./language-switcher";

const navItems = [
<<<<<<< HEAD
  { label: "home", href: "#home", icon: "home" },
  { label: "me", href: "#about", icon: "person" },
  { label: "projects", href: "#projects", icon: "projects" },
  { label: "clients", href: "#clients", icon: "clients" },
  { label: "contact", href: "#contact", icon: "contact" },
=======
  { label: "home", target: "top", icon: "home" },
  { label: "projects", target: "work", icon: "projects" },
  { label: "services", target: "services", icon: "services" },
  { label: "contact", target: "contact", icon: "contact" },
>>>>>>> c1ad91142f221d30726395e5fce7e8d3b7b71398
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
    person: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M5 21a7 7 0 0 1 14 0" />
      </>
    ),
    projects: (
      <>
        <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <path d="M3 10h18" />
      </>
    ),
    clients: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="10" cy="7" r="4" />
        <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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
      className="hidden size-5 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 max-[980px]:block max-[980px]:size-4 max-[700px]:size-[19px]"
    >
      {paths[name]}
    </svg>
  );
}

export default function Navbar() {
<<<<<<< HEAD
=======
  const [activeTarget, setActiveTarget] = useState("top");
>>>>>>> c1ad91142f221d30726395e5fce7e8d3b7b71398
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
<<<<<<< HEAD
    <header className="fixed inset-x-4 bottom-0 z-50 text-[#191431] max-[700px]:inset-x-[10px] max-[700px]:bottom-[calc(10px+env(safe-area-inset-bottom))] max-[700px]:top-auto md:sticky md:top-0 md:bottom-auto">
      <div className="mx-auto grid min-h-16 max-w-[1360px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-5 rounded-full border border-[rgb(25_20_49_/_12%)] bg-[rgb(250_248_244_/_88%)] p-[8px_12px_8px_18px] shadow-[0_10px_38px_rgb(25_20_49_/_8%)] backdrop-blur-[18px] dark:border-[rgb(231_222_238_/_14%)] dark:bg-[rgb(25_20_49_/_88%)] dark:text-[#e7deee] max-[980px]:gap-2 max-[980px]:px-3 max-[700px]:grid-cols-[minmax(0,1fr)_auto] max-[700px]:gap-x-2 max-[700px]:gap-y-0 max-[700px]:rounded-[18px] max-[700px]:p-2.5">
        <Link
          href="/"
          aria-label={t("homeLabel")}
          className="inline-flex min-w-max items-center gap-2.5 text-inherit no-underline max-[700px]:gap-[7px]"
        >
          <Image
            className="size-9 object-contain max-[700px]:size-[30px]"
            src="/abrar.png"
            alt={t("homeLabel")}
            width={36}
            height={36}
          />
          <span className="[&_strong]:block [&_strong]:text-[13px] [&_strong]:leading-[1.25] max-[700px]:[&_strong]:text-xs [&_small]:mt-0.5 [&_small]:block [&_small]:text-[10px] [&_small]:leading-[1.2] [&_small]:text-[#716b7d] dark:[&_small]:text-[#bcb2d0] max-[700px]:[&_small]:text-[9px]">
            <strong>Abrar Fahd</strong>
            <small>{t("softwareEngineer")}</small>
=======
    <header className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:sticky md:top-0 md:bottom-auto md:px-6 md:pb-0 md:pt-5">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-0 h-24 bg-gradient-to-b from-primary/20 via-primary/10 to-transparent backdrop-blur-md [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />
      <div className="relative z-10 mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <a
          href="#top"
          aria-label={t("homeLabel")}
          className="group fixed left-3 top-[max(0.75rem,env(safe-area-inset-top))] flex shrink-0 items-center gap-3 md:static"
        >
          {/* <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm transition-transform duration-200 group-hover:scale-105">
            AF
          </span> */}

          <Image src="/ayman.svg" alt={t("homeLabel")} width={42} height={42} />

          <span className="hidden flex-col md:flex">
            <span className="text-sm font-bold tracking-tight text-foreground">
              {t("fullName")}
            </span>
            <span className="text-xs text-muted-foreground">
              {t("softwareEngineer")}
            </span>
>>>>>>> c1ad91142f221d30726395e5fce7e8d3b7b71398
          </span>
        </a>

        <nav
          aria-label={t("mainLabel")}
          className="min-w-0 max-[700px]:col-span-full max-[700px]:row-start-2 max-[700px]:overflow-visible max-[700px]:rounded-[14px] max-[700px]:border max-[700px]:border-[rgb(25_20_49_/_12%)] max-[700px]:bg-[rgb(250_248_244_/_94%)] max-[700px]:p-1.5 max-[700px]:shadow-[0_8px_30px_rgb(25_20_49_/_14%)] max-[700px]:backdrop-blur-[18px] max-[700px]:dark:border-[rgb(231_222_238_/_14%)] max-[700px]:dark:bg-[rgb(25_20_49_/_94%)]"
        >
          <ul className="flex list-none items-center justify-center gap-1 p-0 max-[700px]:grid max-[700px]:min-w-0 max-[700px]:grid-cols-[repeat(5,minmax(0,1fr))] max-[700px]:gap-0.5">
            {navItems.map((item) => {
<<<<<<< HEAD
              return (
                <li key={item.href}>
                  <a
                    className="group inline-flex min-h-[42px] items-center gap-[7px] whitespace-nowrap rounded-full px-[13px] text-[13px] text-[#625a73] no-underline transition-[color,background-color] duration-[180ms] hover:bg-[#e7deee] hover:text-[#191431] focus-visible:bg-[#e7deee] focus-visible:text-[#191431] dark:text-[#c4bbd6] dark:hover:bg-[#302a49] dark:hover:text-white dark:focus-visible:bg-[#302a49] dark:focus-visible:text-white max-[980px]:px-[9px] max-[980px]:text-xs max-[700px]:flex max-[700px]:min-h-[58px] max-[700px]:min-w-0 max-[700px]:flex-col max-[700px]:justify-center max-[700px]:gap-1 max-[700px]:rounded-xl max-[700px]:px-0.5 max-[700px]:py-[5px] max-[700px]:text-[10px]"
                    href={item.href}
                  >
                    <NavIcon name={item.icon} />
                    <span className="max-[700px]:max-w-full max-[700px]:overflow-hidden max-[700px]:text-ellipsis">
                      {t(item.label)}
                    </span>
=======
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
>>>>>>> c1ad91142f221d30726395e5fce7e8d3b7b71398
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

<<<<<<< HEAD
        <div className="col-start-3 row-start-1 flex items-center gap-[7px] [&>*]:shrink-0 [&_button]:min-h-10 [&_button]:rounded-full max-[700px]:col-start-2 max-[700px]:gap-[3px] max-[700px]:[&_button]:min-h-9 max-[700px]:[&_button]:min-w-9 max-[700px]:[&_button]:px-2 max-[700px]:[&_svg]:size-[17px]">
=======
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

        {/* Theme and language controls on mobile */}
        <div className="fixed right-3 top-[max(0.75rem,env(safe-area-inset-top))] flex items-center gap-1 rounded-xl border border-border/70 bg-background/90 p-1 shadow-sm backdrop-blur-xl md:hidden">
>>>>>>> c1ad91142f221d30726395e5fce7e8d3b7b71398
          <ModeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
