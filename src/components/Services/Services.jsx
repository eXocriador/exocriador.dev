import React from "react";
import { useInView } from "react-intersection-observer";
import { servicesContent } from "../../constants/content";
import styles from "./Services.module.css";

// Custom inline SVG illustrations for each service
const DevelopmentIcon = () => (
  <svg
    className={styles.customIcon}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 6L3 12L8 18M16 6L21 12L16 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 4L10 20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AnimationsIcon = () => (
  <svg
    className={styles.customIcon}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 3L19.5 5.5L22 6L19.5 6.5L19 9L18.5 6.5L16 6L18.5 5.5L19 3Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 3L5.5 5.5L8 6L5.5 6.5L5 9L4.5 6.5L2 6L4.5 5.5L5 3Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArchitectureIcon = () => (
  <svg
    className={styles.customIcon}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 21H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 21V7L13 3V21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 21V11L13 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 9V9.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 13V13.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 17V17.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const iconMap = {
  "Frontend Development": <DevelopmentIcon />,
  "Animations & Interactions": <AnimationsIcon />,
  "React Architecture": <ArchitectureIcon />
};

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
      <div className={styles.serviceIcon}>{iconMap[service.title]}</div>
      <h3 className={styles.cardTitle}>{service.title}</h3>
      <p className={styles.serviceDesc}>{service.description}</p>

      <div className={styles.benefitsList}>
        <ul>
          {service.benefits.map((benefit, idx) => (
            <li key={idx}>{benefit}</li>
          ))}
        </ul>
      </div>

      <div className={styles.cardAction}>
        <a href="#portfolio" className={styles.actionLink}>
          See related work →
        </a>
      </div>
    </div>
  );
});

const Services = () => {
  return (
    <section id="services" className={styles.servicesSection}>
      <h2>{servicesContent.title}</h2>
      <div className={styles.cardsContainer}>
        {servicesContent.services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Services;
