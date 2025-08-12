import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import styles from "./Portfolio.module.css";

const projectsData = [
  {
    id: 1,
    imgSrc:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&crop=center",
    title: "E-Commerce Platform",
    description:
      "A modern, responsive e-commerce platform built with React and Node.js. Features include user authentication, product management, shopping cart, and payment integration.",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    challenge:
      "Creating a scalable e-commerce solution that handles high traffic while maintaining fast performance and secure payment processing.",
    solution: [
      "Implemented React Suspense and lazy loading for optimal bundle splitting",
      "Designed a microservices architecture for better scalability",
      "Integrated Stripe with webhook handling for secure payments",
      "Built a Redis-based caching system for product catalog performance"
    ],
    links: {
      github: "https://github.com/exocriador/ecommerce-platform",
      live: "https://ecommerce-demo.exocriador.dev"
    }
  },
  {
    id: 2,
    imgSrc:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop&crop=center",
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features. Built with React and Firebase.",
    tags: ["React", "Firebase", "TypeScript", "Framer Motion", "Tailwind"],
    challenge:
      "Building a real-time collaborative app that syncs data across multiple users while maintaining smooth performance and intuitive UX.",
    solution: [
      "Implemented Firebase Realtime Database with optimistic updates",
      "Created custom drag-and-drop hooks with TypeScript",
      "Built a conflict resolution system for simultaneous edits",
      "Designed responsive layouts that work seamlessly on all devices"
    ],
    links: {
      github: "https://github.com/exocriador/task-manager",
      live: "https://task-manager.exocriador.dev"
    }
  },
  {
    id: 3,
    imgSrc:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop&crop=center",
    title: "Portfolio Website",
    description:
      "A modern portfolio website showcasing creative work and professional experience. Features smooth animations, responsive design, and interactive elements.",
    tags: ["React", "Framer Motion", "CSS Modules", "Vite", "Responsive"],
    challenge:
      "Creating a unique portfolio that stands out while maintaining excellent performance and accessibility standards.",
    solution: [
      "Built custom CSS animations without external libraries for optimal performance",
      "Implemented intersection observer for scroll-triggered animations",
      "Created a responsive grid system that adapts to all screen sizes",
      "Optimized Core Web Vitals with lazy loading and efficient rendering"
    ],
    links: {
      github: "https://github.com/exocriador/portfolio",
      live: "https://exocriador.dev"
    }
  },
  {
    id: 4,
    imgSrc:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop&crop=center",
    title: "Social Media Dashboard",
    description:
      "Comprehensive social media analytics dashboard with real-time data visualization, campaign tracking, and performance metrics. Built with React and D3.js.",
    tags: ["React", "D3.js", "Chart.js", "Node.js", "PostgreSQL"],
    challenge:
      "Processing large amounts of social media data and presenting it in an intuitive, visually appealing way that helps users make data-driven decisions.",
    solution: [
      "Built custom D3.js visualizations for complex data relationships",
      "Implemented real-time data streaming with WebSocket connections",
      "Created a modular chart system for easy customization",
      "Designed an intuitive dashboard layout with progressive disclosure"
    ],
    links: {
      github: "https://github.com/exocriador/social-dashboard",
      live: "https://social-dashboard.exocriador.dev"
    }
  },
  {
    id: 5,
    imgSrc:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center",
    title: "Weather Application",
    description:
      "Beautiful weather app with location-based forecasts, interactive maps, and detailed weather information. Features dark/light themes and offline support.",
    tags: ["React", "OpenWeather API", "Leaflet Maps", "PWA", "CSS Grid"],
    challenge:
      "Creating a weather app that works offline, provides accurate location services, and delivers a delightful user experience in all conditions.",
    solution: [
      "Implemented Service Workers for offline functionality and caching",
      "Built a responsive map interface with Leaflet.js integration",
      "Created a theme system that adapts to user preferences",
      "Optimized API calls with intelligent caching and error handling"
    ],
    links: {
      github: "https://github.com/exocriador/weather-app",
      live: "https://weather.exocriador.dev"
    }
  }
];

const ProjectCard = React.memo(({ project }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  return (
    <div
      ref={ref}
      className={`${styles.projectCard} ${inView ? styles.animateIn : ""}`}
    >
      <div className={styles.projectImage}>
        <img src={project.imgSrc} alt={project.title} loading="lazy" />
        <div className={styles.projectOverlay}>
          <div className={styles.projectLinks}>
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
            >
              <FaGithub />
            </a>
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} live demo`}
            >
              <FaExternalLinkAlt />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.projectContent}>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectDescription}>{project.description}</p>

        <div className={styles.projectTags}>
          {project.tags.map((tag, tagIndex) => (
            <span key={tagIndex} className={styles.projectTag}>
              {tag}
            </span>
          ))}
        </div>

        <div className={styles.projectDetails}>
          <div className={styles.detailSection}>
            <h4>Challenge</h4>
            <p>{project.challenge}</p>
          </div>

          <div className={styles.detailSection}>
            <h4>Solution</h4>
            <ul>
              {project.solution.map((solution, idx) => (
                <li key={idx}>{solution}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});

const Portfolio = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === projectsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? projectsData.length - 1 : prevIndex - 1
    );
  };

  return (
    <section id="portfolio" className={styles.portfolioSection}>
      <h2>My Recent Work</h2>

      <div className={styles.portfolioContainer}>
        {projectsData.map((project, index) => (
          <div
            key={project.id}
            className={`${styles.projectSlide} ${
              index === activeIndex ? styles.active : ""
            }`}
          >
            <ProjectCard project={project} />
          </div>
        ))}

        <button
          className={`${styles.navArrow} ${styles.navArrowLeft}`}
          onClick={goToPrev}
          aria-label="Previous project"
        >
          <FaChevronLeft />
        </button>

        <button
          className={`${styles.navArrow} ${styles.navArrowRight}`}
          onClick={goToNext}
          aria-label="Next project"
        >
          <FaChevronRight />
        </button>

        <div className={styles.indicatorDots}>
          {projectsData.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicatorDot} ${
                index === activeIndex ? styles.active : ""
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
