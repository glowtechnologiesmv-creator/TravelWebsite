import { test, expect } from "@playwright/test";
import { stays, experiences, destinations, articles } from "../lib/data";
const routes = [
  "/",
  "/stays",
  "/experiences",
  "/destinations",
  "/travel-guide",
  "/about",
  "/plan-your-trip",
  ...stays.map((x) => `/stays/${x.slug}`),
  ...experiences.map((x) => `/experiences/${x.slug}`),
  ...destinations.map((x) => `/destinations/${x.slug}`),
  ...articles.map((x) => `/travel-guide/${x.slug}`),
];
test("every page renders a title without client exceptions", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const route of routes) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("main h1"), route).toBeVisible();
    expect(await page.title()).not.toContain("Not found");
  }
  expect(errors).toEqual([]);
});
test("stay filters, sorting, deep links, and empty state", async ({ page }) => {
  await page.goto("/stays?type=Guesthouse", {waitUntil: "domcontentloaded"});
  await expect(page.locator(".stay-card")).toHaveCount(2);
  await page.getByRole("button", { name: "Reset", exact: true }).click();
  await expect(page.locator(".stay-card")).toHaveCount(6);
  await page.getByLabel("Stay type").selectOption("Resort");
  await page.getByLabel("Amenities", { exact: true }).selectOption("Spa");
  await expect(page.locator(".stay-card")).toHaveCount(2);
  await page.getByLabel("Price range").selectOption("Under $150");
  await expect(
    page.getByText("No matches for these filters.", { exact: false }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await page.getByLabel("Sort by").selectOption("price-low");
  await expect(page.locator(".stay-card h3").first()).toHaveText(
    "Palm Garden Retreat",
  );
});
test("other collections filter real records", async ({ page }) => {
  await page.goto("/experiences", {waitUntil: "domcontentloaded"});
  await page.getByLabel("Category", { exact: true }).selectOption("Surfing");
  await expect(page.locator(".experience-card")).toHaveCount(1);
  await page.goto("/destinations", {waitUntil: "domcontentloaded"});
  await page.getByLabel("Destination type").selectOption("Atoll");
  await expect(page.locator(".destination-card")).toHaveCount(2);
  await page.goto("/travel-guide", {waitUntil: "domcontentloaded"});
  await page.getByLabel("Category", { exact: true }).selectOption("Culture");
  await expect(page.locator(".article-card")).toHaveCount(1);
});
test("gallery supports arrows, focus containment, and escape", async ({
  page,
}) => {
  await page.goto("/stays/sunrise-water-villa", {waitUntil: "domcontentloaded"});
  await page.getByRole("button", { name: /Open reference image 1/ }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Next image" }).click();
  await expect(page.getByText("2 / 4 · Reference photography")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.locator(".faq summary").first().click();
  await expect(page.locator(".faq details").first()).toHaveAttribute(
    "open",
    "",
  );
});
test("form checks dates and identifies the demo outcome honestly", async ({
  page,
}) => {
  await page.goto("/plan-your-trip?interest=Sunrise%20Water%20Villa", {waitUntil: "domcontentloaded"});
  await expect(
    page.getByLabel("Preferred island, stay, or experience"),
  ).toHaveValue("Sunrise Water Villa");
  await page.getByLabel("Full name").fill("Demo Traveler");
  await page.getByLabel("Email address").fill("demo@example.com");
  await page.getByLabel("Expected arrival").fill("2027-06-20");
  await page.getByLabel("Expected departure").fill("2027-06-10");
  await page.getByRole("button", { name: "Preview my inquiry" }).click();
  await expect(page.locator("main").getByRole("alert")).toContainText("departure date");
  await page.getByLabel("Expected departure").fill("2027-06-25");
  await page.getByRole("button", { name: "Preview my inquiry" }).click();
  await expect(page.locator("main").getByRole("status")).toContainText(
    "has not been sent or saved",
  );
});
test("mobile menu and compact filters work", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", {waitUntil: "domcontentloaded"});
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Stays", exact: true })
    .click();
  await page.getByRole("button", { name: "Filters", exact: true }).click();
  await page.getByLabel("Stay type").selectOption("Guesthouse");
  await page.getByRole("button", { name: "Show 2 results" }).click();
  await expect(page.locator(".stay-card")).toHaveCount(2);
});
for (const width of [1440, 1280, 768, 390, 360]) {
test(`all page types fit ${width}px`, async ({ page }) => {
  const representatives = [
    "/",
    "/stays",
    "/stays/sunrise-water-villa",
    "/experiences",
    "/experiences/snorkeling",
    "/destinations",
    "/destinations/maafushi",
    "/travel-guide",
    "/travel-guide/best-time-to-visit",
    "/about",
    "/plan-your-trip",
  ];
    await page.setViewportSize({ width, height: 1000 });
    for (const route of representatives) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await expect(page.locator("main h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${route} at ${width}px`,
      ).toBe(true);
    }
});
}
test("unknown URLs return HTTP 404 and render the custom page", async ({ page }) => {
  for (const route of ['/stays/not-a-real-stay', '/no-such-section']) {
    const response = await page.goto(route, {waitUntil: 'domcontentloaded'});
    expect(response?.status()).toBe(404);
    await expect(page.getByText('404 · A LITTLE OFF THE CHART')).toBeVisible();
  }
});
