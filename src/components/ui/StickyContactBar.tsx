"use client";

import { motion } from "motion/react";
import { Phone } from "lucide-react";
import { PHONE_HREF, WHATSAPP_HREF } from "@/config/site";
import { usePrefersReducedMotion } from "@/hooks/useEnvironment";
import { SolidButton } from "./Buttons";
import { WhatsAppMark } from "./WhatsAppIcon";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Mobil yapışkan iletişim barı — sayfanın altında iki dönüşüm kanalı hep
 * görünür kalır: telefon birincil CTA (shiny-cta), WhatsApp ikincil kanal.
 *
 * Yalnızca md altı kırılımda çizilir. Akıştaki spacer, sabit barın footer'ın
 * alt satırını örtmemesi için sayfa sonunda yer ayırır.
 */
export default function StickyContactBar() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="md:hidden">
      <div aria-hidden className="h-20" />

      <motion.div
        initial={reduced ? false : { y: 88, opacity: 0 }}
        animate={reduced ? undefined : { y: 0, opacity: 1 }}
        transition={reduced ? undefined : { duration: 0.5, delay: 0.35, ease }}
        className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      >
        <div className="grid grid-cols-2 gap-2 rounded-2xl border border-surface-100 bg-surface-0/95 p-2 shadow-card-lg backdrop-blur-md">
          <SolidButton href={PHONE_HREF} className="h-12 text-sm">
            <Phone size={16} strokeWidth={2.2} />
            Ücretsiz Keşif
          </SolidButton>

          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-social-whatsapp text-sm font-medium text-white shadow-[0_10px_30px_rgba(37,211,102,0.30)] transition-all duration-200 hover:bg-[#1EBE5D] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-social-whatsapp/45 focus-visible:ring-offset-2"
          >
            <WhatsAppMark className="size-[1.0625rem]" />
            WhatsApp
          </a>
        </div>
      </motion.div>
    </div>
  );
}
