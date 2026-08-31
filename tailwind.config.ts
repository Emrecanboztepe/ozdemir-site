import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Marka paleti — primary #2c65a8 / primary-2 #ff7029 üzerine kurulu.
        // Anahtar adları (blue/teal/heat/cool) korundu; değerler yeni palete göre
        // uyumlandı. Sayfa zemini her zaman beyaz kalır.
        brand: {
          blue: "#2C65A8", // primary — butonlar, linkler, aktif durumlar
          teal: "#1BA2DB", // ikincil vurgu (paletteki info) — gradyanın açık ucu
          // primary-2 — ISI vurgusu. `deep`/`soft` yalnızca SICAK gradyan için
          // türevidir; içlerinde mavi yoktur, ısı hep sıcak kalır.
          heat: {
            DEFAULT: "#FF7029",
            deep: "#E0530F",
            soft: "#FFA65C",
          },
          cool: "#8FD0EE", // soğutma / serinlik — info'nun açık tonu
        },
        ink: {
          950: "#14141A", // bölüm başlıkları — secondary'nin bir tık koyusu
          900: "#1F1F25", // başlıklar (heading-1)
          600: "#6E777D", // gövde metni (body)
          400: "#8A9197", // ikincil metin, etiketler — body'nin açık tonu
        },
        surface: {
          0: "#FFFFFF",
          50: "#F6F8FB", // primary'ye doğru çok hafif kırılmış nötr
          100: "#E7ECF3", // hover, çerçeve, vurgulu kutular
        },
        state: {
          success: "#3EB75E",
          danger: "#FF0003",
          warning: "#FF8F3C",
          info: "#1BA2DB",
        },
        social: {
          facebook: "#3B5997",
          twitter: "#1BA1F2",
          youtube: "#ED4141",
          linkedin: "#0077B5",
          pinterest: "#E60022",
          instagram: "#C231A1",
          vimeo: "#00ADEF",
          twitch: "#6441A3",
          discord: "#7289DA",
          whatsapp: "#25D366",
        },
      },
      fontFamily: {
        heading: ["var(--font-manrope)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        h1: [
          "clamp(3rem, 7.2vw, 6.5rem)",
          { lineHeight: "0.95", letterSpacing: "-0.03em", fontWeight: "800" },
        ],
        h2: ["clamp(1.75rem, 4vw, 2.75rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        eyebrow: ["0.8125rem", { lineHeight: "1.2", letterSpacing: "0.14em" }],
      },
      boxShadow: {
        card: "0 8px 30px rgba(31,31,37,0.07)",
        "card-lg": "0 16px 48px rgba(31,31,37,0.14)",
        cta: "0 10px 30px rgba(44,101,168,0.30)",
      },
      borderRadius: {
        "2xl": "1rem",
      },
      keyframes: {
        "fan-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "signature-sweep": {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "0% 0" },
        },
        marquee: {
          from: { transform: "translate3d(0, 0, 0)" },
          to: { transform: "translate3d(-50%, 0, 0)" },
        },
        // Dikey şerit — hakkımızda bento'sundaki görsel sütunu
        "marquee-y": {
          from: { transform: "translate3d(0, 0, 0)" },
          to: { transform: "translate3d(0, -50%, 0)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.08" },
          "50%": { opacity: "0.2" },
        },
      },
      animation: {
        "fan-spin": "fan-spin 2.5s linear infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        marquee: "marquee 42s linear infinite",
        "marquee-y": "marquee-y 34s linear infinite",
        "signature-sweep": "signature-sweep 9s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
