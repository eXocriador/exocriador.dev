import React from "react";
import { useInView } from "react-intersection-observer";
import { FaUserCheck, FaCode, FaTachometerAlt } from "react-icons/fa";
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

const iconMap = {
  FaUserCheck: <FaUserCheck />,
  FaCode: <FaCode />,
  FaTachometerAlt: <FaTachometerAlt />
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
      <div className={styles.aboutContainer}>
        {/* Main Content Column */}
        <div className={styles.mainContent}>
          {/* About Me Text */}
          <div className={styles.aboutText}>
            <h2 id="about-title">{aboutContent.title}</h2>
            {aboutContent.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Integrated Tech Stack */}
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

          {/* Principles Section */}
          <div className={styles.principlesSection}>
            <h3 className={styles.principlesTitle}>My Principles</h3>
            <div className={styles.principlesGrid}>
              {aboutContent.principles.map((principle, index) => (
                <div key={index} className={styles.principleCard}>
                  <div className={styles.principleIcon} aria-hidden="true">
                    {iconMap[principle.icon]}
                  </div>
                  <h4 className={styles.principleTitle}>{principle.text}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Element - Photo or Illustration */}
        <div className={styles.visualElement}>
          <div className={styles.photoFrame}>
            <div className={styles.photoContent}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
