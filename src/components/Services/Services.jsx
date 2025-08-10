import React from "react";
import { motion } from "framer-motion";
import styles from "./Services.module.css";

const Services = () => {
  const services = [
    {
      icon: "⚡️",
      title: "Фронтенд-розробка",
      desc: "Швидкі та доступні інтерфейси з фокусом на UX і продуктивності."
    },
    {
      icon: "🎨",
      title: "Анімації та взаємодії",
      desc: "Живі анімації, мікровзаємодії та плавні переходи для сучасних продуктів."
    },
    {
      icon: "🧩",
      title: "React-архітектура",
      desc: "Чисті компоненти, зрозуміла структура та масштабовані рішення."
    }
  ];

  return (
    <section id="services">
      <h2>Що я пропоную</h2>
      <div className={styles.cardsContainer}>
        {services.map(({ icon, title, desc }) => (
          <motion.div
            key={title}
            className={styles.serviceCard}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.icon}>{icon}</div>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardDesc}>{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
