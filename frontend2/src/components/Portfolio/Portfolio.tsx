import React from "react";
import styles from "./Portfolio.module.css";

const Portfolio: React.FC = () => {
  return (
    <section className={`section ${styles.portfolioSection}`}>
      <h2 className="sectionTitle">Portfolio</h2>
      <div className="sectionContent">
        <div className="containerStart">
          <h3 className="title">Featured Projects</h3>
          <p className="text">
            Here are some of my recent projects that showcase my skills and expertise
            in modern web development and design.
          </p>
          <div className="grid gridSingle">
            <div className="card">
              <span className="cardText">🌐 E-commerce Platform</span>
            </div>
            <div className="card">
              <span className="cardText">📊 Analytics Dashboard</span>
            </div>
            <div className="card">
              <span className="cardText">🎨 Design System</span>
            </div>
          </div>
        </div>
        <div className="containerColumn">
          <h3 className="title">Project Details</h3>
          <div className="grid gridSingle">
            <div className="card">
              <span className="cardText">React, TypeScript, Node.js</span>
            </div>
            <div className="card">
              <span className="cardText">Responsive Design</span>
            </div>
            <div className="card">
              <span className="cardText">Performance Optimized</span>
            </div>
            <div className="card">
              <span className="cardText">Live Demo Available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
