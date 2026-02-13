import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { ContactForm } from "./ContactForm";
import { buildAlternates } from "@/lib/metadata";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: buildAlternates("contact"),
    openGraph: { title: t("title") },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <section className={styles.section} aria-labelledby="contact-title">
      <h2 id="contact-title">{t("title")}</h2>
      <p className={styles.subtitle}>{t("subtitle")}</p>
      <ContactForm />
    </section>
  );
}
