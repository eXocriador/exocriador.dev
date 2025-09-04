import React from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import WhatIOffer from "./components/WhatIOffer/WhatIOffer";
import Portfolio from "./components/Portfolio/Portfolio";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import SkipLink from "./components/SkipLink/SkipLink";
import ServiceWorkerStatus from "./components/ServiceWorkerStatus/ServiceWorkerStatus";

import styles from "./App.module.css";

const App: React.FC = () => {
  return (
    <>
      <SkipLink />

      <Header />
      <main id="main-content" role="main">
        <Hero />
        <About />
        <WhatIOffer />
        <Portfolio />
        {/* Фінальний екран з Contact */}
        <section id="contact" className={styles.finalScreenWrapper}>
          <Contact />
        </section>
      </main>
      {/* Footer */}
      <Footer />

      {/* Service Worker Status (тільки в dev або при активному SW) */}
      <ServiceWorkerStatus />
    </>
  );
};

export default App;
