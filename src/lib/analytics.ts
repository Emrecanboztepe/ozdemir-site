type AnalyticsValue = string | number | boolean;
type AnalyticsParams = Record<string, AnalyticsValue | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Kişisel veri göndermeden GTM ve doğrudan GA4 olaylarını birlikte besler.
 * dataLayer olay adı GTM tarafındaki dönüşüm tetikleyicileri için sabittir.
 */
export function trackLead(
  method: "phone" | "whatsapp" | "whatsapp_form",
  context?: AnalyticsParams,
) {
  if (typeof window === "undefined") return;

  const payload = {
    lead_method: method,
    page_path: window.location.pathname,
    ...context,
  };

  window.dataLayer?.push({ event: "lead_interaction", ...payload });
  window.gtag?.("event", "generate_lead", {
    method,
    ...context,
  });
}

export function trackLocationClick() {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({
    event: "location_click",
    page_path: window.location.pathname,
  });
  window.gtag?.("event", "select_content", {
    content_type: "location",
    item_id: window.location.pathname,
  });
}

