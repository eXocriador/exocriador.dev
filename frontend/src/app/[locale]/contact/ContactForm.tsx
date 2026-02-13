"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./ContactForm.module.css";

export function ContactForm() {
  const t = useTranslations("contact");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Required";
    if (!email.trim()) next.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Invalid email";
    if (!message.trim()) next.message = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    setErrors({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <div className={styles.field}>
        <label htmlFor="contact-name">{t("name")}</label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={errors.name ? styles.inputError : undefined}
          autoComplete="name"
          disabled={status === "sending"}
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>
      <div className={styles.field}>
        <label htmlFor="contact-email">{t("email")}</label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errors.email ? styles.inputError : undefined}
          autoComplete="email"
          disabled={status === "sending"}
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>
      <div className={styles.field}>
        <label htmlFor="contact-message">{t("message")}</label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className={errors.message ? styles.inputError : undefined}
          disabled={status === "sending"}
        />
        {errors.message && <span className={styles.error}>{errors.message}</span>}
      </div>
      {status === "success" && (
        <p className={styles.statusSuccess} role="status">
          {t("success")}
        </p>
      )}
      {status === "error" && (
        <p className={styles.statusError} role="alert">
          {t("error")}
        </p>
      )}
      <button type="submit" className={styles.submit} disabled={status === "sending"}>
        {status === "sending" ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
