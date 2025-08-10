import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.heroSection} id="hero">
      <motion.h1
        className={styles.heroTitle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Hi, I build delightful web experiences
      </motion.h1>

      <h2 className={styles.heroSubtitle}>
        <TypeAnimation
          sequence={[
            "Frontend Developer",
            1500,
            "React Specialist",
            1500,
            "UI/UX Enthusiast",
            1500
          ]}
          wrapper="span"
          speed={40}
          repeat={Infinity}
        />
      </h2>

      <div className={styles.buttonsRow}>
        <motion.button
          className={styles.primaryButton}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onClick={() => (window.location.hash = "#about")}
        >
          Дізнатись більше
        </motion.button>
        <motion.button
          className={styles.secondaryButton}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={() => (window.location.hash = "#services")}
        >
          Переглянути послуги
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
