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
// This specifically covers the /md/[slug] Object.prototype edge cases
// (toString, constructor, hasOwnProperty, proto, __proto__, valueOf) found
// during independent review — a plain-object lookup table let several of
// these return 200 with garbage content or crash with a 500 instead of a
// clean 404. The fix uses a real Map; this test is what keeps that fixed.

const BASE_URL = process.env.SMOKE_TEST_BASE_URL ?? "http://localhost:3000";

type Check = {
  path: string;
  expectStatus: number;
  expectContentType?: string; // substring match
};

const CHECKS: Check[] = [
  { path: "/", expectStatus: 200, expectContentType: "text/html" },
  { path: "/faq", expectStatus: 200, expectContentType: "text/html" },
  { path: "/safety-preparation", expectStatus: 200, expectContentType: "text/html" },
  { path: "/apply", expectStatus: 200, expectContentType: "text/html" },
  { path: "/llms.txt", expectStatus: 200, expectContentType: "text/plain" },
  { path: "/md/faq", expectStatus: 200, expectContentType: "text/markdown" },
  { path: "/md/safety-preparation", expectStatus: 200, expectContentType: "text/markdown" },
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
    res = await fetch(url, { redirect: "manual" });
  } catch (err) {
    return { ok: false, message: `FETCH FAILED — ${(err as Error).message}` };
  }

  const statusOk = res.status === check.expectStatus;
  const contentType = res.headers.get("content-type") ?? "";
  const typeOk = !check.expectContentType || contentType.includes(check.expectContentType);

  if (statusOk && typeOk) {
    return { ok: true, message: `OK — ${res.status}${check.expectContentType ? `, ${contentType}` : ""}` };
  }

  const problems: string[] = [];
  if (!statusOk) problems.push(`expected status ${check.expectStatus}, got ${res.status}`);
  if (!typeOk) problems.push(`expected content-type containing "${check.expectContentType}", got "${contentType}"`);
  return { ok: false, message: `FAIL — ${problems.join("; ")}` };
}

async function main() {
  console.log(`\nDreamglade route smoke test — base URL: ${BASE_URL}\n`);
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
