import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

// Send metrics to analytics
const sendToAnalytics = (metric: any) => {
  // Log to console for development
  console.log(`Web Vital: ${metric.name}`, {
    value: metric.value
  });

  // Send to Google Analytics 4 if available
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "web_vitals", {
      event_category: "Web Vitals",
      event_label: metric.name,
      value: Math.round(metric.value),
      non_interaction: true
    });
  }
};

// Initialize Web Vitals monitoring
export const initWebVitals = () => {
  if (typeof window === "undefined") return;

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    console.log(
      "Web Vitals monitoring disabled due to reduced motion preference"
    );
    return;
  }

  // Monitor Core Web Vitals
  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getFCP(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
};

// Auto-initialize when imported
if (typeof window !== "undefined") {
  // Wait for page load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWebVitals);
  } else {
    initWebVitals();
  }
}
