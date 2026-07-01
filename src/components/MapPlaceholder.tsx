import type { CSSProperties } from "react";

type MapVariant = "home" | "visit";

type MapPlaceholderProps = {
  variant: MapVariant;
  pinLabel: string;
  /** Optional external maps URL. When provided, the whole map opens directions. */
  href?: string;
  /** Optional mono caption, bottom-right (Home only in the design). */
  caption?: string;
  /** Outer sizing overrides (the parent controls layout). */
  style?: CSSProperties;
};

const config = {
  home: {
    radius: 22,
    grid: "44px 44px",
    road1: { left: "18%", top: "30%", width: "46%", height: 8, rotate: -18 },
    road2: { left: "8%", top: "62%", width: "70%", height: 10, rotate: 6 },
    pin: { size: 30, top: "48%" },
    labelFont: 12,
  },
  visit: {
    radius: 20,
    grid: "48px 48px",
    road1: { left: "14%", top: "34%", width: "50%", height: 10, rotate: -14 },
    road2: { left: "6%", top: "64%", width: "74%", height: 12, rotate: 5 },
    pin: { size: 34, top: "50%" },
    labelFont: 13,
  },
} as const;

/**
 * Stylized map placeholder (tan gradient + grid lines + abstract roads +
 * teardrop pin). Intentional placeholder per the handoff — swap for an
 * embedded Google/Mapbox map in production.
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
    cursor: href ? "pointer" : undefined,
    textDecoration: "none",
    color: "inherit",
    ...style,
  } satisfies CSSProperties;
  const content = (
    <>
      {/* grid lines */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(36,24,19,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(36,24,19,0.10) 1px, transparent 1px)",
          backgroundSize: c.grid,
        }}
      />
      {/* roads */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: c.road1.left,
          top: c.road1.top,
          width: c.road1.width,
          height: c.road1.height,
          background: "rgba(36,24,19,0.22)",
          borderRadius: 6,
          transform: `rotate(${c.road1.rotate}deg)`,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: c.road2.left,
          top: c.road2.top,
          width: c.road2.width,
          height: c.road2.height,
          background: "rgba(243,233,218,0.5)",
          borderRadius: 6,
          transform: `rotate(${c.road2.rotate}deg)`,
        }}
      />
      {/* pin */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: c.pin.top,
          transform: "translate(-50%,-100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: variant === "home" ? 4 : 5,
        }}
      >
        <div
          style={{
            width: c.pin.size,
            height: c.pin.size,
            borderRadius: "50% 50% 50% 0",
            background: "var(--color-ink)",
            transform: "rotate(-45deg)",
            boxShadow:
              variant === "home"
                ? "0 8px 18px rgba(0,0,0,0.3)"
                : "0 10px 22px rgba(0,0,0,0.3)",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: c.labelFont,
            fontWeight: 600,
            background: "var(--color-card)",
            padding: variant === "home" ? "4px 10px" : "5px 12px",
            borderRadius: 100,
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            whiteSpace: "nowrap",
          }}
        >
          {pinLabel}
        </span>
      </div>
      {caption && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            bottom: 14,
            right: 16,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "1.5px",
            color: "rgba(36,24,19,0.5)",
            textTransform: "uppercase",
          }}
        >
          {caption}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open directions to ${pinLabel} in Google Maps`}
        style={containerStyle}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Map showing ${pinLabel}`}
      style={containerStyle}
    >
      {content}
    </div>
  );
}
