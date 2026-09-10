"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    text: "Özdemir Mühendislik sekiz yıldır ısı pompası satışı ve montajına odaklanıyor; biriken saha deneyimini her yeni ev için yeniden değerlendiriyor.",
    image: "/hakkimizda-surec.jpg",
    name: "8 yıllık deneyim",
    role: "Evsel ısı pompası uzmanlığı",
  },
  {
    text: "Firma sahibi Burak Özdemir kuruluşundan beri işin başında; keşif, ürün seçimi, uygulama ve satış sonrası süreçle bizzat ilgileniyor.",
    image: "/hakkimizda-kurulum.jpg",
    name: "Doğrudan muhatap",
    role: "Burak Özdemir",
  },
  {
    text: "Bosch tarafından 2024 yılının en çok satış yapan yetkili bayisi ödülüne layık görüldük.",
    image: "/hakkimizda-odul.jpg",
    name: "Bosch 2024",
    role: "En çok satış yapan yetkili bayi",
  },
  {
    text: "NIBE çözümlerindeki satış ve saha başarımız, Güney Marmara bölge birinciliğiyle belgelendi.",
    image: "/urun-3.jpg",
    name: "NIBE Güney Marmara",
    role: "Bölge birincisi",
  },
  {
    text: "Gram Power'da Türkiye satış birincisi olduk.",
    image: "/urun-5.jpg",
    name: "Gram Power",
    role: "Türkiye satış birincisi",
  },
  {
    text: "Balıkesir, Bursa ve Çanakkale'de ücretsiz yerinde keşif yapar; montaj taleplerini Türkiye genelinde proje kapsamına göre değerlendiririz.",
    image: "/hakkimizda-kesif.jpg",
    name: "Ücretsiz yerinde keşif",
    role: "Yerel keşif · Türkiye geneli montaj",
  },
  {
    text: "Keşiften sonra netleşen evinize özel teklif için vade farksız altı taksit imkânı sunarız.",
    image: "/adim-2.jpg",
    name: "6 taksit",
    role: "Vade farksız ödeme kolaylığı",
  },
  {
    text: "Montajdan sonra iki yıl Özdemir Mühendislik güvencesi verir; servis talebinde ücretsiz gelir ve süreci başlatırız.",
    image: "/adim-5.jpg",
    name: "2 yıl güvence",
    role: "Montaj sonrası destek",
  },
  {
    text: "Bandırma'daki ana merkezimiz ve Biga şubemizle müşteriye yakın, ulaşılabilir ve çözüm odaklı çalışırız.",
    image: "/saha-4.jpg",
    name: "Bandırma merkez · Biga şube",
    role: "Yerel ve ulaşılabilir ekip",
  },
];

export const TestimonialsColumn = ({
  className = "",
  testimonials: items,
  duration = 18,
}: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  const reduceMotion = useReducedMotion();
  const copies = reduceMotion ? [0] : [0, 1];

  return (
    <div className={`w-full max-w-xs ${className}`}>
      <motion.div
        animate={reduceMotion ? undefined : { translateY: "-50%" }}
        transition={
          reduceMotion
            ? undefined
            : {
                duration,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }
        }
        className="flex flex-col gap-6 bg-surface-0 pb-6"
      >
        {copies.map((copy) => (
          <React.Fragment key={copy}>
            {items.map(({ text, image, name, role }, index) => (
              <article
                key={`${name}-${copy}-${index}`}
                aria-hidden={copy === 1}
                className="w-full rounded-3xl border border-surface-100 bg-surface-0 p-7 shadow-[0_16px_45px_rgba(44,101,168,0.10)] md:p-8"
              >
                <p className="text-[0.9375rem] leading-relaxed text-ink-600">{text}</p>
                <div className="mt-6 flex items-center gap-3">
                  <Image
                    width={44}
                    height={44}
                    src={image}
                    alt=""
                    sizes="44px"
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <div className="flex min-w-0 flex-col">
                    <h3 className="truncate text-sm font-semibold leading-5 text-ink-900">
                      {name}
                    </h3>
                    <p className="truncate text-[0.8125rem] leading-5 text-ink-400">
                      {role}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export default function Testimonials() {
  const first = testimonials.slice(0, 3);
  const second = testimonials.slice(3, 6);
  const third = testimonials.slice(6, 9);

  return (
    <section className="overflow-hidden bg-surface-0 py-20 md:py-28" aria-labelledby="experience-heading">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
            Belgeli deneyim
          </p>
          <h2
            id="experience-heading"
            className="mt-4 font-heading text-h2 font-semibold tracking-tight text-ink-950"
          >
            Ödüller, deneyim ve satış sonrası güvence
          </h2>
          <p className="mx-auto mt-4 max-w-[56ch] text-[1.0625rem] leading-relaxed text-ink-600">
            Müşteriyi önceleyen yaklaşımımızı yalnızca sözle değil; sekiz yıllık saha
            deneyimi, satış başarıları ve montaj sonrası desteğimizle gösteriyoruz.
          </p>
        </div>

        <div className="relative mx-auto mt-12 flex h-[620px] max-w-5xl justify-center gap-5 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)] md:mt-16 md:gap-6">
          <TestimonialsColumn
            className="md:hidden"
            testimonials={testimonials}
            duration={34}
          />
          <TestimonialsColumn
            className="hidden md:block"
            testimonials={first}
            duration={18}
          />
          <TestimonialsColumn
            className="hidden md:block"
            testimonials={second}
            duration={22}
          />
          <TestimonialsColumn
            className="hidden lg:block"
            testimonials={third}
            duration={20}
          />
        </div>
      </div>
    </section>
  );
}
