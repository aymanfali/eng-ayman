import { Suspense } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import Navbar from "@/components/layout/navbar";
import { ToastProvider } from "@/components/feedback/toaster";
import { QueryProvider } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/layout/footer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
      <LocaleContent params={params}>{children}</LocaleContent>
    </Suspense>
  );
}

async function LocaleContent({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <div
      dir={direction}
      lang={locale}
      className="contents"
      style={{
        fontFamily:
          locale === "ar"
            ? "var(--font-arabic), sans-serif"
            : "var(--font-english), sans-serif",
      }}
    >
      <NextIntlClientProvider messages={messages}>
        <QueryProvider>
          <ToastProvider>
            <ThemeProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </ThemeProvider>
          </ToastProvider>
        </QueryProvider>
      </NextIntlClientProvider>
    </div>
  );
}
