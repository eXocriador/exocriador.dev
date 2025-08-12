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
    challenge:
      "Building an intelligent recipe recommendation system that helps users discover new dishes based on available ingredients and dietary preferences.",
    solution: [
      "Implemented fuzzy search algorithms for ingredient matching",
      "Built a recommendation engine using user preferences and history",
      "Created a meal planning system with drag-and-drop functionality",
      "Designed an intuitive interface that makes cooking accessible to everyone"
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
    challenge:
      "Creating a fitness app that motivates users to stay consistent while providing comprehensive tracking and beautiful data visualization.",
    solution: [
      "Built interactive charts with Chart.js for progress visualization",
      "Implemented IndexedDB for offline data storage and sync",
      "Created a goal-setting system with milestone tracking",
      "Designed motivational UI elements that encourage user engagement"
    ],
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
    challenge:
      "Building a secure, real-time chat system that handles multiple concurrent users while maintaining message privacy and system performance.",
    solution: [
      "Implemented end-to-end encryption for message security",
      "Built a scalable WebSocket architecture with Socket.io",
      "Created a file sharing system with progress indicators",
      "Designed a responsive chat interface that works on all devices"
    ],
    links: {
      github: "https://github.com/exocriador/chat-app",
      live: "https://chat.exocriador.dev"
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

  const nextProjectIndex = (activeIndex + 1) % projectsData.length;

  return (
    <section id="portfolio" className={styles.portfolioSection}>
      <h2>My Recent Work</h2>

      <div className={styles.carouselContainer}>
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
      </div>

      <div className={styles.navigationControls}>
        <button
          className={`${styles.navButton} ${styles.navLeft}`}
          onClick={goToPrev}
          aria-label="Previous project"
        >
          <FaChevronLeft />
        </button>

        <button
          className={`${styles.navButton} ${styles.navRight}`}
          onClick={goToNext}
          aria-label="Next project"
        >
          <FaChevronRight />
        </button>
      </div>

      <div className={styles.projectIndicator}>
        <span className={styles.currentProject}>
          {activeIndex + 1} of {projectsData.length}
        </span>
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

      {/* Peek element for next project */}
      <div className={styles.peekElement}>
        <img
          src={projectsData[nextProjectIndex].imgSrc}
          alt={`Preview of ${projectsData[nextProjectIndex].title}`}
        />
      </div>
    </section>
  );
};

export default Portfolio;
