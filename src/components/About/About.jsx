import React from "react";
import { useInView } from "react-intersection-observer";
import { FaUserCheck, FaCode, FaTachometerAlt } from "react-icons/fa";
import { aboutContent } from "../../constants/content";
import styles from "./About.module.css";

const techStack = {
  "Core Frontend": [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js"
  ],
  "Styling & UI": ["Tailwind CSS", "CSS Modules", "Styled Components", "Figma"],
  "Backend & DB": ["Node.js", "Express.js", "MongoDB", "SQL"],
  Tooling: ["Git", "GitHub", "Vite"]
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
    >
      <div className={styles.aboutContainer}>
        <div className={styles.textColumn}>
          <h2>{aboutContent.title}</h2>
          {aboutContent.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          <div className={styles.techSection}>
            <h2>{aboutContent.techStackTitle}</h2>
            <div className={styles.techCategories}>
              {Object.entries(techStack).map(([category, technologies]) => (
                <div key={category} className={styles.techCategory}>
                  <h3 className={styles.categoryTitle}>{category}</h3>
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

        <div className={styles.photoColumn}>
          <div className={styles.photoPlaceholder}>
            {/* Placeholder for high-quality personal photo */}
            <div className={styles.photoFrame}>
              <div className={styles.photoContent}></div>
            </div>
          </div>

          <div className={styles.principlesContainer}>
            <h3>My Principles</h3>
            {aboutContent.principles.map((principle, index) => (
              <div key={index} className={styles.principleItem}>
                <div className={styles.principleIcon}>
                  {iconMap[principle.icon]}
                </div>
                <span className={styles.principleText}>{principle.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
