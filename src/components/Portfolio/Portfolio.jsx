import React from "react";
import { useInView } from "react-intersection-observer";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { projects } from "../../data/projects";
import styles from "./Portfolio.module.css";

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
        <img src={project.image} alt={project.title} loading="lazy" />
        <div className={styles.projectOverlay}>
          <div className={styles.projectLinks}>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className={styles.projectLink}
            >
              <FaGithub />
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} live demo`}
              className={styles.projectLink}
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

        <div className={styles.projectActions}>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionButton}
          >
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionButton}
          >
            View Code
          </a>
        </div>
      </div>
    </div>
  );
});

const Portfolio = () => {
  return (
    <section id="portfolio" className={styles.portfolioSection}>
      <h2>My Recent Work</h2>

      <div className={styles.portfolioGrid}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
