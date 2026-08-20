"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus, X } from "lucide-react";
import { FAQ_HOME, type FaqContent } from "@/config/faq";

/**
 * Sıkça sorulan sorular — numaralı akordeon.
 *
 * Kapalıyken: soluk numara, ince ayraç, artı işareti.
 * Açıkken: numara dolu daireye döner, işaret çarpıya dönüşür, cevap yüksekliği
 * animasyonla açılır. Aynı anda tek soru açık kalır.
 */
const ease = [0.22, 1, 0.36, 1] as const;

export default function Faq({ content = FAQ_HOME }: { content?: FaqContent }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id={content.id} className="bg-surface-0 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
          className="grid gap-6 md:grid-cols-2 md:items-end md:gap-16"
        >
          <h2 className="text-h2 font-semibold text-ink-950">
            <span className="bg-gradient-to-r from-brand-blue to-brand-teal bg-clip-text text-transparent">
              {content.title}
            </span>
          </h2>
          <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-600 md:justify-self-end">
            {content.lead}
          </p>
        </motion.div>

        <div className="mt-12 md:mt-16">
          {content.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-surface-100">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center gap-5 py-6 text-left md:gap-8"
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[0.75rem] font-semibold tabular-nums transition-colors duration-300 ${
                        isOpen
                          ? "bg-brand-blue text-white"
                          : "bg-surface-50 text-ink-400 group-hover:bg-surface-100"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={`flex-1 font-heading text-lg font-semibold tracking-tight transition-colors duration-300 md:text-xl ${
                        isOpen ? "text-ink-950" : "text-ink-600 group-hover:text-ink-900"
                      }`}
                    >
                      {item.q}
                    </span>

                    <span
                      className={`shrink-0 transition-colors duration-300 ${
                        isOpen ? "text-ink-900" : "text-ink-400 group-hover:text-brand-blue"
                      }`}
                    >
                      {isOpen ? (
                        <X size={20} strokeWidth={2} />
                      ) : (
                        <Plus size={20} strokeWidth={2} />
                      )}
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[70ch] pb-7 pl-14 pr-8 text-[0.9375rem] leading-[1.7] text-ink-600 md:pl-[4.25rem]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
