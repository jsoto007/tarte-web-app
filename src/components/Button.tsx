import Link from "next/link";
import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";

type Variant = "accent" | "dark" | "outline-light" | "outline-dark";

const variantClass: Record<Variant, string> = {
  accent: "btn--accent",
  dark: "btn--dark",
  "outline-light": "btn--outline-light",
  "outline-dark": "btn--outline-dark",
};

type Base = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** When set, renders a Next.js <Link>; otherwise a native <button>. */
  href?: string;
};

type AnchorRest = Omit<ComponentPropsWithoutRef<typeof Link>, keyof Base>;
type ButtonRest = Omit<ComponentPropsWithoutRef<"button">, keyof Base>;

type ButtonProps = Base & (AnchorRest | ButtonRest);

/**
 * Shared CTA. Colour + hover come from the variant class; per-instance
 * padding / font-size can be tuned via `style` to match the design exactly.
 */
export function Button({
  variant = "accent",
  children,
  className = "",
  style,
  href,
  ...rest
}: ButtonProps) {
  const classes = `btn ${variantClass[variant]} ${className}`.trim();

  if (href !== undefined) {
    return (
      <Link
        href={href}
        className={classes}
        style={style}
        {...(rest as AnchorRest)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} style={style} {...(rest as ButtonRest)}>
      {children}
    </button>
  );
}
