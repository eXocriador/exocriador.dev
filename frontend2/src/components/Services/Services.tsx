import React from "react";
import styles from "./Services.module.css";

interface servicesInterface {
  id: number;
  title: string;
  description: string;
}

const services: servicesInterface[] = [
  {
    id: 1,
    title: "Service 1",
    description: "Service 1 description",
  },
  {
    id: 2,
    title: "Service 2",
    description: "Service 2 description",
  },
  {
    id: 3,
    title: "Service 3",
    description: "Service 3 description",
  },
  {
    id: 4,
    title: "Service 4",
    description: "Service 4 description",
  },
];

const Services: React.FC = () => {
  return (
    <section className={styles.servicesSection}>
      <h2 className={styles.sectionTitle}>Services Component</h2>
      <ul className={styles.servicesContainer}>
        {services.map((service) => (
          <li key={service.id} title={service.title}>
            <h3 className={styles.serviceTitle}>{service.title}</h3>
            <p className={styles.serviceDescription}>{service.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Services;
