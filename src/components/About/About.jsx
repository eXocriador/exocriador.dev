import React from "react";
import { useInView } from "react-intersection-observer";
import { aboutContent } from "../../constants/content";
import styles from "./About.module.css";

const techStack = {
  "Core Frontend": [
    "HTML5",
    "CSS3",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js"
  ],
  "Styling & UI": ["Tailwind CSS", "CSS Modules", "Styled Components", "Figma"],
  "Backend & Tools": ["Node.js", "Express.js", "MongoDB", "SQL"],
  "Development Tools": ["Git", "GitHub", "Vite", "Webpack"]
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
      <div className={styles.mainContainer}>
        {/* Left Column - Text Content (60% width) */}
        <div className={styles.leftColumn}>
          <h2 id="about-title" className={styles.sectionTitle}>
            {aboutContent.title}
          </h2>

          <p className={styles.narrative}>{aboutContent.narrative}</p>

          {/* Tech Stack Section */}
          <div className={styles.techSection}>
            <h3 className={styles.techSectionTitle}>My Core Instruments</h3>
            <p className={styles.techSectionSubtitle}>
              Technologies I use daily to bring ideas to life
            </p>

            <div className={styles.techCategories}>
              {Object.entries(techStack).map(([category, technologies]) => (
                <div key={category} className={styles.techCategory}>
                  <h4 className={styles.categoryTitle}>{category}</h4>
                  <div className={styles.techTagsContainer}>
                    {technologies.map((tech, index) => (
                      <span
                        key={index}
                        className={`${styles.techTag} ${
                          category === "Core Frontend" ? styles.coreTech : ""
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Visual Block (40% width) */}
        <div className={styles.rightColumn}>
          {/* Image Component */}
          <div className={styles.imageWrapper}>
            <div className={styles.photoFrame}>
              <div className={styles.photoContent}></div>
            </div>
          </div>

          {/* Availability Block */}
          <div className={styles.availabilityBlock}>
            <span className={styles.availabilityIcon}></span>
            <span className={styles.availabilityText}>
              I'm currently available for hire
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
