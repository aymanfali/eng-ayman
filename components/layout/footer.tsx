import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Mail, ArrowUp } from "lucide-react";
import { cacheLife } from "next/cache";
import Image from "next/image";
import { DeveloperCredit } from "./developer-credit";

const navigation = [
  { label: "home", href: "#home" },
  { label: "projects", href: "#projects" },
  { label: "services", href: "#about" },
  { label: "contact", href: "#contact" },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/aymanfali",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4"
        aria-hidden="true"
      >
        <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.67-3.75-1.32-3.75-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.75 2.02 3.36 1.42.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.43.11-2.98 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.55.23 2.7.11 2.98.72.78 1.15 1.78 1.15 3 0 4.3-2.61 5.24-5.1 5.52.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ayman-f-ali/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4"
        aria-hidden="true"
      >
        <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.34H4.95V9h2.98v9.34ZM6.44 7.72a1.73 1.73 0 1 1 0-3.46 1.73 1.73 0 0 1 0 3.46Zm11.9 10.62h-2.97v-4.55c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.63H9.17V9h2.85v1.28h.04c.4-.74 1.37-1.52 2.82-1.52 3.01 0 3.57 1.98 3.57 4.56v5.02Z" />
      </svg>
    ),
  },
];

export default async function Footer() {
  const t = await getTranslations("Footer");
  const tNavigation = await getTranslations("Navigation");

  async function getCurrentYear() {
    "use cache";

    cacheLife("max");
    return new Date().getFullYear();
  }
  const currentYear = await getCurrentYear();

  return (
<<<<<<< HEAD
    <footer className="relative mt-24 overflow-hidden border-t border-border/70 bg-background max-[700px]:pb-[calc(82px+env(safe-area-inset-bottom))]">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-lg -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Main footer */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_0.7fr_0.8fr] lg:gap-20">
          {/* Brand */}
          <div className="max-w-md">
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
              aria-label={tNavigation("homeLabel")}
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-secondary shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:-rotate-6">
                {/* <Code2 className="size-6" strokeWidth={2.2} /> */}
                <Image
                  src="/abrar.png"
                  alt={tNavigation("homeLabel")}
                  width={32}
                  height={32}
                />
              </span>

              <span className="text-lg font-bold tracking-tight text-foreground">
                Abrar Fahd
                <span className="text-primary">.</span>
              </span>
            </Link>
=======
    <>
      <footer className="relative mt-24 overflow-hidden border-t border-border/70 bg-background mb-28">
        {/* Decorative background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 h-64 w-lg -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]"
        />

        <div className="relative mx-auto max-w-7xl px-6">
          {/* Main footer */}
          <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_0.7fr_0.8fr] lg:gap-20">
            {/* Brand */}
            <div className="max-w-md">
              <Link
                href="/"
                className="group inline-flex items-center gap-3"
                aria-label={tNavigation("homeLabel")}
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-secondary shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:-rotate-6">
                  {/* <Code2 className="size-6" strokeWidth={2.2} /> */}
                  <Image
                    src="/ayman.svg"
                    alt={tNavigation("homeLabel")}
                    width={32}
                    height={32}
                  />
                </span>

                <span className="text-lg font-bold tracking-tight text-foreground">
                  {tNavigation("fullName")}
                  <span className="text-primary">.</span>
                </span>
              </Link>
>>>>>>> c1ad91142f221d30726395e5fce7e8d3b7b71398

              <p className="mt-6 text-sm leading-7 text-muted-foreground">
                {t("description")}
              </p>

<<<<<<< HEAD
            <a
              href="#contact"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-secondary shadow-lg shadow-primary/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/25"
            >
              {t("workTogether")}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
=======
              <Link
                href="#contact"
                className="group mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-secondary shadow-lg shadow-primary/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/25"
              >
                {t("workTogether")}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
>>>>>>> c1ad91142f221d30726395e5fce7e8d3b7b71398

            {/* Navigation */}
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                {t("explore")}
              </h3>

<<<<<<< HEAD
            <ul className="mt-6">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="nav-item group inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {tNavigation(item.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social / Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {t("connect")}
            </h3>

            <p className="mt-6 text-sm leading-6 text-muted-foreground">
              {t("contactPrompt")}
            </p>

            {/* <a
              href="mailto:contact@aymanfahd.com"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              <Mail className="size-4 text-primary" />
              contact@aymanfahd.com
            </a> */}

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-primary hover:text-secondary"
                >
                  {/* Render the icon element directly */}
                  {icon}
                </a>
              ))}
=======
              <ul className="mt-6">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="nav-item group inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {tNavigation(item.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social / Contact */}
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                {t("connect")}
              </h3>

              <p className="mt-6 text-sm leading-6 text-muted-foreground">
                {t("contactPrompt")}
              </p>

              <a
                href="mailto:contact@aymanfahd.com"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                <Mail className="size-4 text-primary" />
                contact@aymanfahd.com
              </a>

              <div className="mt-6 flex items-center gap-3">
                {socialLinks.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-primary hover:text-secondary"
                  >
                    {/* Render the icon element directly */}
                    {icon}
                  </a>
                ))}
              </div>
>>>>>>> c1ad91142f221d30726395e5fce7e8d3b7b71398
            </div>
          </div>

<<<<<<< HEAD
        {/* Bottom bar */}
        <div className="flex flex-col gap-5 border-t border-border/70 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {currentYear}{" "}
            <span className="font-medium text-foreground">Abrar Fahd</span>. All
            {t("allRightsReserved")}
          </p>

          <div className="flex items-center justify-between gap-6 sm:justify-end">
            <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-40" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              {t("available")}
            </span>

            {/* Back to top button using inline event handling */}
            <a
              href="#"
              aria-label={t("backToTop")}
              className="group flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:bg-primary hover:text-secondary"
            >
              <ArrowUp className="size-4 transition-transform group-hover:-translate-y-0.5" />
            </a>
=======
          {/* Bottom bar */}
          <div className="relative isolate overflow-hidden border-t border-border/70 py-6 text-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-[url('/network-pattern.svg')] bg-[length:96px_96px] opacity-40"
            />
            <p className="text-xs text-muted-foreground">
              {t("copyright", { year: currentYear })}
            </p>
            <DeveloperCredit
              label={t("developedBy")}
              name={tNavigation("fullName")}
            />
>>>>>>> c1ad91142f221d30726395e5fce7e8d3b7b71398
          </div>
        </div>
      </footer>
      <a
        href="#top"
        aria-label={t("backToTop")}
        className="group fixed bottom-24 right-4 z-40 flex size-10 items-center justify-center rounded-full border border-border bg-background/90 text-muted-foreground shadow-sm backdrop-blur-xl transition-all hover:border-primary hover:bg-primary hover:text-secondary md:bottom-6 md:right-6"
      >
        <ArrowUp className="size-4 transition-transform group-hover:-translate-y-0.5" />
      </a>
    </>
  );
}
