import Image from "next/image";
import { gallery } from "@/data/gallery";
import { Button } from "./Button";
import { Eyebrow } from "./Eyebrow";
import { InstagramHandle } from "./InstagramIcon";

function Tile({ label, img }: { label: string; img: string }) {
  return (
    <div
      style={{
        width: 220,
        height: 220,
        borderRadius: 16,
        position: "relative",
        flex: "none",
        overflow: "hidden",
        background: "#2a1a10",
        boxShadow: "inset 0 -30px 60px rgba(0,0,0,0.25)",
      }}
    >
      <Image
        src={img}
        alt=""
        fill
        sizes="220px"
        style={{ objectFit: "cover" }}
      />
      <span
        style={{
          position: "absolute",
          bottom: 12,
          left: 14,
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "1.2px",
          color: "rgba(243,233,218,0.85)",
          textTransform: "uppercase",
          textShadow: "0 1px 6px rgba(0,0,0,0.5)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/**
 * Home "From the 'gram" strip. Pure-CSS infinite marquee — the tile list is
 * duplicated for a seamless loop; pauses on hover and respects
 * prefers-reduced-motion (see globals.css).
 */
export function InstagramMarquee() {
  return (
    <section
      aria-label="Instagram highlights"
      style={{
        padding: "clamp(50px, 6vw, 84px) 0",
        background: "var(--color-cream)",
        overflow: "hidden",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 36, padding: "0 20px" }}>
        <Eyebrow>
          <InstagramHandle handle="@tartecoffee" />
        </Eyebrow>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(30px, 4vw, 48px)",
            fontWeight: 600,
            margin: "10px 0 0",
            letterSpacing: "-0.5px",
          }}
        >
          From the ‘gram
        </h2>
      </div>

      <div className="marquee">
        <div className="marquee__track">
          {gallery.map((g, i) => (
            <Tile key={`a-${i}`} label={g.label} img={g.img} />
          ))}
          {gallery.map((g, i) => (
            <Tile key={`b-${i}`} label={g.label} img={g.img} />
          ))}
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 38 }}>
        <Button
          variant="outline-dark"
          href="/gallery"
          style={{ fontWeight: 500, padding: "14px 30px" }}
        >
          View Full Gallery
        </Button>
      </div>
    </section>
  );
}
