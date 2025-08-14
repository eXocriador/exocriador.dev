import React from "react";
import { useInView } from "react-intersection-observer";
import { aboutContent } from "../../constants/content";
import styles from "./About.module.css";

const techStack = {
  Frontend: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js"],
  Backend: ["Node.js", "Express.js", "MongoDB", "SQL"],
  Tools: [
    "Git",
    "GitHub",
    "Vite",
    "Webpack",
    "Tailwind CSS",
    "CSS Modules",
    "Styled Components",
    "Figma"
  ]
};

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  return (
    <section
      ref={ref}
      id="about"
      className={`${styles.aboutSection} ${inView ? styles.animateIn : ""}`}
      aria-labelledby="about-title"
      aria-label="About me and my technical skills"
    >
      <h2 id="about-title" className={styles.sectionTitle}>
        About Me
      </h2>

      <div className={styles.introContainer}>
        <div className={styles.textColumn}>
          <p className={styles.narrative}>{aboutContent.narrative}</p>
        </div>

        <div className={styles.profileColumn}>
          <div className={styles.imageWrapper}>
            <div className={styles.photoFrame}>
              <div className={styles.photoContent}></div>
            </div>
          </div>

          <div className={styles.availability}>
            <span className={styles.availabilityIcon}></span>
            <span className={styles.availabilityText}>
              Currently available for work
            </span>
          </div>
        </div>
      </div>

      <div className={styles.skillsContainer}>
        {Object.entries(techStack).map(([category, technologies]) => (
          <div key={category} className={styles.skillCategory}>
            <h3 className={styles.categoryTitle}>{category}</h3>
            <div className={styles.badgesContainer}>
              {technologies.map((tech, index) => (
                <div key={index} className={styles.badge}>
                  {tech}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
