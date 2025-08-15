import React from "react";
import styles from "./SkipLink.module.css";

const SkipLink: React.FC = () => {
  return (
    <a href="#main-content" className={styles.skipLink}>
      Skip to main content
    </a>
  );
};

export default SkipLink;
