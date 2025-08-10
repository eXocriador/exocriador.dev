import React from "react";
import { motion } from "framer-motion";
import styles from "./About.module.css";

const techStack = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Redux",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "SQL",
  "Git",
  "GitHub",
  "Figma",
  "Styled Components",
  "CSS Modules",
  "Tailwind CSS",
  "Framer Motion"
];

const About = () => {
  return (
    <motion.section
      id="about"
      className={styles.aboutSection}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
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
        <div className={styles.stackColumn}>
          <h2>My Tech Stack</h2>
          <div className={styles.techTagsContainer}>
            {techStack.map((tech, index) => (
              <span key={index} className={styles.techTag}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
