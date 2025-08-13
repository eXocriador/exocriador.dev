import React from "react";
import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa";
import { footerContent } from "../../constants/content";
import styles from "./Footer.module.css";

const iconMap = {
  FaGithub: <FaGithub />,
  FaLinkedin: <FaLinkedin />,
  FaTelegram: <FaTelegram />
};

const Footer = () => {
  return (
    <footer
      className={styles.footerContainer}
      id="footer"
      role="contentinfo"
      aria-label="Footer with brand name, copyright and social media links"
    >
      <div className={styles.footerContent}>
        <div className={styles.brandSection}>
          <h2 className={styles.brandName}>eXocriador</h2>
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
              <span className="sr-only">{social.name}</span>
            </a>
          ))}
        </div>

        <p className={styles.copyright}>
          © 2024 eXocriador. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
