"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gallery } from "@/data/gallery";

export function GalleryGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const open = (i: number) => {
    triggerRef.current = document.activeElement as HTMLElement;
    setOpenIndex(i);
  };
  const close = useCallback(() => {
    setOpenIndex(null);
    triggerRef.current?.focus();
  }, []);
  const step = useCallback((dir: 1 | -1) => {
    setOpenIndex((v) =>
      v === null ? v : (v + dir + gallery.length) % gallery.length,
    );
  }, []);

  useEffect(() => {
    if (openIndex === null) return;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab") {
        const focusables =
          dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, step]);

  const active = openIndex === null ? null : gallery[openIndex];

  return (
    <section
      style={{
        padding:
          "clamp(40px, 5vw, 70px) clamp(20px, 5vw, 64px) clamp(60px, 7vw, 100px)",
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gridAutoRows: "240px",
          gap: 16,
        }}
      >
        {gallery.map((g, i) => (
          <button
            key={g.label}
            type="button"
            className="gallery-tile"
            style={{ gridColumn: g.featured ? "span 2" : "span 1" }}
            onClick={() => open(i)}
            aria-label={`View ${g.label}`}
          >
            <Image
              src={g.img}
              alt=""
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 1180px) 50vw, 380px"
              style={{ objectFit: "cover" }}
            />
            <span
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                boxShadow: "inset 0 -36px 70px rgba(0,0,0,0.28)",
                pointerEvents: "none",
              }}
            />
            <span
              style={{
                position: "absolute",
                bottom: 14,
                left: 16,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "1.3px",
                color: "rgba(243,233,218,0.85)",
                textTransform: "uppercase",
                textShadow: "0 1px 6px rgba(0,0,0,0.5)",
              }}
            >
              {g.label}
            </span>
            <span
              aria-hidden
              style={{
                position: "absolute",
                top: 14,
                right: 16,
                fontSize: 18,
                opacity: 0.7,
                color: "var(--color-cream-text)",
              }}
            >
              ◆
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active && openIndex !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${active.label} — image ${openIndex + 1} of ${gallery.length}`}
          ref={dialogRef}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <button
            type="button"
            ref={closeBtnRef}
            className="lightbox__btn lightbox__close"
            onClick={close}
            aria-label="Close"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden
            >
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </svg>
          </button>

          <div
            style={{
              position: "relative",
              width: "min(90vw, 1000px)",
              height: "78vh",
            }}
          >
            <Image
              src={active.img}
              alt={active.label}
              fill
              sizes="90vw"
              style={{ objectFit: "contain", borderRadius: 12 }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              color: "var(--color-cream-text)",
            }}
          >
            <button
              type="button"
              className="lightbox__btn"
              onClick={() => step(-1)}
              aria-label="Previous image"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                minWidth: 160,
                textAlign: "center",
              }}
            >
              {active.label}
            </span>
            <button
              type="button"
              className="lightbox__btn"
              onClick={() => step(1)}
              aria-label="Next image"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
