import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  FaReact,
  FaServer,
  FaDocker,
  FaCode,
  FaPalette,
  FaRocket
} from "react-icons/fa";
import { MdDevices, MdSecurity, MdAnalytics } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import styles from "./WhatIOffer.module.css";

const servicesData = [
  {
    id: 0,
    title: "Frontend Development",
    description:
      "I create modern, responsive web applications using cutting-edge technologies. My expertise includes React, Next.js, TypeScript, and the latest frameworks for building fast and interactive user interfaces.",
    longDescription:
      "I specialize in frontend development that combines the beauty of design with the power of modern technologies. My solutions include performance optimization, accessibility, and UX/UI best practices. I create components that are easy to maintain and scale.",
    icon: <FaReact className={styles.serviceIcon} />,
    features: [
      "React & Next.js",
      "TypeScript",
      "Responsive Design",
      "Performance Optimization"
    ]
  },
  {
    id: 1,
    title: "Backend Development",
    description:
      "I develop robust and scalable server-side applications, REST APIs, and database solutions. I use Node.js, PostgreSQL, and modern architectural patterns to create powerful server-side solutions.",
    longDescription:
      "My expertise in backend development covers creating architecture that scales and maintains easily. I implement secure APIs, optimize database queries, and create authentication and authorization systems.",
    icon: <FaServer className={styles.serviceIcon} />,
    features: ["Node.js & Express", "PostgreSQL", "REST APIs", "Authentication"]
  },
  {
    id: 2,
    title: "Responsive & Accessible Design",
    description:
      "I implement designs that work seamlessly across all devices and are accessible to all users. I ensure an excellent user experience regardless of screen size.",
    longDescription:
      "I create designs that not only look great but also provide the best user experience on all devices. My work includes testing on different screen sizes and ensuring accessibility for people with disabilities.",
    icon: <MdDevices className={styles.serviceIcon} />,
    features: [
      "Mobile-First Design",
      "Cross-Browser Compatibility",
      "WCAG Guidelines",
      "User Testing"
    ]
  },
  {
    id: 3,
    title: "DevOps & Deployment",
    description:
      "I manage the full lifecycle of applications, including containerization with Docker, CI/CD pipelines, and deployment on platforms like Vercel and AWS.",
    longDescription:
      "I automate development and deployment processes so you can focus on creating functionality. My solutions include setting up continuous integration, automated testing, and secure deployment.",
    icon: <FaDocker className={styles.serviceIcon} />,
    features: [
      "Docker & Containers",
      "CI/CD Pipelines",
      "Cloud Deployment",
      "Monitoring"
    ]
  },
  {
    id: 4,
    title: "Custom Web Solutions",
    description:
      "I develop custom web solutions that precisely meet your business needs. From simple landing pages to complex web applications.",
    longDescription:
      "Every project is unique, so I create solutions that precisely meet your goals. I work closely with clients to understand their needs and create solutions that exceed expectations.",
    icon: <FaCode className={styles.serviceIcon} />,
    features: [
      "Custom Development",
      "Business Logic",
      "Scalable Architecture",
      "Maintenance"
    ]
  },
  {
    id: 5,
    title: "Performance Optimization",
    description:
      "I optimize the speed and performance of your web applications. I use the latest techniques to ensure fast loading and smooth operation.",
    longDescription:
      "Speed is the key to success in the modern internet. I analyze and optimize every aspect of your application, from page loading to database operations, to provide the best experience for users.",
    icon: <FaRocket className={styles.serviceIcon} />,
    features: [
      "Speed Optimization",
      "Database Tuning",
      "Caching Strategies",
      "Performance Monitoring"
    ]
  }
];

const WhatIOffer = () => {
  const [activeService, setActiveService] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  const activeServiceData = servicesData[activeService];

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

      <div className={styles.panelContainer}>
        {/* Left Column - Content */}
        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <div className={styles.contentIcon}>{activeServiceData.icon}</div>
            <h3 className={styles.contentTitle}>{activeServiceData.title}</h3>
          </div>

          <p className={styles.contentDescription}>
            {activeServiceData.longDescription}
          </p>

          <div className={styles.featuresList}>
            <h4 className={styles.featuresTitle}>Key Features:</h4>
            <ul className={styles.features}>
              {activeServiceData.features.map((feature, index) => (
                <li key={index} className={styles.feature}>
                  <span className={styles.featureBullet}>•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column - Navigation */}
        <div className={styles.navigation}>
          {servicesData.map((service) => (
            <button
              key={service.id}
              className={`${styles.navButton} ${
                activeService === service.id ? styles.active : ""
              }`}
              onClick={() => setActiveService(service.id)}
              aria-label={`Select ${service.title} service`}
              aria-pressed={activeService === service.id}
            >
              <div className={styles.navIcon}>{service.icon}</div>
              <span className={styles.navTitle}>{service.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIOffer;
