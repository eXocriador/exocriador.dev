import React, { useCallback, useState, useEffect, Suspense, lazy } from "react";
import { useInView } from "react-intersection-observer";
import { loadSlim } from "tsparticles-slim";
import { TypeAnimation } from "react-type-animation";
import { scrollToSection } from "../../utils/scrollUtils";
import styles from "./Hero.module.css";

// Lazy load the Particles component
const Particles = lazy(() =>
  import("react-tsparticles").then((module) => ({ default: module.Particles }))
);

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
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

  const handleViewWork = () => {
    scrollToSection("portfolio");
  };

  const handleAboutMe = () => {
    scrollToSection("about");
  };

  return (
    <section
      className={styles.heroSection}
      id="hero"
      aria-labelledby="hero-title"
      aria-label="Hero section introducing myself as a frontend developer"
    >
      {!isMobile && (
        <Suspense fallback={<div aria-label="Loading particles animation" />}>
          <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
              background: {
                color: {
                  value: "transparent"
                }
              },
              fpsLimit: 100,
              interactivity: {
                events: {
                  onClick: {
                    enable: true,
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
                    quantity: 4
                  },
                  repulse: {
                    distance: 200,
                    duration: 0.4
                  }
                }
              },
              particles: {
                color: {
                  value: "#ff6b35"
                },
                links: {
                  color: "#ff6b35",
                  distance: 150,
                  enable: true,
                  opacity: 0.3,
                  width: 1
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: {
                    default: "bounce"
                  },
                  random: false,
                  speed: 1,
                  straight: false
                },
                number: {
                  density: {
                    enable: true,
                    area: 800
                  },
                  value: 40
                },
                opacity: {
                  value: 0.5
                },
                shape: {
                  type: "circle"
                },
                size: {
                  value: { min: 1, max: 3 }
                }
              },
              detectRetina: true
            }}
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
