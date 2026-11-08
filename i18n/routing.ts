import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  // 'as-needed' hides the prefix for English (/about) and displays it for Arabic (/ar/about)
  localePrefix: "as-needed",
});
