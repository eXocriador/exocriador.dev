import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import styles from "./Contact.module.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Використовуємо Formspree для обробки форми
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className={styles.contactSection}
      aria-labelledby="contact-title"
      aria-label="Contact form for project inquiries and collaboration"
    >
      <div
        ref={ref}
        className={`${styles.contactContainer} ${
          inView ? styles.animateIn : ""
        }`}
      >
        <h2 id="contact-title">Let's Build Something Together</h2>
        <p className={styles.contactSubtitle}>
          Ready to bring your ideas to life? Let's discuss your project and
          create something amazing.
        </p>

        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className={styles.formInput}
              placeholder="Your full name"
              aria-describedby="name-error"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={styles.formInput}
              placeholder="your.email@example.com"
              aria-describedby="email-error"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.formLabel}>
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows="5"
              className={styles.formTextarea}
              placeholder="Tell me about your project, timeline, and any specific requirements..."
              aria-describedby="message-error"
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
            aria-describedby="submit-status"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {submitStatus === "success" && (
            <div className={styles.successMessage} id="submit-status">
              Thank you! Your message has been sent successfully. I'll get back
              to you soon.
            </div>
          )}

          {submitStatus === "error" && (
            <div className={styles.errorMessage} id="submit-status">
              Sorry, there was an error sending your message. Please try again
              or contact me directly.
            </div>
          )}
        </form>

        <div className={styles.contactInfo}>
          <p className={styles.contactNote}>
            Prefer to reach out directly? Feel free to connect with me on{" "}
            <a
              href="https://github.com/exocriador"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>{" "}
            or{" "}
            <a
              href="https://linkedin.com/in/exocriador"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
