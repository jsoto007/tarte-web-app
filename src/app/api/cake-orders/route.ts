import { NextResponse } from "next/server";
import {
  CAKE_PRICE_PER_PERSON_CENTS,
  MAX_CAKE_ATTACHMENT_BYTES,
  MAX_CAKE_ATTACHMENT_COUNT,
  MAX_CAKE_ATTACHMENTS_TOTAL_BYTES,
  cakeOrderCopy,
} from "@/data/cakeOrder";
import {
  cakeTotalCents,
  escapeHtml,
  formatUsd,
  type CakeOrderFields,
  validateCakeOrder,
} from "@/lib/cakeOrder";

export const runtime = "nodejs";

// Netlify's 6 MB buffered function limit becomes roughly 4.5 MB for binary
// requests after Base64 encoding. Leave room for multipart field overhead.
const MAX_REQUEST_BYTES = Math.floor(4.25 * 1024 * 1024);
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const ALLOWED_FILE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);

function env(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

function getFields(data: FormData): CakeOrderFields {
  const text = (name: keyof CakeOrderFields) =>
    String(data.get(name) ?? "").trim();
  return {
    customerName: text("customerName"),
    customerEmail: text("customerEmail"),
    dateNeeded: text("dateNeeded"),
    timeNeeded: text("timeNeeded"),
    numberOfPeople: text("numberOfPeople"),
    flavor: text("flavor"),
    messageOnCake: text("messageOnCake"),
    additionalNotes: text("additionalNotes"),
  };
}

function orderHtml(fields: CakeOrderFields, total: string): string {
  const row = (label: string, value: string) =>
    `<tr><th align="left" style="padding:6px 12px 6px 0">${label}</th><td style="padding:6px 0">${escapeHtml(value || "—")}</td></tr>`;
  return `<table>${row("Customer", fields.customerName)}${row("Email", fields.customerEmail)}${row("Date needed", fields.dateNeeded)}${row("Time needed", fields.timeNeeded)}${row("People", fields.numberOfPeople)}${row("Flavor", fields.flavor)}${row("Message on cake", fields.messageOnCake)}${row("Additional notes", fields.additionalNotes)}${row("Estimated total", `${total} (${formatUsd(CAKE_PRICE_PER_PERSON_CENTS)} per person)`)}</table>`;
}

async function hasAllowedSignature(file: File): Promise<boolean> {
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  if (file.type === "image/jpeg") return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (file.type === "image/png") return bytes.slice(0, 8).every((v, i) => v === [137, 80, 78, 71, 13, 10, 26, 10][i]);
  if (file.type === "image/webp") return String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
  if (file.type === "application/pdf") return String.fromCharCode(...bytes.slice(0, 4)) === "%PDF";
  return false;
}

function isRateLimited(request: Request): boolean {
  const key = request.headers.get("x-nf-client-connection-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const current = rateLimits.get(key);
  if (!current || current.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + 15 * 60_000 });
    return false;
  }
  current.count += 1;
  return current.count > 5;
}

async function sendMailgun(
  apiKey: string,
  domain: string,
  message: FormData,
): Promise<void> {
  const region = process.env.MAILGUN_REGION?.toLowerCase() === "eu" ? "api.eu.mailgun.net" : "api.mailgun.net";
  const response = await fetch(`https://${region}/v3/${domain}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString("base64")}`,
    },
    body: message,
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error(`Mailgun request failed (${response.status})`);
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > MAX_REQUEST_BYTES)
      return NextResponse.json({ error: "Request is too large." }, { status: 413 });
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin)
      return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
    if (isRateLimited(request))
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    const data = await request.formData();
    if (String(data.get("website") || "")) return NextResponse.json({ ok: true });
    const fields = getFields(data);
    const errors = validateCakeOrder(fields);
    if (Object.keys(errors).length) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const attachments = data
      .getAll("attachments")
      .filter((entry): entry is File => entry instanceof File && entry.size > 0);
    if (attachments.length > MAX_CAKE_ATTACHMENT_COUNT) {
      return NextResponse.json({ error: "Attach no more than 3 files." }, { status: 400 });
    }
    let totalAttachmentBytes = 0;
    for (const file of attachments) {
      totalAttachmentBytes += file.size;
      if (!ALLOWED_FILE_TYPES.has(file.type) || file.size > MAX_CAKE_ATTACHMENT_BYTES || !(await hasAllowedSignature(file))) {
        return NextResponse.json(
          { error: "Attachments must be JPG, PNG, WebP, or PDF files within the 4 MB total limit." },
          { status: 400 },
        );
      }
    }
    if (totalAttachmentBytes > MAX_CAKE_ATTACHMENTS_TOTAL_BYTES) {
      return NextResponse.json({ error: "Attachments may total no more than 4 MB." }, { status: 400 });
    }

    const apiKey = env("MAILGUN_API_KEY");
    const domain = env("MAILGUN_DOMAIN");
    const restaurantEmail = env("CAKE_ORDER_EMAIL");
    const from = process.env.MAILGUN_FROM_EMAIL?.trim() || `Tarte Cake Orders <orders@${domain}>`;
    const totalCents = cakeTotalCents(fields.numberOfPeople)!;
    const total = formatUsd(totalCents);
    const details = orderHtml(fields, total);

    const restaurantMessage = new FormData();
    restaurantMessage.set("from", from);
    restaurantMessage.set("to", restaurantEmail);
    restaurantMessage.set("h:Reply-To", fields.customerEmail);
    const subjectName = fields.customerName.replace(/[\r\n]+/g, " ");
    restaurantMessage.set("subject", `Specialty cake request — ${subjectName} — ${fields.dateNeeded}`);
    restaurantMessage.set("html", `<h1>New specialty cake request</h1>${details}`);
    for (const file of attachments) {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120) || "attachment";
      restaurantMessage.append("attachment", file, safeName);
    }

    const customerMessage = new FormData();
    customerMessage.set("from", from);
    customerMessage.set("to", fields.customerEmail);
    customerMessage.set("h:Reply-To", restaurantEmail);
    customerMessage.set("subject", "We received your Tarte specialty cake request");
    customerMessage.set(
      "html",
      `<h1>${cakeOrderCopy.successTitle}</h1><p>${cakeOrderCopy.successBody}</p>${details}<p><strong>This is a request summary, not proof of payment or final confirmation.</strong></p>`,
    );

    await sendMailgun(apiKey, domain, restaurantMessage);
    let receiptSent = true;
    try {
      await sendMailgun(apiKey, domain, customerMessage);
    } catch (error) {
      receiptSent = false;
      console.error("Cake order receipt failed after restaurant delivery", error);
    }
    return NextResponse.json({ ok: true, receiptSent });
  } catch (error) {
    console.error("Cake order submission failed", error);
    return NextResponse.json(
      { error: "We couldn’t send your request. Please try again or call the restaurant." },
      { status: 500 },
    );
  }
}
