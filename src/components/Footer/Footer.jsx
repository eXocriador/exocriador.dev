import React from "react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.socialLinks}>
        <a
          href="https://github.com/eXocriador"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit my GitHub profile"
        >
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com/in/exocriador"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit my LinkedIn profile"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://twitter.com/exocriador"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit my Twitter profile"
        >
          <FaXTwitter />
        </a>
      </div>
      <p className={styles.copyright}>
        © {new Date().getFullYear()} eXocriador. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
