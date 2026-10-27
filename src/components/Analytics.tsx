"use client";

import Script from "next/script";
import { useEffect } from "react";
import { eventForHref, gaMeasurementId, trackEvent } from "@/lib/analytics";

/**
 * Loads GA4 (only when NEXT_PUBLIC_GA_MEASUREMENT_ID is set) and records the
 * site's conversion clicks — call, email, directions, Instagram — with one
 * delegated listener, so no CTA component needs tracking code.
 */
export function Analytics() {
  useEffect(() => {
    if (!gaMeasurementId) return;
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const name = eventForHref(href);
      if (name) trackEvent(name, { link_url: href });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!gaMeasurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
window.gtag = function gtag(){ window.dataLayer.push(arguments); };
window.gtag("js", new Date());
window.gtag("config", ${JSON.stringify(gaMeasurementId)});`}
      </Script>
    </>
  );
}
