import React, { useCallback, useState, useEffect, Suspense, lazy } from "react";
import { useInView } from "react-intersection-observer";
import { loadSlim } from "tsparticles-slim";
import { heroContent } from "../../constants/content";
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
  const [descriptionRef, descriptionInView] = useInView({
    triggerOnce: true,
    delay: 400
  });
  const [button1Ref, button1InView] = useInView({
    triggerOnce: true,
    delay: 600
  });
  const [button2Ref, button2InView] = useInView({
    triggerOnce: true,
    delay: 800
  });

  return (
    <section className={styles.heroSection} id="hero">
      {!isMobile && (
        <Suspense fallback={<div />}>
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
              fpsLimit: 120,
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
                  value: 50
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
          className={`${styles.title} ${titleInView ? styles.animateIn : ""}`}
        >
          {heroContent.title}
        </h1>

        <h2
          ref={subtitleRef}
          className={`${styles.subtitle} ${
            subtitleInView ? styles.animateIn : ""
          }`}
        >
          {heroContent.subtitle}
        </h2>

        <p
          ref={descriptionRef}
          className={`${styles.description} ${
            descriptionInView ? styles.animateIn : ""
          }`}
        >
          {heroContent.description}
        </p>

        <div className={styles.ctaRow}>
          <a
            ref={button1Ref}
            href={heroContent.ctaButtons.primary.href}
            className={`${styles.ctaButton} ${
              button1InView ? styles.animateIn : ""
            }`}
          >
            {heroContent.ctaButtons.primary.text}
          </a>
          <a
            ref={button2Ref}
            href={heroContent.ctaButtons.secondary.href}
            className={`${styles.ctaButton} ${styles.secondaryButton} ${
              button2InView ? styles.animateIn : ""
            }`}
          >
            {heroContent.ctaButtons.secondary.text}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
