import React from "react";
import styles from "./Services.module.css";

const Services: React.FC = () => {
  return (
    <section className={`section ${styles.servicesSection}`}>
      <h2 className="sectionTitle">Services</h2>
      <div className="sectionContent">
        <div className="containerStart">
          <h3 className="title">What I Offer</h3>
          <p className="text">
            I provide comprehensive development services to help you build modern,
            scalable, and user-friendly applications that drive business growth.
          </p>
          <div className="grid gridSingle">
            <div className="card">
              <span className="cardText">🚀 Web Development</span>
            </div>
            <div className="card">
              <span className="cardText">📱 Mobile Apps</span>
            </div>
            <div className="card">
              <span className="cardText">⚡ Performance Optimization</span>
            </div>
          </div>
        </div>
        <div className="containerColumn">
          <h3 className="title">Technologies</h3>
          <div className="grid gridSingle">
            <div className="card">
              <span className="cardText">React, Next.js, TypeScript</span>
            </div>
            <div className="card">
              <span className="cardText">Node.js, Express, MongoDB</span>
            </div>
            <div className="card">
              <span className="cardText">AWS, Docker, CI/CD</span>
            </div>
            <div className="card">
              <span className="cardText">UI/UX Design</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
