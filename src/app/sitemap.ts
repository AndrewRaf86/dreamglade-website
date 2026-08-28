import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://dreamglade.com";
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/safety-preparation`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/what-to-expect`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/master-plants`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/faq`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/apply`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/terms-and-conditions`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
