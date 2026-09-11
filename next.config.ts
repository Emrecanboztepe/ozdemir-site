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

      /* Eski sitedeki GERÇEK endüstriyel dizini ASCII: /endustriyel/.
         Yukarıdaki ü'lü (%C3%BC) kurallar eski sitenin kendi sitemap'inden
         türetilmiş ama o adresler sunucuda hiç var olmamış (hepsi 404).
         Aşağıdakilerin tamamı canlıda 200 döndüğü doğrulandı.

         DİKKAT: /endustriyel (uzantısız) buraya EKLENMEZ — yeni sitenin
         kendi rotası o adres. Yalnız .html uzantılı olanlar yönlendirilir. */
      ["/endustriyel/index.html", "/endustriyel"],
      ["/endustriyel/hakkimizda.html", "/hakkimizda"],
      ["/endustriyel/hizmetler.html", "/endustriyel"],
      ["/endustriyel/isi-pompasi-ile-isitma.html", "/endustriyel"],
      ["/endustriyel/isi-pompasi-ile-sogutma.html", "/endustriyel"],
      ["/endustriyel/isi-pompasi-ile-sicak-su.html", "/endustriyel"],
      ["/endustriyel/sicak-su-icin-gunes-enerjisi.html", "/hizmetler/mekanik-tesisat"],
      ["/endustriyel/mekanik-tesisat.html", "/hizmetler/mekanik-tesisat"],
      /* Bu ikisi ASCII değil: eski dosya adı Türkçe ı taşıyor (doğrulandı). */
      ["/endustriyel/kalorifer-tesisat%C4%B1.html", "/hizmetler/mekanik-tesisat"],
      ["/endustriyel/urunler.html", "/urunler"],
      ["/endustriyel/referanslarimiz.html", "/sahadan"],
      ["/endustriyel/iletisim.html", "/iletisim"],
    ] as const;

    return [
      /* HTTP -> HTTPS. Vercel/Cloudflare gibi platformlar bunu zaten kenarda
         yapar; o durumda bu kural hiç tetiklenmez. Kendi sunucunuza (Node,
         Nginx, IIS) kurulursa tek şema güvencesi bu olur.
         `x-forwarded-proto` proxy'nin isteği hangi şemayla aldığını söyler. */
      {
        source: "/:path*",
        has: [{ type: "header", key: "x-forwarded-proto", value: "http" }],
        destination: "https://ozdemirmuhendislik.net/:path*",
        permanent: true,
      },
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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          /* HSTS: bir yıl. `includeSubDomains` ve `preload` BİLİNÇLİ OLARAK
             yok — alt alan adlarının hepsinde geçerli TLS olduğu doğrulanmadan
             eklenirse onlara erişim kesilir, preload ise geri alması çok zor
             bir taahhüttür. İkisi de yayın sonrası ayrıca değerlendirilmeli. */
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
