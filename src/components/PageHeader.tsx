import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

type PageHeaderProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
};

/** Dark gradient banner header shared by Menu, Gallery, and Visit. */
export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <header
      style={{
        background: "linear-gradient(140deg, #2f2017, #1d130d)",
        color: "var(--color-cream-text)",
        padding:
          "clamp(56px, 7vw, 96px) clamp(20px, 5vw, 64px) clamp(40px, 5vw, 64px)",
        textAlign: "center",
      }}
    >
      <Eyebrow color="var(--color-accent-muted)">{eyebrow}</Eyebrow>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(44px, 6.5vw, 82px)",
          fontWeight: 600,
          margin: "14px 0 16px",
          letterSpacing: "-0.5px",
          lineHeight: 1,
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontSize: 16,
          lineHeight: 1.6,
          color: "rgba(243,233,218,0.78)",
          maxWidth: 540,
          margin: "0 auto",
        }}
      >
        {subtitle}
      </p>
    </header>
  );
}
