// Turns a health-check JSON report into ONE tracking GitHub issue.
// Deterministic, no LLM. Uses the `gh` CLI with GITHUB_TOKEN (GH_TOKEN).
//
//   node --experimental-strip-types scripts/health-issue.ts health-report.json
//   DRY_RUN=1 [ISSUES_FIXTURE=issues.json] ...   prints the actions instead of calling GitHub
//   (the fixture is a JSON array shaped like `gh issue list --json number,state,body,title`)
//
// Behaviour (no daily spam):
//   FAIL, no open issue, same fingerprint closed before -> reopen it + comment "regressed"
//   FAIL, no open issue                                  -> create issue (label: site-health)
//   FAIL, open issue, SAME failing checks                -> silently update the issue body
//                                                           (last-seen time + run link), no comment
//   FAIL, open issue, DIFFERENT failing checks           -> update body + one comment
//   PASS, open issue                                     -> comment "recovered" + close
//   PASS, no open issue                                  -> nothing
//
// Fingerprint = first 12 hex of sha256(sorted failing check IDs). It is stored
// in the issue body so reruns find the same issue.

import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";

type Result = { id: string; status: string; detail: string };
type Issue = { number: number; state: string; body: string; title: string };
type Report = { target: string; generatedAt: string; failed: string[]; results: Result[] };

const LABEL = "site-health";
const DRY = process.env.DRY_RUN === "1";
const runUrl = process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY && process.env.GITHUB_RUN_ID
  ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
  : "(local run)";

function gh(args: string[]): string {
  if (DRY) { console.log(`[dry-run] gh ${args.map((a) => (a.length > 60 ? a.slice(0, 57) + "..." : a)).join(" ")}`); return ""; }
  return execFileSync("gh", args, { encoding: "utf8" });
}

export const fingerprint = (failed: string[]) => createHash("sha256").update([...failed].sort().join("|")).digest("hex").slice(0, 12);

function body(report: Report, fp: string): string {
  const failing = report.results.filter((r) => r.status === "FAIL");
  return [
    `<!-- site-health-fingerprint:${fp} -->`,
    `Automated production health check is **failing** on \`${report.target}\`.`,
    "",
    "| Check | Detail |", "|---|---|",
    ...failing.map((r) => `| \`${r.id}\` | ${r.detail.replace(/\|/g, "\\|").slice(0, 400)} |`),
    "",
    `Last seen: ${report.generatedAt} · Run: ${runUrl}`,
    "",
    "This issue is updated in place on later runs and closed automatically when all checks pass. No LLM decides pass/fail (see `scripts/health-check.ts`).",
  ].join("\n");
}

async function main() {
  const report: Report = JSON.parse(await readFile(process.argv[2], "utf8"));
  const failing = report.failed;
  const list: Issue[] = DRY ? (process.env.ISSUES_FIXTURE ? JSON.parse(await readFile(process.env.ISSUES_FIXTURE, "utf8")) : []) : (JSON.parse(gh(["issue", "list", "--label", LABEL, "--state", "all", "--limit", "50", "--json", "number,state,body,title"])) as Issue[]);
  const open = list.find((i) => i.state === "OPEN");
  const fpOf = (b: string) => b.match(/site-health-fingerprint:([0-9a-f]{12})/)?.[1];

  if (!failing.length) {
    if (!open) return console.log("All checks pass and no open health issue — nothing to do.");
    gh(["issue", "comment", String(open.number), "--body", `✅ Recovered: all production health checks passed at ${report.generatedAt}. Run: ${runUrl}`]);
    gh(["issue", "close", String(open.number), "--reason", "completed"]);
    return console.log(`Closed issue #${open.number} (recovered).`);
  }

  const fp = fingerprint(failing);
  const text = body(report, fp);
  const title = `Production health check failing: ${failing.join(", ")}`.slice(0, 120);
  if (open) {
    const same = fpOf(open.body ?? "") === fp;
    gh(["issue", "edit", String(open.number), "--title", title, "--body", text]);
    if (!same) gh(["issue", "comment", String(open.number), "--body", `The set of failing checks changed to: ${failing.join(", ")}. Run: ${runUrl}`]);
    return console.log(`Updated issue #${open.number} (${same ? "same failures, no comment" : "failures changed, commented"}).`);
  }
  const prior = list.find((i) => fpOf(i.body ?? "") === fp);
  if (prior) {
    gh(["issue", "reopen", String(prior.number)]);
    gh(["issue", "edit", String(prior.number), "--body", text]);
    gh(["issue", "comment", String(prior.number), "--body", `⚠️ Regressed: the same checks are failing again. Run: ${runUrl}`]);
    return console.log(`Reopened issue #${prior.number} (regression).`);
  }
  gh(["label", "create", LABEL, "--description", "Automated production health check", "--color", "B60205", "--force"]);
  gh(["issue", "create", "--title", title, "--label", LABEL, "--body", text]);
  console.log(`Created health issue for fingerprint ${fp}.`);
}

main().catch((e) => { console.error(`health-issue failed: ${(e as Error).message}`); process.exit(2); });
