import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 80],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    const legacyRedirects = [
      ["/index.html", "/"],
      ["/hakkimizda.html", "/hakkimizda"],
      ["/hizmetler.html", "/hizmetler"],
      ["/isi-pompasi-ile-isitma.html", "/hizmetler/isi-pompasi-kurulumu"],
      ["/isi-pompasi-ile-sogutma.html", "/hizmetler/isi-pompasi-kurulumu"],
      ["/isi-pompasi-ile-sicak-su.html", "/hizmetler/isi-pompasi-kurulumu"],
      ["/sicak-su-icin-gunes-enerjisi.html", "/hizmetler/mekanik-tesisat"],
      ["/mekanik-tesisat.html", "/hizmetler/mekanik-tesisat"],
      ["/kalorifer-tesisat%C4%B1.html", "/hizmetler/mekanik-tesisat"],
      ["/kalorifer-tesisati.html", "/hizmetler/mekanik-tesisat"],
      ["/urunler.html", "/urunler"],
      ["/referanslar%C4%B1m%C4%B1z.html", "/sahadan"],
      ["/referanslarimiz.html", "/sahadan"],
      ["/iletisim.html", "/iletisim"],
      ["/bireysel", "/"],
      ["/bireysel/index.html", "/"],
      ["/bireysel/hakkimizda.html", "/hakkimizda"],
      ["/bireysel/hizmetler.html", "/hizmetler"],
      ["/bireysel/isi-pompasi-ile-isitma.html", "/hizmetler/isi-pompasi-kurulumu"],
      ["/bireysel/isi-pompasi-ile-sogutma.html", "/hizmetler/isi-pompasi-kurulumu"],
      ["/bireysel/isi-pompasi-ile-sicak-su.html", "/hizmetler/isi-pompasi-kurulumu"],
      ["/bireysel/sicak-su-icin-gunes-enerjisi.html", "/hizmetler/mekanik-tesisat"],
      ["/bireysel/mekanik-tesisat.html", "/hizmetler/mekanik-tesisat"],
      ["/bireysel/kalorifer-tesisat%C4%B1.html", "/hizmetler/mekanik-tesisat"],
      ["/bireysel/kalorifer-tesisati.html", "/hizmetler/mekanik-tesisat"],
      ["/bireysel/urunler.html", "/urunler"],
      ["/bireysel/referanslar%C4%B1m%C4%B1z.html", "/sahadan"],
      ["/bireysel/referanslarimiz.html", "/sahadan"],
      ["/bireysel/iletisim.html", "/iletisim"],
      ["/end%C3%BCstriyel", "/endustriyel"],
      ["/end%C3%BCstriyel/index.html", "/endustriyel"],
      ["/end%C3%BCstriyel/hakkimizda.html", "/hakkimizda"],
      ["/end%C3%BCstriyel/hizmetler.html", "/endustriyel"],
      ["/end%C3%BCstriyel/isi-pompasi-ile-isitma.html", "/endustriyel"],
      ["/end%C3%BCstriyel/isi-pompasi-ile-sogutma.html", "/endustriyel"],
      ["/end%C3%BCstriyel/isi-pompasi-ile-sicak-su.html", "/endustriyel"],
      ["/end%C3%BCstriyel/sicak-su-icin-gunes-enerjisi.html", "/endustriyel"],
      ["/end%C3%BCstriyel/mekanik-tesisat.html", "/endustriyel"],
      ["/end%C3%BCstriyel/kalorifer-tesisat%C4%B1.html", "/endustriyel"],
      ["/end%C3%BCstriyel/urunler.html", "/urunler"],
      ["/end%C3%BCstriyel/referanslar%C4%B1m%C4%B1z.html", "/sahadan"],
      ["/end%C3%BCstriyel/iletisim.html", "/iletisim"],
    ] as const;

    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.ozdemirmuhendislik.net" }],
        destination: "https://ozdemirmuhendislik.net/:path*",
        permanent: true,
      },
      ...legacyRedirects.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
