import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.socialLinks}>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          LinkedIn
        </a>
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="Twitter"
        >
          Twitter
        </a>
      </div>
      <p className={styles.copyright}>
        © {new Date().getFullYear()} MyName.dev. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
