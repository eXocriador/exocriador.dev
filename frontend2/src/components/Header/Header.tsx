import React from "react";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div>
        <a href="#">exocriador.dev</a>
      </div>
      <nav className={styles.nav}>
        <a href="#">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#contact">Contact</a>
      </nav>
      <div>
        <a href="#contact">Order Project</a>
      </div>
    </header>
  );
};

export default Header;
