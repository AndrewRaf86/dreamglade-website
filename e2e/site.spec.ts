import { expect, test } from "@playwright/test";
import { brokenImages, events, installSpies, mailtoClicks, open, overflowingElements, scrollThrough } from "./helpers";

test.beforeEach(async ({ page }) => { await installSpies(page); });

const PAGES: Array<[string, RegExp]> = [
  ["/", /small-group retreat/i],
  ["/faq", /Common questions/i],
  ["/apply", /retreat inquiry/i],
  ["/safety-preparation", /Safety and preparation/i],
];

test.describe("public pages render", () => {
  for (const [path, h1] of PAGES) {
    test(`${path}: one H1, images load, no horizontal overflow`, async ({ page }) => {
      const res = await open(page, path);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveText(h1);
      await scrollThrough(page);
      expect(await brokenImages(page)).toEqual([]);
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
      expect(scrollWidth, "page scrolls horizontally").toBeLessThanOrEqual(clientWidth);
      expect(await overflowingElements(page), "text/elements clipped outside the viewport").toEqual([]);
    });
  }
});

test("404 page is a real 404 with a way back", async ({ page }) => {
  const res = await open(page, "/this-page-does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.getByText(/not found|404/i).first()).toBeVisible();
});

test("availability: cards render, none expired, CTA is a booking mailto and fires its event", async ({ page }) => {
  await open(page, "/");
  const section = page.locator("#availability");
  await section.scrollIntoViewIfNeeded();
  const cards = section.locator(".avail-card");
  expect(await cards.count()).toBeGreaterThan(0);
  await expect(section).not.toContainText("Sept 26, 2026");
  const first = cards.first();
  await expect(first.locator(".avail-card__dates")).toBeVisible();
  const cta = first.locator("a.avail-card__cta");
  await expect(cta).toBeVisible();
  expect(await cta.getAttribute("href")).toMatch(/^mailto:booking@dreamglade\.com\?subject=/);
  await cta.click(); // navigation to mailto is cancelled by the spy: nothing is sent
  expect(await mailtoClicks(page)).toHaveLength(1);
  const ev = await events(page);
  expect(ev.some((e) => e[0] === "event" && e[1] === "availability_click")).toBe(true);
});

test("apply gate: opens, Continue stays disabled until terms are acknowledged; nothing is sent", async ({ page }) => {
  await open(page, "/apply");
  await page.getByRole("button", { name: /Begin Your Application/i }).first().click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("link", { name: /Terms & Conditions/i })).toHaveAttribute("href", "/terms-and-conditions");
  const cont = dialog.getByRole("button", { name: /Continue/i });
  await expect(cont).toBeDisabled();
  await dialog.getByRole("checkbox").check();
  await expect(cont).toBeEnabled();
  expect((await events(page)).some((e) => e[1] === "apply_click")).toBe(true);
  expect(await mailtoClicks(page)).toHaveLength(0); // we never press Continue
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("home hero Apply CTA opens the same gate and fires apply_click", async ({ page }) => {
  await open(page, "/");
  const cta = page.locator(".hero").getByRole("button", { name: /Begin Your Application/i });
  await expect(cta).toBeVisible();
  await cta.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  expect((await events(page)).some((e) => e[1] === "apply_click")).toBe(true);
});

test("navigation reaches Apply and FAQ", async ({ page, isMobile }) => {
  await open(page, "/safety-preparation");
  const menu = page.locator(".site-header__menu-btn");
  if (isMobile) await menu.click();
  await page.locator("#primary-nav").getByRole("link", { name: "Apply" }).click();
  await expect(page).toHaveURL(/\/apply$/);
  if (isMobile) await menu.click();
  await page.locator("#primary-nav").getByRole("link", { name: "FAQ" }).click();
  await expect(page).toHaveURL(/\/faq$/);
});

test("FAQ: accordion opens and shows the solo-travel answer", async ({ page }) => {
  await open(page, "/faq");
  const q = page.getByRole("button", { name: /Can I just show up without applying first/i });
  await q.scrollIntoViewIfNeeded();
  await expect(q).toHaveAttribute("aria-expanded", "false");
  await q.click();
  await expect(q).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator(".faq-item.is-open")).toContainText(/traveling on your own is fine/i);
});

test("home reviews show the centralized conservative count", async ({ page }) => {
  await open(page, "/");
  await expect(page.locator(".rating-block__count")).toHaveText(/from 180\+ Google reviews/);
});
