"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

export function ThemeToggle() {
  const t = useTranslations("theme");
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const current =
      (document.documentElement.getAttribute("data-theme") as Theme | null) ??
      null;
    setTheme(current);
  }, []);

  const toggleTheme = () => {
    if (typeof window === "undefined") return;
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage errors
    }
    setTheme(next);
  };

  if (!theme) return null;

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t("light") : t("dark")}
      style={{
        borderRadius: "999px",
        padding: "8px 14px",
        border: "1px solid var(--border-primary)",
        background: "transparent",
        color: "var(--text-primary)",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "0.9rem",
      }}
    >
      <span aria-hidden="true">{isDark ? "🌙" : "☀️"}</span>
      <span>{isDark ? t("dark") : t("light")}</span>
    </button>
  );
}

