// Production health watchdog. Deterministic: plain HTTP + string/DOM-free
// parsing, no LLM, no dependencies. Every PASS/FAIL is decided by code.
//
// Usage:
//   npm run health-check                                   (live production)
//   HEALTH_BASE_URL=http://localhost:3000 npm run health-check
//   npm run health-check -- --json health-report.json
//
// Test hooks (never needed in production):
//   HEALTH_TODAY=2026-12-01   pretend today is this date (proves the
//                             AVAILABILITY_DATE_FRESHNESS check can FAIL)
//
// Exit code: 1 if any check FAILs, else 0. WARN never fails the run.
// See docs/change-ledger/ and .github/workflows/site-health.yml.

import { writeFile } from "node:fs/promises";

const PRODUCTION_ORIGIN = "https://dreamglade.com";
const BASE = (process.env.HEALTH_BASE_URL ?? PRODUCTION_ORIGIN).replace(/\/$/, "");
const IS_PRODUCTION = BASE === PRODUCTION_ORIGIN;
const TIMEOUT_MS = 20_000;
const PAGES = ["/", "/faq", "/apply", "/safety-preparation", "/what-to-expect", "/master-plants", "/terms-and-conditions"] as const;
const WARN_RUNWAY_DAYS = 60;

// Visible-text strings that must never appear on a public page. "Verify with
// Paul" is the CURRENT intentional availability CTA label and is deliberately
// not listed (open question for Wade/Clarisa — see docs/change-ledger).
const PROHIBITED_VISIBLE = [/\bTODO\b/, /\bFIXME\b/, /lorem ipsum/i, /\bundefined\b/, /\[object /, /\bNaN\b/, /\{\{.*\}\}/, /NEEDS HUMAN CONFIRMATION/, /\[GAP\]/, /placeholder text/i];

type Status = "PASS" | "FAIL" | "WARN" | "SKIP";
type Result = { id: string; status: Status; detail: string };
const results: Result[] = [];
const record = (id: string, status: Status, detail: string): void => { results.push({ id, status, detail }); };
const pass = (id: string, detail: string) => record(id, "PASS", detail);
const fail = (id: string, detail: string) => record(id, "FAIL", detail);

type Res = { status: number; type: string; location: string | null; body: string };
const cache = new Map<string, Promise<Res>>();

// One retry on network error/timeout/5xx so a blip does not page anyone.
async function fetchOnce(url: string, manual: boolean): Promise<Res> {
  const res = await fetch(url, { redirect: manual ? "manual" : "follow", signal: AbortSignal.timeout(TIMEOUT_MS), headers: { "user-agent": "dreamglade-health-check/1.0" } });
  const type = res.headers.get("content-type") ?? "";
  const isText = /text|json|xml|markdown/.test(type) || type === "";
  return { status: res.status, type, location: res.headers.get("location"), body: isText ? await res.text() : (await res.arrayBuffer(), "") };
}
function get(url: string, manual = true): Promise<Res> {
  const key = `${manual}:${url}`;
  let p = cache.get(key);
  if (!p) {
    p = (async () => {
      try {
        const r = await fetchOnce(url, manual);
        if (r.status < 500) return r;
      } catch { /* retry below */ }
      await new Promise((r) => setTimeout(r, 2000));
      return fetchOnce(url, manual);
    })();
    cache.set(key, p);
  }
  return p;
}
const local = (url: string) => url.replace(PRODUCTION_ORIGIN, BASE); // map canonical origin to the target under test
const norm = (u: string) => u.replace(/\/$/, "");
const attempt = async (id: string, fn: () => Promise<void>) => {
  try { await fn(); } catch (e) { fail(id, `check crashed: ${(e as Error).message}`); }
};

function visibleText(html: string): string {
  return html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&#x27;|&#39;|&apos;/g, "'").replace(/\s+/g, " ");
}
const unescapeAttr = (s: string) => s.replace(/&amp;/g, "&");

// ---------- availability window parsing (no LLM) ----------
const MONTHS: Record<string, number> = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
export function parseWindowEnd(label: string): Date | null {
  const m = label.trim().match(/^([A-Za-z]+)\.?\s+(\d{1,2})\s*[–—-]\s*([A-Za-z]+)\.?\s+(\d{1,2}),\s*(\d{4})$/);
  if (!m) return null;
  const month = MONTHS[m[3].slice(0, 3).toLowerCase()];
  if (month === undefined) return null;
  return new Date(Date.UTC(Number(m[5]), month, Number(m[4])));
}
function todayInLima(): Date {
  const override = process.env.HEALTH_TODAY;
  const iso = override ?? new Date().toLocaleDateString("en-CA", { timeZone: "America/Lima" }); // retreat is in Peru
  return new Date(`${iso}T00:00:00Z`);
}

async function main() {
  console.log(`\nDreamglade health check — target: ${BASE}${process.env.HEALTH_TODAY ? ` (HEALTH_TODAY=${process.env.HEALTH_TODAY})` : ""}\n`);
  const pages = new Map<string, Res>();
  for (const p of PAGES) pages.set(p, await get(BASE + p));

  await attempt("PAGES_200", async () => {
    const bad = PAGES.filter((p) => pages.get(p)!.status !== 200 || !pages.get(p)!.type.includes("text/html"));
    bad.length ? fail("PAGES_200", `not 200 text/html: ${bad.map((p) => `${p}=${pages.get(p)!.status}`).join(", ")}`) : pass("PAGES_200", `${PAGES.length} public pages return 200 text/html`);
  });

  await attempt("UNKNOWN_PAGE_404", async () => {
    const r = await get(`${BASE}/health-check-probe-${"x".repeat(6)}`);
    r.status === 404 ? pass("UNKNOWN_PAGE_404", "unknown URL returns a real 404") : fail("UNKNOWN_PAGE_404", `expected 404, got ${r.status}`);
  });

  await attempt("CANONICALS", async () => {
    const bad: string[] = [];
    for (const p of PAGES) {
      const c = pages.get(p)!.body.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
      if (!c || norm(c) !== norm(PRODUCTION_ORIGIN + p)) bad.push(`${p} -> ${c ?? "MISSING"}`);
    }
    bad.length ? fail("CANONICALS", bad.join("; ")) : pass("CANONICALS", "every page has a self-referencing production canonical (home included)");
  });

  await attempt("JSON_LD_PARSES", async () => {
    const bad: string[] = [];
    let blocks = 0;
    for (const p of PAGES) {
      const found = [...pages.get(p)!.body.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)];
      if (!found.length) bad.push(`${p}: no JSON-LD`);
      for (const b of found) {
        blocks++;
        try {
          const j = JSON.stringify(JSON.parse(b[1]));
          if (/"aggregateRating"|"reviewCount"|"ratingValue"/.test(j)) bad.push(`${p}: prohibited rating/review markup`);
        } catch { bad.push(`${p}: invalid JSON-LD`); }
      }
    }
    bad.length ? fail("JSON_LD_PARSES", bad.join("; ")) : pass("JSON_LD_PARSES", `${blocks} JSON-LD blocks parse; no rating/review markup`);
  });

  await attempt("SITEMAP", async () => {
    const r = await get(`${BASE}/sitemap.xml`);
    const locs = [...r.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    if (r.status !== 200 || !r.type.includes("xml") || !locs.length || !r.body.includes("</urlset>")) return fail("SITEMAP", `status ${r.status}, type ${r.type}, ${locs.length} urls`);
    pass("SITEMAP", `parses (${locs.length} URLs)`);
    const bad: string[] = [];
    for (const loc of locs) {
      const u = await get(local(loc));
      const canon = u.body.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
      if (u.status !== 200) bad.push(`${loc} = ${u.status}`);
      else if (!canon || norm(canon) !== norm(loc)) bad.push(`${loc} canonical mismatch (${canon})`);
    }
    bad.length ? fail("SITEMAP_URLS_200", bad.join("; ")) : pass("SITEMAP_URLS_200", `all ${locs.length} sitemap URLs return 200 and match their canonical`);
  });

  await attempt("ROBOTS", async () => {
    const r = await get(`${BASE}/robots.txt`);
    const ok = r.status === 200 && r.type.includes("text/plain") && /^sitemap:/im.test(r.body) && !/^disallow:\s*\/\s*$/im.test(r.body);
    ok ? pass("ROBOTS", "200 text/plain, lists sitemap, does not block the site") : fail("ROBOTS", `status ${r.status}, type ${r.type}`);
  });

  let mirrorUrls: string[] = [];
  await attempt("LLMS_TXT", async () => {
    const r = await get(`${BASE}/llms.txt`);
    if (r.status !== 200 || !r.type.includes("text/plain") || r.body.trimStart().startsWith("<")) return fail("LLMS_TXT", `status ${r.status}, type ${r.type}`);
    pass("LLMS_TXT", "200 text/plain (not HTML)");
    const urls = [...new Set([...r.body.matchAll(/\((https:\/\/dreamglade\.com[^)\s]*)\)/g)].map((m) => m[1]))];
    mirrorUrls = urls.filter((u) => u.includes("/md/"));
    const bad: string[] = [];
    for (const u of urls) { const x = await get(local(u)); if (x.status !== 200) bad.push(`${u} = ${x.status}`); }
    urls.length && !bad.length ? pass("LLMS_TXT_LINKS", `all ${urls.length} URLs referenced in llms.txt return 200`) : fail("LLMS_TXT_LINKS", bad.length ? bad.join("; ") : "no URLs found in llms.txt");
  });

  await attempt("MARKDOWN_MIRRORS", async () => {
    const bad: string[] = [];
    for (const u of mirrorUrls) { const x = await get(local(u)); if (x.status !== 200 || !x.type.includes("text/markdown") || x.body.trim().length < 200) bad.push(`${u} (${x.status}, ${x.type}, ${x.body.length}B)`); }
    mirrorUrls.length && !bad.length ? pass("MARKDOWN_MIRRORS", `${mirrorUrls.length} /md/* mirrors return non-empty text/markdown`) : fail("MARKDOWN_MIRRORS", bad.length ? bad.join("; ") : "no /md mirrors listed in llms.txt");
    const probes = await Promise.all(["__proto__", "toString", "health-check-nope"].map((s) => get(`${BASE}/md/${s}`)));
    probes.every((p) => p.status === 404) ? pass("MARKDOWN_BAD_SLUG_404", "unknown /md slugs return 404") : fail("MARKDOWN_BAD_SLUG_404", `statuses: ${probes.map((p) => p.status).join(",")}`);
  });

  await attempt("INTERNAL_LINKS", async () => {
    const links = new Set<string>();
    for (const p of PAGES) for (const m of pages.get(p)!.body.matchAll(/<a [^>]*href="([^"]+)"/g)) {
      const h = unescapeAttr(m[1]).split("#")[0].split("?")[0];
      if (h.startsWith("/") && !h.startsWith("//") && !h.startsWith("/_next")) links.add(h);
      else if (h.startsWith(PRODUCTION_ORIGIN)) links.add(h.slice(PRODUCTION_ORIGIN.length) || "/");
    }
    const bad: string[] = [];
    for (const l of links) { if (!l) continue; const x = await get(BASE + l); if (x.status >= 400) bad.push(`${l} = ${x.status}`); }
    bad.length ? fail("INTERNAL_LINKS", bad.join("; ")) : pass("INTERNAL_LINKS", `${links.size} unique internal links, none 4xx/5xx`);
  });

  await attempt("IMAGES_LOAD", async () => {
    const srcs = new Set<string>();
    for (const p of PAGES) {
      for (const m of pages.get(p)!.body.matchAll(/<img[^>]*?\ssrc="([^"]+)"/g)) srcs.add(unescapeAttr(m[1]));
      const og = pages.get(p)!.body.match(/property="og:image" content="([^"]+)"/)?.[1];
      if (og) srcs.add(og);
    }
    const bad: string[] = [];
    for (const s of srcs) {
      const url = s.startsWith("http") ? local(s) : BASE + s;
      const x = await get(url, false);
      if (x.status !== 200 || !x.type.startsWith("image/")) bad.push(`${s.slice(0, 80)} (${x.status} ${x.type})`);
    }
    bad.length ? fail("IMAGES_LOAD", bad.join("; ")) : pass("IMAGES_LOAD", `${srcs.size} page images and og:images load as image/*`);
  });

  await attempt("APPLY_CTA", async () => {
    const home = pages.get("/")!.body, apply = pages.get("/apply")!.body;
    const ok = /href="\/apply"/.test(home) && /Begin Your Application/.test(home) && /Begin Your Application/.test(apply);
    ok ? pass("APPLY_CTA", "Apply nav link and 'Begin Your Application' CTA present on / and /apply") : fail("APPLY_CTA", "Apply link or 'Begin Your Application' CTA missing");
  });

  await attempt("BOOKING_EMAIL", async () => {
    const valid = /^mailto:booking@dreamglade\.com(\?subject=[^&\s]+)?$/;
    const bad: string[] = [];
    let n = 0;
    for (const p of PAGES) for (const m of pages.get(p)!.body.matchAll(/href="(mailto:[^"]*)"/g)) { n++; if (!valid.test(unescapeAttr(m[1]))) bad.push(`${p}: ${m[1].slice(0, 60)}`); }
    // The Apply gate composes its mailto in client JS; the address must still be present in /apply.
    const gate = pages.get("/apply")!.body.includes("booking@dreamglade.com") || n > 0;
    bad.length || (n === 0 && !gate) ? fail("BOOKING_EMAIL", bad.join("; ") || "no booking email link found") : pass("BOOKING_EMAIL", `${n} mailto links, all booking@dreamglade.com and well-formed`);
  });

  await attempt("NO_PLACEHOLDERS", async () => {
    const bad: string[] = [];
    for (const p of PAGES) { const t = visibleText(pages.get(p)!.body); for (const re of PROHIBITED_VISIBLE) if (re.test(t)) bad.push(`${p}: ${re}`); }
    bad.length ? fail("NO_PLACEHOLDERS", bad.join("; ")) : pass("NO_PLACEHOLDERS", "no TODO/FIXME/placeholder/undefined/[GAP] text visible on any page");
  });

  await attempt("WWW_REDIRECT", async () => {
    if (!IS_PRODUCTION) return record("WWW_REDIRECT", "SKIP", "only meaningful against production");
    const r = await get("https://www.dreamglade.com/faq?health=1");
    const loc = r.location ?? "";
    [301, 308].includes(r.status) && loc === "https://dreamglade.com/faq?health=1" ? pass("WWW_REDIRECT", `www -> apex permanent redirect (${r.status}), path+query kept`) : fail("WWW_REDIRECT", `status ${r.status}, location ${loc || "none"}`);
  });

  await attempt("AVAILABILITY_DATE_FRESHNESS", async () => {
    const labels = [...pages.get("/")!.body.matchAll(/avail-card__dates">([^<]+)</g)].map((m) => m[1].replace(/&#x27;|&amp;/g, "").trim());
    if (!labels.length) return fail("AVAILABILITY_DATE_FRESHNESS", "no availability windows found on the homepage");
    const today = todayInLima();
    const unparsed = labels.filter((l) => !parseWindowEnd(l));
    if (unparsed.length) return fail("AVAILABILITY_DATE_FRESHNESS", `unparseable window label(s): ${unparsed.join(" | ")}`);
    const ends = labels.map((l) => ({ l, end: parseWindowEnd(l)! }));
    const expired = ends.filter((e) => e.end.getTime() < today.getTime());
    if (expired.length) return fail("AVAILABILITY_DATE_FRESHNESS", `expired window(s) still displayed: ${expired.map((e) => e.l).join(" | ")}`);
    const last = ends.reduce((a, b) => (b.end > a.end ? b : a));
    const runway = Math.round((last.end.getTime() - today.getTime()) / 86_400_000);
    runway < WARN_RUNWAY_DAYS
      ? record("AVAILABILITY_DATE_FRESHNESS", "WARN", `no expired windows, but the last window (${last.l}) ends in ${runway} days — ask Wade/Clarisa for new dates`)
      : pass("AVAILABILITY_DATE_FRESHNESS", `${labels.length} windows, none expired; first upcoming ends ${ends.map((e) => e.end).sort((a, b) => +a - +b)[0].toISOString().slice(0, 10)}, last window ends in ${runway} days`);
  });

  const order: Status[] = ["PASS", "WARN", "SKIP", "FAIL"];
  for (const r of results) console.log(`${r.status.padEnd(4)}  ${r.id.padEnd(30)} ${r.detail}`);
  const count = (s: Status) => results.filter((r) => r.status === s).length;
  console.log(`\n${order.map((s) => `${count(s)} ${s}`).join(" · ")}  (${results.length} checks)`);

  const jsonIdx = process.argv.indexOf("--json");
  if (jsonIdx > -1) {
    const report = { target: BASE, generatedAt: new Date().toISOString(), failed: results.filter((r) => r.status === "FAIL").map((r) => r.id).sort(), results };
    await writeFile(process.argv[jsonIdx + 1], JSON.stringify(report, null, 2));
  }
  process.exit(count("FAIL") > 0 ? 1 : 0);
}

main().catch((e) => { console.error(`watchdog crashed: ${(e as Error).message}`); process.exit(2); });
