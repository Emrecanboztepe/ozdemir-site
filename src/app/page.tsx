import type { Metadata } from "next";
import Splash from "@/components/landing/Splash";

export const metadata: Metadata = {
  title: "Özdemir Mühendislik — Evsel ve Endüstriyel Isı Pompası",
  description:
    "Ev, villa ve daireden fabrika, otel ve iş merkezine kadar ısı pompası, ısıtma-soğutma ve mekanik tesisat. Hangi taraftaysanız oradan başlayın.",
};

/** Açılış kapısı: evsel mi, endüstriyel mi? */
export default function Home() {
  return <Splash />;
}
