import React from "react";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <a href="#">
          eXocriador<span className={styles.logoAccent}>.dev</span>
        </a>
      </div>
      <nav className={styles.nav}>
        <a href="#">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#contact">Contact</a>
      </nav>
      <button className="button buttonSmall">Order Project</button>
    </header>
  );
};

export default Header;
