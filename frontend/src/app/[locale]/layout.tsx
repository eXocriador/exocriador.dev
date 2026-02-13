import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { SetLang } from "@/components/SetLang";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <SetLang locale={locale} />
      <Header locale={locale as Locale} />
      <main id="main-content" role="main" style={{ paddingTop: "80px", minHeight: "100vh" }}>
        {children}
      </main>
      <Footer />
    </NextIntlClientProvider>
  );
}
