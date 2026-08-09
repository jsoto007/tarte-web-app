import { describe, expect, it } from "vitest";
import { cakeTotalCents, escapeHtml, validateCakeOrder } from "./cakeOrder";

const valid = {
  customerName: "Jane Rivera",
  customerEmail: "jane@example.com",
  dateNeeded: "2026-08-10",
  timeNeeded: "15:30",
  numberOfPeople: "12",
  flavor: "Red Velvet",
  messageOnCake: "Happy Birthday",
  additionalNotes: "Gold trim",
};

describe("specialty cake orders", () => {
  it("calculates the estimate using integer cents", () => {
    expect(cakeTotalCents("1")).toBe(900);
    expect(cakeTotalCents("12")).toBe(10_800);
    expect(cakeTotalCents("0")).toBeNull();
    expect(cakeTotalCents("1.5")).toBeNull();
    expect(cakeTotalCents("501")).toBeNull();
  });

  it("accepts all required fields and rejects forged flavors", () => {
    const today = new Date("2026-08-09T12:00:00");
    expect(validateCakeOrder(valid, today)).toEqual({});
    expect(
      validateCakeOrder({ ...valid, flavor: "Strawberry" }, today).flavor,
    ).toBe("Choose a cake flavor.");
  });

  it("escapes customer content before putting it in HTML email", () => {
    expect(escapeHtml('<img src=x onerror="bad">')).toBe(
      "&lt;img src=x onerror=&quot;bad&quot;&gt;",
    );
  });
});
