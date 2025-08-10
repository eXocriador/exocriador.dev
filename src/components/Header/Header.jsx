import React, { useCallback, useState } from "react";
import styles from "./Header.module.css";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = useCallback((e) => {
    if (e.target.tagName === "A") {
      e.preventDefault();
      const targetId = e.target.getAttribute("data-target-id");
      if (targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
          // Close mobile menu after navigation
          setIsMobileMenuOpen(false);
        }
      }
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.logo}>
        eXocriador<span className={styles.logoAccent}>.dev</span>
      </div>

      {/* Desktop Navigation */}
      <nav className={styles.nav} onClick={handleNavClick}>
        <a className={styles.navLink} href="#hero" data-target-id="hero">
          Home
        </a>
        <a className={styles.navLink} href="#about" data-target-id="about">
          About
        </a>
        <a
          className={styles.navLink}
          href="#services"
          data-target-id="services"
        >
          Services
        </a>
        <a
          className={styles.navLink}
          href="#portfolio"
          data-target-id="portfolio"
        >
          Portfolio
        </a>
        <a className={styles.navLink} href="#contact" data-target-id="contact">
          Contact
        </a>
      </nav>

      {/* Desktop CTA Button */}
      <button className={styles.ctaButton}>Order Project</button>

      {/* Mobile Menu Button */}
      <button
        className={styles.mobileMenuButton}
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <span
          className={`${styles.hamburgerLine} ${
            isMobileMenuOpen ? styles.active : ""
          }`}
        ></span>
        <span
          className={`${styles.hamburgerLine} ${
            isMobileMenuOpen ? styles.active : ""
          }`}
        ></span>
        <span
          className={`${styles.hamburgerLine} ${
            isMobileMenuOpen ? styles.active : ""
          }`}
        ></span>
      </button>

      {/* Mobile Navigation Overlay */}
      <div
        className={`${styles.mobileMenuOverlay} ${
          isMobileMenuOpen ? styles.active : ""
        }`}
        onClick={closeMobileMenu}
      >
        <nav className={styles.mobileNav} onClick={handleNavClick}>
          <a
            className={styles.mobileNavLink}
            href="#hero"
            data-target-id="hero"
          >
            Home
          </a>
          <a
            className={styles.mobileNavLink}
            href="#about"
            data-target-id="about"
          >
            About
          </a>
          <a
            className={styles.mobileNavLink}
            href="#services"
            data-target-id="services"
          >
            Services
          </a>
          <a
            className={styles.mobileNavLink}
            href="#portfolio"
            data-target-id="portfolio"
          >
            Portfolio
          </a>
          <a
            className={styles.mobileNavLink}
            href="#contact"
            data-target-id="contact"
          >
            Contact
          </a>
          <button className={styles.mobileCtaButton}>Order Project</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
