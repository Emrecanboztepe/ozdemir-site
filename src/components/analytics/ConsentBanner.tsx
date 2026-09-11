"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Cookie } from "lucide-react";
import { ROUTES } from "@/config/routes";
import {
  getServerConsent,
  readConsent,
  subscribeConsent,
  writeConsent,
  type ConsentChoice,
} from "@/lib/consent";

/**
 * Çerez onayı şeridi.
 *
 * Ölçüm araçları Consent Mode v2 ile varsayılan olarak KAPALI başlar; bu şerit
 * yalnız tercihi alır ve sinyali günceller. Tercih yapılana kadar Google
 * araçları çerez yazmaz.
 *
 * Tercih `localStorage`'ta olduğu için sunucu onu bilemez; doğrudan okumak
 * hidrasyon uyuşmazlığı üretirdi. Bu yüzden `useSyncExternalStore` ile
 * okunuyor — sunucu anlık görüntüsü `null`, istemci gerçek değeri döner.
 *
 * Konum, mobildeki `StickyContactBar`'ın üstünde kalacak şekilde ayarlandı.
 */
export default function ConsentBanner() {
  const choice = useSyncExternalStore(
    subscribeConsent,
    readConsent,
    getServerConsent,
  );

  const decide = (next: ConsentChoice) => writeConsent(next);

  // Sunucuda ve hidrasyondan önce `null` döner; tercih yapılmışsa da gizlenir.
  if (choice !== null) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cerez-onayi-baslik"
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-[calc(env(safe-area-inset-bottom)+5.5rem)] sm:pb-4"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-surface-100 bg-white p-5 shadow-[0_18px_50px_rgba(20,20,26,0.22)] sm:flex-row sm:items-center sm:gap-6 md:p-6">
        <Cookie className="size-6 shrink-0 text-brand-blue" aria-hidden />

        <div className="min-w-0 flex-1">
          <h2
            id="cerez-onayi-baslik"
            className="font-heading text-base font-semibold text-ink-950"
          >
            Çerez tercihiniz
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
            Sitenin çalışması için gereken çerezler her durumda kullanılır. Ziyaret
            istatistiği ve reklam ölçümü için kullanılan çerezler ise yalnız siz
            kabul ederseniz çalışır.{" "}
            <Link
              href={ROUTES.gizlilik.href}
              className="rounded-sm font-medium text-brand-blue underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              Gizlilik Politikası
            </Link>
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => decide("denied")}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-ink-900/15 px-5 text-sm font-semibold text-ink-900 transition-colors hover:bg-surface-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 focus-visible:ring-offset-2"
          >
            Reddet
          </button>
          <button
            type="button"
            onClick={() => decide("granted")}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-blue px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/45 focus-visible:ring-offset-2"
          >
            Kabul et
          </button>
        </div>
      </div>
    </div>
  );
}
