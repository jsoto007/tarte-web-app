import Image from "next/image";
import Link from "next/link";
import { navItems, site } from "@/data/site";
import { Eyebrow } from "./Eyebrow";
import { NewsletterForm } from "./NewsletterForm";

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
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 40,
        }}
      >
        {/* Brand */}
        <div>
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
              maxWidth: 260,
              margin: 0,
            }}
          >
            {site.footerBlurb}
          </p>
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
            {site.contact.addressLine}
            <br />
            {site.contact.district}
            <br />
            {site.contact.phone}
          </p>
        </div>

        {/* Newsletter */}
        <div>
          <Eyebrow
            as="h4"
            color="var(--color-accent-muted)"
            tracking={2}
            style={{ margin: "0 0 16px", display: "block" }}
          >
            Stay in the loop
          </Eyebrow>
          <p style={{ fontSize: 14, lineHeight: 1.6, margin: "0 0 14px" }}>
            {site.newsletterBlurb}
          </p>
          <NewsletterForm />
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
      </div>
    </footer>
  );
}
