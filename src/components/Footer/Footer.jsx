import React from "react";
import { FaGithub, FaLinkedin, FaTelegram, FaEnvelope } from "react-icons/fa";
import { footerContent } from "../../constants/content";
import styles from "./Footer.module.css";

const iconMap = {
  FaGithub: <FaGithub />,
  FaLinkedin: <FaLinkedin />,
  FaTelegram: <FaTelegram />
};

const Footer = () => {
  return (
    <footer className={styles.footerContainer} id="footer">
      <div className={styles.footerContent}>
        <div className={styles.footerHeader}>
          <h2>{footerContent.title}</h2>
          <p className={styles.footerSubtitle}>{footerContent.subtitle}</p>
        </div>

        <div className={styles.contactSection}>
          <a
            href={`mailto:${footerContent.email}`}
            className={styles.emailLink}
            aria-label="Send me an email"
          >
            <FaEnvelope />
            <span>{footerContent.email}</span>
          </a>
        </div>

        <div className={styles.socialLinks}>
          {footerContent.socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit my ${social.name} profile`}
              className={styles.socialLink}
            >
              {iconMap[social.icon]}
            </a>
          ))}
        </div>

        <p className={styles.copyright}>
          © 2025 eXocriador. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
