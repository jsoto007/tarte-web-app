"use client";

import Image from "next/image";
import { useState } from "react";
import { menu, menuGroups } from "@/data/menu";
import { Button } from "./Button";

export function MenuFilter() {
  const [cat, setCat] = useState<string>("All");
  const visibleSections =
    cat === "All" ? menu : menu.filter((s) => s.group === cat);

  return (
    <>
      {/* Sticky category bar */}
      <div
        style={{
          position: "sticky",
          top: 78,
          zIndex: 20,
          background: "rgba(247,241,232,0.9)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(36,24,19,0.08)",
          padding: "16px clamp(20px, 5vw, 64px)",
        }}
      >
        <div
          role="group"
          aria-label="Filter menu by category"
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: 1180,
            margin: "0 auto",
          }}
        >
          {menuGroups.map((c) => (
            <button
              key={c}
              type="button"
              className="cat-pill"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Menu list */}
      <section
        style={{
          padding:
            "clamp(40px, 5vw, 70px) clamp(20px, 5vw, 64px) clamp(60px, 7vw, 100px)",
        }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(40px, 5vw, 64px)",
          }}
        >
          {visibleSections.map((sec) => (
            <div key={sec.title}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 18,
                  marginBottom: sec.note ? 8 : 28,
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(30px, 3.6vw, 42px)",
                    fontWeight: 600,
                    margin: 0,
                    letterSpacing: "-0.5px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {sec.title}
                </h2>
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: "rgba(36,24,19,0.16)",
                  }}
                />
              </div>
              {sec.note && (
                <p
                  style={{
                    margin: "0 0 22px",
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: "0.3px",
                    color: "var(--color-brown)",
                  }}
                >
                  {sec.note}
                </p>
              )}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "14px 40px",
                }}
              >
                {sec.items.map((it) => (
                  <div
                    key={it.name}
                    style={{
                      display: "flex",
                      gap: 16,
                      alignItems: "flex-start",
                      padding: "14px 0",
                      borderBottom: "1px dashed rgba(36,24,19,0.14)",
                    }}
                  >
                    {it.img && (
                      <Image
                        src={it.img}
                        alt={it.name}
                        width={64}
                        height={64}
                        style={{
                          width: 64,
                          height: 64,
                          flex: "none",
                          borderRadius: 12,
                          objectFit: "cover",
                          boxShadow: "0 6px 16px rgba(40,24,12,0.18)",
                        }}
                      />
                    )}
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          gap: 12,
                        }}
                      >
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: 22,
                            fontWeight: 600,
                            margin: 0,
                          }}
                        >
                          {it.name}
                        </h3>
                        {it.price && (
                          <span
                            style={{
                              fontFamily: "var(--font-sans)",
                              fontSize: 15,
                              fontWeight: 600,
                              color: "var(--color-brown)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            ${it.price}
                          </span>
                        )}
                      </div>
                      {it.desc && (
                        <p
                          style={{
                            fontSize: 13.5,
                            lineHeight: 1.5,
                            color: "rgba(36,24,19,0.6)",
                            margin: "4px 0 0",
                          }}
                        >
                          {it.desc}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* CTA band */}
          <div
            style={{
              textAlign: "center",
              marginTop: 12,
              padding: "clamp(34px, 4vw, 50px)",
              background: "linear-gradient(140deg, #f1e3cd, #e6d4b6)",
              borderRadius: 22,
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(26px, 3vw, 36px)",
                fontWeight: 600,
                margin: "0 0 10px",
              }}
            >
              Order ahead &amp; skip the line
            </h3>
            <p
              style={{
                fontSize: 15,
                color: "rgba(36,24,19,0.7)",
                margin: "0 0 22px",
              }}
            >
              Have it ready the moment you walk in.
            </p>
            <Button href="/visit" variant="dark" style={{ padding: "14px 30px" }}>
              Order Online
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
