"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ModeToggle } from "../mode-toggle";
import Image from "next/image";
import LanguageSwitcher from "./language-switcher";

const navItems = [
  { label: "home", href: "#home", icon: "home" },
  { label: "me", href: "#about", icon: "person" },
  { label: "projects", href: "#projects", icon: "projects" },
  { label: "clients", href: "#clients", icon: "clients" },
  { label: "contact", href: "#contact", icon: "contact" },
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
  const t = useTranslations("Navigation");

  return (
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
          </span>
        </Link>

        <nav
          aria-label={t("mainLabel")}
          className="min-w-0 max-[700px]:col-span-full max-[700px]:row-start-2 max-[700px]:overflow-visible max-[700px]:rounded-[14px] max-[700px]:border max-[700px]:border-[rgb(25_20_49_/_12%)] max-[700px]:bg-[rgb(250_248_244_/_94%)] max-[700px]:p-1.5 max-[700px]:shadow-[0_8px_30px_rgb(25_20_49_/_14%)] max-[700px]:backdrop-blur-[18px] max-[700px]:dark:border-[rgb(231_222_238_/_14%)] max-[700px]:dark:bg-[rgb(25_20_49_/_94%)]"
        >
          <ul className="flex list-none items-center justify-center gap-1 p-0 max-[700px]:grid max-[700px]:min-w-0 max-[700px]:grid-cols-[repeat(5,minmax(0,1fr))] max-[700px]:gap-0.5">
            {navItems.map((item) => {
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
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="col-start-3 row-start-1 flex items-center gap-[7px] [&>*]:shrink-0 [&_button]:min-h-10 [&_button]:rounded-full max-[700px]:col-start-2 max-[700px]:gap-[3px] max-[700px]:[&_button]:min-h-9 max-[700px]:[&_button]:min-w-9 max-[700px]:[&_button]:px-2 max-[700px]:[&_svg]:size-[17px]">
          <ModeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
