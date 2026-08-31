"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { OutlineButton, SolidButton } from "@/components/ui/Buttons";
import { PRIMARY_NAV_LINKS, ROUTES } from "@/config/routes";
import { PHONE_HREF } from "@/config/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Navbar({
  links = PRIMARY_NAV_LINKS,
}: {
  links?: readonly { label: string; href: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="absolute inset-x-0 top-0 z-40 flex w-full justify-center px-4 py-5 md:py-6">
      <div className="relative z-10 flex w-full max-w-5xl items-center justify-between rounded-full border border-white/80 bg-white px-4 py-3 shadow-[0_16px_45px_rgba(20,20,26,0.18)] sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ rotate: 1.5, scale: 1.02 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <Link
            href="/"
            className="flex items-center"
            aria-label="Özdemir Mühendislik ana sayfa"
            onClick={closeMenu}
          >
            <Image
              src="/logo-02.png"
              alt="Özdemir Mühendislik"
              width={314}
              height={74}
              priority
              sizes="150px"
              className="h-[2.15rem] w-auto lg:h-12"
            />
          </Link>
        </motion.div>

        <nav aria-label="Ana menü" className="hidden lg:block">
          <ul className="flex items-center gap-5 xl:gap-7">
            {links.map((item, index) => (
              <motion.li
                key={`${item.label}-${item.href}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.035, ease: EASE }}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  href={item.href}
                  className="whitespace-nowrap text-sm font-medium text-ink-900 transition-colors hover:text-ink-600"
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        <motion.div
          className="hidden items-center gap-2 lg:flex"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2, ease: EASE }}
        >
          <OutlineButton href={ROUTES.urunler.href} className="h-11 px-4 text-sm">
            Isı Pompanızı Bulun
            <ArrowRight
              size={15}
              strokeWidth={2.1}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </OutlineButton>
          <SolidButton
            href={PHONE_HREF}
            className="h-11 px-5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/45 focus-visible:ring-offset-2"
          >
            Ücretsiz Keşif
          </SolidButton>
        </motion.div>

        <motion.button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-surface-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 lg:hidden"
          onClick={() => setIsOpen(true)}
          whileTap={{ scale: 0.9 }}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label="Menüyü aç"
        >
          <Menu className="h-6 w-6" />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            className="fixed inset-0 z-50 bg-white px-6 pt-28 lg:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <Link
              href="/"
              onClick={closeMenu}
              className="absolute left-6 top-7"
              aria-label="Özdemir Mühendislik ana sayfa"
            >
              <Image
                src="/logo-02.png"
                alt="Özdemir Mühendislik"
                width={314}
                height={74}
                sizes="150px"
                className="h-[2.15rem] w-auto"
              />
            </Link>

            <motion.button
              type="button"
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-surface-50 text-ink-900"
              onClick={closeMenu}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              aria-label="Menüyü kapat"
            >
              <X className="h-6 w-6" />
            </motion.button>

            <nav aria-label="Mobil menü">
              <ul className="flex flex-col gap-2">
                {links.map((item, index) => (
                  <motion.li
                    key={`${item.label}-${item.href}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.08 + 0.1, ease: EASE }}
                  >
                    <Link
                      href={item.href}
                      className="block rounded-2xl px-4 py-3 text-lg font-medium text-ink-900 transition-colors hover:bg-surface-50"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.5, ease: EASE }}
                className="flex flex-col gap-3 pt-7"
              >
                <SolidButton
                  href={PHONE_HREF}
                  className="h-12 w-full px-5 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/45 focus-visible:ring-offset-2"
                  onClick={closeMenu}
                >
                  Ücretsiz Keşif
                </SolidButton>
                <OutlineButton
                  href={ROUTES.urunler.href}
                  className="h-12 w-full px-5 text-base"
                  onClick={closeMenu}
                >
                  Isı Pompanızı Bulun
                  <ArrowRight
                    size={17}
                    strokeWidth={2.1}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </OutlineButton>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
