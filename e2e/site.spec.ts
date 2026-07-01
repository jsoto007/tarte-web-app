import { test, expect } from "@playwright/test";

test.describe("navigation", () => {
  test("moves between pages and reflects the active route", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Homemade Bread",
    );

    const navLinks = page.locator(".nav__links");
    await navLinks.getByRole("link", { name: "Menu", exact: true }).click();
    await expect(page).toHaveURL("/menu");
    await expect(
      page.getByRole("heading", { level: 1, name: "The Menu" }),
    ).toBeVisible();
    await expect(page.locator('.nav__links a[aria-current="page"]')).toHaveText(
      "Menu",
    );

    await navLinks.getByRole("link", { name: "Gallery", exact: true }).click();
    await expect(page).toHaveURL("/gallery");
    await expect(
      page.getByRole("heading", { level: 1, name: "The Gallery" }),
    ).toBeVisible();

    await navLinks.getByRole("link", { name: "Our Story" }).click();
    await expect(page).toHaveURL("/about");
    await expect(
      page.getByRole("heading", { level: 1, name: "Our Story" }),
    ).toBeVisible();

    await navLinks.getByRole("link", { name: "Visit", exact: true }).click();
    await expect(page).toHaveURL("/visit");
    await expect(
      page.getByRole("heading", { level: 1, name: "Visit Tarte" }),
    ).toBeVisible();
  });
});

test.describe("menu filter", () => {
  test("filters sections by Food / Drinks group", async ({ page }) => {
    await page.goto("/menu");
    // "All" shows both a Food section and a Drinks section.
    await expect(
      page.getByRole("heading", { level: 2, name: "Bagels", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Hot", exact: true }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Food", exact: true }).click();
    await expect(
      page.getByRole("heading", { level: 2, name: "Bagels", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Hot", exact: true }),
    ).toHaveCount(0);

    await page.getByRole("button", { name: "Drinks", exact: true }).click();
    await expect(
      page.getByRole("heading", { level: 2, name: "Hot", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Bagels", exact: true }),
    ).toHaveCount(0);
  });
});

test.describe("menu gallery links", () => {
  test("opens the matching gallery category from a menu section", async ({ page }) => {
    await page.goto("/menu");
    const section = page
      .getByRole("heading", { level: 2, name: "Specialty Cakes" })
      .locator("..");

    await section.getByRole("link", { name: "View in Gallery" }).click();
    await expect(page).toHaveURL("/gallery?category=Specialty%20Cakes");
    await expect(
      page.getByRole("button", { name: "Specialty Cakes", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".gallery-tile")).toHaveCount(2);
  });
});

test.describe("directions links", () => {
  test("home directions button and map open Google Maps directions", async ({ page }) => {
    await page.goto("/");
    const expected =
      "https://www.google.com/maps/dir/?api=1&destination=2960%20Middletown%20Rd%2C%20Bronx%2C%20NY%2010461";

    await expect(page.getByRole("link", { name: "Get Directions" })).toHaveAttribute(
      "href",
      expected,
    );
    await expect(
      page.getByRole("link", { name: /Open directions to Tarte in Google Maps/ }),
    ).toHaveAttribute("href", expected);
  });
});

test.describe("gallery lightbox", () => {
  test("opens, navigates with the keyboard, and closes", async ({ page }) => {
    await page.goto("/gallery");
    await page.locator(".gallery-tile").first().click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-label", /Morning Pour/);

    await page.keyboard.press("ArrowRight");
    await expect(dialog).toHaveAttribute("aria-label", /Fresh Croissants/);

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });
});

test.describe("reservation form", () => {
  test("validates required fields then submits", async ({ page }) => {
    // Stand in for Netlify Forms (absent on a plain `next start`).
    await page.route("**/__forms.html", (route) =>
      route.fulfill({ status: 200, body: "OK" }),
    );
    await page.goto("/visit");
    const form = page.locator('form[name="reservation"]');

    await form.getByRole("button", { name: "Request Reservation" }).click();
    await expect(form.getByText("Please tell us your name.")).toBeVisible();
    await expect(form.getByRole("alert")).toHaveCount(5);

    await form.getByLabel("Name").fill("Jane Rivera");
    await form.getByLabel("Guests").fill("2");
    await form.getByLabel("Date").fill("2026-12-31");
    await form.getByLabel("Time").fill("18:30");
    await form.getByLabel("Email").fill("jane@example.com");
    await form.getByRole("button", { name: "Request Reservation" }).click();

    await expect(page.getByText("Request received")).toBeVisible();
  });
});

test.describe("responsive nav", () => {
  test("hamburger menu opens and navigates on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await expect(page.locator(".nav__links")).toBeHidden();

    await page.locator(".nav__toggle").click();
    const panel = page.locator("#mobile-menu");
    await expect(panel).toBeVisible();

    await panel.getByRole("link", { name: "Gallery" }).click();
    await expect(page).toHaveURL("/gallery");
  });
});

const routes = ["/", "/menu", "/gallery", "/about", "/visit"];
for (const route of routes) {
  test(`no console errors on ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(route, { waitUntil: "load" });
    expect(errors).toEqual([]);
  });
}
