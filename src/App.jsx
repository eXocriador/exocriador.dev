import React from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import WhatIOffer from "./components/WhatIOffer/WhatIOffer";
import Portfolio from "./components/Portfolio/Portfolio";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <WhatIOffer />
      <Portfolio />
      {/* Фінальний екран з Contact та Footer */}
      <section id="contact" className={styles.finalScreenWrapper}>
        <Contact />
        <Footer />
      </section>
    </>
  );
}

export default App;
