/**
 * Optional Google Analytics 4. Everything here is a no-op until
 * NEXT_PUBLIC_GA_MEASUREMENT_ID is set (in Netlify), so the site ships no
 * third-party script by default.
 */
export const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Funnel events — mark these as Key Events in GA4 to count them as leads. */
export type FunnelEvent =
  | "click_to_call"
  | "click_email"
  | "get_directions"
  | "click_instagram"
  | "reservation_request"
  | "cake_order_request";

export function trackEvent(
  name: FunnelEvent,
  params?: Record<string, string | number>,
) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
}

/** Classify an outbound link click into a funnel event (or null). */
export function eventForHref(href: string): FunnelEvent | null {
  if (href.startsWith("tel:")) return "click_to_call";
  if (href.startsWith("mailto:")) return "click_email";
  if (/^https:\/\/(www\.)?google\.com\/maps/.test(href)) return "get_directions";
  if (/^https:\/\/(www\.)?instagram\.com\//.test(href)) return "click_instagram";
  return null;
}
