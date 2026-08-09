import {
  CAKE_PRICE_PER_PERSON_CENTS,
  cakeFlavors,
  type CakeFlavor,
} from "@/data/cakeOrder";
import { isValidEmail } from "@/lib/validation";

export type CakeOrderFields = {
  customerName: string;
  customerEmail: string;
  dateNeeded: string;
  timeNeeded: string;
  numberOfPeople: string;
  flavor: string;
  messageOnCake: string;
  additionalNotes: string;
};

export type CakeOrderField = keyof CakeOrderFields;

export function cakeTotalCents(numberOfPeople: string): number | null {
  const people = Number(numberOfPeople);
  if (!Number.isInteger(people) || people < 1 || people > 500) return null;
  return people * CAKE_PRICE_PER_PERSON_CENTS;
}

export function formatUsd(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function dateInNewYork(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function validateCakeOrder(
  values: CakeOrderFields,
  today = new Date(),
): Partial<Record<CakeOrderField, string>> {
  const errors: Partial<Record<CakeOrderField, string>> = {};
  if (!values.customerName.trim()) errors.customerName = "Enter your name.";
  else if (values.customerName.length > 120)
    errors.customerName = "Name must be 120 characters or fewer.";
  if (!values.customerEmail.trim()) errors.customerEmail = "Enter your email.";
  else if (!isValidEmail(values.customerEmail))
    errors.customerEmail = "Enter a valid email.";

  if (!values.dateNeeded) errors.dateNeeded = "Choose the date needed.";
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.dateNeeded))
    errors.dateNeeded = "Enter a valid date.";
  else {
    const [year, month, day] = values.dateNeeded.split("-").map(Number);
    const requested = new Date(Date.UTC(year, month - 1, day));
    const roundTrip = requested.toISOString().slice(0, 10);
    if (roundTrip !== values.dateNeeded) errors.dateNeeded = "Enter a valid date.";
    else if (values.dateNeeded < dateInNewYork(today))
      errors.dateNeeded = "Choose today or a future date.";
  }
  if (!values.timeNeeded) errors.timeNeeded = "Choose the time needed.";
  else if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(values.timeNeeded))
    errors.timeNeeded = "Enter a valid time.";
  if (cakeTotalCents(values.numberOfPeople) === null)
    errors.numberOfPeople = "Enter between 1 and 500 people.";
  if (!cakeFlavors.includes(values.flavor as CakeFlavor))
    errors.flavor = "Choose a cake flavor.";
  if (values.messageOnCake.length > 120)
    errors.messageOnCake = "Cake message must be 120 characters or fewer.";
  if (values.additionalNotes.length > 2000)
    errors.additionalNotes = "Notes must be 2,000 characters or fewer.";
  return errors;
}

export function escapeHtml(value: string): string {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character]!,
  );
}
