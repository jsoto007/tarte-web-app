/** Small, dependency-free validators shared by the forms (and unit tests). */

/** Pragmatic email check: non-empty local + domain with a dotted TLD. */
export function isValidEmail(value: string): boolean {
  const v = value.trim();
  if (v.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

/** True when `value` is a calendar date that is today or later (local time). */
export function isFutureOrToday(value: string): boolean {
  if (!value) return false;
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date.getTime() >= today.getTime();
}

/** Guests must be a whole number of at least 1. */
export function isValidGuests(value: string): boolean {
  const n = Number(value);
  return Number.isInteger(n) && n >= 1 && n <= 99;
}

/** Encode form fields as `application/x-www-form-urlencoded` for Netlify. */
export function encodeForm(data: Record<string, string>): string {
  return Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join("&");
}
