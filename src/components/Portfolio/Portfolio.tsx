import React from "react";
import { useInView } from "react-intersection-observer";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { projects } from "../../data/projects";
import { Project } from "../../types";
import OptimizedImage from "../OptimizedImage/OptimizedImage";
import styles from "./Portfolio.module.css";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = React.memo(({ project }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  return (
    <article
      ref={ref}
      className={`${styles.projectCard} ${inView ? styles.animateIn : ""}`}
      role="article"
      aria-labelledby={`project-title-${project.id}`}
    >
      <div className={styles.projectImage}>
        <OptimizedImage
          src={project.image}
          alt={`Screenshot of ${project.title} project`}
          width={400}
          height={250}
          className={styles.projectImageOptimized || ""}
        />
        <div className={styles.projectOverlay} aria-hidden="true">
          <div className={styles.projectLinks}>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} source code on GitHub`}
              className={styles.projectLink}
            >
              <FaGithub aria-hidden="true" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} live demo`}
              className={styles.projectLink}
            >
              <FaExternalLinkAlt aria-hidden="true" />
              <span className="sr-only">Live Demo</span>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.projectContent}>
        <h3 id={`project-title-${project.id}`} className={styles.projectTitle}>
          {project.title}
        </h3>
        <p className={styles.projectDescription}>{project.description}</p>

        <div
          className={styles.projectTags}
          role="list"
          aria-label="Technologies used"
        >
          {project.tags.map((tag, tagIndex) => (
            <span key={tagIndex} className={styles.projectTag} role="listitem">
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
            aria-label={`View ${project.title} live demo`}
          >
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionButton}
            aria-label={`View ${project.title} source code on GitHub`}
          >
            View Code
          </a>
        </div>
      </div>
    </article>
  );
});

ProjectCard.displayName = "ProjectCard";

const Portfolio: React.FC = () => {
  return (
    <section
      id="portfolio"
      className={styles.portfolioSection}
      aria-labelledby="portfolio-title"
      aria-label="Portfolio showcasing my recent web development projects"
    >
      <h2 id="portfolio-title">My Recent Work</h2>

      <div
        className={styles.portfolioGrid}
        role="grid"
        aria-label="Portfolio projects grid"
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
