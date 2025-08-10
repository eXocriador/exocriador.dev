import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import styles from "./Portfolio.module.css";

const projectsData = [
  {
    id: 1,
    imgSrc: "https://via.placeholder.com/400x250/2a2a2a/ff6b35?text=Project+1",
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
    imgSrc: "https://via.placeholder.com/400x250/2a2a2a/ff6b35?text=Project+2",
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
    imgSrc: "https://via.placeholder.com/400x250/2a2a2a/ff6b35?text=Project+3",
    title: "Portfolio Website",
    description:
      "A modern portfolio website showcasing creative work and professional experience. Features smooth animations, responsive design, and interactive elements.",
    tags: ["React", "Framer Motion", "CSS Modules", "Vite", "Responsive"],
    links: {
      github: "https://github.com/exocriador/portfolio",
      live: "https://exocriador.dev"
    }
  }
];

const Portfolio = () => {
  return (
    <section id="portfolio" className={styles.portfolioSection}>
      <h2>My Recent Work</h2>
      <div className={styles.projectsGrid}>
        {projectsData.map((project, index) => (
          <motion.div
            key={project.id}
            className={styles.projectCard}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className={styles.projectImage}>
              <img src={project.imgSrc} alt={project.title} />
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
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
