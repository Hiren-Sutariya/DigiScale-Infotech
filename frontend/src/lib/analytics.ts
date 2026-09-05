/**
 * DigiScale Infotech — Performance Marketing & Conversion Tracking Helper
 * Standardized analytics events for GTM (dataLayer), GA4 (gtag), Meta Pixel (fbq), and LinkedIn.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    lintrk?: (action: string, data: Record<string, unknown>) => void;
  }
}

export interface AnalyticsEventParams {
  category?: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
}

/**
 * Track custom user events across GTM, GA4, Meta Pixel, and LinkedIn
 */
export function trackEvent(eventName: string, params: AnalyticsEventParams = {}) {
  try {
    // 1. GTM dataLayer
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventName,
        ...params,
      });

      // 2. GA4 gtag direct
      if (typeof window.gtag === "function") {
        window.gtag("event", eventName, params);
      }

      // 3. Meta Pixel (fbq) Custom Event
      if (typeof window.fbq === "function") {
        window.fbq("trackCustom", eventName, params);
      }
    }
  } catch (err) {
    console.warn("[Analytics] Event tracking error:", err);
  }
}

/**
 * Lead Conversion — Contact Form Submission
 */
export function trackContactFormSubmit(formData: { service?: string; source?: string }) {
  trackEvent("generate_lead", {
    category: "Lead Generation",
    label: formData.service || "General Inquiry",
    source: formData.source || "Contact Page Form",
  });

  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Lead", { content_name: formData.service });
  }
}

/**
 * Click to WhatsApp Conversion
 */
export function trackWhatsAppClick(locationLabel = "General") {
  trackEvent("whatsapp_click", {
    category: "Direct Contact",
    label: locationLabel,
  });
}

/**
 * Click to Call / Email
 */
export function trackContactClick(type: "phone" | "email", detail: string) {
  trackEvent(`${type}_click`, {
    category: "Direct Contact",
    label: detail,
  });
}
