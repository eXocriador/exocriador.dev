import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import { FormData } from "../../types";
import styles from "./Contact.module.css";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
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
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={ref}
      className={`${styles.contactContainer} ${inView ? styles.animateIn : ""}`}
      role="region"
      aria-labelledby="contact-title"
    >
      {/* Left Column - Sales Pitch */}
      <div className={styles.leftColumn}>
        <h2 id="contact-title">Have a Project in Mind?</h2>
        <p className={styles.contactSubtitle}>
          Ready to bring your ideas to life? Let's discuss your project and
          create something amazing together.
        </p>

        <div className={styles.persuasiveContent}>
          <p className={styles.projectDescription}>
            Whether you're looking to launch a new product, improve an existing
            one, or simply need a dedicated developer to bring your ideas to
            life, I'm here to help. Let's connect and discuss how we can create
            something amazing together.
          </p>
          <div className={styles.availabilityInfo}>
            <p className={styles.availabilityText}>
              I'm currently available for: <strong>Freelance Projects</strong>,{" "}
              <strong>Contract Roles</strong>, and{" "}
              <strong>Collaborative Ventures</strong>.
            </p>
          </div>
        </div>

        <div className={styles.contactInfo}>
          <p className={styles.contactNote}>
            Prefer to reach out directly? Feel free to connect with me on{" "}
            <a
              href="https://github.com/exocriador"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my GitHub profile (opens in new tab)"
            >
              GitHub
            </a>{" "}
            or{" "}
            <a
              href="https://linkedin.com/in/exocriador"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my LinkedIn profile (opens in new tab)"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      </div>

      {/* Right Column - Contact Form */}
      <div className={styles.rightColumn}>
        <form
          className={styles.contactForm}
          onSubmit={handleSubmit}
          aria-labelledby="contact-title"
          noValidate
        >
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>
              Name <span aria-label="required">*</span>
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
              aria-invalid={submitStatus === "error" && !formData.name}
            />
            {submitStatus === "error" && !formData.name && (
              <div id="name-error" className={styles.errorText} role="alert">
                Name is required
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              Email <span aria-label="required">*</span>
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
              aria-invalid={submitStatus === "error" && !formData.email}
            />
            {submitStatus === "error" && !formData.email && (
              <div id="email-error" className={styles.errorText} role="alert">
                Valid email is required
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.formLabel}>
              Message <span aria-label="required">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={5}
              className={styles.formTextarea}
              placeholder="Tell me about your project, timeline, and any specific requirements..."
              aria-describedby="message-error"
              aria-invalid={submitStatus === "error" && !formData.message}
            />
            {submitStatus === "error" && !formData.message && (
              <div id="message-error" className={styles.errorText} role="alert">
                Message is required
              </div>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
            aria-describedby="submit-status"
            aria-busy={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {submitStatus === "success" && (
            <div
              className={styles.successMessage}
              id="submit-status"
              role="alert"
            >
              Thank you! Your message has been sent successfully. I'll get back
              to you soon.
            </div>
          )}

          {submitStatus === "error" && (
            <div
              className={styles.errorMessage}
              id="submit-status"
              role="alert"
            >
              Sorry, there was an error sending your message. Please try again
              or contact me directly.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
