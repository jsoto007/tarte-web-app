import { describe, expect, it } from "vitest";
import {
  encodeForm,
  isFutureOrToday,
  isValidEmail,
  isValidGuests,
} from "./validation";

describe("isValidEmail", () => {
  it("accepts well-formed addresses", () => {
    expect(isValidEmail("jane@example.com")).toBe(true);
    expect(isValidEmail("a.b-c+tag@sub.domain.co")).toBe(true);
    expect(isValidEmail("  hello@tartecoffee.co  ")).toBe(true);
  });

  it("rejects malformed addresses", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("jane")).toBe(false);
    expect(isValidEmail("jane@")).toBe(false);
    expect(isValidEmail("jane@example")).toBe(false);
    expect(isValidEmail("jane @example.com")).toBe(false);
    expect(isValidEmail(`${"a".repeat(255)}@x.co`)).toBe(false);
  });
});

describe("isFutureOrToday", () => {
  it("accepts today and future dates", () => {
    const today = new Date();
    const iso = (d: Date) => d.toISOString().slice(0, 10);
    expect(isFutureOrToday(iso(today))).toBe(true);
    const future = new Date(today);
    future.setFullYear(future.getFullYear() + 1);
    expect(isFutureOrToday(iso(future))).toBe(true);
  });

  it("rejects past dates and junk", () => {
    expect(isFutureOrToday("2000-01-01")).toBe(false);
    expect(isFutureOrToday("")).toBe(false);
    expect(isFutureOrToday("not-a-date")).toBe(false);
  });
});

describe("isValidGuests", () => {
  it("accepts whole numbers 1–99", () => {
    expect(isValidGuests("1")).toBe(true);
    expect(isValidGuests("2")).toBe(true);
    expect(isValidGuests("99")).toBe(true);
  });

  it("rejects zero, negatives, fractions, and out-of-range", () => {
    expect(isValidGuests("0")).toBe(false);
    expect(isValidGuests("-1")).toBe(false);
    expect(isValidGuests("2.5")).toBe(false);
    expect(isValidGuests("100")).toBe(false);
    expect(isValidGuests("")).toBe(false);
    expect(isValidGuests("two")).toBe(false);
  });
});

describe("encodeForm", () => {
  it("URL-encodes keys and values", () => {
    expect(encodeForm({ "form-name": "reservation", email: "a@b.co" })).toBe(
      "form-name=reservation&email=a%40b.co",
    );
    expect(encodeForm({ msg: "a & b" })).toBe("msg=a%20%26%20b");
  });
});
