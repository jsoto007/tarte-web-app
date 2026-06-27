import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { aboutProse, stats, team } from "@/data/site";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "From a single cart on Maple Row to a neighborhood roastery — the story of Tarte, founded in 2014, and the people behind the bar.",
};

export default function AboutPage() {
  return (
    <div className="animate-fade-up">
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
          <Eyebrow color="var(--color-accent-muted)">Since 2014</Eyebrow>
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
            “A good cup is worth slowing down for.”
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

      {/* Team */}
      <section
        style={{
          padding:
            "clamp(40px, 5vw, 70px) clamp(20px, 5vw, 64px) clamp(60px, 7vw, 100px)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(30px, 4vw, 46px)",
              fontWeight: 600,
              textAlign: "center",
              margin: "0 0 40px",
              letterSpacing: "-0.5px",
            }}
          >
            The people behind the bar
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 26,
            }}
          >
            {team.map((member) => (
              <div key={member.name} style={{ textAlign: "center" }}>
                <div
                  style={{
                    aspectRatio: "1",
                    borderRadius: 18,
                    background: member.gradient,
                    marginBottom: 16,
                    boxShadow: "inset 0 -24px 50px rgba(0,0,0,0.25)",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 24,
                    fontWeight: 600,
                    margin: 0,
                  }}
                >
                  {member.name}
                </h3>
                <p
                  style={{
                    fontSize: 13.5,
                    color: "rgba(36,24,19,0.6)",
                    margin: "4px 0 0",
                    letterSpacing: "0.4px",
                  }}
                >
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
