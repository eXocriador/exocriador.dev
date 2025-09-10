import React from "react";
import styles from "./ContactMe.module.css";

const ContactMe: React.FC = () => {
  return (
    <section className={styles.contactSection}>
      <h2 className={styles.sectionTitle}>Contact Me Component</h2>
      <div className={styles.sectionContent}>
        <div className={styles.formContainer}>Form Container</div>
        <div className={styles.infoContainer}>Info Container</div>
      </div>
    </section>
  );
};

export default ContactMe;
