import type { Page } from "@playwright/test";

export type CapturedEvent = [string, string, Record<string, string> | undefined];

// Installs (before any page script runs):
//  - a gtag spy, so we can assert which analytics events a click fires
//  - a capture-phase guard that cancels navigation to mailto: links, so a test
//    can click a CTA without ever opening a mail client or sending anything.
export async function installSpies(page: Page) {
  await page.addInitScript(() => {
    const w = window as unknown as { __events: unknown[]; __mailto: string[]; gtag: (...a: unknown[]) => void };
    w.__events = [];
    w.__mailto = [];
    w.gtag = (...a: unknown[]) => { w.__events.push(a); };
    document.addEventListener("click", (e) => {
      const a = (e.target as Element | null)?.closest?.('a[href^="mailto:"]') as HTMLAnchorElement | null;
      if (a) { e.preventDefault(); w.__mailto.push(a.getAttribute("href") ?? ""); }
    }, true);
  });
}

export const events = (page: Page) => page.evaluate(() => (window as unknown as { __events: CapturedEvent[] }).__events);
export const mailtoClicks = (page: Page) => page.evaluate(() => (window as unknown as { __mailto: string[] }).__mailto);

// Force every lazy image to load (we are testing that the image files render,
// not the browser's lazy-loading heuristics), then wait for them to settle.
export async function scrollThrough(page: Page) {
  await page.evaluate(() => document.querySelectorAll("img[loading=lazy]").forEach((i) => ((i as HTMLImageElement).loading = "eager")));
  await page.waitForFunction(() => [...document.images].every((i) => i.complete), undefined, { timeout: 30_000 }).catch(() => {});
}

// SVGs without intrinsic dimensions report naturalWidth 0 even when they render.
export async function brokenImages(page: Page) {
  return page.evaluate(() => [...document.images].filter((i) => !(i.complete && (i.naturalWidth > 0 || /\.svg(\?|$)/.test(i.currentSrc)))).map((i) => i.currentSrc || i.src));
}

// Elements whose right edge sticks out of the viewport, ignoring anything that
// lives inside an intentionally scrollable/clipping container.
export async function overflowingElements(page: Page) {
  return page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const clipped = (el: Element) => { for (let p = el.parentElement; p; p = p.parentElement) { const o = getComputedStyle(p).overflowX; if (o !== "visible") return true; } return false; };
    const bad: string[] = [];
    for (const el of document.body.querySelectorAll("h1,h2,h3,p,a,button,li,span,img")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0 || getComputedStyle(el).visibility === "hidden") continue;
      if ((r.right > vw + 1 || r.left < -1) && !clipped(el)) bad.push(`${el.tagName.toLowerCase()}.${(el as HTMLElement).className.toString().slice(0, 40)} "${(el.textContent ?? "").trim().slice(0, 30)}" right=${Math.round(r.right)} vw=${vw}`);
    }
    return bad.slice(0, 10);
  });
}

// Navigate and wait until the network is idle so React has hydrated; clicking
// earlier can silently do nothing on a server-rendered page.
export async function open(page: Page, path: string) {
  const res = await page.goto(path);
  await page.waitForLoadState("networkidle");
  return res;
}
