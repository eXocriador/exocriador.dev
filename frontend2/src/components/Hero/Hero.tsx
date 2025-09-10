import React from "react";
import styles from "./Hero.module.css";

const Hero: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.sectionContent}>
        <h1 className={styles.sectionTitle}>Hero Component</h1>
        <h2 className={styles.sectionSubtitle}>Hero Component</h2>
        <div className={styles.sectionButtons}>
          <button className={styles.sectionButton}>Hero Component</button>
          <button className={styles.sectionButton}>Hero Component</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
