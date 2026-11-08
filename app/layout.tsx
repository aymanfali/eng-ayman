import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// English Font (e.g., Inter, Geist, or custom TTF/WOFF2)
const fontEnglish = localFont({
  src: "../public/fonts/Space_Grotesk/SpaceGrotesk-VariableFont_wght.ttf",
  variable: "--font-english",
  display: "swap",
  weight: "100 900",
});

// Arabic Font (e.g., Cairo, Tajawal, IBM Plex Sans Arabic)
const fontArabic = localFont({
  src: "../public/fonts/Noto_Kufi_Arabic/NotoKufiArabic-VariableFont_wght.ttf",
  variable: "--font-arabic",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Ayman Fahd | Software Engineer",
    template: "%s | Ayman Fahd",
  },
  description: "Software engineer building modern, scalable web applications.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${fontEnglish.variable} ${fontArabic.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <Script id="theme-init" strategy="beforeInteractive">
          {`try {
            const storedTheme = localStorage.getItem("theme");
            const theme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : "system";
            const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
            document.documentElement.classList.toggle("dark", isDark);
            document.documentElement.style.colorScheme = isDark ? "dark" : "light";
          } catch {}`}
        </Script>
      </body>
    </html>
  );
}
