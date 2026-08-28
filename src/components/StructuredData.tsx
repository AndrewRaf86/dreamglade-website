import type { JsonLdNode } from "@/lib/structured-data";

export default function StructuredData({ id, data }: { id: string; data: JsonLdNode }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script id={id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
