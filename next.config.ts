import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { formats: ["image/webp"] },
  async redirects() {
    return [
      { source: "/about/dreamglade", destination: "/#about", permanent: true },
      { source: "/about/location", destination: "/#about", permanent: true },
      { source: "/about/stace", destination: "/#about", permanent: true },
      { source: "/about/ayahuasca-and-amazonian-shamanism", destination: "/what-to-expect", permanent: true },
      { source: "/about/ceremony", destination: "/what-to-expect", permanent: true },
      { source: "/services/accommodation", destination: "/what-to-expect", permanent: true },
      { source: "/services/the-communal-house", destination: "/what-to-expect", permanent: true },
      { source: "/about/sauna-sweat-lodge", destination: "/what-to-expect", permanent: true },
      { source: "/come-prepared", destination: "/safety-preparation", permanent: true },
      { source: "/about/medicinal-plant-dietas", destination: "/safety-preparation", permanent: true },
      { source: "/about/kambo-treatments", destination: "/safety-preparation", permanent: true },
      { source: "/the-dream-team/shipibo-healers", destination: "/#healers", permanent: true },
      { source: "/the-dream-team/owners-facilitators-wade-clarisa", destination: "/#about", permanent: true },
      { source: "/the-dream-team/yoga-breathwork-teacher-mair", destination: "/what-to-expect", permanent: true },
      { source: "/services/booking-a-retreat", destination: "/#pricing", permanent: true },
      { source: "/booking-integration-coach-paul", destination: "/apply", permanent: true },
      { source: "/contact", destination: "/apply", permanent: true },
      { source: "/contact-us", destination: "/apply", permanent: true },
      { source: "/testimonials-3/written-testimonials", destination: "/#reviews", permanent: true },
      { source: "/testimonials-3/videos", destination: "/#reviews", permanent: true },
      { source: "/resources/recommended-reading", destination: "/faq", permanent: true },
      { source: "/resources/films", destination: "/faq", permanent: true },
      { source: "/resources/links", destination: "/faq", permanent: true },
      { source: "/gallery", destination: "/#about", permanent: true },
      { source: "/terms", destination: "/terms-and-conditions", permanent: true },
    ];
  },
};

export default nextConfig;
