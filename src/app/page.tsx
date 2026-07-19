import Image from "next/image";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { InstagramMarquee } from "@/components/InstagramMarquee";
import { MapPlaceholder } from "@/components/MapPlaceholder";
import {
  directionsUrl,
  emailHref,
  features,
  hours,
  phoneHref,
  site,
  specialties,
  storyTeaser,
} from "@/data/site";

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
            Pastries · Breakfast · Sandwiches · Coffee
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
            Homemade Bread,
            <br />
            <span style={{ fontStyle: "italic", color: "var(--color-accent-light)" }}>
              Baked Fresh Daily
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
            Pastries we&apos;re known for, breakfast served hot every morning,
            sandwiches on bread we bake daily, and coffee in every style — all
            made with real ingredients and years of recipes development.
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
              See the Menu
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

      {/* PASTRY SIGNATURE */}
      <section
        style={{
          padding:
            "clamp(42px, 6vw, 84px) clamp(20px, 5vw, 64px) clamp(56px, 7vw, 96px)",
          background:
            "linear-gradient(180deg, var(--color-cream) 0%, #fffaf1 52%, var(--color-cream) 100%)",
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
            gap: "clamp(30px, 5vw, 64px)",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
              gap: 16,
              alignItems: "stretch",
            }}
          >
            <div
              style={{
                position: "relative",
                minHeight: 430,
                borderRadius: 18,
                overflow: "hidden",
                boxShadow: "0 26px 60px rgba(58,36,24,0.16)",
              }}
            >
              <Image
                src="/assets/menu/croissants_table.jpg"
                alt="Fresh croissants on a baking tray at Tarte"
                fill
                sizes="(max-width: 900px) 100vw, 560px"
                style={{ objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: "auto 18px 18px",
                  background: "rgba(33,22,16,0.82)",
                  color: "var(--color-cream-text)",
                  border: "1px solid rgba(243,233,218,0.22)",
                  borderRadius: 12,
                  padding: "14px 16px",
                  backdropFilter: "blur(6px)",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: "1.7px",
                    textTransform: "uppercase",
                    color: "var(--color-accent-light)",
                    marginBottom: 4,
                  }}
                >
                  Pastry case first
                </div>
                <strong
                  style={{
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontSize: 24,
                    lineHeight: 1.05,
                  }}
                >
                  Made to be the reason you visit.
                </strong>
              </div>
            </div>
            <div style={{ display: "grid", gap: 16 }}>
              {[
                {
                  src: "/assets/menu/pain_au_chocolat.jpg",
                  alt: "Pain au chocolat from Tarte",
                  label: "Laminated",
                },
                {
                  src: "/assets/menu/tarte_nutella_danish_web_optimized.jpg",
                  alt: "Nutella Danish from Tarte",
                  label: "Filled",
                },
                {
                  src: "/assets/menu/blue_cake.png",
                  alt: "Custom celebration cake from Tarte",
                  label: "Celebration",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    position: "relative",
                    minHeight: 132,
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 18px 38px rgba(58,36,24,0.12)",
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 900px) 42vw, 260px"
                    style={{ objectFit: "cover" }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      left: 12,
                      bottom: 12,
                      padding: "6px 10px",
                      borderRadius: 999,
                      background: "rgba(255,253,249,0.9)",
                      color: "var(--color-brown)",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "1.3px",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Eyebrow>Why the line starts here</Eyebrow>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 4.8vw, 60px)",
                fontWeight: 600,
                lineHeight: 1,
                margin: "14px 0 20px",
                letterSpacing: "-0.5px",
              }}
            >
              Pastries are our signature.
            </h2>
            <p
              style={{
                fontSize: "clamp(16px, 1.45vw, 18px)",
                lineHeight: 1.7,
                color: "rgba(36,24,19,0.72)",
                margin: "0 0 28px",
                maxWidth: 520,
              }}
            >
              Pastries are what we&apos;re known for. We bake our own bread
              fresh every morning, from recipes developed over years — folded
              dough, fruit tarts, and warm trays, all made with care.
            </p>
            <div style={{ display: "grid", gap: 14, marginBottom: 30 }}>
              {[
                ["01", "Bread baked fresh at dawn", "We bake our own bread every morning, so croissants, loaves, and sandwiches all start fresh."],
                ["02", "Recipes years in the making", "Our pastries come from recipes we've developed and refined over years."],
                ["03", "Made with care", "Small batches, handled gently, and finished to be the thing people remember."],
              ].map(([step, title, desc]) => (
                <div
                  key={step}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "54px 1fr",
                    gap: 16,
                    alignItems: "start",
                    paddingBottom: 14,
                    borderBottom: "1px solid rgba(58,36,24,0.12)",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      width: 44,
                      height: 44,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      background: "var(--color-brown)",
                      color: "var(--color-cream-text)",
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "1px",
                    }}
                  >
                    {step}
                  </span>
                  <span>
                    <strong
                      style={{
                        display: "block",
                        fontFamily: "var(--font-display)",
                        fontSize: 24,
                        lineHeight: 1.1,
                        marginBottom: 4,
                      }}
                    >
                      {title}
                    </strong>
                    <span
                      style={{
                        display: "block",
                        color: "rgba(36,24,19,0.66)",
                        fontSize: 14.5,
                        lineHeight: 1.55,
                      }}
                    >
                      {desc}
                    </span>
                  </span>
                </div>
              ))}
            </div>
            <Button href="/menu" variant="dark">
              Order From the Case
            </Button>
          </div>
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
            <Eyebrow>What we are known for</Eyebrow>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(34px, 4.4vw, 54px)",
                fontWeight: 600,
                margin: "12px 0 0",
                letterSpacing: "-0.5px",
              }}
            >
              Baked Fresh, Served All Day
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
              boxShadow: "0 30px 70px rgba(0,0,0,0.4)",
            }}
          >
            <Image
              src="/assets/story-tart.png"
              alt="Apple tart baked fresh at Tarte Coffee Shop & Bakes"
              fill
              sizes="(max-width: 760px) 100vw, 520px"
              style={{ objectFit: "cover" }}
            />
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
              A homemade neighborhood table, made fresh every day.
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
              Open daily on Middletown Road
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
              <a
                href={emailHref}
                style={{ color: "inherit", textDecorationColor: "var(--accent)" }}
              >
                {site.contact.email}
              </a>{" "}
              ·{" "}
              <a
                href={phoneHref}
                style={{ color: "inherit", textDecorationColor: "var(--accent)" }}
              >
                {site.contact.phone}
              </a>
            </p>
            <Button
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="dark"
            >
              Get Directions
            </Button>
          </div>

          <MapPlaceholder
            variant="home"
            pinLabel="Tarte"
            href={directionsUrl}
            caption="Map — Middletown Road"
            style={{ minHeight: 320 }}
          />
        </div>
      </section>
    </div>
  );
}
