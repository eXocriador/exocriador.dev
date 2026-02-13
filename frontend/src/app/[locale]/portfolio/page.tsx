import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { buildAlternates } from "@/lib/metadata";
import styles from "./page.module.css";
import { projects } from "./projects";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: buildAlternates("portfolio"),
    openGraph: { title: t("title") },
  };
}

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("portfolio");

  return (
    <section className={styles.section} aria-labelledby="portfolio-title">
      <h2 id="portfolio-title">{t("title")}</h2>
      <p className={styles.subtitle}>{t("subtitle")}</p>
      <div className={styles.grid}>
        {projects.map((p) => (
          <article key={p.id} className={styles.card}>
            <div className={styles.imageWrap}>
              <Image
                src={p.image}
                alt=""
                width={400}
                height={250}
                className={styles.img}
                unoptimized={p.image.startsWith("http")}
              />
            </div>
            <h3>{p.title}</h3>
            <p className={styles.desc}>{p.description}</p>
            <div className={styles.tags}>
              {p.tags.slice(0, 4).map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className={styles.links}>
              {p.liveUrl && (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  {t("viewLive")}
                </a>
              )}
              {p.githubUrl && (
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  {t("viewCode")}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
