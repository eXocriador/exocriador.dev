import React, { useCallback, useState } from "react";
import styles from "./Header.module.css";
import { scrollToSection, scrollToContact } from "../../utils/scrollUtils";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = useCallback((e) => {
    if (e.target.tagName === "A") {
      e.preventDefault();
      const targetId = e.target.getAttribute("data-target-id");
      if (targetId) {
        if (targetId === "contact") {
          scrollToContact();
        } else if (targetId === "what-i-offer") {
          scrollToSection("what-i-offer");
        } else {
          scrollToSection(targetId);
        }
        // Close mobile menu after navigation
        setIsMobileMenuOpen(false);
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
    <header
      className={styles.headerContainer}
      role="banner"
      aria-label="Main site header with navigation menu"
    >
      <div className={styles.logo}>
        <a href="#hero" aria-label="Go to home page">
          eXocriador<span className={styles.logoAccent}>.dev</span>
        </a>
      </div>

      {/* Desktop Navigation */}
      <nav
        className={styles.nav}
        onClick={handleNavClick}
        role="navigation"
        aria-label="Main navigation"
      >
        <a
          className={styles.navLink}
          href="#hero"
          data-target-id="hero"
          aria-label="Go to home section"
        >
          Home
        </a>
        <a
          className={styles.navLink}
          href="#about"
          data-target-id="about"
          aria-label="Go to about section"
        >
          About
        </a>
        <a
          className={styles.navLink}
          href="#what-i-offer"
          data-target-id="what-i-offer"
          aria-label="Go to what I offer section"
        >
          Services
        </a>
        <a
          className={styles.navLink}
          href="#portfolio"
          data-target-id="portfolio"
          aria-label="Go to portfolio section"
        >
          Portfolio
        </a>
        <a
          className={styles.navLink}
          href="#contact"
          data-target-id="contact"
          aria-label="Go to contact section"
        >
          Contact
        </a>
      </nav>

      {/* Desktop CTA Button */}
      <button
        className={styles.ctaButton}
        onClick={scrollToContact}
        aria-label="Go to contact section to order a project"
      >
        Order Project
      </button>

      {/* Mobile Menu Button */}
      <button
        className={styles.mobileMenuButton}
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
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
        id="mobile-menu"
        className={`${styles.mobileMenuOverlay} ${
          isMobileMenuOpen ? styles.active : ""
        }`}
        onClick={closeMobileMenu}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav
          className={styles.mobileNav}
          onClick={handleNavClick}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <a
            className={styles.mobileNavLink}
            href="#hero"
            data-target-id="hero"
            aria-label="Go to home section"
          >
            Home
          </a>
          <a
            className={styles.mobileNavLink}
            href="#about"
            data-target-id="about"
            aria-label="Go to about section"
          >
            About
          </a>
          <a
            className={styles.mobileNavLink}
            href="#services"
            data-target-id="services"
            aria-label="Go to services section"
          >
            Services
          </a>
          <a
            className={styles.mobileNavLink}
            href="#portfolio"
            data-target-id="portfolio"
            aria-label="Go to portfolio section"
          >
            Portfolio
          </a>
          <a
            className={styles.mobileNavLink}
            href="#contact"
            data-target-id="contact"
            aria-label="Go to contact section"
          >
            Contact
          </a>
          <button
            className={styles.mobileCtaButton}
            onClick={() => {
              scrollToSection("contact");
              closeMobileMenu();
            }}
            aria-label="Go to contact section to order a project"
          >
            Order Project
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
