import type { ReactNode } from "react";
import Link from "next/link";
import { MapPin, ShieldCheck } from "lucide-react";
import EvselFooter from "@/components/EvselFooter";
import Navbar from "@/components/Navbar";
import JsonLd from "@/components/seo/JsonLd";
import ContactActions from "@/components/ui/ContactActions";
import type { SiteRoute } from "@/config/routes";
import { ROUTES } from "@/config/routes";
import { SERVICE_SCOPE } from "@/config/site";
import type { JsonLdValue } from "@/lib/seo";

export default function RouteShell({
  route,
  eyebrow,
  heading,
  lead,
  proof,
  schema,
  aside,
}: {
  route: SiteRoute;
  eyebrow: string;
  heading: string;
  lead: string;
  proof: string;
  schema: JsonLdValue;
  aside: ReactNode;
}) {
  return (
    <>
      <JsonLd data={schema} />
      <Navbar />
      <main className="bg-surface-0">
        <section className="pb-20 pt-36 md:pb-28 md:pt-44">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <nav aria-label="Sayfa yolu" className="text-sm text-ink-400">
              <Link
                href={ROUTES.home.href}
                className="rounded-sm transition-colors hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40"
              >
                Ana Sayfa
              </Link>
              <span aria-hidden className="mx-2">/</span>
              <span aria-current="page" className="text-ink-600">{route.label}</span>
            </nav>

            <div className="mt-10 grid min-w-0 gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-20">
              <div className="min-w-0">
                <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-brand-teal">
                  {eyebrow}
                </p>
                <h1 className="mt-4 max-w-[18ch] font-heading text-[clamp(2.25rem,5vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink-950">
                  {heading}
                </h1>
                <p className="mt-6 max-w-[62ch] text-[1.0625rem] leading-relaxed text-ink-600">
                  {lead}
                </p>
                <p className="mt-6 flex max-w-[58ch] items-start gap-2.5 text-[0.9375rem] leading-relaxed text-ink-600">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-brand-blue" aria-hidden />
                  <span>
                    <strong className="font-semibold text-ink-900">
                      {SERVICE_SCOPE.surveyLabel}:
                    </strong>{" "}
                    {SERVICE_SCOPE.surveyAreas} — {SERVICE_SCOPE.beyond}
                  </span>
                </p>
                <ContactActions className="mt-8" />
                <div className="mt-8 flex max-w-[58ch] items-start gap-3 border-l-2 border-brand-blue pl-4 text-[0.9375rem] leading-relaxed text-ink-600">
                  <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand-blue" aria-hidden />
                  <p>
                    <strong className="font-semibold text-ink-900">Doğrulanmış güven:</strong>{" "}
                    {proof}
                  </p>
                </div>
              </div>

              <aside className="min-w-0 border-l border-surface-100 pl-6 md:pl-8">
                {aside}
              </aside>
            </div>
          </div>
        </section>
      </main>
      <EvselFooter />
    </>
  );
}
