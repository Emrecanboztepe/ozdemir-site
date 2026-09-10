"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { GA_MEASUREMENT_ID, GTM_ID } from "@/config/analytics";
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
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
    window.gtag?.("event", "page_view", {
      page_path: pathname,
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

  return (
    <>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>

      <Script
        id="google-analytics-library"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-config" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });`}
      </Script>

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

