import type { CSSProperties, ElementType, ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  /** Text colour token. Brown on light sections, muted gold on dark. */
  color?: string;
  /** Letter-spacing in px (3 for eyebrows, 2 for footer headings). */
  tracking?: number;
  as?: ElementType;
  style?: CSSProperties;
};

/** The small uppercase label that sits above most headings. */
export function Eyebrow({
  children,
  color = "var(--color-brown)",
  tracking = 3,
  as: Tag = "span",
  style,
}: EyebrowProps) {
  return (
    <Tag
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: `${tracking}px`,
        textTransform: "uppercase",
        color,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
