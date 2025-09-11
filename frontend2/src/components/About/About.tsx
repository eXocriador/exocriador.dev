import React from "react";
import styles from "./About.module.css";

const About: React.FC = () => {
  return (
    <section className={`section ${styles.aboutSection}`}>
      <h2 className="sectionTitle">About Component</h2>
      <div className="sectionContent">
        <div className="containerStart">
          <h3 className={`title ${styles.introTitle}`}>About Me</h3>
          <p className={`text ${styles.introText}`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            ratione enim atque unde minima quo corrupti eos facere est ipsum
            vitae numquam reprehenderit, voluptatum quae assumenda! Eligendi
            voluptate blanditiis magni. Illum provident dolorum dolores
            obcaecati sed culpa non debitis modi, adipisci molestias
            exercitationem eum voluptatum aliquam praesentium in tenetur
            commodi. Sed ipsam commodi sapiente dicta cumque alias rerum animi
            harum. Ullam beatae dolore harum fuga iste quia exercitationem
            doloribus eum fugit vero. Quasi, repellendus est obcaecati nobis
            incidunt tempora ad eligendi, sequi eaque odit perspiciatis enim
            maxime inventore, suscipit nam!
          </p>
        </div>
        <div className="containerColumn">
          <h3 className={`title ${styles.skillsTitle}`}>My Tech Stack</h3>
          <ul className="grid gridSingle">
            <li className="card">
              <span className="cardText">Skill Item</span>
            </li>
            <li className="card">
              <span className="cardText">Skill Item</span>
            </li>
            <li className="card">
              <span className="cardText">Skill Item</span>
            </li>
            <li className="card">
              <span className="cardText">Skill Item</span>
            </li>
            <li className="card">
              <span className="cardText">Skill Item</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
