import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://dreamglade.com";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/safety-preparation`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/what-to-expect`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/apply`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/terms-and-conditions`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
