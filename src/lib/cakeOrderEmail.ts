import { CAKE_PRICE_PER_PERSON_CENTS } from "@/data/cakeOrder";
import { site } from "@/data/site";
import {
  escapeHtml,
  formatUsd,
  type CakeOrderFields,
} from "@/lib/cakeOrder";

const LOGO_URL =
  "https://tartebakes.com/_next/image?url=%2Fassets%2Ftarte-logo.png&amp;w=64&amp;q=75";
const WEBSITE_URL = "https://tartebakes.com";

function formatDate(value: string): string {
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function formatTime(value: string): string {
  const [hours, minutes] = value.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

function detailRow(label: string, value: string, accent = false): string {
  return `<tr>
    <td style="padding:13px 16px;border-bottom:1px solid #eee4d8;color:#715b4b;font-size:13px;line-height:1.45;width:38%;">${label}</td>
    <td style="padding:13px 16px;border-bottom:1px solid #eee4d8;color:${accent ? "#9b5e2f" : "#2f2119"};font-size:14px;line-height:1.45;font-weight:${accent ? "700" : "600"};">${escapeHtml(value || "—")}</td>
  </tr>`;
}

function detailsTable(fields: CakeOrderFields, total: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:separate;border-spacing:0;background:#fffdf9;border:1px solid #e8dccd;border-radius:14px;overflow:hidden;">
    ${detailRow("Customer", fields.customerName)}
    ${detailRow("Email", fields.customerEmail)}
    ${detailRow("Date needed", formatDate(fields.dateNeeded))}
    ${detailRow("Time needed", formatTime(fields.timeNeeded))}
    ${detailRow("Number of people", fields.numberOfPeople)}
    ${detailRow("Flavor", fields.flavor)}
    ${detailRow("Message on cake", fields.messageOnCake)}
    ${detailRow("Additional notes", fields.additionalNotes)}
    ${detailRow("Estimated total", `${total} · ${formatUsd(CAKE_PRICE_PER_PERSON_CENTS)} per person`, true)}
  </table>`;
}

function emailShell({
  preheader,
  eyebrow,
  title,
  intro,
  details,
  notice,
}: {
  preheader: string;
  eyebrow: string;
  title: string;
  intro: string;
  details: string;
  notice: string;
}): string {
  const phoneHref = site.contact.phone.replace(/[^\d+]/g, "");
  return `<!doctype html>
  <html lang="en">
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title></head>
    <body style="margin:0;padding:0;background:#f4ede3;font-family:Arial,Helvetica,sans-serif;color:#2f2119;">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f4ede3;">
        <tr><td align="center" style="padding:32px 14px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:620px;background:#fffaf3;border-radius:20px;overflow:hidden;box-shadow:0 12px 34px rgba(66,42,27,.12);">
            <tr><td align="center" style="padding:28px 32px 22px;background:#fffaf3;border-bottom:1px solid #eadfD1;">
              <a href="${WEBSITE_URL}" style="text-decoration:none;"><img src="${LOGO_URL}" width="64" height="64" alt="Tarte Bakes &amp; Coffee Shop" style="display:block;width:64px;height:64px;border:0;"></a>
            </td></tr>
            <tr><td style="padding:38px 38px 34px;">
              <p style="margin:0 0 10px;color:#a26638;font-size:12px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;">${escapeHtml(eyebrow)}</p>
              <h1 style="margin:0 0 14px;color:#2f2119;font-family:Georgia,'Times New Roman',serif;font-size:34px;line-height:1.12;font-weight:600;">${escapeHtml(title)}</h1>
              <p style="margin:0 0 28px;color:#6e5949;font-size:16px;line-height:1.65;">${escapeHtml(intro)}</p>
              ${details}
              <div style="margin-top:24px;padding:16px 18px;background:#f3e4cf;border-left:4px solid #b77845;border-radius:8px;color:#594536;font-size:13px;line-height:1.6;">${escapeHtml(notice)}</div>
            </td></tr>
            <tr><td align="center" style="padding:28px 30px;background:#2f2119;color:#f6eadc;">
              <p style="margin:0 0 8px;font-family:Georgia,'Times New Roman',serif;font-size:20px;font-weight:600;">${escapeHtml(site.fullName)}</p>
              <p style="margin:0 0 12px;color:#d8c6b5;font-size:13px;line-height:1.6;">${escapeHtml(site.contact.addressLine)}, ${escapeHtml(site.contact.district)}</p>
              <p style="margin:0;font-size:13px;line-height:1.8;">
                <a href="tel:${phoneHref}" style="color:#f6eadc;text-decoration:none;">${escapeHtml(site.contact.phone)}</a>
                <span style="color:#896f5d;padding:0 7px;">·</span>
                <a href="mailto:${escapeHtml(site.contact.email)}" style="color:#f6eadc;text-decoration:none;">${escapeHtml(site.contact.email)}</a>
                <span style="color:#896f5d;padding:0 7px;">·</span>
                <a href="${WEBSITE_URL}" style="color:#f6eadc;text-decoration:none;">tartebakes.com</a>
              </p>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </body>
  </html>`;
}

export function restaurantCakeOrderEmail(
  fields: CakeOrderFields,
  total: string,
  attachmentCount: number,
): { html: string; text: string } {
  const attachmentNote = attachmentCount
    ? `${attachmentCount} inspiration ${attachmentCount === 1 ? "file is" : "files are"} attached to this email.`
    : "No inspiration files were attached.";
  return {
    html: emailShell({
      preheader: `New cake request from ${fields.customerName} for ${formatDate(fields.dateNeeded)}.`,
      eyebrow: "New specialty cake request",
      title: "A celebration is taking shape.",
      intro: `${fields.customerName} sent a new cake request. Reply directly to this email to confirm availability and finalize the details.`,
      details: detailsTable(fields, total),
      notice: attachmentNote,
    }),
    text: `NEW SPECIALTY CAKE REQUEST\n\nCustomer: ${fields.customerName}\nEmail: ${fields.customerEmail}\nDate needed: ${formatDate(fields.dateNeeded)}\nTime needed: ${formatTime(fields.timeNeeded)}\nPeople: ${fields.numberOfPeople}\nFlavor: ${fields.flavor}\nMessage on cake: ${fields.messageOnCake || "—"}\nAdditional notes: ${fields.additionalNotes || "—"}\nEstimated total: ${total} (${formatUsd(CAKE_PRICE_PER_PERSON_CENTS)} per person)\n\n${attachmentNote}\n\nReply to this email to contact the customer.`,
  };
}

export function customerCakeOrderEmail(
  fields: CakeOrderFields,
  total: string,
): { html: string; text: string } {
  const notice =
    "This is a request summary—not proof of payment or final confirmation. We’ll follow up to confirm availability and finalize your order.";
  return {
    html: emailShell({
      preheader: `We received your Tarte cake request for ${formatDate(fields.dateNeeded)}.`,
      eyebrow: "Request received",
      title: `Thanks, ${fields.customerName}.`,
      intro:
        "Your specialty cake request is with our team. We’re excited to learn about your celebration and will be in touch after reviewing the details below.",
      details: detailsTable(fields, total),
      notice,
    }),
    text: `THANKS, ${fields.customerName}\n\nWe received your Tarte specialty cake request.\n\nDate needed: ${formatDate(fields.dateNeeded)}\nTime needed: ${formatTime(fields.timeNeeded)}\nPeople: ${fields.numberOfPeople}\nFlavor: ${fields.flavor}\nMessage on cake: ${fields.messageOnCake || "—"}\nAdditional notes: ${fields.additionalNotes || "—"}\nEstimated total: ${total} (${formatUsd(CAKE_PRICE_PER_PERSON_CENTS)} per person)\n\n${notice}\n\n${site.fullName}\n${site.contact.addressLine}, ${site.contact.district}\n${site.contact.phone}\n${site.contact.email}\n${WEBSITE_URL}`,
  };
}
