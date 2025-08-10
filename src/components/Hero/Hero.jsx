import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Particles } from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import styles from "./Hero.module.css";

const Hero = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log("Particles loaded", container);
  }, []);

  return (
    <section className={styles.heroSection} id="hero">
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
              value: 80
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

      <div className={styles.heroContent}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.title}
        >
          Crafting Digital Experiences That{" "}
          <span className={styles.gradientText}>Inspire</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.subtitle}
        >
          <TypeAnimation
            sequence={[
              "Creative Frontend Developer",
              1500,
              "React & Animation Expert",
              1500,
              "Turning Ideas into Reality",
              1500
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={styles.description}
        >
          I transform complex ideas into elegant, user-friendly interfaces that
          captivate and engage. Every pixel, every animation, every interaction
          is crafted with purpose.
        </motion.p>

        <div className={styles.ctaRow}>
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={styles.ctaButton}
          >
            Learn More
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className={`${styles.ctaButton} ${styles.secondaryButton}`}
          >
            See My Work
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
