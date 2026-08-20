import { Star } from "lucide-react";
import { GlassButton } from "@/components/ui/Buttons";

/** Google işletme profilindeki yorumlar */
const REVIEWS_URL = "https://share.google/XGZSqidhWAXZvq8pP";
const RATING = "5,0";

function GoogleG({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden focusable="false">
      <path
        fill="#4285F4"
        d="M45.1 24.5c0-1.6-.1-3.2-.4-4.7H24v8.9h11.8c-.5 2.7-2 5-4.4 6.6v5.5h7.1c4.2-3.8 6.6-9.5 6.6-16.3z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.9 0 10.9-2 14.5-5.2l-7.1-5.5c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.5-3.8-12.2-9H4.5v5.7C8.1 41.3 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.8 28.4c-.4-1.3-.7-2.7-.7-4.4s.3-3 .7-4.4v-5.7H4.5C2.9 17 2 20.4 2 24s.9 7 2.5 10.1l7.3-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.6c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.1 29.9 2 24 2 15.4 2 8.1 6.7 4.5 13.9l7.3 5.7c1.7-5.2 6.5-9 12.2-9z"
      />
    </svg>
  );
}

/**
 * Google puanı rozeti — cam hap, tıklanınca işletmenin Google yorumlarına gider.
 * Buton diliyle aynı "liquid glass" yüzeyi kullanır.
 */
export default function GoogleRating({
  className = "",
  tone = "dark",
}: {
  className?: string;
  /** Koyu sahnede "dark", beyaz bölümlerde "light" */
  tone?: "dark" | "light";
}) {
  return (
    <GlassButton
      href={REVIEWS_URL}
      external
      tone={tone}
      className={`h-10 px-3.5 text-[0.8125rem] ${className}`}
    >
      <GoogleG />
      <span className="font-semibold tabular-nums">{RATING}</span>
      <span className="flex items-center gap-0.5" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={13} className="fill-[#FBBC05] text-[#FBBC05]" strokeWidth={0} />
        ))}
      </span>
      <span className={tone === "dark" ? "text-white/60" : "text-ink-400"}>
        Google yorumları
      </span>
    </GlassButton>
  );
}
