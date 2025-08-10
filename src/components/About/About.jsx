import React from "react";
import { motion } from "framer-motion";
import styles from "./About.module.css";

const About = () => {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.aboutContainer}>
        <div className={styles.textColumn}>
          <h2>Про мене</h2>
          <p>
            Я займаюся фронтенд-розробкою та створенням інтерфейсів, приділяючи
            увагу продуктивності, доступності та візуальній виразності. Люблю
            React-екосистему, анімації та сучасні інструменти розробки.
          </p>
        </div>
        <div className={styles.stackColumn}>
          <h3>Мій стек</h3>
          <div className={styles.tagsRow}>
            <span className={styles.techTag}>React</span>
            <span className={styles.techTag}>JavaScript</span>
            <span className={styles.techTag}>TypeScript</span>
            <span className={styles.techTag}>Vite</span>
            <span className={styles.techTag}>Framer Motion</span>
            <span className={styles.techTag}>CSS Modules</span>
            <span className={styles.techTag}>HTML5</span>
            <span className={styles.techTag}>Git</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
