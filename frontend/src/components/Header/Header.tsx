"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import styles from "./Header.module.css";

const localeLabels: Record<Locale, string> = {
  uk: "UA",
  en: "EN",
  de: "DE",
  fr: "FR",
  pt: "PT",
};

export function Header({ locale }: { locale: Locale }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  const pathForLocale = (loc: Locale) =>
    `/${loc}${pathname === "/" ? "" : pathname}`;

  return (
    <header
      className={styles.headerContainer}
      role="banner"
      aria-label="Main site header with navigation menu"
    >
      <div className={styles.logo}>
        <Link href="/" aria-label="Go to home page">
          eXocriador<span className={styles.logoAccent}>.dev</span>
        </Link>
      </div>

      <nav
        className={styles.nav}
        role="navigation"
        aria-label="Main navigation"
      >
        <Link href="/" className={styles.navLink}>
          {t("home")}
        </Link>
        <Link href="/about" className={styles.navLink}>
          {t("about")}
        </Link>
        <Link href="/services" className={styles.navLink}>
          {t("services")}
        </Link>
        <Link href="/portfolio" className={styles.navLink}>
          {t("portfolio")}
        </Link>
        <Link href="/contact" className={styles.navLink}>
          {t("contact")}
        </Link>
        <Link href="/contact" className={styles.ctaButton}>
          {t("orderProject")}
        </Link>
      </nav>

      <div className={styles.controls}>
        <div className={styles.localeSwitcher}>
          {routing.locales.map((loc) => (
            <a
              key={loc}
              href={pathForLocale(loc)}
              className={`${styles.localeLink} ${loc === locale ? styles.active : ""}`}
              aria-current={loc === locale ? "true" : undefined}
              aria-label={`Switch to ${localeLabels[loc]}`}
            >
              {localeLabels[loc]}
            </a>
          ))}
        </div>
        <ThemeToggle />
        <button
          type="button"
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen((v) => !v)}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.active : ""}`}
            aria-hidden
          />
          <span
            className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.active : ""}`}
            aria-hidden
          />
          <span
            className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.active : ""}`}
            aria-hidden
          />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.active : ""}`}
        onClick={closeMobileMenu}
        aria-hidden={!isMobileMenuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <nav
          className={styles.mobileNav}
          role="navigation"
          aria-label="Mobile navigation"
          onClick={(e) => e.stopPropagation()}
        >
          <Link href="/" className={styles.mobileNavLink} onClick={closeMobileMenu}>
            {t("home")}
          </Link>
          <Link href="/about" className={styles.mobileNavLink} onClick={closeMobileMenu}>
            {t("about")}
          </Link>
          <Link href="/services" className={styles.mobileNavLink} onClick={closeMobileMenu}>
            {t("services")}
          </Link>
          <Link href="/portfolio" className={styles.mobileNavLink} onClick={closeMobileMenu}>
            {t("portfolio")}
          </Link>
          <Link href="/contact" className={styles.mobileNavLink} onClick={closeMobileMenu}>
            {t("contact")}
          </Link>
          <Link
            href="/contact"
            className={styles.ctaButton}
            onClick={closeMobileMenu}
          >
            {t("orderProject")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
