"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/data/site";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // The mobile panel is closed via each link's onClick (the only way to
  // navigate from it), so no route-change effect is needed.

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50 }}>
      <nav
        aria-label="Primary"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px clamp(20px, 5vw, 64px)",
          background: "rgba(247,241,232,0.82)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(36,24,19,0.08)",
        }}
      >
        <Link
          href="/"
          aria-label="Tarte — home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            textDecoration: "none",
          }}
        >
          <Image
            src="/assets/tarte-logo.png"
            alt=""
            width={52}
            height={52}
            priority
            style={{ height: 52, width: 52, objectFit: "contain" }}
          />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: "0.5px",
              lineHeight: 1,
              color: "var(--color-ink)",
            }}
          >
            Tarte
          </span>
        </Link>

        {/* Desktop links */}
        <div
          className="nav__links"
          style={{
            alignItems: "center",
            gap: "clamp(8px, 2vw, 30px)",
            display: "flex",
          }}
        >
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: "0.3px",
                  padding: "6px 2px",
                  color: active ? "var(--color-ink)" : "rgba(36,24,19,0.62)",
                  borderBottom: `1.5px solid ${
                    active ? "var(--accent)" : "transparent"
                  }`,
                  textDecoration: "none",
                  transition: "color .2s",
                }}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/menu"
            className="btn btn--dark"
            style={{
              marginLeft: 8,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.5px",
              padding: "11px 22px",
            }}
          >
            Order Online
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="nav__toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden
          >
            {open ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown panel */}
      <div
        id="mobile-menu"
        className={`nav__mobile-panel${open ? " open" : ""}`}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="nav__mobile-link"
            aria-current={isActive(item.href) ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/menu"
          className="btn btn--dark"
          style={{ marginTop: 12, alignSelf: "flex-start", padding: "12px 24px" }}
          onClick={() => setOpen(false)}
        >
          Order Online
        </Link>
      </div>
    </header>
  );
}
