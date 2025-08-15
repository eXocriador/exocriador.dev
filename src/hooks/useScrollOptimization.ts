import { useEffect, useRef, useCallback } from 'react';

interface UseScrollOptimizationOptions {
  throttleMs?: number;
  passive?: boolean;
  disableOnMobile?: boolean;
}

export const useScrollOptimization = (options: UseScrollOptimizationOptions = {}) => {
  const {
    throttleMs = 16, // ~60fps
    passive = true,
    disableOnMobile = true
  } = options;

  const ticking = useRef(false);
  const lastScrollTime = useRef(0);

  // Перевіряємо, чи ми на мобільному
  const isMobile = useRef(false);
  
  useEffect(() => {
    const checkMobile = () => {
      isMobile.current = window.innerWidth < 768;
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Throttled scroll handler
  const handleScroll = useCallback((event: Event) => {
    if (disableOnMobile && isMobile.current) return;
    
    const now = Date.now();
    
    if (!ticking.current && now - lastScrollTime.current >= throttleMs) {
      ticking.current = true;
      lastScrollTime.current = now;
      
      // Використовуємо requestAnimationFrame для синхронізації з refresh rate
      requestAnimationFrame(() => {
        // Тут можна додати логіку для оптимізації скролу
        // Наприклад, призупинення важких анімацій
        
        ticking.current = false;
      });
    }
  }, [throttleMs, disableOnMobile]);

  // Оптимізація CSS transitions під час скролу
  const optimizeScrollPerformance = useCallback(() => {
    if (disableOnMobile && isMobile.current) return;
    
    // Додаємо CSS клас для призупинення важких анімацій
    document.body.classList.add('scrolling');
    
    // Видаляємо клас після закінчення скролу
    setTimeout(() => {
      document.body.classList.remove('scrolling');
    }, 150);
  }, [disableOnMobile]);

  // Оптимізація Intersection Observer
  const createOptimizedObserver = useCallback((
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = {}
  ) => {
    const defaultOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    };

    return new IntersectionObserver(callback, defaultOptions);
  }, []);

  // Debounced scroll handler для важких операцій
  const createDebouncedScrollHandler = useCallback((
    callback: () => void,
    delay: number = 100
  ) => {
    let timeoutId: NodeJS.Timeout;
    
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(callback, delay);
    };
  }, []);

  // Оптимізація анімацій під час скролу
  const pauseAnimationsDuringScroll = useCallback(() => {
    if (disableOnMobile && isMobile.current) return;
    
    const animatedElements = document.querySelectorAll('[data-animation-type]');
    
    animatedElements.forEach(element => {
      if (element instanceof HTMLElement) {
        element.style.animationPlayState = 'paused';
      }
    });
  }, [disableOnMobile]);

  const resumeAnimationsAfterScroll = useCallback(() => {
    if (disableOnMobile && isMobile.current) return;
    
    const animatedElements = document.querySelectorAll('[data-animation-type]');
    
    animatedElements.forEach(element => {
      if (element instanceof HTMLElement) {
        element.style.animationPlayState = 'running';
      }
    });
  }, [disableOnMobile]);

  useEffect(() => {
    if (disableOnMobile && isMobile.current) return;
    
    const optimizedScrollHandler = (event: Event) => {
      handleScroll(event);
      optimizeScrollPerformance();
      pauseAnimationsDuringScroll();
    };

    const resumeHandler = createDebouncedScrollHandler(() => {
      resumeAnimationsAfterScroll();
    }, 100);

    window.addEventListener('scroll', optimizedScrollHandler, { passive });
    window.addEventListener('scroll', resumeHandler, { passive });

    return () => {
      window.removeEventListener('scroll', optimizedScrollHandler);
      window.removeEventListener('scroll', resumeHandler);
    };
  }, [
    handleScroll,
    optimizeScrollPerformance,
    pauseAnimationsDuringScroll,
    resumeAnimationsAfterScroll,
    createDebouncedScrollHandler,
    passive,
    disableOnMobile
  ]);

  return {
    createOptimizedObserver,
    createDebouncedScrollHandler,
    isMobile: isMobile.current
  };
};
