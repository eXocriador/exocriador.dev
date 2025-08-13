/**
 * Утиліта для плавних анімацій без блимання
 */

// Налаштування анімацій
const ANIMATION_CONFIG = {
  threshold: 0.1, // Коли елемент на 10% видимий
  rootMargin: "0px 0px -50px 0px", // Відступ для спрацьовування
  delay: 100 // Затримка між анімаціями карток
};

// Класи анімацій
const ANIMATION_CLASSES = {
  fadeIn: "animate-fade-in",
  fadeInUp: "animate-fade-in-up",
  slideInUp: "animate-slide-in-up"
};

/**
 * Створює Intersection Observer для анімацій
 */
export function createAnimationObserver() {
  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;

        // Додаємо затримку для послідовних анімацій
        const delay = element.dataset.animationDelay || 0;

        setTimeout(() => {
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
          element.classList.add("animated");
        }, delay);

        // Відключаємо observer після анімації
        observer.unobserve(element);
      }
    });
  }, ANIMATION_CONFIG);
}

/**
 * Ініціалізує анімації для карток проєктів
 */
export function initProjectAnimations() {
  const projectCards = document.querySelectorAll(".projectCard");

  projectCards.forEach((card, index) => {
    // Встановлюємо початковий стан
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";

    // Додаємо затримку для послідовності
    card.dataset.animationDelay = index * ANIMATION_CONFIG.delay;

    // Спостерігаємо за карткою
    const observer = createAnimationObserver();
    observer.observe(card);
  });
}

/**
 * Ініціалізує анімації для service карток
 */
export function initServiceAnimations() {
  const serviceCards = document.querySelectorAll(".serviceCard");

  serviceCards.forEach((card, index) => {
    // Встановлюємо початковий стан
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";

    // Додаємо затримку для послідовності
    card.dataset.animationDelay = index * ANIMATION_CONFIG.delay;

    // Спостерігаємо за карткою
    const observer = createAnimationObserver();
    observer.observe(card);
  });
}

/**
 * Ініціалізує анімацію для About секції
 */
export function initAboutAnimation() {
  const aboutSection = document.querySelector(".aboutSection");

  if (aboutSection) {
    // Встановлюємо початковий стан
    aboutSection.style.opacity = "0";
    aboutSection.style.transform = "translateY(30px)";

    // Спостерігаємо за секцією
    const observer = createAnimationObserver();
    observer.observe(aboutSection);
  }
}

/**
 * Перевіряє, чи підтримуються анімації
 */
export function supportsAnimations() {
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Головна функція ініціалізації всіх анімацій
 */
export function initAllAnimations() {
  if (!supportsAnimations()) {
    // Якщо анімації відключені, показуємо все одразу
    document
      .querySelectorAll(".projectCard, .serviceCard, .aboutSection")
      .forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    return;
  }

  // Ініціалізуємо анімації після завантаження DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(() => {
        initProjectAnimations();
        initServiceAnimations();
        initAboutAnimation();
      }, 100);
    });
  } else {
    setTimeout(() => {
      initProjectAnimations();
      initServiceAnimations();
      initAboutAnimation();
    }, 100);
  }
}

/**
 * Плавна анімація для елементів при скролі
 */
export function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    "[data-animate-on-scroll]"
  );

  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const animationType = element.dataset.animationType || "fadeInUp";
          const delay = element.dataset.animationDelay || 0;

          setTimeout(() => {
            element.classList.add(ANIMATION_CLASSES[animationType]);
            element.classList.add("animated");
          }, delay);

          scrollObserver.unobserve(element);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    }
  );

  animatedElements.forEach((element) => {
    scrollObserver.observe(element);
  });
}

// Автоматична ініціалізація при імпорті
if (typeof window !== "undefined") {
  initAllAnimations();
}
