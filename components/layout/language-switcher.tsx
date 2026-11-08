"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("Navigation");
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    // Re-renders the current path under the selected locale segment
    router.replace(pathname, { locale: nextLocale });
  };

  const isEnglish = locale === "en";

  return (
    <button
      onClick={toggleLanguage}
      type="button"
      className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-transparent px-3 py-1.5 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-800"
      aria-label={t("switchLanguage")}
    >
      <Globe className="h-4 w-4 shrink-0 text-neutral-500 dark:text-neutral-400" />
      <span
        style={{
          fontFamily: isEnglish
            ? "var(--font-arabic), sans-serif"
            : "var(--font-english), sans-serif",
        }}
      >
        {isEnglish ? "العربية" : "English"}
      </span>
    </button>
  );
}
