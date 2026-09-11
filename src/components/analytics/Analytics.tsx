"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { GTM_ID } from "@/config/analytics";
import { trackLead, trackLocationClick } from "@/lib/analytics";

const isWhatsAppUrl = (href: string) =>
  href.includes("wa.me/") ||
  href.includes("api.whatsapp.com/") ||
  href.includes("web.whatsapp.com/");

const isMapUrl = (href: string) =>
  href.includes("maps.app.goo.gl/") ||
  href.includes("google.com/maps") ||
  href.includes("openstreetmap.org/");

export default function Analytics() {
  const pathname = usePathname();
  const initialPage = useRef(true);

  useEffect(() => {
    if (initialPage.current) {
      initialPage.current = false;
      return;
    }

    window.dataLayer?.push({
      event: "virtual_page_view",
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  useEffect(() => {
    const captureClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = anchor.href;
      if (href.startsWith("tel:")) trackLead("phone");
      else if (isWhatsAppUrl(href)) trackLead("whatsapp");
      else if (isMapUrl(href)) trackLocationClick();
    };

    document.addEventListener("click", captureClick, true);
    return () => document.removeEventListener("click", captureClick, true);
  }, []);

  /**
   * GTM konteynerindeki WhatsApp tetikleyicisi `.whatsapp-se-btn` CSS sınıfını
   * arıyor (seçici: ".whatsapp-se-btn, .whatsapp-se-btn *"). Bu sınıf eski
   * siteden kalma; yeni sitede hiçbir yerde yoktu, dolayısıyla o tetikleyiciye
   * bağlı ÜÇ etiket (GA4 "WhatsApp Tıklama", Google Ads dönüşümü, Meta olayı)
   * yayına alındığı an sessiz kalacaktı.
   *
   * Sınıfı 7 bileşene elle yazmak yerine burada tek noktadan işaretliyoruz:
   * WhatsApp adresine giden her `<a>` otomatik alıyor. MutationObserver şart —
   * bağlantıların bir kısmı (mobil menü, sonradan açılan bölümler) DOM'a ilk
   * boyamadan sonra giriyor ve tek seferlik bir tarama onları kaçırırdı.
   */
  useEffect(() => {
    const MARK = "whatsapp-se-btn";

    const mark = (root: ParentNode) => {
      root.querySelectorAll?.("a[href]").forEach((el) => {
        if (
          el instanceof HTMLAnchorElement &&
          isWhatsAppUrl(el.href) &&
          !el.classList.contains(MARK)
        ) {
          el.classList.add(MARK);
        }
      });
    };

    mark(document);

    const observer = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node instanceof HTMLElement) mark(node);
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Consent Mode v2 varsayılanları GTM'DEN ÖNCE kurulmalı; aksi halde
          etiketler onay sinyali yokken çalışır ve çerez yazar. Bu yüzden
          varsayılanlar ayrı bir Script'e değil, GTM yükleyicisinin HEMEN
          ÜSTÜNE, aynı blok içine konuldu — sıralama böyle garanti.

          Reklam/ölçüm sinyalleri "denied" başlar; ziyaretçi onay verince
          `lib/consent.ts` bunları "granted"a çeker. Güvenlik ve işlevsellik
          depoları zorunlu olduğu için açık. */}
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted'
});
try {
  var stored = window.localStorage.getItem('ozdemir-cookie-consent');
  if (stored === 'granted') {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted'
    });
  }
} catch (e) {}
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>

      {/* GA4 BİLİNÇLİ OLARAK BURADAN YÜKLENMİYOR.
          GTM-WW8D557P konteynerinin içinde G-S6Y6JY5RXC için bir Google
          etiketi zaten var ve gtm.init'te ateşleniyor. Burada ikinci kez
          gtag.js yükleyip config etmek her sayfa görüntülemesini iki kez
          saydırıyordu. Ölçüm kimliği artık tek yerden yönetiliyor: GTM.

          Kaldırılan kodda ayrıca `anonymize_ip: true` vardı; o parametre
          Universal Analytics'e aitti, GA4 onu zaten yok sayıyor. */}

      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          title="Google Tag Manager"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}

