import { track } from "@vercel/analytics";

export type TrackedEventName =
  | "Apply Click"
  | "Availability Click"
  | "Email Click"
  | "WhatsApp Click"
  | "Safety Click"
  | "FAQ Click"
  | "Experience Click"
  | "YouTube Click"
  | "Instagram Click"
  | "Google Reviews Click";

const GA4_EVENT_NAMES: Record<TrackedEventName, string> = {
  "Apply Click": "apply_click",
  "Availability Click": "availability_click",
  "Email Click": "email_click",
  "WhatsApp Click": "whatsapp_click",
  "Safety Click": "safety_click",
  "FAQ Click": "faq_click",
  "Experience Click": "experience_click",
  "YouTube Click": "youtube_click",
  "Instagram Click": "instagram_click",
  "Google Reviews Click": "google_reviews_click",
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Sends the same visitor action to Vercel Analytics and GA4 (when loaded).
 * GA4 dispatch is a no-op if window.gtag isn't present (e.g. measurement ID unset).
 */
export function trackEvent(event: TrackedEventName, properties?: Record<string, string>) {
  track(event, properties);

  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", GA4_EVENT_NAMES[event], properties);
  }
}
