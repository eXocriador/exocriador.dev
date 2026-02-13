import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE = "https://exocriador.dev";
const paths = ["", "/about", "/services", "/portfolio", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of routing.locales) {
    for (const path of paths) {
      const url = path ? `/${locale}${path}` : `/${locale}`;
      entries.push({
        url: `${BASE}${url}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
      });
    }
  }
  return entries;
}
