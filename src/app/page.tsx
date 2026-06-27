import Image from "next/image";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { InstagramMarquee } from "@/components/InstagramMarquee";
import { MapPlaceholder } from "@/components/MapPlaceholder";
import { features, hours, site, specialties, storyTeaser } from "@/data/site";

export default function Home() {
  return (
    <div className="animate-fade-up">
      {/* HERO */}
      <section
        style={{
          position: "relative",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          padding:
            "clamp(48px, 7vw, 96px) clamp(20px, 5vw, 64px) clamp(96px, 11vw, 150px)",
          overflow: "hidden",
        }}
      >
        <Image
          src="/assets/hero-storefront.png"
          alt="Watercolor of the Tarte coffee shop storefront"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "56% 42%" }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(95deg, rgba(16,10,6,0.93) 0%, rgba(18,11,7,0.82) 32%, rgba(18,11,7,0.46) 60%, rgba(16,10,6,0.5) 100%)",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(16,10,6,0.55) 0%, transparent 26%, transparent 50%, rgba(14,9,5,0.85) 100%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 640 }}>
          <Image
            src="/assets/tarte-logo-cream.png"
            alt="Tarte Coffee Shop & Bakes"
            width={156}
            height={156}
            priority
            style={{
              width: "clamp(112px, 13vw, 156px)",
              height: "auto",
              display: "block",
              marginBottom: 26,
              filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.5))",
            }}
          />
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 16px",
              border: "1px solid rgba(243,233,218,0.32)",
              borderRadius: 100,
              color: "var(--color-accent-light)",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: 26,
              backdropFilter: "blur(4px)",
            }}
          >
            Coffee Shop · Bakes · Est. 2014
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(48px, 7.4vw, 92px)",
              lineHeight: 0.98,
              color: "var(--color-cream-text-2)",
              margin: "0 0 22px",
              letterSpacing: "-0.5px",
              textShadow: "0 4px 30px rgba(0,0,0,0.4)",
            }}
          >
            Crafted Coffee &amp;
            <br />
            <span style={{ fontStyle: "italic", color: "var(--color-accent-light)" }}>
              Cozy Moments
            </span>
          </h1>
          <p
            style={{
              fontSize: "clamp(15px, 1.4vw, 18px)",
              lineHeight: 1.65,
              color: "rgba(248,241,229,0.85)",
              maxWidth: 470,
              margin: "0 0 36px",
              textShadow: "0 2px 14px rgba(0,0,0,0.4)",
            }}
          >
            Artisan espresso, handcrafted drinks, and fresh-baked pastries
            served slow. A warm corner of the city made for coffee lovers.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Button
              href="/menu"
              variant="accent"
              style={{
                padding: "15px 32px",
                boxShadow: "0 14px 30px rgba(0,0,0,0.3)",
              }}
            >
              Explore Menu
            </Button>
            <Button
              href="/visit"
              variant="outline-light"
              style={{ padding: "15px 32px", fontWeight: 500 }}
            >
              Visit Us
            </Button>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section
        style={{
          position: "relative",
          marginTop: -56,
          padding: "0 clamp(20px, 5vw, 64px) clamp(50px, 6vw, 80px)",
          zIndex: 5,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 22,
            maxWidth: 1180,
            margin: "0 auto",
          }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                background: "var(--color-card)",
                border: "1px solid rgba(36,24,19,0.07)",
                borderRadius: 18,
                padding: "32px 30px",
                boxShadow: "0 24px 50px rgba(58,36,24,0.10)",
              }}
            >
              <div
                aria-hidden
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: "var(--color-tan)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  marginBottom: 20,
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 26,
                  fontWeight: 600,
                  margin: "0 0 10px",
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontSize: 14.5,
                  lineHeight: 1.6,
                  color: "rgba(36,24,19,0.66)",
                  margin: "0 0 18px",
                }}
              >
                {f.desc}
              </p>
              <a href={f.href} className="link-accent">
                {f.linkLabel}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CAFÉ SPECIALTIES */}
      <section
        style={{
          padding:
            "clamp(40px, 5vw, 70px) clamp(20px, 5vw, 64px) clamp(60px, 7vw, 96px)",
        }}
      >
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Eyebrow>What we make</Eyebrow>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(34px, 4.4vw, 54px)",
                fontWeight: 600,
                margin: "12px 0 0",
                letterSpacing: "-0.5px",
              }}
            >
              Our Café Specialties
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 26,
            }}
          >
            {specialties.map((s) => (
              <div
                key={s.title}
                style={{
                  background: "var(--color-card)",
                  borderRadius: 18,
                  overflow: "hidden",
                  border: "1px solid rgba(36,24,19,0.07)",
                  boxShadow: "0 18px 40px rgba(58,36,24,0.08)",
                }}
              >
                <div style={{ position: "relative", height: 200 }}>
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    sizes="(max-width: 700px) 100vw, 380px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: "22px 24px 26px" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 23,
                      fontWeight: 600,
                      margin: "0 0 6px",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: "rgba(36,24,19,0.62)",
                      margin: 0,
                    }}
                  >
                    {s.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY TEASER */}
      <section
        style={{
          background: "linear-gradient(140deg, #2f2017, #211610)",
          color: "var(--color-cream-text)",
          padding: "clamp(56px, 7vw, 96px) clamp(20px, 5vw, 64px)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "clamp(34px, 5vw, 70px)",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              aspectRatio: "4 / 5",
              borderRadius: 20,
              overflow: "hidden",
              background:
                "radial-gradient(circle at 40% 35%, #e9d3ac, #b08a5d 45%, #5d3a1d 85%)",
              boxShadow: "0 30px 70px rgba(0,0,0,0.4)",
            }}
          >
            <span
              style={{
                position: "absolute",
                bottom: 14,
                left: 16,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "1.5px",
                color: "rgba(243,233,218,0.7)",
                textTransform: "uppercase",
              }}
            >
              The Roastery
            </span>
          </div>
          <div>
            <Eyebrow color="var(--color-accent-muted)">Our Story</Eyebrow>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4.2vw, 50px)",
                fontWeight: 600,
                lineHeight: 1.04,
                margin: "14px 0 20px",
                letterSpacing: "-0.5px",
              }}
            >
              A neighborhood table, ten years in the making.
            </h2>
            {storyTeaser.map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: "rgba(243,233,218,0.8)",
                  margin: i === storyTeaser.length - 1 ? "0 0 30px" : "0 0 18px",
                }}
              >
                {para}
              </p>
            ))}
            <Button href="/about" variant="accent">
              Read Our Story
            </Button>
          </div>
        </div>
      </section>

      {/* INSTAGRAM STRIP */}
      <InstagramMarquee />

      {/* HOURS / LOCATION CTA */}
      <section
        style={{
          padding:
            "clamp(50px, 6vw, 80px) clamp(20px, 5vw, 64px) clamp(70px, 8vw, 110px)",
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: 28,
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              background: "var(--color-card)",
              border: "1px solid rgba(36,24,19,0.08)",
              borderRadius: 22,
              padding: "clamp(30px, 4vw, 46px)",
              boxShadow: "0 20px 50px rgba(58,36,24,0.08)",
            }}
          >
            <Eyebrow>Find Us</Eyebrow>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(30px, 3.6vw, 44px)",
                fontWeight: 600,
                margin: "12px 0 24px",
                letterSpacing: "-0.5px",
              }}
            >
              Open daily on Maple Row
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                marginBottom: 28,
              }}
            >
              {hours.map((row, i) => (
                <div
                  key={row.dayShort}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom:
                      i < hours.length - 1
                        ? "1px dashed rgba(36,24,19,0.15)"
                        : "none",
                    paddingBottom: i < hours.length - 1 ? 12 : 0,
                  }}
                >
                  <span style={{ fontWeight: 500 }}>{row.dayShort}</span>
                  <span style={{ color: "rgba(36,24,19,0.66)" }}>{row.time}</span>
                </div>
              ))}
            </div>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.6,
                color: "rgba(36,24,19,0.7)",
                margin: "0 0 6px",
              }}
            >
              <strong style={{ fontWeight: 600 }}>
                {site.contact.addressLine}
              </strong>
              , {site.contact.district}
            </p>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.6,
                color: "rgba(36,24,19,0.7)",
                margin: "0 0 24px",
              }}
            >
              {site.contact.email} · {site.contact.phone}
            </p>
            <Button href="/visit" variant="dark">
              Get Directions
            </Button>
          </div>

          <MapPlaceholder
            variant="home"
            pinLabel="Tarte"
            caption="Map — Maple Row"
            style={{ minHeight: 320 }}
          />
        </div>
      </section>
    </div>
  );
}
