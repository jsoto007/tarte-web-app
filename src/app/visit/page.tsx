import type { Metadata } from "next";
import { MapPlaceholder } from "@/components/MapPlaceholder";
import { PageHeader } from "@/components/PageHeader";
import { ReservationForm } from "@/components/ReservationForm";
import { hours, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Visit",
  description:
    "Visit Tarte at 128 Maple Row, Old Town District — the corner with the green awning. See our hours, find & reach us, and request a table.",
};

const cardStyle = {
  background: "var(--color-card)",
  border: "1px solid rgba(36,24,19,0.08)",
  borderRadius: 20,
  padding: "clamp(26px, 3.5vw, 38px)",
} as const;

const cardHeading = {
  fontFamily: "var(--font-display)",
  fontSize: 28,
  fontWeight: 600,
} as const;

export default function VisitPage() {
  return (
    <div className="animate-fade-up">
      <PageHeader
        eyebrow="Come on in"
        title="Visit Tarte"
        subtitle={`${site.contact.addressLine}, ${site.contact.district} — the corner with the green awning.`}
      />

      <section
        style={{
          padding:
            "clamp(40px, 5vw, 70px) clamp(20px, 5vw, 64px) clamp(60px, 7vw, 100px)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 28,
            alignItems: "start",
          }}
        >
          {/* Left: hours + contact */}
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={cardStyle}>
              <h2 style={{ ...cardHeading, margin: "0 0 20px" }}>Hours</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {hours.map((row, i) => (
                  <div
                    key={row.dayLong}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom:
                        i < hours.length - 1
                          ? "1px dashed rgba(36,24,19,0.15)"
                          : "none",
                      paddingBottom: i < hours.length - 1 ? 11 : 0,
                    }}
                  >
                    <span style={{ fontWeight: 500 }}>{row.dayLong}</span>
                    <span style={{ color: "rgba(36,24,19,0.66)" }}>
                      {row.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={cardStyle}>
              <h2 style={{ ...cardHeading, margin: "0 0 18px" }}>
                Find &amp; reach us
              </h2>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: "rgba(36,24,19,0.72)",
                  margin: "0 0 6px",
                }}
              >
                <strong style={{ fontWeight: 600 }}>Address</strong>
                <br />
                {site.contact.addressLine}, {site.contact.district}
              </p>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: "rgba(36,24,19,0.72)",
                  margin: "0 0 6px",
                }}
              >
                <strong style={{ fontWeight: 600 }}>Phone</strong>
                <br />
                <a
                  href={`tel:${site.contact.phone.replace(/[^\d+]/g, "")}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  {site.contact.phone}
                </a>
              </p>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: "rgba(36,24,19,0.72)",
                  margin: 0,
                }}
              >
                <strong style={{ fontWeight: 600 }}>Email</strong>
                <br />
                <a
                  href={`mailto:${site.contact.email}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  {site.contact.email}
                </a>
              </p>
            </div>
          </div>

          {/* Right: reservation form */}
          <ReservationForm />
        </div>

        {/* Map */}
        <MapPlaceholder
          variant="visit"
          pinLabel="Tarte · Maple Row"
          style={{
            maxWidth: 1100,
            margin: "28px auto 0",
            height: "clamp(260px, 32vw, 380px)",
          }}
        />
      </section>
    </div>
  );
}
