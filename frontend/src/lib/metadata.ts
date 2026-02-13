import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

const BASE = "https://exocriador.dev";

export function buildAlternates(path: string): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    const segment = path ? `/${path}` : "";
    languages[locale] = `${BASE}/${locale}${segment}`;
  }
  return { languages };
}
