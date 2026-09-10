import Image from "next/image";
import { Phone } from "lucide-react";
import StatCounter from "./StatCounter";
import GoogleRating from "@/components/hero/GoogleRating";
import { SolidButton } from "@/components/ui/Buttons";
import {
  EXPERIENCE_YEARS,
  INSTALLATION_AREA,
  LOCATIONS,
  PHONE,
  PHONE_HREF,
  SERVICE_AREAS,
} from "@/config/site";

/**
 * Rakamlar + işler — üç sütunlu bento.
 *
 * Sol: rakam kartları (üstte etiket, altında büyük sayı — sayı görünür olunca
 * sayarak gelir). Orta: tam boy saha fotoğrafı, altında cam yazı.
 * Sağ: DİKEY kayan görsel sütunu.
 *
 * Etiketler `<dt>`, sayılar `<dd>`. Etiketi ayrıca `sr-only` bir `dt` içine
 * koyup bir de görünür yazmak metni İKİ KEZ bastırıyordu — bu düzende etiket
 * zaten görünür, tekrarlamaya gerek yok.
 *
 * Dikey şerit: liste iki kez basılır, kap `-50%` kaydırılır (`marquee-y`);
 * yarı tam bir kopya olduğu için dikiş görünmez. Üst ve alt kenarda maske ile
 * belirip söner. `motion-safe:` — hareket hassasiyetinde durur.
 */
/**
 * `note` yalnız üçüncü karta düşüyor: sayı tek başına "yalnız üç ile
 * gidiyoruz" gibi okunuyordu. Üç il ücretsiz keşfin günübirlik verildiği
 * alan; montaj ve servis Türkiye geneli.
 */
const STATS: {
  to: number;
  suffix: string;
  label: string;
  note?: string;
}[] = [
  { to: EXPERIENCE_YEARS, suffix: " yıl", label: "Deneyim" },
  { to: LOCATIONS.length, suffix: "", label: "Şube" },
  {
    to: SERVICE_AREAS.length,
    suffix: "",
    label: "Ücretsiz keşif ili",
    note: `Montaj ve servis ${INSTALLATION_AREA}`,
  },
];

/** Sağdaki dikey şeritte akan kareler */
const SHOTS = [
  { src: "/saha-2.jpg", alt: "Şantiyede çalışan ekip" },
  { src: "/adim-3.jpg", alt: "Tesisat ve yalıtım işi" },
  { src: "/hakkimizda-tesisat.jpg", alt: "Boru kaynağı" },
  { src: "/adim-4.jpg", alt: "Cihaz ayarı" },
  { src: "/saha-1.jpg", alt: "Atölyede hazırlık" },
  { src: "/adim-5.jpg", alt: "Ölçüm ve devreye alma" },
];

const COLUMN_MASK =
  "linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%)";

export default function ResultsBento() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-4 lg:grid-cols-[0.85fr_1.25fr_0.85fr]">
          {/* ── Sol: rakamlar + keşif kartı ── */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl bg-surface-50 p-4 md:p-5">
              <h3 className="px-2 pb-3 font-heading text-[1.0625rem] font-semibold text-ink-950">
                Rakamlarla biz
              </h3>

              <dl className="space-y-3">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-surface-100 bg-surface-0 p-5 shadow-card"
                  >
                    <dt className="text-[0.8125rem] text-ink-400">{s.label}</dt>
                    <dd className="mt-1.5">
                      <StatCounter
                        to={s.to}
                        suffix={s.suffix}
                        className="font-heading text-[clamp(1.75rem,2.6vw,2.25rem)] font-extrabold leading-none tracking-[-0.03em] text-ink-950"
                      />
                      {s.note && (
                        <span className="mt-2 block text-[0.8125rem] leading-snug text-ink-600">
                          {s.note}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="flex flex-1 flex-col justify-between gap-5 rounded-2xl bg-surface-50 p-6">
              <div>
                <h3 className="font-heading text-[1.0625rem] font-semibold text-ink-950">
                  Keşif ve teklif ücretsiz
                </h3>
                <p className="mt-2 max-w-[34ch] text-[0.9375rem] leading-relaxed text-ink-600">
                  Yerinde ölçüp uygun sistemi anlatıyoruz. Karar tamamen sizde.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <SolidButton href={PHONE_HREF} className="h-11 px-5 text-[0.875rem]">
                  <Phone size={15} strokeWidth={2.2} />
                  {PHONE}
                </SolidButton>
                <GoogleRating tone="light" />
              </div>
            </div>
          </div>

          {/* ── Orta: tam boy saha fotoğrafı ── */}
          <article className="relative min-h-[420px] overflow-hidden rounded-2xl border border-surface-100 lg:min-h-[620px]">
            <Image
              src="/adim-5.jpg"
              alt="Özdemir Mühendislik servis aracı, işi tamamlanan modern bir villanın önünde"
              fill
              sizes="(max-width: 1023px) 100vw, 42vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink-950/90 via-ink-950/40 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <h3 className="max-w-[18ch] font-heading text-[clamp(1.375rem,2.4vw,1.875rem)] font-semibold leading-tight tracking-tight text-white">
                Doğru kurulan sistem, kendini duyurmaz
              </h3>
              <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-white/75">
                Kapasite hesabı, hidrolik denge ve devreye alma tamamsa iş bittikten
                sonra konuşulacak bir şey kalmaz. Bizim ölçümüz bu.
              </p>
            </div>
          </article>

          {/* ── Sağ: dikey kayan işler sütunu ── */}
          <div className="flex flex-col rounded-2xl bg-surface-50 p-4 md:p-5">
            <h3 className="px-2 pb-4 font-heading text-[1.0625rem] font-semibold leading-snug text-ink-950">
              Bitmiş işler, aynı ekip
            </h3>

            <div
              className="relative h-[420px] overflow-hidden lg:h-[540px]"
              style={{ maskImage: COLUMN_MASK, WebkitMaskImage: COLUMN_MASK }}
            >
              <div className="flex flex-col gap-3 motion-safe:animate-marquee-y">
                {[0, 1].map((copy) => (
                  <div key={copy} className="flex flex-col gap-3" aria-hidden={copy === 1}>
                    {SHOTS.map((shot, i) => (
                      <div
                        key={`${copy}-${i}`}
                        className="relative aspect-[4/3] shrink-0 overflow-hidden rounded-xl bg-surface-100"
                      >
                        <Image
                          src={shot.src}
                          alt={copy === 0 ? shot.alt : ""}
                          fill
                          sizes="(max-width: 1023px) 92vw, 280px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
