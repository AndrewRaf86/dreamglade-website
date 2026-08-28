import { buildLlmsTxt } from "@/lib/ai-content";

// Static — no request-dependent data. Rebuild on deploy to pick up a
// src/lib/facts.ts change, same as any other statically generated route.
export const dynamic = "force-static";

export async function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
