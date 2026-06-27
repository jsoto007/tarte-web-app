"use client";

import { useId, useState } from "react";
import { isProd, submitNetlifyForm } from "@/lib/forms";
import {
  isFutureOrToday,
  isValidEmail,
  isValidGuests,
} from "@/lib/validation";

type Values = {
  name: string;
  guests: string;
  date: string;
  time: string;
  email: string;
  message: string;
};

type Status = "idle" | "submitting" | "success" | "error";

const empty: Values = {
  name: "",
  guests: "",
  date: "",
  time: "",
  email: "",
  message: "",
};

const errorTextStyle = {
  margin: "6px 0 0",
  fontSize: 12.5,
  color: "#e7a17a",
} as const;

export function ReservationForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>(
    {},
  );
  const [status, setStatus] = useState<Status>("idle");
  const baseId = useId();
  const fid = (k: keyof Values) => `${baseId}-${k}`;
  const eid = (k: keyof Values) => `${baseId}-${k}-err`;

  const set = (k: keyof Values, v: string) =>
    setValues((s) => ({ ...s, [k]: v }));

  function validate(): Partial<Record<keyof Values, string>> {
    const e: Partial<Record<keyof Values, string>> = {};
    if (!values.name.trim()) e.name = "Please tell us your name.";
    if (!values.guests.trim()) e.guests = "How many guests?";
    else if (!isValidGuests(values.guests)) e.guests = "Enter 1–99 guests.";
    if (!values.date) e.date = "Pick a date.";
    else if (!isFutureOrToday(values.date)) e.date = "Choose today or later.";
    if (!values.time) e.time = "Pick a time.";
    if (!values.email.trim()) e.email = "We need an email to confirm.";
    else if (!isValidEmail(values.email)) e.email = "Enter a valid email.";
    return e;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    const order: (keyof Values)[] = ["name", "guests", "date", "time", "email"];
    const firstInvalid = order.find((k) => e[k]);
    if (firstInvalid) {
      document.getElementById(fid(firstInvalid))?.focus();
      return;
    }
    setStatus("submitting");
    const ok = await submitNetlifyForm("reservation", values);
    setStatus(ok || !isProd ? "success" : "error");
  }

  const fieldProps = (k: keyof Values) => ({
    id: fid(k),
    name: k,
    value: values[k],
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? eid(k) : undefined,
    className: "res-input",
  });

  const panelStyle = {
    background: "linear-gradient(150deg, #2f2017, #211610)",
    color: "var(--color-cream-text)",
    borderRadius: 20,
    padding: "clamp(28px, 4vw, 44px)",
  } as const;

  if (status === "success") {
    return (
      <div style={panelStyle}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 30,
            fontWeight: 600,
            margin: "0 0 10px",
          }}
        >
          Request received
        </h2>
        <p
          role="status"
          style={{
            fontSize: 15,
            lineHeight: 1.7,
            color: "rgba(243,233,218,0.8)",
            margin: 0,
          }}
        >
          Thanks, {values.name || "friend"} — we’ll confirm by email shortly and
          have the corner ready for you.
        </p>
      </div>
    );
  }

  return (
    <div style={panelStyle}>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 30,
          fontWeight: 600,
          margin: "0 0 6px",
        }}
      >
        Reserve a table
      </h2>
      <p
        style={{
          fontSize: 14.5,
          color: "rgba(243,233,218,0.7)",
          margin: "0 0 26px",
        }}
      >
        Tell us when — we’ll have the corner ready.
      </p>

      <form
        name="reservation"
        onSubmit={handleSubmit}
        noValidate
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
          }}
        >
          <div>
            <label htmlFor={fid("name")} className="visually-hidden">
              Name
            </label>
            <input
              {...fieldProps("name")}
              type="text"
              placeholder="Name"
              autoComplete="name"
              onChange={(e) => set("name", e.target.value)}
            />
            {errors.name && (
              <p id={eid("name")} role="alert" style={errorTextStyle}>
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor={fid("guests")} className="visually-hidden">
              Guests
            </label>
            <input
              {...fieldProps("guests")}
              type="number"
              min={1}
              max={99}
              placeholder="Guests"
              onChange={(e) => set("guests", e.target.value)}
            />
            {errors.guests && (
              <p id={eid("guests")} role="alert" style={errorTextStyle}>
                {errors.guests}
              </p>
            )}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
          }}
        >
          <div>
            <label htmlFor={fid("date")} className="visually-hidden">
              Date
            </label>
            <input
              {...fieldProps("date")}
              type="date"
              aria-label="Date"
              onChange={(e) => set("date", e.target.value)}
            />
            {errors.date && (
              <p id={eid("date")} role="alert" style={errorTextStyle}>
                {errors.date}
              </p>
            )}
          </div>
          <div>
            <label htmlFor={fid("time")} className="visually-hidden">
              Time
            </label>
            <input
              {...fieldProps("time")}
              type="time"
              aria-label="Time"
              onChange={(e) => set("time", e.target.value)}
            />
            {errors.time && (
              <p id={eid("time")} role="alert" style={errorTextStyle}>
                {errors.time}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor={fid("email")} className="visually-hidden">
            Email
          </label>
          <input
            {...fieldProps("email")}
            type="email"
            placeholder="Email"
            autoComplete="email"
            onChange={(e) => set("email", e.target.value)}
          />
          {errors.email && (
            <p id={eid("email")} role="alert" style={errorTextStyle}>
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={fid("message")} className="visually-hidden">
            Anything we should know?
          </label>
          <textarea
            {...fieldProps("message")}
            placeholder="Anything we should know?"
            rows={3}
            style={{ resize: "vertical" }}
            onChange={(e) => set("message", e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn btn--accent"
          style={{ padding: 15, borderRadius: 12, marginTop: 4 }}
        >
          {status === "submitting" ? "Sending…" : "Request Reservation"}
        </button>

        {status === "error" && (
          <p role="alert" style={errorTextStyle}>
            Something went wrong sending your request. Please try again or call
            us.
          </p>
        )}
      </form>
    </div>
  );
}
