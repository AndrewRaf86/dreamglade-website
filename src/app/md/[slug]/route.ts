import { FAQ_ITEMS } from "@/lib/faq-data";
import { SAFETY_PREPARATION_MARKDOWN } from "@/lib/safety-markdown";

function buildFaqMarkdown(): string {
  const lines: string[] = [];
  lines.push("# Frequently Asked Questions — Dreamglade");
  lines.push("");
  lines.push("Source: https://dreamglade.com/faq");
  lines.push(
    "This is a clean-text mirror for AI systems and text-based readers, generated " +
      "from the same structured data the live FAQ page uses for its FAQPage " +
      "structured data (JSON-LD). The live page is canonical if the two ever disagree.",
  );
  lines.push("");
  for (const item of FAQ_ITEMS) {
    lines.push(`## ${item.question}`);
    lines.push("");
    lines.push(item.answer);
    lines.push("");
  }
  return lines.join("\n");
}

// A real Map, not a plain object — MARKDOWN_SOURCES.get("toString") or
// .get("__proto__") returns undefined here, unlike a plain object literal,
// which would resolve inherited Object.prototype members and let those
// slugs slip past the 404 path (confirmed during independent review:
// /md/toString, /md/constructor, /md/hasOwnProperty, /md/__proto__, and
// /md/valueOf all misbehaved against the old Record<string, ...> lookup).
const MARKDOWN_SOURCES = new Map<string, () => string>([
  ["safety-preparation", () => SAFETY_PREPARATION_MARKDOWN],
  ["faq", buildFaqMarkdown],
]);

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const source = MARKDOWN_SOURCES.get(slug);

  if (!source) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(source(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
