import { encodeForm } from "./validation";

/**
 * Submit a form to Netlify Forms.
 *
 * Netlify detects forms from the static `public/__forms.html` file at build
 * time and captures POSTs to it (no backend needed). Client components POST
 * here with the matching `form-name`. Returns whether the POST succeeded.
 */
export async function submitNetlifyForm(
  formName: string,
  data: Record<string, string>,
): Promise<boolean> {
  try {
    const res = await fetch("/__forms.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeForm({ "form-name": formName, ...data }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Whether to treat a failed/unsupported submission as success. Locally there
 * is no Netlify backend, so forms resolve optimistically for testing; in
 * production a failure is surfaced to the user.
 */
export const isProd = process.env.NODE_ENV === "production";
