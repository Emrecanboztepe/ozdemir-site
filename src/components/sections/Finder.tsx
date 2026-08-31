"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Check, Phone, RotateCcw } from "lucide-react";
import { PRODUCTS } from "@/config/products";
import { PHONE_HREF } from "@/config/site";
import { SolidButton } from "@/components/ui/Buttons";

/**
 * "Size özel ısı pompasını bulalım" — iki kutuluk bento.
 *
 * Solda teklif, sağda birkaç soruyla kapasite tahmini yapan küçük bir sihirbaz.
 * Hesap açıkça bir ÖN TAHMİNDİR: alan × yalıtım katsayısı ile bulunan yük,
 * katalogdaki en yakın kapasiteye yuvarlanır. Kesin seçim keşifte yapılır —
 * bu uyarı sonuç ekranında da yazılıdır.
 */
type Option = { label: string; value: number; hint?: string };
type Question = { id: string; title: string; help: string; options: Option[] };

const QUESTIONS: Question[] = [
  {
    id: "area",
    title: "Isıtılacak alan kaç m²?",
    help: "Kapalı, ısıtılan net alanı seçin.",
    options: [
      { label: "100 m² altı", value: 85 },
      { label: "100–150 m²", value: 125 },
      { label: "150–220 m²", value: 185 },
      { label: "220 m² üzeri", value: 260 },
    ],
  },
  {
    id: "insulation",
    title: "Yalıtım durumu nedir?",
    help: "Dış cephe ve pencerelere göre kabaca seçin.",
    options: [
      { label: "İyi", value: 45, hint: "Yeni yapı veya mantolamalı" },
      { label: "Orta", value: 60, hint: "Kısmi yalıtım" },
      { label: "Zayıf / bilmiyorum", value: 80, hint: "Yalıtımsız veya eski yapı" },
    ],
  },
  {
    id: "system",
    title: "Evde hangi ısıtma sistemi var?",
    help: "Isı pompasının bağlanacağı sistem.",
    options: [
      { label: "Yerden ısıtma", value: 0, hint: "En verimli eşleşme" },
      { label: "Radyatör", value: 1 },
      { label: "Fancoil", value: 0 },
      { label: "Yok, yeni yapı", value: 0 },
    ],
  },
  {
    id: "water",
    title: "Sıcak kullanım suyu da olsun mu?",
    help: "Banyo ve mutfak suyunu da ısı pompası ısıtsın mı?",
    options: [
      { label: "Evet", value: 1.5 },
      { label: "Hayır", value: 0 },
    ],
  },
];

/** Katalogdaki kapasiteler (kW) */
const CAPACITIES = [6, 8, 10, 12, 16, 30];

function recommend(answers: number[]) {
  const [area, wPerM2, systemExtra, waterExtra] = answers;
  const load = (area * wPerM2) / 1000 + systemExtra + waterExtra;
  const capacity =
    CAPACITIES.find((c) => c >= load) ?? CAPACITIES[CAPACITIES.length - 1];
  const product =
    PRODUCTS.find((p) => p.specs.some((s) => s.value === `${capacity} kW`)) ??
    PRODUCTS[PRODUCTS.length - 1];
  return { load, capacity, product };
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function Finder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const done = answers.length === QUESTIONS.length;
  const result = useMemo(() => (done ? recommend(answers) : null), [done, answers]);

  const pick = (value: number) => {
    const next = [...answers.slice(0, step), value];
    setAnswers(next);
    setStep(step + 1);
  };

  const back = () => {
    if (step === 0) return;
    setStep(step - 1);
    setAnswers(answers.slice(0, step - 1));
  };

  const restart = () => {
    setStep(0);
    setAnswers([]);
  };

  const q = QUESTIONS[Math.min(step, QUESTIONS.length - 1)];

  return (
    <section id="secici" className="bg-surface-0 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-4 md:grid-cols-5">
          {/* Sol kutu — teklif */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease }}
            className="relative overflow-hidden rounded-2xl bg-ink-950 p-8 md:col-span-2 md:p-10"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(44,101,168,0.40) 0%, rgba(27,162,219,0.14) 45%, rgba(0,0,0,0) 72%)",
              }}
            />
            <div className="relative flex h-full flex-col justify-end">
              <div>
                <h2 className="font-heading text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-white">
                  Size özel ısı pompasını
                  <span className="block bg-gradient-to-r from-brand-cool to-brand-teal bg-clip-text text-transparent">
                    birlikte bulalım
                  </span>
                </h2>
                <p className="mt-4 max-w-[38ch] text-[0.9375rem] leading-relaxed text-white/70">
                  Dört soruyla yaklaşık kapasiteyi görün. Net cihaz, marka ve tutar;
                  evin büyüklüğü, yalıtımı ve tesisatı ücretsiz keşifte incelendikten
                  sonra belirlenir.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Sağ kutu — sihirbaz */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.08, ease }}
            className="rounded-2xl border border-surface-100 bg-surface-0 p-6 shadow-card-lg md:col-span-3 md:p-8"
          >
            {/* İlerleme */}
            <div className="flex items-center gap-2">
              {QUESTIONS.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    i < answers.length ? "bg-brand-blue" : "bg-surface-100"
                  }`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {!done ? (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.28, ease }}
                  className="mt-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[0.8125rem] font-medium text-ink-400">
                      Soru {step + 1} / {QUESTIONS.length}
                    </span>
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={back}
                        className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink-400 transition-colors hover:text-brand-blue"
                      >
                        <ArrowLeft size={14} strokeWidth={2.2} />
                        Geri
                      </button>
                    )}
                  </div>

                  <h3 className="mt-3 font-heading text-xl font-semibold text-ink-900 md:text-2xl">
                    {q.title}
                  </h3>
                  <p className="mt-1.5 text-[0.875rem] text-ink-600">{q.help}</p>

                  <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {q.options.map((o) => (
                      <button
                        key={o.label}
                        type="button"
                        onClick={() => pick(o.value)}
                        className="group flex items-center justify-between gap-3 rounded-xl border border-surface-100 bg-surface-0 px-4 py-3.5 text-left transition-all hover:border-brand-blue/50 hover:bg-surface-50"
                      >
                        <span>
                          <span className="block text-[0.9375rem] font-medium text-ink-900">
                            {o.label}
                          </span>
                          {o.hint && (
                            <span className="mt-0.5 block text-[0.75rem] text-ink-400">
                              {o.hint}
                            </span>
                          )}
                        </span>
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-surface-100 text-transparent transition-colors group-hover:border-brand-blue group-hover:bg-brand-blue group-hover:text-white">
                          <Check size={13} strokeWidth={3} />
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease }}
                  className="mt-6"
                >
                  <span className="text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-brand-teal">
                    Öneri
                  </span>
                  <h3 className="mt-2 font-heading text-2xl font-semibold text-ink-900 md:text-3xl">
                    {result!.capacity} kW · {result!.product.name}
                  </h3>
                  <p className="mt-2 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-600">
                    Verdiğiniz bilgilere göre yaklaşık{" "}
                    <strong className="font-semibold text-ink-900">
                      {result!.load.toFixed(1)} kW
                    </strong>{" "}
                    ısı yükü çıkıyor. Katalogdan en yakın kapasite{" "}
                    {result!.product.brand} {result!.product.name}.
                  </p>

                  <dl className="mt-5 space-y-2 border-t border-surface-100 pt-4">
                    {result!.product.specs.map((sp) => (
                      <div
                        key={sp.label}
                        className="flex items-baseline justify-between gap-4"
                      >
                        <dt className="text-[0.8125rem] text-ink-400">{sp.label}</dt>
                        <dd className="text-[0.875rem] font-medium text-ink-900">
                          {sp.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <p className="mt-4 rounded-xl bg-surface-50 px-4 py-3 text-[0.8125rem] leading-relaxed text-ink-600">
                    Bu bir ön tahmindir. Kesin kapasite; ısı kaybı hesabı, tesisat ve
                    kullanım alışkanlıklarına göre ücretsiz keşifte belirlenir.
                  </p>

                  <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center">
                    <SolidButton href={PHONE_HREF} className="h-11 px-6 text-[0.9375rem]">
                      <Phone size={16} strokeWidth={2.2} />
                      Ücretsiz keşif iste
                    </SolidButton>
                    <button
                      type="button"
                      onClick={restart}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-surface-100 px-5 text-[0.9375rem] font-medium text-ink-600 transition-colors hover:border-brand-blue/40 hover:text-brand-blue"
                    >
                      <RotateCcw size={15} strokeWidth={2.2} />
                      Baştan başla
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
