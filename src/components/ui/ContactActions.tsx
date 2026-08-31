import { MessageCircle, Phone } from "lucide-react";
import { PHONE_HREF, WHATSAPP_HREF } from "@/config/site";
import { SolidButton } from "./Buttons";

export default function ContactActions({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const secondary =
    tone === "dark"
      ? "border-white/25 bg-white/[0.07] text-white hover:border-white/45 hover:bg-white/[0.12] focus-visible:ring-white/60"
      : "border-ink-900/15 bg-surface-0 text-ink-900 hover:border-brand-blue/45 hover:text-brand-blue focus-visible:ring-brand-blue/40";

  return (
    <div
      aria-label="Ücretsiz keşif iletişim seçenekleri"
      className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${className}`}
    >
      <SolidButton
        href={PHONE_HREF}
        className="h-12 px-6 text-[0.9375rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/45 focus-visible:ring-offset-2"
      >
        <Phone size={17} strokeWidth={2.2} />
        Ücretsiz keşif
      </SolidButton>
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex h-12 items-center justify-center gap-2 rounded-full border px-6 text-[0.9375rem] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${secondary}`}
      >
        <MessageCircle size={17} strokeWidth={2.2} />
        WhatsApp&apos;tan yazın
      </a>
    </div>
  );
}
