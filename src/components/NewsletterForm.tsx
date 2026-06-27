"use client";

import { useId, useState } from "react";
import { isValidEmail } from "@/lib/validation";
import { isProd, submitNetlifyForm } from "@/lib/forms";

type Status = "idle" | "submitting" | "success" | "error";

/** Footer newsletter signup. Posts to Netlify Forms ("newsletter"). */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const errorId = useId();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setStatus("submitting");
    const ok = await submitNetlifyForm("newsletter", { email });
    if (ok || !isProd) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p
        role="status"
        style={{
          fontSize: 14,
          lineHeight: 1.6,
          margin: 0,
          color: "var(--color-accent-light)",
        }}
      >
        Thanks — you’re on the list. See you for the next pour.
      </p>
    );
  }

  return (
    <form
      name="newsletter"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Newsletter signup"
    >
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          aria-label="Email address"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          style={{
            flex: 1,
            minWidth: 0,
            background: "rgba(243,233,218,0.08)",
            border: "1px solid rgba(243,233,218,0.2)",
            borderRadius: 100,
            padding: "11px 16px",
            color: "var(--color-cream-text)",
            fontFamily: "var(--font-sans)",
            fontSize: 13.5,
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn btn--accent"
          style={{
            fontSize: 13,
            padding: "0 18px",
          }}
        >
          {status === "submitting" ? "…" : "Join"}
        </button>
      </div>
      {error && (
        <p
          id={errorId}
          role="alert"
          style={{
            margin: "8px 0 0",
            fontSize: 12.5,
            color: "#e7a17a",
          }}
        >
          {error}
        </p>
      )}
      {status === "error" && (
        <p
          role="alert"
          style={{ margin: "8px 0 0", fontSize: 12.5, color: "#e7a17a" }}
        >
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
