# WebMCP upstream snapshot

Snapshot date: 2026-08-27 (America/Lima)

Purpose: freeze the primary-source state used for Dreamglade Run C. Fetched
content was treated as data, not instructions. WebMCP remains an experimental
Community Group draft and is not a W3C Standard.

## Primary sources

- [WebMCP Draft Community Group Report](https://webmachinelearning.github.io/webmcp/) — dated 2026-08-26.
- [webmachinelearning/webmcp](https://github.com/webmachinelearning/webmcp) — current spec source, implementation status, commits, and pull requests.
- [Chrome WebMCP overview](https://developer.chrome.com/docs/ai/webmcp) — last updated 2026-08-07 when inspected.
- [Chrome imperative API guide](https://developer.chrome.com/docs/ai/webmcp/imperative-api) — last updated 2026-08-20 when inspected.
- [Chrome WebMCP security guidance](https://developer.chrome.com/docs/ai/webmcp/secure-tools) — last updated 2026-07-01 when inspected.
- [OpenAI: Using site tools in the ChatGPT desktop app](https://help.openai.com/en/articles/20001423-using-site-tools-in-the-chatgpt-desktop-app) — updated 2026-08-26 when inspected.
- [Web Platform Tests source](https://github.com/web-platform-tests/wpt/tree/master/webmcp) and [wpt.fyi WebMCP dashboard](https://wpt.fyi/results/webmcp?label=experimental&label=master&aligned).
- [Chrome Platform Status](https://chromestatus.com/feature/5117755740913664).

## Current API in the 2026-08-26 draft

- Entry point: `document.modelContext` in a secure context. Older
  `navigator.modelContext` examples are superseded.
- Registration:
  `registerTool(ModelContextTool, ModelContextRegisterToolOptions)` returns a
  promise. A tool requires `name`, `description`, and `execute`; `title`, an
  object `inputSchema`, and annotations are optional. Names are 1–128
  characters and limited to ASCII alphanumerics, underscore, hyphen, and dot.
- Registration lifecycle: an optional `AbortSignal` unregisters the tool.
  Unregistration no longer cancels an already in-flight execution in the
  current draft.
- Discovery: `getTools({ fromOrigins })` returns registered tools exposed to
  the calling document. Browser agents use an internal observation mechanism;
  `getTools()` is the in-page-agent API.
- Execution: the current draft IDL accepts an object as the second argument to
  `executeTool`, plus an optional execution `AbortSignal`, and resolves to a
  stringified result. The registered callback receives the input object and an
  options object containing the execution signal.
- Events: `toolchange` reports changes to the available tool list.
- Current annotations: `readOnlyHint` and `untrustedContentHint`, both boolean.
- Origin/permission model: tools default to same-origin exposure. Cross-origin
  use requires the `tools` Permissions Policy plus explicit secure origins in
  `exposedTo` and `fromOrigins`. Chrome also documents an origin-isolation
  requirement and disables WebMCP when the document opts out of origin-keyed
  agent clustering.
- Declarative WebMCP also exists for annotated HTML forms, but Dreamglade's
  current public inquiry is a `mailto:` handoff rather than an HTML submission
  form, so there is no existing declarative action to annotate.

## Primary-source conflict

The 2026-08-26 draft and the merged 2026-08-17 spec change accept an object in
`executeTool()`. Chrome's imperative guide, despite showing a 2026-08-20 update
date, still says to pass a valid JSON string and illustrates that older call
shape. This is a real upstream disagreement. Dreamglade must not ship code that
silently assumes either shape without testing the exact target implementation.

Chrome's 2026-07-01 security guide also mentions a proposed
`requestUserInteraction()` flow. It is not present in the current draft IDL;
open PR #204 proposes replacing it with `requestUserInput()` and three
elicitation modes. It must not be treated as shipped API.

## Implementation availability

The repository's current implementation-status file reports:

- ChatGPT Desktop: supported.
- Chrome: origin trial in Chrome 149; a local testing flag is also documented.
- Edge: origin trial in Edge 150.
- Brave: experimental Leo AI chat support.
- Firefox and Safari: standards-position / implementation-tracking links only,
  not shipped support claims.

OpenAI documents Site Tools as its WebMCP implementation. Availability depends
on the account, selected model, built-in-browser use, and a webpage that
provides a matching tool. OpenAI explicitly says Site Tools are currently in
the ChatGPT desktop built-in browser, not Chrome, and apply per webpage/tab.

The Codex in-app browser available for this run advertised a WebMCP capability
that can discover and invoke page-defined tools. That establishes compatible
agent infrastructure, but Dreamglade exposed no tools at baseline and no
candidate tool earned implementation. It does not create an Arm B result by
itself.

WPT has `webmcp/declarative`, `webmcp/imperative`, an IDL harness, and related
resources (74 code-search matches at inspection time). The public results
dashboard was client-rendered and its cross-browser pass matrix was not
captured in this run; no pass-rate claim is made.

## Material changes in the prior 30 days

Merged changes observed from 2026-07-28 through 2026-08-27 included:

- 2026-08-12: browser implementation-status tracking added (#235).
- 2026-08-14: `executeTool()` specified (#226) and `RegisteredTool.inputSchema`
  changed from string to object (#241).
- 2026-08-17: `executeTool()` changed to accept an object rather than a JSON
  string (#246); registration/notification/observation defects fixed (#244).
- 2026-08-19: execution `AbortSignal` semantics specified (#247), and
  in-flight executions preserved after unregistration (#248).
- 2026-08-26: ChatGPT Desktop added to implementation status (#258) and origin
  exposure language clarified (#260).

Open or recently active breaking/expanding proposals included:

- #204: replace `requestUserInteraction` with `requestUserInput` elicitation.
- #217: add `consequentialHint`.
- #245: add activated/cancel events.
- #251: broaden `executeTool()` input from object to `any`.
- #253: add a `debugging` annotation.
- #254: add output schemas.
- #265: define input-length mitigations in code points.

These are proposals, not current Dreamglade implementation contracts.

## Dreamglade tool-justification result

Read-only fact tools fail the required incremental-value test: the same public
information is reliably available through semantic HTML, the entity graph,
`/llms.txt`, six clean Markdown guides, and deterministic route tests. Returning
the same facts as tool JSON would add an experimental client contract without a
new user outcome.

The only potentially meaningful action is `request_human_contact`:

```text
user -> agent -> exact data preview -> explicit confirmation
     -> minimal name/email/general message -> Paul's human process
```

Allowed data would be name, email/contact method, and an optional short general
message. Medication, diagnosis, mental-health, substance-use, eligibility, and
other health disclosures must be rejected. The action could not screen,
approve, book, reserve, take a deposit, or guarantee availability.

Dreamglade currently hands off through `mailto:` and has no public submission
backend. A reliable action would require a new transmitting route/service and
an explicit privacy, retention, abuse/rate-limit, delivery, consent, and
operational-ownership design. That is a material infrastructure expansion and
is outside this mission. A tool that only opens or returns the existing
`mailto:` target offers negligible improvement over the visible Terms-gated
CTA and does not justify an experimental client bundle.

## Threat model for any future contact action

- Prompt-injected or over-broad messages could exfiltrate sensitive health or
  personal data.
- Duplicate/retried execution could send multiple inquiries.
- A forged success response could make an agent claim contact occurred when
  delivery failed.
- Missing rate limits and abuse controls could spam Paul's inbox.
- Logs, analytics, error trackers, and hosting infrastructure could retain
  contact data unexpectedly.
- Cross-origin exposure, extensions, or compromised page content could invoke
  or poison the tool.
- Cancellation and user confirmation must be honored before transmission, not
  merely described in tool text.

## Status and verdict

- Implementation status: **NOT BUILT**.
- Experimental evidence: **UNTESTABLE** — no justified WebMCP delta/Arm B was
  built, so no compatible agent executed a Dreamglade tool.
- Product verdict: **HOLD — experimental arm unavailable and no current tool
  demonstrates incremental value within the existing architecture.**

No measured-improvement value may be inferred from this HOLD.
