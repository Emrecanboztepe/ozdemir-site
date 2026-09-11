import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import Analytics from "@/components/analytics/Analytics";
import ConsentBanner from "@/components/analytics/ConsentBanner";
import RouteScrollManager from "@/components/navigation/RouteScrollManager";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL } from "@/config/site";
import { ORGANIZATION_JSON_LD } from "@/lib/seo";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Özdemir Mühendislik — Isı Pompası, Isıtma ve Soğutma",
  description:
    "Havadan suya ısı pompası satışı, mekanik tesisat ve iklimlendirme. Keşiften kuruluma, bakımdan servise kadar tek elden.",
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        {/* "İçeriğe geç" — WCAG 2.4.1. Normalde görünmez, klavyeyle Tab'a
            basınca ortaya çıkar. Her sayfanın <main> etiketi `ana-icerik`
            id'sini taşır; klavye kullanıcısı navbar'daki onlarca bağlantıyı
            her sayfada baştan geçmek zorunda kalmaz. */}
        <a
          href="#ana-icerik"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-blue focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:shadow-card-lg focus:outline-none focus:ring-2 focus:ring-white"
        >
          İçeriğe geç
        </a>
        <Analytics />
        <ConsentBanner />
        <RouteScrollManager />
        <JsonLd data={ORGANIZATION_JSON_LD} />
        {children}
      </body>
    </html>
  );
}
