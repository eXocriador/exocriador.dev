import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.logo}>MyName.dev</div>
      <nav className={styles.nav}>
        <a className={styles.navLink} href="#hero">
          Hero
        </a>
        <a className={styles.navLink} href="#about">
          About
        </a>
        <a className={styles.navLink} href="#services">
          Services
        </a>
        <a className={styles.navLink} href="#contact">
          Contact
        </a>
      </nav>
      <button className={styles.ctaButton}>Замовити проєкт</button>
    </header>
  );
};

export default Header;
