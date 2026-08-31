"use client";

import { useState } from "react";
import { Map as MapIcon, MapPin } from "lucide-react";

/**
 * Şube kartının içindeki harita.
 *
 * İki bilinçli karar var:
 *
 * 1. Sağlayıcı OpenStreetMap. API anahtarı istemiyor, çerez koymuyor; bu yüzden
 *    KVKK metnine üçüncü taraf maddesi ya da çerez onayı eklemek gerekmiyor.
 *    Detay isteyen ziyaretçi kartın altındaki "Haritada açın" ile Google'a gider.
 *
 * 2. Harita SAYFA AÇILIRKEN YÜKLENMEZ. Önce dışarıya hiç istek atmayan, tamamen
 *    CSS ile çizilmiş bir önizleme durur; ziyaretçi basınca gerçek gömme gelir.
 *    İki iframe'i her ziyarette yüklemek iletişim sayfasını gereksiz ağırlaştırırdı.
 */

/** Noktanın etrafındaki kutu: ~1 km × 0,55 km — 16:9 kart alanına oturur. */
const LAT_DELTA = 0.0025;
const LNG_DELTA = 0.0058;

const embedUrl = (lat: number, lng: number) => {
  const bbox = [lng - LNG_DELTA, lat - LAT_DELTA, lng + LNG_DELTA, lat + LAT_DELTA]
    .map((n) => n.toFixed(6))
    .join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
};

export default function LocationMap({
  name,
  lat,
  lng,
}: {
  name: string;
  lat: number;
  lng: number;
}) {
  const [shown, setShown] = useState(false);

  return (
    <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-xl border border-surface-100 bg-surface-50">
      {shown ? (
        <iframe
          title={`${name} konumu — OpenStreetMap`}
          src={embedUrl(lat, lng)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setShown(true)}
          aria-label={`${name} haritasını göster`}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/45 focus-visible:ring-offset-2"
        >
          {/* Dışarıya istek atmayan, salt CSS ile çizilmiş harita dokusu */}
          <span
            aria-hidden
            className="absolute inset-0 opacity-70 transition-opacity group-hover:opacity-90"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(44,101,168,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(44,101,168,0.10) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/10 blur-xl"
          />

          <span className="relative flex size-11 items-center justify-center rounded-full bg-white text-brand-blue shadow-card transition-transform duration-200 group-hover:scale-105">
            <MapPin className="size-5" aria-hidden />
          </span>
          <span className="relative inline-flex items-center gap-2 text-sm font-semibold text-ink-700 transition-colors group-hover:text-brand-blue">
            <MapIcon className="size-4" aria-hidden />
            Haritayı göster
          </span>
        </button>
      )}
    </div>
  );
}
