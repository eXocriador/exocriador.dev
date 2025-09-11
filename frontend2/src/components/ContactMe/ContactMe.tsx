import React from "react";
import styles from "./ContactMe.module.css";

const ContactMe: React.FC = () => {
  return (
    <section className={`section ${styles.contactSection}`}>
      <h2 className="sectionTitle">Contact Me</h2>
      <div className="sectionContent">
        <div className="containerStart">
          <h3 className="title">Get In Touch</h3>
          <p className="text">
            Ready to bring your ideas to life? Let's discuss your project and create something amazing together.
            I'm here to help you achieve your goals with cutting-edge solutions.
          </p>
          <div className="grid gridSingle">
            <div className="card">
              <span className="cardText">📧 Email: contact@exocriador.dev</span>
            </div>
            <div className="card">
              <span className="cardText">📱 Phone: +1 (555) 123-4567</span>
            </div>
            <div className="card">
              <span className="cardText">💼 LinkedIn: linkedin.com/in/exocriador</span>
            </div>
          </div>
        </div>
        <div className="containerColumn">
          <h3 className="title">Send Message</h3>
          <div className="grid gridSingle">
            <div className="card">
              <span className="cardText">Contact Form Placeholder</span>
            </div>
            <div className="card">
              <span className="cardText">Name, Email, Message fields</span>
            </div>
            <div className="card">
              <span className="cardText">Submit Button</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
