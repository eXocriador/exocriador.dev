import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/metadata";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: buildAlternates("services"),
    openGraph: { title: t("title") },
  };
}

const SERVICE_KEYS = [
  "frontend",
  "backend",
  "design",
  "devops",
  "custom",
  "performance",
] as const;

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  return (
    <section className={styles.section} aria-labelledby="services-title">
      <h2 id="services-title">{t("title")}</h2>
      <p className={styles.subtitle}>{t("subtitle")}</p>
      <div className={styles.grid}>
        {SERVICE_KEYS.map((key) => (
          <article key={key} className={styles.card}>
            <h3>{t(`${key}.title`)}</h3>
            <p>{t(`${key}.description`)}</p>
            <p className={styles.features}>{t(`${key}.features`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
