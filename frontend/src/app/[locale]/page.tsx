import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buildAlternates } from "@/lib/metadata";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: buildAlternates(""),
    openGraph: { title: t("title"), description: t("subtitle") },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "eXocriador",
  jobTitle: "Full-stack Developer",
  url: "https://exocriador.dev",
  sameAs: [
    "https://github.com/eXocriador",
    "https://linkedin.com/in/exocriador",
    "https://t.me/exocriador",
  ],
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section
        className={styles.heroSection}
        aria-labelledby="hero-title"
        aria-label="Hero section"
      >
        <div className={styles.heroContent}>
        <h1 id="hero-title" className={styles.title}>
          {t("title")}
        </h1>
        <p className={styles.subtitle}>{t("subtitle")}</p>
        <div className={styles.ctaContainer}>
          <Link href="/about" className={styles.ctaPrimary}>
            {t("ctaAbout")}
          </Link>
          <Link href="/portfolio" className={styles.ctaSecondary}>
            {t("ctaWork")}
          </Link>
        </div>
      </div>
    </section>
    </>
  );
}
