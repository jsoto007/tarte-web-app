import type { CSSProperties } from "react";
import { mapEmbedUrl } from "@/data/site";

type MapVariant = "home" | "visit";

type MapPlaceholderProps = {
  variant: MapVariant;
  pinLabel: string;
  /** Optional external maps URL. When provided, shows a "Get Directions" chip. */
  href?: string;
  /** Optional mono caption, bottom-left. */
  caption?: string;
  /** Outer sizing overrides (the parent controls layout). */
  style?: CSSProperties;
};

const config = {
  home: { radius: 22, chipFont: 12 },
  visit: { radius: 20, chipFont: 13 },
} as const;

const chipStyle = {
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  background: "var(--color-card)",
  padding: "6px 12px",
  borderRadius: 100,
  boxShadow: "0 4px 10px rgba(0,0,0,0.18)",
  whiteSpace: "nowrap",
} satisfies CSSProperties;

/**
 * Live, embedded Google Map centered on the shop's exact coordinates (no API
 * key required). Overlays a brand pill (top-left) and, when `href` is given,
 * a "Get Directions" pill (bottom-right) — the map itself stays interactive
 * (pan/zoom), so it can't be wrapped in a whole-container link.
 */
export function MapPlaceholder({
  variant,
  pinLabel,
  href,
  caption,
  style,
}: MapPlaceholderProps) {
  const c = config[variant];
  const containerStyle = {
    position: "relative",
    display: "block",
    borderRadius: c.radius,
    overflow: "hidden",
    background: "linear-gradient(160deg, #d9c6a6, #b89c74)",
    boxShadow: "0 20px 50px rgba(58,36,24,0.12)",
    ...style,
  } satisfies CSSProperties;

  return (
    <div style={containerStyle}>
      <iframe
        title={`Map showing ${pinLabel}`}
        src={mapEmbedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: 0,
        }}
      />

      <span
        aria-hidden
        style={{
          ...chipStyle,
          position: "absolute",
          right: 14,
          top: 14,
          fontSize: c.chipFont,
          pointerEvents: "none",
        }}
      >
        {pinLabel}
      </span>

      {caption && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            bottom: 14,
            left: 16,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "1.5px",
            color: "rgba(36,24,19,0.6)",
            textTransform: "uppercase",
            background: "rgba(255,253,249,0.85)",
            padding: "4px 8px",
            borderRadius: 6,
            pointerEvents: "none",
          }}
        >
          {caption}
        </span>
      )}

      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open directions to ${pinLabel} in Google Maps`}
          style={{
            ...chipStyle,
            position: "absolute",
            right: 14,
            bottom: 14,
            fontSize: c.chipFont,
            color: "var(--color-cream-text)",
            background: "var(--color-ink)",
            textDecoration: "none",
          }}
        >
          Get Directions ↗
        </a>
      )}
    </div>
  );
}
