import Image from "next/image";
import Link from "next/link";
import {
  directionsUrl,
  emailHref,
  hours,
  navItems,
  phoneHref,
  site,
} from "@/data/site";
import { Eyebrow } from "./Eyebrow";

const exploreLinks = navItems.filter((n) => n.href !== "/");

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-footer)",
        color: "rgba(243,233,218,0.78)",
        padding: "clamp(50px, 6vw, 80px) clamp(20px, 5vw, 64px) 36px",
      }}
    >
      <div className="footer__grid">
        {/* Brand */}
        <div className="footer__brand">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <Image
              src="/assets/tarte-logo-cream.png"
              alt=""
              width={50}
              height={50}
              style={{ height: 50, width: 50, objectFit: "contain" }}
            />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 26,
                fontWeight: 600,
                color: "var(--color-cream-text)",
              }}
            >
              {site.name}
            </span>
          </div>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.65,
              maxWidth: 320,
              margin: 0,
            }}
          >
            {site.footerBlurb}
          </p>
          <div className="footer__actions" aria-label="Footer actions">
            <a href={directionsUrl} className="footer-link">
              Get Directions
            </a>
            <a href={phoneHref} className="footer-link">
              Call Us
            </a>
          </div>
        </div>

        {/* Explore */}
        <div>
          <Eyebrow
            as="h4"
            color="var(--color-accent-muted)"
            tracking={2}
            style={{ margin: "0 0 16px", display: "block" }}
          >
            Explore
          </Eyebrow>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {exploreLinks.map((item) => (
              <Link key={item.href} href={item.href} className="footer-link">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Visit */}
        <div>
          <Eyebrow
            as="h4"
            color="var(--color-accent-muted)"
            tracking={2}
            style={{ margin: "0 0 16px", display: "block" }}
          >
            Visit
          </Eyebrow>
          <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            <a href={directionsUrl} className="footer-link">
              {site.contact.addressLine}
            </a>
            <br />
            {site.contact.district}
            <br />
            <a href={phoneHref} className="footer-link">
              {site.contact.phone}
            </a>
            <br />
            <a href={emailHref} className="footer-link">
              {site.contact.email}
            </a>
          </p>
        </div>

        {/* Hours */}
        <div>
          <Eyebrow
            as="h4"
            color="var(--color-accent-muted)"
            tracking={2}
            style={{ margin: "0 0 16px", display: "block" }}
          >
            Hours
          </Eyebrow>
          <div className="footer__hours">
            {hours.map((row) => (
              <p key={row.dayShort} className="footer__hours-row">
                <span>{row.dayShort}</span>
                <span>{row.time}</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 1180,
          margin: "44px auto 0",
          paddingTop: 24,
          borderTop: "1px solid rgba(243,233,218,0.12)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          fontSize: 13,
          color: "rgba(243,233,218,0.5)",
        }}
      >
        <span>
          © {site.year} {site.fullName}
        </span>
        <span>{site.tagline}</span>
        <span>
          Powered by Soto Dev — visit us at{" "}
          <a
            href="https://sotodev.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__credit"
          >
            sotodev.com
          </a>
        </span>
      </div>
    </footer>
  );
}
