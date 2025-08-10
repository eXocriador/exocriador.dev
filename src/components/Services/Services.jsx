import React from "react";
import { motion } from "framer-motion";
import { FaCode, FaPalette, FaReact } from "react-icons/fa6";
import styles from "./Services.module.css";

const servicesData = [
  {
    icon: <FaCode />,
    title: "Frontend Development",
    desc: "Fast and accessible interfaces with focus on UX and performance. I create responsive, modern web applications that work seamlessly across all devices."
  },
  {
    icon: <FaPalette />,
    title: "Animations & Interactions",
    desc: "Living animations, micro-interactions, and smooth transitions for modern products. Every movement is crafted to enhance user experience and engagement."
  },
  {
    icon: <FaReact />,
    title: "React Architecture",
    desc: "Clean components, clear structure, and scalable solutions. I build maintainable React applications with best practices and modern patterns."
  }
];

const Services = () => {
  return (
    <section id="services" className={styles.servicesSection}>
      <h2>What I Offer</h2>
      <div className={styles.cardsContainer}>
        {servicesData.map((service, index) => (
          <motion.div
            key={index}
            className={styles.serviceCard}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className={styles.serviceIcon}>{service.icon}</div>
            <h3 className={styles.cardTitle}>{service.title}</h3>
            <p>{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
