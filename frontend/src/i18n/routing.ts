export const routing = {
  locales: ["uk", "en", "de", "fr", "pt"] as const,
  defaultLocale: "uk" as const,
  localePrefix: "always" as const,
};

export type Locale = (typeof routing.locales)[number];
