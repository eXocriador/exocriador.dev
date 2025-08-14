import React from "react";
import { useInView } from "react-intersection-observer";
import { FaReact, FaServer, FaDocker } from "react-icons/fa";
import { MdDevices } from "react-icons/md";
import styles from "./WhatIOffer.module.css";

const servicesData = [
  {
    title: "Frontend Development",
    description:
      "Building responsive, and optimized web applications using modern technologies like React, Next.js, and TypeScript.",
    icon: <FaReact className={styles.serviceIcon} />
  },
  {
    title: "Backend Development",
    description:
      "Developing robust and scalable server-side applications, REST APIs, and database solutions with Node.js and PostgreSQL.",
    icon: <FaServer className={styles.serviceIcon} />
  },
  {
    title: "Responsive & Accessible Design",
    description:
      "Implementing designs that work seamlessly across all devices and are accessible to all users, ensuring a great user experience.",
    icon: <MdDevices className={styles.serviceIcon} />
  },
  {
    title: "DevOps & Deployment",
    description:
      "Managing the full lifecycle of applications, including containerization with Docker, CI/CD pipelines, and deployment on platforms like Vercel.",
    icon: <FaDocker className={styles.serviceIcon} />
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
      <div className={styles.iconContainer}>{service.icon}</div>
      <h3 className={styles.cardTitle}>{service.title}</h3>
      <p className={styles.serviceDescription}>{service.description}</p>
    </div>
  );
});

const WhatIOffer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  return (
    <section
      ref={ref}
      id="what-i-offer"
      className={`${styles.whatIOfferSection} ${
        inView ? styles.animateIn : ""
      }`}
      aria-labelledby="what-i-offer-title"
      aria-label="Full-stack development services I offer"
    >
      <h2 id="what-i-offer-title">What I Offer</h2>
      <div className={styles.cardsContainer}>
        {servicesData.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </section>
  );
};

export default WhatIOffer;
