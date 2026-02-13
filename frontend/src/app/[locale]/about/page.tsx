import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/metadata";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("narrative").slice(0, 160),
    alternates: buildAlternates("about"),
    openGraph: { title: t("title") },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <section className={styles.section} aria-labelledby="about-title">
      <h2 id="about-title">{t("title")}</h2>
      <div className={styles.content}>
        <p className={styles.narrative}>{t("narrative")}</p>
        <h3>{t("techStackTitle")}</h3>
        <p className={styles.muted}>
          React, Next.js, Node.js, TypeScript, PostgreSQL, MongoDB, Docker,
          REST APIs, Git.
        </p>
      </div>
    </section>
  );
}
