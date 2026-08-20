import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/config";
import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";
import { StickyCta } from "@/components/StickyCta";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

const title = "Газопоршневые установки 65–230 кВт для предприятий | ЭЛЕМЕНТ";
const description =
  "Газопоршневые установки ЭЛЕМЕНТ мощностью 65, 145, 210 и 230 кВт для собственной генерации электроэнергии. Подбор мощности и предварительный расчёт под параметры вашего объекта.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F7F4",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: "%s | ЭЛЕМЕНТ" },
  description,
  applicationName: "ЭЛЕМЕНТ",
  alternates: { canonical: "/" },
  keywords: [
    "газопоршневые установки",
    "газопоршневая установка",
    "ГПУ",
    "газопоршневая электростанция",
    "собственная генерация электроэнергии",
    "ГПУ для предприятия",
    "газовая электростанция для предприятия",
    "ГПУ 65 кВт",
    "ГПУ 145 кВт",
    "ГПУ 210 кВт",
    "ГПУ 230 кВт",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: "ЭЛЕМЕНТ",
    title,
    description,
    images: [
      {
        url: "/images/gpu-hero.svg",
        width: 960,
        height: 560,
        alt: "Газопоршневая установка ЭЛЕМЕНТ для собственной генерации электроэнергии",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/gpu-hero.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-ink focus:shadow-card"
        >
          Перейти к содержимому
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyCta />
        <JsonLd />
        <Analytics />
      </body>
    </html>
  );
}
