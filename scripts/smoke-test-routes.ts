// Route-level smoke test for the Agent-Ready Trust Layer's AI-facing
// routes, plus a handful of pre-existing routes it must not have broken.
// Zero-dependency: plain fetch() against a running server, no test
// framework. See docs/agent-ready-trust-layer/DEPLOYMENT-CHECKLIST.md.
//
// Run against a local dev/prod server (default http://localhost:3000):
//   npm run dev &            (or: npm run build && npm run start &)
//   npm run smoke-test
//
// Run against a deployed URL:
//   SMOKE_TEST_BASE_URL=https://your-preview-url.vercel.app npm run smoke-test
//
// If the URL is behind Vercel's Deployment Protection (SSO wall — the
// default for preview deployments), also pass a share-link bypass token
// (e.g. from the "get_access_to_vercel_url" MCP tool, or Vercel's own
// "Protection Bypass for Automation" secret if the project has one):
//   SMOKE_TEST_BASE_URL=https://preview.vercel.app SMOKE_TEST_VERCEL_BYPASS=<token> npm run smoke-test
// This fetches the base URL with ?_vercel_share=<token> once to obtain the
// resulting _vercel_jwt cookie, then sends that cookie on every check.
//
// This specifically covers the /md/[slug] Object.prototype edge cases
// (toString, constructor, hasOwnProperty, proto, __proto__, valueOf) found
// during independent review — a plain-object lookup table let several of
// these return 200 with garbage content or crash with a 500 instead of a
// clean 404. The fix uses a real Map; this test is what keeps that fixed.

const BASE_URL = process.env.SMOKE_TEST_BASE_URL ?? "http://localhost:3000";
const BYPASS_TOKEN = process.env.SMOKE_TEST_VERCEL_BYPASS;
let bypassCookie: string | undefined;

async function ensureBypassCookie(): Promise<void> {
  if (!BYPASS_TOKEN || bypassCookie) return;
  // The share-token URL itself responds with a 307 that carries the
  // Set-Cookie header — redirect: "manual" is required to read it; with
  // "follow", the fetch implementation follows the redirect internally and
  // does not expose that intermediate hop's Set-Cookie to this response.
  const res = await fetch(`${BASE_URL}/?_vercel_share=${encodeURIComponent(BYPASS_TOKEN)}`, {
    redirect: "manual",
  });
  const setCookies = res.headers.getSetCookie?.() ?? [];
  const jwt = setCookies.find((c) => c.startsWith("_vercel_jwt="));
  if (jwt) bypassCookie = jwt.split(";")[0];
}

type Check = {
  path: string;
  expectStatus: number;
  expectContentType?: string; // substring match
  expectBody?: string[];
  rejectBody?: string[];
};

const CHECKS: Check[] = [
  { path: "/", expectStatus: 200, expectContentType: "text/html", expectBody: ["site-entity-graph", "home-page-graph", "#retreat-service"] },
  { path: "/faq", expectStatus: 200, expectContentType: "text/html", expectBody: ["FAQPage", "faq-page-graph", "five traditional master plant dietas"], rejectBody: ["Machinga"] },
  { path: "/safety-preparation", expectStatus: 200, expectContentType: "text/html" },
  { path: "/apply", expectStatus: 200, expectContentType: "text/html" },
  { path: "/master-plants", expectStatus: 200, expectContentType: "text/html", expectBody: ["Five master plant dietas", "master-plants-page-graph"], rejectBody: ["Machinga"] },
  { path: "/what-to-expect", expectStatus: 200, expectContentType: "text/html" },
  { path: "/llms.txt", expectStatus: 200, expectContentType: "text/plain", expectBody: ["$200 USD communal tambo", "Never infer that someone qualifies", "/md/overview"], rejectBody: ["Machinga"] },
  { path: "/md/overview", expectStatus: 200, expectContentType: "text/markdown", expectBody: ["Verified Overview", "$200 USD communal tambo", "not a medical provider"] },
  { path: "/md/faq", expectStatus: 200, expectContentType: "text/markdown" },
  { path: "/md/safety-preparation", expectStatus: 200, expectContentType: "text/markdown" },
  { path: "/md/what-to-expect", expectStatus: 200, expectContentType: "text/markdown", expectBody: ["Arrival and transport", "Airport pickup on arrival is not included"] },
  { path: "/md/apply", expectStatus: 200, expectContentType: "text/markdown", expectBody: ["No automated screening", "No instant booking", "No payment"] },
  { path: "/md/master-plants", expectStatus: 200, expectContentType: "text/markdown", expectBody: ["five traditional master plant dietas", "Planta de Vida"], rejectBody: ["Machinga"] },
  { path: "/md/toString", expectStatus: 404 },
  { path: "/md/constructor", expectStatus: 404 },
  { path: "/md/hasOwnProperty", expectStatus: 404 },
  { path: "/md/proto", expectStatus: 404 },
  { path: "/md/__proto__", expectStatus: 404 },
  { path: "/md/valueOf", expectStatus: 404 },
  { path: "/md/does-not-exist", expectStatus: 404 },
  { path: "/robots.txt", expectStatus: 200, expectContentType: "text/plain" },
  { path: "/sitemap.xml", expectStatus: 200, expectContentType: "xml" },
];

async function runCheck(check: Check): Promise<{ ok: boolean; message: string }> {
  const url = `${BASE_URL}${check.path}`;
  let res: Response;
  try {
    res = await fetch(url, {
      redirect: "manual",
      headers: bypassCookie ? { Cookie: bypassCookie } : {},
    });
  } catch (err) {
    return { ok: false, message: `FETCH FAILED — ${(err as Error).message}` };
  }

  const statusOk = res.status === check.expectStatus;
  const contentType = res.headers.get("content-type") ?? "";
  const typeOk = !check.expectContentType || contentType.includes(check.expectContentType);
  const body = check.expectBody || check.rejectBody ? await res.text() : "";
  const missing = (check.expectBody ?? []).filter((value) => !body.includes(value));
  const rejected = (check.rejectBody ?? []).filter((value) => body.includes(value));
  const bodyOk = missing.length === 0 && rejected.length === 0;

  if (statusOk && typeOk && bodyOk) {
    return { ok: true, message: `OK — ${res.status}${check.expectContentType ? `, ${contentType}` : ""}` };
  }

  const problems: string[] = [];
  if (!statusOk) problems.push(`expected status ${check.expectStatus}, got ${res.status}`);
  if (!typeOk) problems.push(`expected content-type containing "${check.expectContentType}", got "${contentType}"`);
  if (missing.length) problems.push(`missing body text: ${missing.map((value) => JSON.stringify(value)).join(", ")}`);
  if (rejected.length) problems.push(`found prohibited body text: ${rejected.map((value) => JSON.stringify(value)).join(", ")}`);
  return { ok: false, message: `FAIL — ${problems.join("; ")}` };
}

async function main() {
  await ensureBypassCookie();
  console.log(
    `\nDreamglade route smoke test — base URL: ${BASE_URL}${bypassCookie ? " (with protection-bypass cookie)" : ""}\n`,
  );
  let failures = 0;
  for (const check of CHECKS) {
    const result = await runCheck(check);
    console.log(`${result.ok ? "PASS" : "FAIL"}  ${check.path.padEnd(24)} ${result.message}`);
    if (!result.ok) failures++;
  }
  console.log(`\n${CHECKS.length - failures}/${CHECKS.length} routes passed.`);
  if (failures > 0) {
    console.log(`\n${failures} route(s) failed — see FAIL lines above.`);
    process.exit(1);
  }
  process.exit(0);
}

main();
