# Run B log — CI quality gates

Date: 2026-08-27 (America/Lima)

Branch: `chore/ci-quality-gates`

Base SHA: `e4c938ddff606ad5e0a5170c5a921041308c8e23`

## Scope and boundaries

- Run B only: measure the existing CI path, add the minimum reliable quality
  gates for the current application, and verify them through a real pull
  request run.
- No business-fact, visual, application-flow, medical, screening, eligibility,
  booking, payment, or guest-communication behavior changes.
- `AGENTS.md` remains pre-existing user-owned work and is excluded.

## Baseline

The only workflow, `.github/workflows/ci.yml`, ran on pull requests to `main`
and contained two effective project commands: `npm ci` and `npm run build`.
The build includes Next.js's application TypeScript phase, but the workflow did
not independently expose lint failures, the scripts TypeScript project, the
canonical fact audit, dependency risk, or route-level runtime failures.

Run A PR #21 provided the remote baseline: the existing GitHub Actions `build`
job passed in 29 seconds.

### Local wall-time measurements before changes

Measured sequentially on the same 8-GB M2 MacBook Air checkout using
`/usr/bin/time -p`:

| Command | Real time | Result |
|---|---:|---|
| `npm ci` | 4.98s | PASS; 0 vulnerabilities |
| `npm run lint` | 2.91s | PASS |
| `npx tsc --noEmit` | 1.30s | PASS |
| `npm run typecheck` | 0.55s | PASS |
| `npm run audit:facts` | 0.24s | PASS; 51/51 |
| `npm run build` | 6.24s | PASS |

These measurements are local and environment-specific, but show that the
missing deterministic gates add only a few seconds beyond install and build.

## Implemented gates

- Run the workflow for both pull requests to `main` and pushes to `main`.
- Restrict the workflow token to read-only repository contents.
- Cancel obsolete runs for the same workflow/ref.
- Install from the lockfile once, then run explicit lint, application
  TypeScript, scripts TypeScript, canonical-fact, high-severity dependency,
  and production-build gates.
- Start the built Next.js server, wait up to 30 seconds for readiness, then run
  the existing 16-route smoke suite. The server process is cleaned up through a
  shell trap, and its log is printed if readiness fails.
- Add `npm run typecheck:app` so the application TypeScript gate is named and
  reproducible locally instead of relying on an implicit `npx` invocation.

## Verification

### Local workflow-equivalent checks

| Check | Result |
|---|---|
| Workflow YAML parse | PASS |
| `npm ci` | PASS; 368 packages installed, 369 audited, 0 vulnerabilities |
| `npm run lint` | PASS |
| `npm run typecheck:app` | PASS |
| `npm run typecheck` | PASS |
| `npm run audit:facts` | PASS; 51/51 |
| `npm audit --audit-level=high` | PASS; 0 vulnerabilities |
| `npm run build` | PASS; 13 routes generated |
| Production server readiness loop | PASS; ready on port 3189 |
| `SMOKE_TEST_BASE_URL=http://localhost:3189 npm run smoke-test` | PASS; 16/16 routes |
| `git diff --check` | PASS |

The install retained its pre-existing, non-failing allow-scripts notice for
`unrs-resolver@1.12.2`. The fact audit retained its pre-existing, non-failing
`MODULE_TYPELESS_PACKAGE_JSON` warning. Neither warning was introduced by this
run.

### Remote verification

- Primary pull request: [#22](https://github.com/AndrewRaf86/dreamglade-website/pull/22)
- PR head: `2d856475fd05499fc5f2f3ed204fd01bfb994352`
- Merge commit: `33d5a0cc4c37b4d18c47f4e73c7fb5ea01ccf65e`
- PR workflow run `33136584092`: PASS in 37 seconds. Every named gate,
  including production build and production-server smoke test, passed.
- Post-merge push workflow run `33136632534`: PASS in 44 seconds. Every named
  gate passed on `main`.
- Compared with Run A's build-only PR baseline of 29 seconds, the complete new
  PR workflow added eight seconds in that GitHub-hosted run.

The first post-merge run emitted an infrastructure annotation because the
pre-existing `actions/checkout@v4` and `actions/setup-node@v4` releases target
the deprecated Node 20 action runtime. GitHub successfully forced them onto
Node 24, so this was not a failed gate. Official release metadata showed
`actions/checkout` v7.0.1 (published 2026-07-20) and `actions/setup-node` v7.0.0
(published 2026-07-14); both v7 action manifests declare `node24`. The workflow
was therefore updated to the current v7 major in a small Run B follow-up.

## Pre-PR verdict

**GO.** The workflow is syntactically valid and the complete intended command
sequence passes locally, including the production-server smoke suite.
