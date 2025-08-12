import React, { useRef } from "react";
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
    links: {
      github: "https://github.com/exocriador/weather-app",
      live: "https://weather.exocriador.dev"
    }
  },
  {
    id: 6,
    imgSrc:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop&crop=center",
    title: "Recipe Finder",
    description:
      "Smart recipe discovery app with ingredient-based search, nutritional information, and personalized recommendations. Includes meal planning features.",
    tags: [
      "React",
      "Spoonacular API",
      "Context API",
      "Local Storage",
      "CSS Flexbox"
    ],
    links: {
      github: "https://github.com/exocriador/recipe-finder",
      live: "https://recipes.exocriador.dev"
    }
  },
  {
    id: 7,
    imgSrc:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&crop=center",
    title: "Fitness Tracker",
    description:
      "Comprehensive fitness tracking application with workout logging, progress visualization, and goal setting. Features responsive design and data persistence.",
    tags: ["React", "Chart.js", "IndexedDB", "Service Workers", "Responsive"],
    links: {
      github: "https://github.com/exocriador/fitness-tracker",
      live: "https://fitness.exocriador.dev"
    }
  },
  {
    id: 8,
    imgSrc:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop&crop=center",
    title: "Chat Application",
    description:
      "Real-time chat application with user authentication, message encryption, and file sharing capabilities. Built with React and Socket.io.",
    tags: ["React", "Socket.io", "JWT", "Express.js", "MongoDB"],
    links: {
      github: "https://github.com/exocriador/chat-app",
      live: "https://chat.exocriador.dev"
    }
  }
];

const ProjectCard = React.memo(({ project, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  return (
    <div
      ref={ref}
      className={`${styles.projectCard} ${inView ? styles.animateIn : ""}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
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
      </div>
    </div>
  );
});

const Portfolio = () => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -450,
        behavior: "smooth"
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 450,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="portfolio" className={styles.portfolioSection}>
      <h2>My Recent Work</h2>
      <div className={styles.projectsContainer}>
        <button
          className={`${styles.scrollButton} ${styles.scrollLeft}`}
          onClick={scrollLeft}
          aria-label="Scroll left"
        >
          <FaChevronLeft />
        </button>

        <div className={styles.projectsScroll} ref={scrollContainerRef}>
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <button
          className={`${styles.scrollButton} ${styles.scrollRight}`}
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default Portfolio;
