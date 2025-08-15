import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import { FormData } from "../../types";
import {
  validateField,
  validateForm,
  isFormValid,
  FormErrors
} from "../../utils/validation";
import { getApiUrl, createRequestConfig } from "../../config/api";
import styles from "./Contact.module.css";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
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
    const fieldName = name as keyof FormData;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value
    }));

    // Валідуємо поле в реальному часі
    const error = validateField(fieldName, value);
    setErrors((prev) => {
      if (error) {
        // Якщо є помилка, додаємо її
        return { ...prev, [fieldName]: error };
      } else {
        // Якщо помилки немає, видаляємо поле з errors
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      }
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // Валідуємо всю форму
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Відправляємо на наш бекенд
      const response = await fetch(
        getApiUrl("/api/contact"),
        createRequestConfig("POST", formData)
      );

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
      } else {
        const errorData = await response.json();
        setSubmitStatus("error");
        console.error("Server error:", errorData);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Network error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formIsValid = isFormValid(formData, errors);

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
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <div id="name-error" className={styles.errorText} role="alert">
                {errors.name}
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
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <div id="email-error" className={styles.errorText} role="alert">
                {errors.email}
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
              aria-invalid={!!errors.message}
            />
            {errors.message && (
              <div id="message-error" className={styles.errorText} role="alert">
                {errors.message}
              </div>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting || !formIsValid}
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
