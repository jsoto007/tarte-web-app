"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  CAKE_PRICE_PER_PERSON_CENTS,
  MAX_CAKE_ATTACHMENT_BYTES,
  MAX_CAKE_ATTACHMENT_COUNT,
  MAX_CAKE_ATTACHMENTS_TOTAL_BYTES,
  cakeFlavors,
  cakeOrderCopy,
} from "@/data/cakeOrder";
import {
  cakeTotalCents,
  formatUsd,
  type CakeOrderField,
  type CakeOrderFields,
  validateCakeOrder,
} from "@/lib/cakeOrder";
import { formatFileSize, optimizeCakeImage } from "@/lib/imageOptimization";

const empty: CakeOrderFields = {
  customerName: "",
  customerEmail: "",
  dateNeeded: "",
  timeNeeded: "",
  numberOfPeople: "",
  flavor: "",
  messageOnCake: "",
  additionalNotes: "",
};

export function CakeOrderForm() {
  const [values, setValues] = useState(empty);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<CakeOrderField, string>>>({});
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [receiptSent, setReceiptSent] = useState(true);
  const baseId = useId();
  const successRef = useRef<HTMLElement>(null);
  const id = (field: CakeOrderField) => `${baseId}-${field}`;
  const errorId = (field: CakeOrderField) => `${id(field)}-error`;
  const totalCents = useMemo(
    () => cakeTotalCents(values.numberOfPeople),
    [values.numberOfPeople],
  );

  useEffect(() => {
    if (status !== "success") return;
    const panel = successRef.current;
    if (!panel) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    panel.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "center",
    });
    panel.focus({ preventScroll: true });
  }, [status]);

  const set = (field: CakeOrderField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateCakeOrder(values);
    setErrors(nextErrors);
    const attachmentBytes = attachments.reduce((sum, file) => sum + file.size, 0);
    if (
      attachments.length > MAX_CAKE_ATTACHMENT_COUNT ||
      attachments.some((file) => file.size > MAX_CAKE_ATTACHMENT_BYTES) ||
      attachmentBytes > MAX_CAKE_ATTACHMENTS_TOTAL_BYTES
    ) {
      setFormError("Attachments must total no more than 4 MB.");
      return;
    }
    setFormError("");
    const order: CakeOrderField[] = [
      "customerName",
      "customerEmail",
      "dateNeeded",
      "timeNeeded",
      "numberOfPeople",
      "flavor",
    ];
    const invalid = order.find((field) => nextErrors[field]);
    if (invalid) {
      document.getElementById(id(invalid))?.focus();
      return;
    }

    const body = new FormData();
    for (const [key, value] of Object.entries(values)) body.set(key, value);
    for (const file of attachments) body.append("attachments", file);
    setStatus("submitting");
    try {
      const response = await fetch("/api/cake-orders", { method: "POST", body });
      const result = (await response.json()) as {
        error?: string;
        errors?: Partial<Record<CakeOrderField, string>>;
        receiptSent?: boolean;
      };
      if (!response.ok) {
        if (result.errors) setErrors(result.errors);
        throw new Error(result.error || "Please review the highlighted fields and try again.");
      }
      setReceiptSent(result.receiptSent !== false);
      setStatus("success");
    } catch (error) {
      setStatus("idle");
      setFormError(error instanceof Error ? error.message : "Unable to send request.");
    }
  }

  if (status === "success") {
    return (
      <section ref={successRef} className="cake-form-panel" aria-labelledby="cake-success-title" role="status" tabIndex={-1}>
        <h2 id="cake-success-title">{cakeOrderCopy.successTitle}</h2>
        <p>{receiptSent ? cakeOrderCopy.successBody : "The restaurant received your request, but we could not send your email copy. They will follow up to confirm availability."}</p>
        <p><strong>Estimated total: {formatUsd(totalCents!)}</strong></p>
      </section>
    );
  }

  const fieldProps = (field: CakeOrderField) => ({
    id: id(field),
    name: field,
    value: values[field],
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? errorId(field) : undefined,
    className: "cake-input",
  });
  const error = (field: CakeOrderField) =>
    errors[field] ? <p id={errorId(field)} className="cake-error" role="alert">{errors[field]}</p> : null;

  return (
    <form className="cake-form-panel" onSubmit={submit} noValidate>
      <div className="cake-form-grid">
        <div>
          <label htmlFor={id("customerName")}>Customer name <span aria-hidden>*</span></label>
          <input {...fieldProps("customerName")} required maxLength={120} autoComplete="name" onChange={(e) => set("customerName", e.target.value)} />
          {error("customerName")}
        </div>
        <div>
          <label htmlFor={id("customerEmail")}>Email <span aria-hidden>*</span></label>
          <input {...fieldProps("customerEmail")} required type="email" autoComplete="email" onChange={(e) => set("customerEmail", e.target.value)} />
          {error("customerEmail")}
        </div>
        <div>
          <label htmlFor={id("dateNeeded")}>Date needed <span aria-hidden>*</span></label>
          <input {...fieldProps("dateNeeded")} required type="date" onChange={(e) => set("dateNeeded", e.target.value)} />
          {error("dateNeeded")}
        </div>
        <div>
          <label htmlFor={id("timeNeeded")}>Time needed <span aria-hidden>*</span></label>
          <input {...fieldProps("timeNeeded")} required type="time" onChange={(e) => set("timeNeeded", e.target.value)} />
          {error("timeNeeded")}
        </div>
        <div>
          <label htmlFor={id("numberOfPeople")}>Number of people <span aria-hidden>*</span></label>
          <input {...fieldProps("numberOfPeople")} required type="number" min="1" max="500" inputMode="numeric" onChange={(e) => set("numberOfPeople", e.target.value)} />
          {error("numberOfPeople")}
        </div>
        <div>
          <label htmlFor={id("flavor")}>Flavor <span aria-hidden>*</span></label>
          <select {...fieldProps("flavor")} required onChange={(e) => set("flavor", e.target.value)}>
            <option value="">Choose a flavor</option>
            {cakeFlavors.map((flavor) => <option key={flavor}>{flavor}</option>)}
          </select>
          {error("flavor")}
        </div>
      </div>
      <div className="visually-hidden" aria-hidden="true">
        <label htmlFor={`${baseId}-website`}>Website</label>
        <input id={`${baseId}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor={id("messageOnCake")}>Message on the cake</label>
        <input {...fieldProps("messageOnCake")} maxLength={120} onChange={(e) => set("messageOnCake", e.target.value)} />
      </div>
      <div>
        <label htmlFor={id("additionalNotes")}>Additional notes</label>
        <textarea {...fieldProps("additionalNotes")} rows={5} maxLength={2000} onChange={(e) => set("additionalNotes", e.target.value)} />
      </div>
      <div>
        <label htmlFor={`${baseId}-attachments`}>Inspiration attachments</label>
        <input
          id={`${baseId}-attachments`}
          name="attachments"
          className="cake-input"
          type="file"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          multiple
          disabled={isOptimizing || status === "submitting"}
          onChange={async (e) => {
            const files = Array.from(e.target.files ?? []);
            if (files.length > MAX_CAKE_ATTACHMENT_COUNT) {
              setFormError("Attach no more than 3 files.");
              setAttachments([]);
              return;
            }
            setIsOptimizing(true);
            setFormError("");
            try {
              const optimized = await Promise.all(
                files.map((file) => optimizeCakeImage(file)),
              );
              const totalBytes = optimized.reduce((sum, file) => sum + file.size, 0);
              if (
                optimized.some((file) => file.size > MAX_CAKE_ATTACHMENT_BYTES) ||
                totalBytes > MAX_CAKE_ATTACHMENTS_TOTAL_BYTES
              ) {
                setAttachments([]);
                setFormError("The optimized attachments still exceed 4 MB. Please choose fewer files or a smaller PDF.");
              } else {
                setAttachments(optimized);
              }
            } catch {
              setAttachments([]);
              setFormError("We could not optimize one of those images. Please try a JPG, PNG, or WebP file.");
            } finally {
              setIsOptimizing(false);
            }
          }}
        />
        <p className="cake-help">Up to 3 JPG, PNG, WebP, or PDF files. Photos are optimized before sending; PDFs count toward the 4 MB total.</p>
        {isOptimizing && <p className="cake-help" role="status">Optimizing photos…</p>}
        {!isOptimizing && attachments.length > 0 && (
          <ul className="cake-file-list" aria-label="Files ready to send">
            {attachments.map((file) => (
              <li key={`${file.name}-${file.size}`}>
                {file.name} <span>({formatFileSize(file.size)})</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="cake-estimate" aria-live="polite">
        <span>{formatUsd(CAKE_PRICE_PER_PERSON_CENTS)} per person</span>
        <strong>{totalCents === null ? "Enter guest count for estimate" : `Estimated total: ${formatUsd(totalCents)}`}</strong>
      </div>
      <p className="cake-help">This request does not collect payment. Tarte will confirm availability and finalize the order with you.</p>
      {formError && <p className="cake-error" role="alert">{formError}</p>}
      <button className="btn btn--accent" type="submit" disabled={status === "submitting" || isOptimizing}>
        {isOptimizing ? "Optimizing photos…" : status === "submitting" ? "Sending…" : cakeOrderCopy.submit}
      </button>
    </form>
  );
}
