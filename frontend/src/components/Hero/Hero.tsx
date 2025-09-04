import React, { useCallback, useState, useEffect, Suspense, lazy } from "react";
import { useInView } from "react-intersection-observer";
import { loadSlim } from "tsparticles-slim";
import { TypeAnimation } from "react-type-animation";

import styles from "./Hero.module.css";

// Lazy load the Particles component
const Particles = lazy(() =>
  import("react-tsparticles").then((module) => ({ default: module.Particles }))
);

const Hero: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const particlesInit = useCallback(async (engine: any): Promise<void> => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: any): Promise<void> => {
    console.log("Particles loaded", container);
  }, []);

  const [titleRef, titleInView] = useInView({ triggerOnce: true, delay: 0 });
  const [subtitleRef, subtitleInView] = useInView({
    triggerOnce: true,
    delay: 200
  });
  const [ctaRef, ctaInView] = useInView({
    triggerOnce: true,
    delay: 400
  });

  const handleViewWork = (): void => {
    // Скролл відбувається автоматично через href="#portfolio"
  };

  const handleAboutMe = (): void => {
    // Скролл відбувається автоматично через href="#about"
  };

  const particlesConfig = {
    background: {
      color: {
        value: "transparent"
      }
    },
    fpsLimit: 60, // Зменшено з 100 до 60 для кращої продуктивності
    interactivity: {
      events: {
        onClick: {
          enable: false, // Вимкнено для кращої продуктивності
          mode: "push"
        },
        onHover: {
          enable: true,
          mode: "repulse"
        },
        resize: true
      },
      modes: {
        push: {
          quantity: 2 // Зменшено з 4 до 2
        },
        repulse: {
          distance: 150, // Зменшено з 200 до 150
          duration: 0.3 // Зменшено з 0.4 до 0.3
        }
      }
    },
    particles: {
      color: {
        value: "#ff6b35"
      },
      links: {
        color: "#ff6b35",
        distance: 120, // Зменшено з 150 до 120
        enable: true,
        opacity: 0.2, // Зменшено з 0.3 до 0.2
        width: 1
      },
      move: {
        direction: "none" as const,
        enable: true,
        outModes: {
          default: "out" as const // Змінено з "bounce" на "out" для кращої продуктивності
        },
        random: false,
        speed: 0.8, // Зменшено з 1 до 0.8
        straight: false
      },
      number: {
        density: {
          enable: true,
          area: 1000 // Збільшено з 800 до 1000 для кращого розподілу
        },
        value: 25 // Зменшено з 40 до 25
      },
      opacity: {
        value: 0.4 // Зменшено з 0.5 до 0.4
      },
      shape: {
        type: "circle"
      },
      size: {
        value: { min: 1, max: 2.5 } // Зменшено максимальний розмір
      }
    },
    detectRetina: false // Вимкнено для кращої продуктивності
  };

  return (
    <section
      className={styles.heroSection}
      id="hero"
      aria-labelledby="hero-title"
      aria-label="Hero section introducing myself as a frontend developer"
    >
      {!isMobile && titleInView && (
        <Suspense fallback={<div aria-label="Loading particles animation" />}>
          <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={particlesConfig}
            aria-hidden="true"
          />
        </Suspense>
      )}

      <div className={styles.heroContent}>
        <h1
          ref={titleRef}
          id="hero-title"
          className={`${styles.title} ${titleInView ? styles.animateIn : ""}`}
        >
          Forging Ideas, Crafting Solutions
        </h1>

        <h2
          ref={subtitleRef}
          className={`${styles.subtitle} ${
            subtitleInView ? styles.animateIn : ""
          }`}
          aria-live="polite"
          aria-label="Dynamic role descriptions"
        >
          <TypeAnimation
            sequence={[
              "Full-stack Developer",
              2000,
              "Software Engineer",
              2000,
              "TypeScript Enthusiast",
              2000,
              "Problem Solver",
              2000
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            style={{ display: "inline-block" }}
          />
        </h2>

        <div
          ref={ctaRef}
          className={`${styles.ctaContainer} ${
            ctaInView ? styles.animateIn : ""
          }`}
        >
          <button
            onClick={handleAboutMe}
            className={styles.ctaPrimary}
            aria-label="Learn more about me"
          >
            About Me
          </button>

          <button
            onClick={handleViewWork}
            className={styles.ctaSecondary}
            aria-label="View my portfolio projects"
          >
            View My Work
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
