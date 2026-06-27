export default function Home() {
  return (
    <main
      className="animate-fade-up"
      style={{ padding: "clamp(40px, 6vw, 96px)" }}
    >
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(48px, 7vw, 92px)",
          fontWeight: 600,
          margin: 0,
        }}
      >
        Tarte
      </h1>
      <p style={{ fontFamily: "var(--font-sans)", color: "var(--color-brown)" }}>
        Crafted Coffee &amp; Cozy Moments — site under construction.
      </p>
    </main>
  );
}
