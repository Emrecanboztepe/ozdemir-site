import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
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
        <RouteScrollManager />
        <JsonLd data={ORGANIZATION_JSON_LD} />
        {children}
      </body>
    </html>
  );
}
