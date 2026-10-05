import { expect, test } from "@playwright/test";
import { brokenImages, installSpies, open, scrollThrough } from "./helpers";

test.skip(({ isMobile }) => !isMobile, "mobile-only checks");
test.beforeEach(async ({ page }) => { await installSpies(page); });

test("menu toggles and exposes every primary link", async ({ page }) => {
  await open(page, "/");
  const btn = page.locator(".site-header__menu-btn");
  await expect(btn).toBeVisible();
  await expect(btn).toHaveAttribute("aria-expanded", "false");
  await btn.click();
  await expect(btn).toHaveAttribute("aria-expanded", "true");
  const nav = page.locator("#primary-nav");
  for (const name of ["Safety & Preparation", "What to Expect", "FAQ", "Apply"]) await expect(nav.getByRole("link", { name })).toBeVisible();
  await btn.click();
  await expect(btn).toHaveAttribute("aria-expanded", "false");
});

test("hero is readable and the Apply CTA is visible and tappable", async ({ page }) => {
  await open(page, "/");
  const h1 = page.locator("h1");
  await expect(h1).toBeVisible();
  const box = (await h1.boundingBox())!;
  const vw = page.viewportSize()!.width;
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width, "H1 clipped at right edge").toBeLessThanOrEqual(vw + 1);
  const fontPx = await h1.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
  expect(fontPx).toBeGreaterThanOrEqual(28);
  const cta = page.locator(".hero").getByRole("button", { name: /Begin Your Application/i });
  await expect(cta).toBeInViewport();
  const c = (await cta.boundingBox())!;
  expect(c.height, "tap target height").toBeGreaterThanOrEqual(44);
  expect(c.x + c.width).toBeLessThanOrEqual(vw + 1);
});

test("availability cards fit the screen without clipping their text", async ({ page }) => {
  await open(page, "/");
  await page.locator("#availability").scrollIntoViewIfNeeded();
  const vw = page.viewportSize()!.width;
  const cards = page.locator("#availability .avail-card");
  const n = await cards.count();
  expect(n).toBeGreaterThan(0);
  for (let i = 0; i < n; i++) {
    const card = cards.nth(i);
    const b = (await card.boundingBox())!;
    expect(b.x).toBeGreaterThanOrEqual(0);
    expect(b.x + b.width, `card ${i} wider than viewport`).toBeLessThanOrEqual(vw + 1);
    const clippedText = await card.evaluate((el) => [...el.querySelectorAll("*")].filter((c) => c.scrollWidth > c.clientWidth + 1 && getComputedStyle(c).overflowX !== "visible").length);
    expect(clippedText, `card ${i} has clipped text`).toBe(0);
  }
});

test("Apply flow works on a phone viewport", async ({ page }) => {
  await open(page, "/apply");
  await page.getByRole("button", { name: /Begin Your Application/i }).first().click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const b = (await dialog.locator(".terms-gate-modal").boundingBox())!;
  const vp = page.viewportSize()!;
  expect(b.x).toBeGreaterThanOrEqual(0);
  expect(b.x + b.width).toBeLessThanOrEqual(vp.width + 1);
  await dialog.getByRole("checkbox").check();
  await expect(dialog.getByRole("button", { name: /Continue/i })).toBeEnabled();
});

test("FAQ layout: questions fit and an answer opens in view", async ({ page }) => {
  await open(page, "/faq");
  const vw = page.viewportSize()!.width;
  const btn = page.locator(".faq-item__btn").first();
  await btn.scrollIntoViewIfNeeded();
  const b = (await btn.boundingBox())!;
  expect(b.x + b.width).toBeLessThanOrEqual(vw + 1);
  await btn.click();
  const panel = page.locator(".faq-item.is-open .faq-item__panel-inner").first();
  await expect(panel).toBeVisible();
  const p = (await panel.boundingBox())!;
  expect(p.x + p.width).toBeLessThanOrEqual(vw + 1);
});

test("every image on the home page renders on mobile", async ({ page }) => {
  await open(page, "/");
  await scrollThrough(page);
  expect(await brokenImages(page)).toEqual([]);
});
