import React from "react";
import styles from "./Hero.module.css";

const Hero: React.FC = () => {
  return (
    <section className={`section ${styles.heroSection}`}>
      <div className={`containerColumn ${styles.sectionContent}`}>
        <h1 className="titleLarge">
          Forging Ideas, Crafting Solutions
        </h1>
        <h2 className="subtitle">
          Full-Stack Developer
        </h2>

        <div className="buttonGroup">
          <button className="button buttonPrimary">View My Work</button>
          <button className="button">Get In Touch</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
