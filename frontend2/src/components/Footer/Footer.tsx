import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.footerLinks}></ul>
      <p className={styles.footerCopyright}>
        © 2024 Exocriador. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
