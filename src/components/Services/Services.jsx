import React from "react";
import { useInView } from "react-intersection-observer";
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

const ServiceCard = React.memo(({ service, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  return (
    <div
      ref={ref}
      className={`${styles.serviceCard} ${inView ? styles.animateIn : ""}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className={styles.serviceIcon}>{service.icon}</div>
      <h3 className={styles.cardTitle}>{service.title}</h3>
      <p>{service.desc}</p>
    </div>
  );
});

const Services = () => {
  return (
    <section id="services" className={styles.servicesSection}>
      <h2>What I Offer</h2>
      <div className={styles.cardsContainer}>
        {servicesData.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Services;
