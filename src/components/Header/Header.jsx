import React, { useCallback } from "react";
import styles from "./Header.module.css";

const Header = () => {
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
        }
      }
    }
  }, []);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.logo}>
        eXocriador<span className={styles.logoAccent}>.dev</span>
      </div>
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
      <button className={styles.ctaButton}>Order Project</button>
    </header>
  );
};

export default Header;
