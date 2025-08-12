import React from "react";
import { useInView } from "react-intersection-observer";
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
          <h2>About Me</h2>
          <p>
            I'm a passionate frontend developer who believes that great software
            is built at the intersection of technical excellence and
            human-centered design. Every line of code I write is driven by a
            simple philosophy: technology should serve people, not the other way
            around.
          </p>
          <p>
            My journey in web development began with curiosity and has evolved
            into a deep appreciation for the craft. I'm fascinated by how small
            details—a subtle animation, a perfectly timed transition, or an
            intuitive interaction—can transform a functional application into an
            experience that users love to use.
          </p>
          <p>
            When I'm not coding, you'll find me exploring new design trends,
            experimenting with emerging technologies, or contributing to
            open-source projects. I believe in continuous learning and sharing
            knowledge with the developer community.
          </p>
        </div>

        <div className={styles.photoColumn}>
          <div className={styles.photoPlaceholder}>
            {/* Placeholder for high-quality personal photo */}
            <div className={styles.photoFrame}>
              <div className={styles.photoContent}>
                <span>Photo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.techSection}>
        <h2>My Tech Stack</h2>
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
    </section>
  );
};

export default About;
