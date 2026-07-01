import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { JsonLdScript } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { aboutProse, stats } from "@/data/site";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The story behind Tarte: a welcoming coffee shop built around great coffee, fresh pastries, family meaning, and community.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Our Story · Tarte",
    description:
      "The story behind Tarte: a welcoming coffee shop built around great coffee, fresh pastries, family meaning, and community.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="animate-fade-up">
      <JsonLdScript
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Our Story", path: "/about" },
        ])}
      />
      {/* Hero header */}
      <header
        style={{
          position: "relative",
          minHeight: "56vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "clamp(60px, 8vw, 110px) clamp(20px, 5vw, 64px)",
          background:
            "radial-gradient(120% 110% at 50% 20%, #3a2418, #211610 70%)",
        }}
      >
        <div style={{ position: "relative", zIndex: 2, maxWidth: 640 }}>
          <Eyebrow color="var(--color-accent-muted)">Since 2025</Eyebrow>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(44px, 6.5vw, 84px)",
              fontWeight: 600,
              color: "var(--color-cream-text)",
              margin: "16px 0 18px",
              letterSpacing: "-0.5px",
              lineHeight: 1,
            }}
          >
            Our Story
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 1.5vw, 19px)",
              lineHeight: 1.7,
              color: "rgba(243,233,218,0.82)",
              fontStyle: "italic",
              fontFamily: "var(--font-display)",
            }}
          >
            “A welcoming space for coffee, pastries, and connection.”
          </p>
        </div>
      </header>

      {/* Prose */}
      <section
        style={{ padding: "clamp(50px, 7vw, 96px) clamp(20px, 5vw, 64px)" }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          {aboutProse.map((para, i) => (
            <p
              key={i}
              style={{
                fontSize: "clamp(17px, 1.6vw, 20px)",
                lineHeight: 1.8,
                color: "rgba(36,24,19,0.78)",
                margin: i === aboutProse.length - 1 ? 0 : "0 0 26px",
              }}
            >
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section
        style={{ padding: "0 clamp(20px, 5vw, 64px) clamp(50px, 6vw, 80px)" }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 24,
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                textAlign: "center",
                padding: "30px 16px",
                background: "var(--color-card)",
                borderRadius: 18,
                border: "1px solid rgba(36,24,19,0.07)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 48,
                  fontWeight: 600,
                  color: "var(--color-brown)",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 13,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: "rgba(36,24,19,0.6)",
                  marginTop: 8,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
