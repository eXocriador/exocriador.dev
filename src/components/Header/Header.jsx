import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.logo}>
        eXocriador<span className={styles.logoAccent}>.dev</span>
      </div>
      <nav className={styles.nav}>
        <a
          className={styles.navLink}
          href="#hero"
          onClick={(e) => handleNavClick(e, "hero")}
        >
          Home
        </a>
        <a
          className={styles.navLink}
          href="#about"
          onClick={(e) => handleNavClick(e, "about")}
        >
          About
        </a>
        <a
          className={styles.navLink}
          href="#services"
          onClick={(e) => handleNavClick(e, "services")}
        >
          Services
        </a>
        <a
          className={styles.navLink}
          href="#portfolio"
          onClick={(e) => handleNavClick(e, "portfolio")}
        >
          Portfolio
        </a>
        <a
          className={styles.navLink}
          href="#contact"
          onClick={(e) => handleNavClick(e, "contact")}
        >
          Contact
        </a>
      </nav>
      <button className={styles.ctaButton}>Order Project</button>
    </header>
  );
};

export default Header;
