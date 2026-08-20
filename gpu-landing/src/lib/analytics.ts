/**
 * Тонкий analytics-слой. Никаких сторонних скриптов без ID.
 * События отправляются в Яндекс.Метрику (ym) и/или GA (gtag), если они подключены.
 */

export type AnalyticsEvent =
  | "hero_calculation_click"
  | "engineer_contact_click"
  | "catalog_download_click"
  | "power_selected"
  | "lead_submit"
  | "lead_success"
  | "lead_error";

declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const YM_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function track(event: AnalyticsEvent, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;

  try {
    if (YM_ID && typeof window.ym === "function") {
      window.ym(Number(YM_ID), "reachGoal", event, params);
    }
    if (GA_ID && typeof window.gtag === "function") {
      window.gtag("event", event, params ?? {});
    }
  } catch {
    /* analytics must never break the page */
  }

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, params ?? {});
  }
}
